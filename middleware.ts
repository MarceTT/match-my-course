import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Permitir acceso al login si NO está autenticado
  if (!refreshToken && pathname === "/login") {
    return NextResponse.next();
  }

  // Bloquear acceso a rutas protegidas si no hay refreshToken
  if (!refreshToken && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validar refreshToken si existe
  if (refreshToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);
      await jwtVerify(refreshToken, secret);

      // Ya está logueado y va al login → redirigir al dashboard
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      // Todo OK, continuar
      return NextResponse.next();
    } catch (err) {
      console.warn("⛔ RefreshToken inválido o expirado en middleware");
      // Redirige a login si el token no es válido
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};