import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createZoomMeeting, listUpcomingMeetings, errorResponse, DEFAULTS } from "@/lib/zoom";
import { buildICS, encodeBase64 } from "@/lib/ics";
import { signPayloadBase64 } from "@/lib/secure";

const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int().min(15).max(240).optional(),
});

function fmt2(n: number) { return n.toString().padStart(2, "0"); }

function fakeTZDateUTC(y:number,m:number,d:number,h:number,mi:number) {
  return new Date(Date.UTC(y, m-1, d, h, mi, 0));
}

function addMinutes(date: Date, mins: number) {
  return new Date(date.getTime() + mins * 60_000);
}

function parseHM(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return { h, m };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, date, time, duration } = BodySchema.parse(body);

    const [y, mo, da] = date.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    const startLocal = `${fmt2(y)}-${fmt2(mo)}-${fmt2(da)}T${fmt2(hh)}:${fmt2(mm)}:00`;
    const usedDuration = duration ?? DEFAULTS.DURATION_MIN;

    // Validar día/horario permitido
    const weekday = new Date(Date.UTC(y, mo - 1, da)).getUTCDay(); // 0=Dom,6=Sáb
    if (weekday === 0) {
      return NextResponse.json({ success: false, error: "Domingo no disponible" }, { status: 400 });
    }
    const isSaturday = weekday === 6;
    const { h: whStartH, m: whStartM } = parseHM(isSaturday ? (process.env.BOOKING_SATURDAY_DAY_START || DEFAULTS.SAT_DAY_START) : DEFAULTS.DAY_START);
    const { h: whEndH, m: whEndM } = parseHM(isSaturday ? (process.env.BOOKING_SATURDAY_DAY_END || DEFAULTS.SAT_DAY_END) : DEFAULTS.DAY_END);
    const startMinutes = hh * 60 + mm;
    const openMinutes = whStartH * 60 + whStartM;
    const closeMinutes = whEndH * 60 + whEndM;
    if (startMinutes < openMinutes || (startMinutes + usedDuration) > closeMinutes) {
      return NextResponse.json({ success: false, error: "Fuera de horario permitido" }, { status: 400 });
    }

    // Validación mínima de conflictos (en BOOKING_TZ, comparando por día y hora "fake" en UTC)
    const meetings = await listUpcomingMeetings();
    const sameDayMeetings = meetings.filter((m) => m.start_time);

    const slotStartFake = fakeTZDateUTC(y, mo, da, hh, mm);
    const slotEndFake = addMinutes(slotStartFake, usedDuration);

    const tz = DEFAULTS.BOOKING_TZ;
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Enforce preaviso mínimo
    const nowParts = fmt.formatToParts(new Date());
    const mapNow: Record<string, string> = {};
    nowParts.forEach((p) => { if (p.type !== "literal") mapNow[p.type] = p.value; });
    const nowFake = new Date(Date.UTC(Number(mapNow.year), Number(mapNow.month)-1, Number(mapNow.day), Number(mapNow.hour), Number(mapNow.minute)));
    const minStart = addMinutes(nowFake, DEFAULTS.MIN_NOTICE_MIN);
    if (fakeTZDateUTC(y, mo, da, hh, mm) < minStart) {
      return NextResponse.json({ success: false, error: "No cumple con el tiempo mínimo de antelación" }, { status: 400 });
    }

    const BUFFER = DEFAULTS.BUFFER_MIN;

    const overlaps = sameDayMeetings.some((m) => {
      const mp = fmt.formatToParts(new Date(m.start_time));
      const map: Record<string, string> = {};
      mp.forEach((p) => { if (p.type !== "literal") map[p.type] = p.value; });
      const my = Number(map.year), mmo = Number(map.month), md = Number(map.day), mh = Number(map.hour), mmin = Number(map.minute);
      const mStartFake = fakeTZDateUTC(my, mmo, md, mh, mmin);
      const mEndFake = addMinutes(mStartFake, m.duration || 0);
      const mStartBuf = addMinutes(mStartFake, -BUFFER);
      const mEndBuf = addMinutes(mEndFake, BUFFER);
      // Mismo día en BOOKING_TZ
      const isSameDay = my === y && mmo === mo && md === da;
      if (!isSameDay) return false;
      return slotStartFake < mEndBuf && slotEndFake > mStartBuf;
    });

    if (overlaps) {
      return NextResponse.json({ success: false, error: "Horario no disponible" }, { status: 409 });
    }

    const topic = `Asesoría MatchMyCourse - ${name}`;
    const agenda = `Asesoría con ${name} <${email}>`;

    const meeting = await createZoomMeeting({
      topic,
      agenda,
      start_time_local: startLocal, // interpretado con timezone del host
      duration: usedDuration,
    });

    // Construir ICS y enlace de Google Calendar
    const startUtc = new Date(meeting.start_time);
    const endUtc = addMinutes(startUtc, meeting.duration || usedDuration);
    const summary = topic;
    const description = `Enlace Zoom: ${meeting.join_url}`;
    const ics = buildICS({
      uid: `mmc-${meeting.id}@matchmycourse.com`,
      startUtc,
      endUtc,
      summary,
      description,
      location: "Zoom",
    });
    const icsBase64 = encodeBase64(ics);
    const fileName = `asesoria-${date.replaceAll('-', '')}-${time.replace(':','')}.ics`;

    const fmtGoogle = (d: Date) => {
      const pad = (n: any) => n.toString().padStart(2, '0');
      return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    };
    const googleUrl = new URL("https://calendar.google.com/calendar/render");
    googleUrl.searchParams.set("action", "TEMPLATE");
    googleUrl.searchParams.set("text", summary);
    googleUrl.searchParams.set("dates", `${fmtGoogle(startUtc)}/${fmtGoogle(endUtc)}`);
    googleUrl.searchParams.set("details", description);
    googleUrl.searchParams.set("location", "Zoom");
    googleUrl.searchParams.set("ctz", DEFAULTS.BOOKING_TZ);

    // Enlaces de gestión (reprogramar/cancelar) firmados
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin") || "";
    const managePayload = { id: meeting.id, email };
    const { p, t } = signPayloadBase64(managePayload);
    const cancelUrl = `${baseUrl}/api/zoom/cancel?p=${encodeURIComponent(p)}&t=${encodeURIComponent(t)}`;
    const rescheduleBase = `${baseUrl}/api/zoom/reschedule?p=${encodeURIComponent(p)}&t=${encodeURIComponent(t)}`;
    const reschedulePage = `${baseUrl}/asesoria?manage_p=${encodeURIComponent(p)}&manage_t=${encodeURIComponent(t)}`;

    // Webhook opcional al backend para enviar email
    const webhookUrl = process.env.BOOKING_NOTIFY_WEBHOOK_URL;
    const webhookKey = process.env.BOOKING_NOTIFY_API_KEY;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(webhookKey ? { "x-api-key": webhookKey } : {}),
          },
          body: JSON.stringify({
            type: "zoom_booking_confirmation",
            user: { name, email },
            meeting: {
              id: meeting.id,
              join_url: meeting.join_url,
              start_time: meeting.start_time,
              duration: meeting.duration,
              timezone: meeting.timezone,
            },
            calendar: {
              icsFileName: fileName,
              icsBase64,
              googleUrl: googleUrl.toString(),
            },
            manage: {
              cancelUrl,
              rescheduleUrl: rescheduleBase,
              reschedulePage,
            }
          }),
        });
      } catch (e) {
        console.error("Booking webhook error", e);
      }
    }

    return NextResponse.json({
      success: true,
      meeting: {
        id: meeting.id,
        start_time: meeting.start_time,
        duration: meeting.duration,
        join_url: meeting.join_url,
        timezone: meeting.timezone,
      },
      calendar: {
        icsBase64,
        icsFileName: fileName,
        googleUrl: googleUrl.toString(),
      },
      manage: {
        cancelUrl,
        rescheduleUrl: rescheduleBase, // enviar POST con {date,time}
        reschedulePage,
        payload: { p, t },
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
