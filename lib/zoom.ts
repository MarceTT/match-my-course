import { NextResponse } from "next/server";

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_USER_ID = process.env.ZOOM_USER_ID; // email o ID del host
const BOOKING_TZ = process.env.BOOKING_TZ || "America/Santiago";

export type ZoomMeeting = {
  id: number;
  topic: string;
  start_time: string; // ISO string (puede venir con Z)
  duration: number; // minutos
  join_url?: string;
  timezone?: string;
};

export async function getZoomAccessToken(): Promise<string> {
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error("Faltan variables de entorno de Zoom (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET)");
  }

  const creds = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");
  const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(ZOOM_ACCOUNT_ID)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${creds}` },
    // body vacío
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`No se pudo obtener token de Zoom: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

export async function listUpcomingMeetings(): Promise<ZoomMeeting[]> {
  if (!ZOOM_USER_ID) throw new Error("Falta ZOOM_USER_ID");

  const token = await getZoomAccessToken();
  const url = `https://api.zoom.us/v2/users/${encodeURIComponent(ZOOM_USER_ID)}/meetings?type=upcoming&page_size=300`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error listando reuniones Zoom: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { meetings: any[] };
  return (data.meetings || []).map((m) => ({
    id: m.id,
    topic: m.topic,
    start_time: m.start_time,
    duration: m.duration,
    timezone: m.timezone,
  }));
}

export async function createZoomMeeting(params: {
  topic: string;
  agenda?: string;
  start_time_local: string; // "YYYY-MM-DDTHH:mm:ss" interpretado en BOOKING_TZ
  duration: number; // minutos
}): Promise<ZoomMeeting> {
  if (!ZOOM_USER_ID) throw new Error("Falta ZOOM_USER_ID");

  const token = await getZoomAccessToken();
  const url = `https://api.zoom.us/v2/users/${encodeURIComponent(ZOOM_USER_ID)}/meetings`;

  const body = {
    topic: params.topic,
    type: 2,
    start_time: params.start_time_local, // sin sufijo Z; Zoom usará timezone
    duration: params.duration,
    timezone: BOOKING_TZ,
    agenda: params.agenda || "Asesoría MatchMyCourse",
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: true,
      waiting_room: false,
      audio: "both",
      auto_recording: "none",
      mute_upon_entry: true,
      approve_or_block_auth_users: false,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error creando reunión Zoom: ${res.status} ${text}`);
  }

  const data = await res.json();
  return {
    id: data.id,
    topic: data.topic,
    start_time: data.start_time,
    duration: data.duration,
    join_url: data.join_url,
    timezone: data.timezone,
  };
}

export async function updateZoomMeeting(params: {
  meetingId: number | string;
  start_time_local: string; // en BOOKING_TZ
  duration: number;
}): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();
  const url = `https://api.zoom.us/v2/meetings/${encodeURIComponent(String(params.meetingId))}`;
  const body = {
    start_time: params.start_time_local,
    duration: params.duration,
    timezone: BOOKING_TZ,
    type: 2,
  };
  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error actualizando reunión Zoom: ${res.status} ${text}`);
  }
  // Tras PATCH, hacemos GET para devolver datos completos
  const resGet = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!resGet.ok) {
    const text = await resGet.text();
    throw new Error(`Error consultando reunión Zoom: ${resGet.status} ${text}`);
  }
  const data = await resGet.json();
  return {
    id: data.id,
    topic: data.topic,
    start_time: data.start_time,
    duration: data.duration,
    join_url: data.join_url,
    timezone: data.timezone,
  };
}

export async function deleteZoomMeeting(meetingId: number | string): Promise<void> {
  const token = await getZoomAccessToken();
  const url = `https://api.zoom.us/v2/meetings/${encodeURIComponent(String(meetingId))}`;
  const res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Error eliminando reunión Zoom: ${res.status} ${text}`);
  }
}

export function errorResponse(err: unknown, status = 500) {
  const message = err instanceof Error ? err.message : "Error interno";
  return NextResponse.json({ success: false, error: message }, { status });
}

export const DEFAULTS = {
  BOOKING_TZ,
  DURATION_MIN: Number(process.env.BOOKING_DURATION_MINUTES || 15),
  SLOT_INTERVAL_MIN: Number(process.env.BOOKING_SLOT_INTERVAL_MINUTES || 15),
  MIN_NOTICE_MIN: Number(process.env.BOOKING_MIN_NOTICE_MINUTES || 120),
  BUFFER_MIN: Number(process.env.BOOKING_BUFFER_MINUTES || 10),
  WORKDAYS: (process.env.BOOKING_WORKDAYS || "1,2,3,4,5,6").split(",").map((n) => Number(n.trim())),
  DAY_START: process.env.BOOKING_DAY_START || "09:00",   // L-V
  DAY_END: process.env.BOOKING_DAY_END || "19:00",       // L-V
  SAT_DAY_START: process.env.BOOKING_SATURDAY_DAY_START || "09:00",
  SAT_DAY_END: process.env.BOOKING_SATURDAY_DAY_END || "13:00",
};
