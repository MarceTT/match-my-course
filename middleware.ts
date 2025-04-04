import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // ✅ Rutas protegidas y los roles permitidos
  const roleAccessMap: Record<string, string[]> = {
    "/admin": ["admin"],
    "/admin/dashboard": ["admin"],
    "/admin/settings": ["admin"],
    // Agrega más rutas si es necesario
  };

  const matchedPath = Object.keys(roleAccessMap).find((route) =>
    pathname.startsWith(route)
  );

  // 🔐 Si la ruta requiere login y NO hay sesión → redirige a login
  if (matchedPath && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 Si hay sesión pero el usuario no tiene rol válido → redirige a /unauthorized
  if (matchedPath && session?.user) {
    const allowedRoles = roleAccessMap[matchedPath];
    const userRole = (session.user as any).role;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Middleware aplicado solo a rutas protegidas
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
