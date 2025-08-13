import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_PREFIX = "/admin";
const KNOWN_QUERY_PARAMS = new Set([
  "curso",
  "schoolId",
  "semanas",
  "ciudad",
  "horario",
]);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // --- Admin auth (solo si visita /admin) ---
  if (pathname.startsWith(ADMIN_PREFIX)) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: req.nextUrl.protocol === 'https:',
    });

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if ((token as any).role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  }

  // --- SEO canonical: detalle de curso sin query ---
  const isCourseDetail =
    /^\/cursos\/[^/]+\/escuelas\/[^/]+\/[A-Za-z0-9]+$/.test(pathname);
  if (isCourseDetail) {
    const hasKnownParams = Array.from(url.searchParams.keys()).some((k) =>
      KNOWN_QUERY_PARAMS.has(k)
    );
    if (hasKnownParams) {
      url.search = "";
      return NextResponse.redirect(url, 301); // WHY: consolidar señales en URL sin query
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cursos/:path*"],
};
