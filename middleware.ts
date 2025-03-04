import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Rutas protegidas
  const protectedRoutes = ["/admin/dashboard", "/admin/settings"];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // 🔥 Redirigir si no hay token
    }
  }

  return NextResponse.next();
}

// 🔥 Aplicar el middleware solo a ciertas rutas
export const config = {
  matcher: ["/admin/:path*"], // Aplica middleware a todas las rutas dentro de /admin/
};
