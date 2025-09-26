import { NextRequest, NextResponse } from "next/server";
import { verifySignature, decodePayload } from "@/lib/secure";
import { updateZoomMeeting, errorResponse, DEFAULTS } from "@/lib/zoom";

function fmt2(n: number) { return n.toString().padStart(2, "0"); }

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const p = url.searchParams.get("p") || req.headers.get("x-manage-p") || "";
    const t = url.searchParams.get("t") || req.headers.get("x-manage-t") || "";
    if (!p || !t || !verifySignature(p, t)) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
    const payload = decodePayload<{ id: number | string; email: string }>(p);
    const body = await req.json().catch(() => ({}));
    const { date, time, duration } = body as { date: string; time: string; duration?: number };
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !time || !/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ success: false, error: "Parámetros inválidos" }, { status: 400 });
    }
    const used = duration ?? DEFAULTS.DURATION_MIN;
    const [y, mo, da] = date.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    const startLocal = `${fmt2(y)}-${fmt2(mo)}-${fmt2(da)}T${fmt2(hh)}:${fmt2(mm)}:00`;
    const updated = await updateZoomMeeting({ meetingId: payload.id, start_time_local: startLocal, duration: used });
    return NextResponse.json({ success: true, meeting: updated });
  } catch (err) {
    return errorResponse(err);
  }
}

