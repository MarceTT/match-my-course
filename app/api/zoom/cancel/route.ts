import { NextRequest, NextResponse } from "next/server";
import { verifySignature, decodePayload } from "@/lib/secure";
import { deleteZoomMeeting, errorResponse } from "@/lib/zoom";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const p = url.searchParams.get("p") || req.headers.get("x-manage-p") || "";
    const t = url.searchParams.get("t") || req.headers.get("x-manage-t") || "";
    if (!p || !t || !verifySignature(p, t)) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
    const payload = decodePayload<{ id: number | string; email: string }>(p);
    await deleteZoomMeeting(payload.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponse(err);
  }
}

