import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ADMIN_PREFIX = '/admin';
const KNOWN_QUERY_PARAMS = new Set(['curso', 'schoolId', 'semanas', 'ciudad', 'horario']);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // /admin – auth con NextAuth
  if (pathname.startsWith(ADMIN_PREFIX)) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: req.nextUrl.protocol === 'https:', // WHY: cookies seguras solo en https
    });

    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if ((token as any).role !== 'admin') {
      return new NextResponse('Forbidden', {
        status: 403,
        headers: { 'X-Robots-Tag': 'noindex, nofollow' },
      });
    }
    return NextResponse.next();
  }

  // /cursos/.../:id – quitar query conocidas → 301 a canónica sin query
  const isCourseDetail = /^\/cursos\/[^/]+\/escuelas\/[^/]+\/[A-Za-z0-9]+$/.test(pathname);
  if (isCourseDetail) {
    const hasKnown = Array.from(url.searchParams.keys()).some((k) => KNOWN_QUERY_PARAMS.has(k));
    if (hasKnown) {
      url.search = '';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/cursos/:path*'],
};
