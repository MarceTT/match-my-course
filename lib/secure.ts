import crypto from "crypto";

const MANAGEMENT_SECRET = process.env.BOOKING_MANAGEMENT_SECRET || "dev-secret-change-me";

export function signPayloadBase64(payloadObj: any): { p: string; t: string } {
  const p = Buffer.from(JSON.stringify(payloadObj), "utf-8").toString("base64url");
  const t = crypto.createHmac("sha256", MANAGEMENT_SECRET).update(p).digest("hex");
  return { p, t };
}

export function verifySignature(p: string, t: string): boolean {
  const expected = crypto.createHmac("sha256", MANAGEMENT_SECRET).update(p).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(t));
}

export function decodePayload<T = any>(p: string): T {
  const json = Buffer.from(p, "base64url").toString("utf-8");
  return JSON.parse(json) as T;
}

