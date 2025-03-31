import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;


  if (refreshToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!refreshToken && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url)); // 🚀 Redirigir si no está autenticado
  }

  return NextResponse.next();
}

// 🔥 Aplicar el middleware solo a ciertas rutas
export const config = {
  matcher: ["/admin/:path*", "/login"], // Aplica a `/admin/*` y `/login`
};