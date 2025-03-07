import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;


  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // 🚀 Redirigir si no está autenticado
    }
  }

  return NextResponse.next();
}

// 🔥 Aplicar el middleware solo a ciertas rutas
export const config = {
  matcher: ["/admin/:path*", "/login"], // Aplica a `/admin/*` y `/login`
};