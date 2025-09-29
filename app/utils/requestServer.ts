"use server";

import { auth } from "@/auth";

// Devuelve el accessToken vigente desde NextAuth (se refresca vía callback jwt).
// Mantiene la firma para no tocar los call sites existentes.
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const session = await auth();
    const token = (session as any)?.user?.accessToken as string | undefined;
    return token ?? null;
  } catch (err) {
    return null;
  }
}
