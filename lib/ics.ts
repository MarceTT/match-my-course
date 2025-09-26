function pad(n: number) { return n.toString().padStart(2, "0"); }

function toUTCStamp(d: Date) {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

export function buildICS(params: {
  uid: string;
  startUtc: Date;
  endUtc: Date;
  summary: string;
  description?: string;
  location?: string;
}): string {
  const dtstamp = toUTCStamp(new Date());
  const dtstart = toUTCStamp(params.startUtc);
  const dtend = toUTCStamp(params.endUtc);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MatchMyCourse//Zoom Meeting//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${params.uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeText(params.summary)}`,
    params.description ? `DESCRIPTION:${escapeText(params.description)}` : undefined,
    params.location ? `LOCATION:${escapeText(params.location)}` : undefined,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];
  return lines.join("\r\n");
}

function escapeText(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function encodeBase64(str: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf-8").toString("base64");
  }
  // fallback (browser)
  // @ts-ignore
  return btoa(unescape(encodeURIComponent(str)));
}

