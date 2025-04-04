import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  console.log("🧠 Middleware session:", session);

  // Bloquear acceso a /admin si no hay sesión
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validación de rol
  const roleAccessMap: Record<string, string[]> = {
    "/admin/settings": ["admin"],
    "/admin/dashboard": ["admin", "editor"],
  };

  const matchedPath = Object.keys(roleAccessMap).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedPath && session?.user) {
    const allowedRoles = roleAccessMap[matchedPath];
    const userRole = (session.user as any).role;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // ✅
};
