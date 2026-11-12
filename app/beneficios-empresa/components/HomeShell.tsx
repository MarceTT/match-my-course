import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/final-logo.png";

import { dmSans } from "@/app/ui/fonts";

/**
 * Chrome for the redesigned microsite landing: a plain centered header and the
 * new full footer with offices, phones and social links.
 *
 * This replaces `BeneficiosShell` on the landing only. The source dropped the
 * decorative blobs in the redesign; the destination pages still use the old
 * shell until they are ported in the following slices.
 */

const SOCIAL = [
  { href: "https://www.facebook.com/matchmycourse", label: "Facebook" },
  { href: "https://www.instagram.com/match.my.course/", label: "Instagram" },
  {
    href: "https://www.linkedin.com/company/matchmycourse/about/",
    label: "LinkedIn",
  },
  { href: "https://www.youtube.com/@matchmycourse", label: "YouTube" },
];

export default function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${dmSans.className} min-h-screen bg-white text-[#171c2d] antialiased`}
    >
      {/*
        Resets for the root layout's critical-CSS `header{...}` element rule
        (white background, shadow, sticky), which would otherwise paint a bar
        this design does not have.
      */}
      <header
        id="inicio"
        className="relative mx-auto flex max-w-[1240px] items-center justify-center !bg-transparent px-6 py-6 !shadow-none"
      >
        <Link href="/beneficios-empresa" aria-label="MatchMyCourse, ir a inicio">
          <Image
            src={Logo}
            alt="MatchMyCourse"
            priority
            className="h-auto w-[min(260px,62vw)]"
          />
        </Link>
      </header>

      <main>{children}</main>

      <footer id="contacto" className="mt-20 border-t border-[#e6ebfa] bg-[#f7f9ff]">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <p className="max-w-[680px] text-[16px] leading-[1.7] text-[#4c5871]">
            Maximizamos la compatibilidad entre estudiantes y escuelas de inglés con una
            plataforma transparente, confiable y personalizada, que permite tomar
            decisiones informadas, simplificando todo el proceso de búsqueda, comparación
            y reserva.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-10 max-[820px]:grid-cols-1 max-[820px]:gap-8">
            <div>
              <h2 className="mb-4 text-[18px] font-extrabold text-[#171c2d]">
                Encuéntranos
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#4c5871]">
                <strong className="font-bold">Oficina en Irlanda · Dublín</strong>
                <br />
                77 Candem Street Lower, Dublin 2
              </p>
            </div>

            <div className="max-[820px]:-mt-4">
              <p className="text-[15px] leading-[1.7] text-[#4c5871] max-[820px]:mt-0 min-[821px]:mt-[52px]">
                <strong className="font-bold">Oficina en Chile · Santiago</strong>
                <br />
                Fray Angélico 133, Las Condes
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-[18px] font-extrabold text-[#171c2d]">
                Teléfonos de contacto
              </h2>
              <ul className="space-y-1 text-[15px] leading-[1.7] text-[#4c5871]">
                <li>
                  Chile:{" "}
                  <a href="tel:+56982959118" className="text-[#4863f5]">
                    +56 9 8295 9118
                  </a>
                </li>
                <li>
                  Irlanda:{" "}
                  <a href="tel:+353831134401" className="text-[#4863f5]">
                    +353 83 113 4401
                  </a>
                </li>
                <li>
                  <a href="mailto:info@matchmycourse.com" className="text-[#4863f5]">
                    info@matchmycourse.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Redes sociales"
            className="mt-10 flex flex-wrap gap-5 text-[14px] font-bold text-[#4863f5]"
          >
            {SOCIAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="mt-10 border-t border-[#e6ebfa] pt-6 text-[13px] text-[#81889b]">
            © 2026 MatchMyCourse · Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
