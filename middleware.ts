import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string; // Tipo explícito
  accessToken: string;
}

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Rutas protegidas
  const ADMIN_ROUTES = ['/admin', '/admin/dashboard'];

  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    // Verificación de tipo seguro
    const user = session?.user as AuthenticatedUser | undefined;

    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};