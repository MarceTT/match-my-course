import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";

/**
 * Obtiene el token desde una request del lado del servidor (SSR).
 */
export async function getServerToken(req: any): Promise<JWT | null> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  return token as JWT | null;
}