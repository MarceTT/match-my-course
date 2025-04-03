import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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

  // Ya está logueado y va al login → redirigir al dashboard
  if (refreshToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};