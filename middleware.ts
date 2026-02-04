import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ADMIN_PREFIX = '/admin';
const KNOWN_QUERY_PARAMS = new Set(['curso', 'schoolId', 'semanas', 'ciudad', 'horario']);
const CANONICAL_DOMAIN = 'matchmycourse.com';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const hostname = req.headers.get('host') || '';

  // === REDIRECT RAILWAY/VERCEL DOMAINS TO CANONICAL DOMAIN ===
  // Previene contenido duplicado en Google indexando dominios de staging/preview
  if (
    hostname &&
    !hostname.includes(CANONICAL_DOMAIN) &&
    !hostname.includes('localhost') &&
    !hostname.includes('127.0.0.1')
  ) {
    const redirectUrl = new URL(req.url);
    redirectUrl.host = CANONICAL_DOMAIN;
    redirectUrl.protocol = 'https:';

    // 301 Permanent Redirect para transferir SEO juice
    return NextResponse.redirect(redirectUrl, 301);
  }

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
  // Matcher debe incluir TODAS las rutas para el redirect de dominio
  // Excluimos _next/static, _next/image, favicon.ico, y otros assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
