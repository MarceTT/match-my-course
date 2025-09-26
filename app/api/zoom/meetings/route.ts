import { NextRequest, NextResponse } from "next/server";
import { listUpcomingMeetings, errorResponse, DEFAULTS } from "@/lib/zoom";

function fmt2(n: number) { return n.toString().padStart(2, "0"); }

function toTZParts(d: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(d);
  const map: Record<string, string> = {};
  parts.forEach((p) => { if (p.type !== "literal") map[p.type] = p.value; });
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

function partsToLocalISO(p: {year:number;month:number;day:number;hour:number;minute:number;second?:number}) {
  const ss = fmt2(p.second ?? 0);
  return `${p.year}-${fmt2(p.month)}-${fmt2(p.day)}T${fmt2(p.hour)}:${fmt2(p.minute)}:${ss}`;
}

function dateStrUTC(y:number,m:number,d:number) {
  return new Date(Date.UTC(y, m-1, d));
}

function addMinutes(d: Date, mins: number) {
  return new Date(d.getTime() + mins * 60_000);
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from"); // YYYY-MM-DD
    const to = url.searchParams.get("to");
    const tz = DEFAULTS.BOOKING_TZ;

    if (!from || !to) {
      return NextResponse.json({ success: false, error: "Parámetros 'from' y 'to' requeridos (YYYY-MM-DD)" }, { status: 400 });
    }

    const fromD = from.split("-").map(Number);
    const toD = to.split("-").map(Number);
    const fromDate = dateStrUTC(fromD[0], fromD[1], fromD[2]);
    const toDate = dateStrUTC(toD[0], toD[1], toD[2]);

    const meetings = await listUpcomingMeetings();

    const busy = meetings
      .map((m) => {
        const startUTC = new Date(m.start_time);
        const endUTC = addMinutes(startUTC, m.duration || 0);
        const p = toTZParts(startUTC, tz);
        const pend = toTZParts(endUTC, tz);
        const startLocal = partsToLocalISO(p);
        const endLocal = partsToLocalISO(pend);
        return { startLocal, endLocal };
      })
      .filter(({ startLocal }) => {
        const [y, mo, da] = startLocal.slice(0, 10).split("-").map(Number);
        const d = dateStrUTC(y, mo, da);
        return d >= fromDate && d <= toDate;
      })
      .map(({ startLocal, endLocal }) => ({ start: startLocal, end: endLocal }));

    return NextResponse.json({ success: true, timeZone: tz, busy });
  } catch (err) {
    return errorResponse(err);
  }
}
