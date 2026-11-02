import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/logos/final-logo.png";

import { dmSans } from "@/app/ui/fonts";
import ProgrammeCtaButton from "./components/ProgrammeCtaButton";

/**
 * /beneficios — faithful port of the standalone corporate-benefits landing.
 *
 * This page deliberately keeps its source design instead of adopting the site
 * theme: DM Sans and #4863f5 rather than Raleway and the site blue. It
 * therefore lives OUTSIDE the `(landings)` route group, whose layout injects
 * the site Header/Footer and forces Raleway, and renders its own minimal
 * header and footer exactly as the original did.
 *
 * The organic decorative shapes keep `style` for their elliptical
 * `border-radius`, gradients and rotation — Tailwind has no utility for an
 * eight-value radius — while position and size stay in Tailwind classes so the
 * responsive overrides from the source survive.
 */

export const metadata: Metadata = {
  title: "Beneficios para estudiar inglés en el extranjero | MatchMyCourse",
  description:
    "Cursos de inglés en Irlanda, Canadá, Nueva Zelanda, Inglaterra y Escocia; programas cortos y de larga duración con MatchMyCourse.",
};

// Next 15 takes themeColor from the viewport export, not from metadata.
export const viewport: Viewport = {
  themeColor: "#4863f5",
};

const DESTINATIONS = [
  {
    href: "/irlanda/",
    label: "Irlanda",
    image: "/beneficios/irlanda-fallback.webp",
    alt: "Paisaje en Irlanda",
    width: 900,
    height: 1200,
  },
  {
    href: "/nueva-zelanda/",
    label: "Nueva Zelanda",
    image: "/beneficios/nueva-zelanda-fallback.webp",
    alt: "Lago y montañas de Nueva Zelanda",
    width: 900,
    height: 1200,
  },
  {
    href: "/canada/",
    label: "Canadá",
    image: "/beneficios/canada-fallback.webp",
    alt: "Toronto, Canadá",
    width: 900,
    height: 1200,
  },
  {
    href: "/inglaterra/",
    label: "Inglaterra",
    image: "/beneficios/england-scenery.webp",
    alt: "Vista de Londres con el Big Ben",
    width: 1080,
    height: 1350,
  },
  {
    href: "/escocia/",
    label: "Escocia",
    image: "/beneficios/scotland-scenery.webp",
    alt: "Castillo de Edimburgo, Escocia",
    width: 1080,
    height: 1350,
  },
] as const;

const GOLF_PROGRAMMES = [
  {
    href: "/ingles-golf-naas/",
    image: "/beneficios/golf-hero.webp",
    alt: "Campo de golf en Naas, Irlanda",
    location: "NAAS · IRLANDA",
    school: "Avanti Language Institute",
    audience: "Programa para adultos y jóvenes",
  },
  {
    href: "/ingles-golf-cork/",
    image: "/beneficios/cec-golf-placeholder.webp",
    alt: "Campo de golf para programa en Cork",
    location: "CORK · IRLANDA",
    school: "Cork English College",
    audience: "Programa para jóvenes",
  },
] as const;

const NZ_REQUIREMENTS = [
  "Ser mayor de 18 años.",
  "Tener pasaporte vigente.",
  "Tener tu curso de inglés pagado.",
  "Contar con un respaldo económico de NZD 1.667 por cada mes que vas a estudiar.",
  "Postular a tu visa correspondiente.",
  "Tener seguro médico.",
  "Gestión de visa y acompañamiento incluido.",
];

const IE_REQUIREMENTS = [
  "Ser mayor de 18 años.",
  "Tener tu curso de inglés pagado.",
  "Cumplir con un respaldo económico de €6.665.",
  "Pagar tu visa, que vale €300.",
  "Gestión de visa y acompañamiento incluido.",
];

const REQUIREMENT_LIST_CLASS =
  "m-0 grid list-disc gap-2.5 pl-5 text-[16px] leading-[1.6] text-[#2f3850] marker:text-[#4863f5]";

export default function BeneficiosPage() {
  return (
    <div
      className={`${dmSans.className} relative isolate overflow-x-clip bg-white text-[#171c2d] antialiased`}
    >
      {/* Organic background shapes (decorative only). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-190px] top-[-150px] z-0 h-[400px] w-[510px] max-[1050px]:left-[-260px] max-[1050px]:top-[-190px] max-[620px]:left-[-205px] max-[620px]:top-[-105px] max-[620px]:h-[260px] max-[620px]:w-[260px]"
        style={{
          borderRadius: "45% 56% 73% 30% / 65% 58% 47% 40%",
          transform: "rotate(-22deg)",
          background: "linear-gradient(135deg,#91c0ff 0%,#3769f6 65%,#3159dd 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-175px] top-[30px] z-0 h-[440px] w-[380px] max-[1050px]:right-[-280px] max-[620px]:right-[-203px] max-[620px]:top-[95px] max-[620px]:h-[300px] max-[620px]:w-[240px]"
        style={{
          borderRadius: "64% 37% 51% 73% / 54% 58% 40% 63%",
          transform: "rotate(29deg)",
          background: "linear-gradient(145deg,#f5f8ff 12%,#e8efff 95%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-205px] top-[720px] z-0 h-[430px] w-[500px] max-[1050px]:left-[-300px] max-[620px]:left-[-255px] max-[620px]:top-[670px]"
        style={{
          borderRadius: "42% 58% 74% 33% / 55% 35% 70% 49%",
          transform: "rotate(28deg)",
          background: "linear-gradient(120deg,#e0eaff,#f2f6ff 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-190px] top-[710px] z-0 h-[510px] w-[480px] max-[1050px]:right-[-320px] max-[620px]:right-[-330px] max-[620px]:top-[1380px]"
        style={{
          borderRadius: "61% 36% 39% 72% / 43% 66% 35% 67%",
          transform: "rotate(-18deg)",
          background: "linear-gradient(155deg,#ffe78b 0%,#ffcc22 78%,#f5b900 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-100px] top-[4px] z-0 h-[340px] w-[400px] border-[3px] border-[#ffcf37] max-[1050px]:left-[-230px] max-[620px]:left-[-270px] max-[620px]:top-[15px]"
        style={{
          borderRadius: "60% 40% 60% 35%",
          transform: "rotate(-24deg)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-125px] top-[890px] z-0 h-[270px] w-[430px] border-[3px] border-[#a6baff] max-[1050px]:right-[-250px] max-[620px]:right-[-290px] max-[620px]:top-[1560px]"
        style={{
          borderRadius: "50% 60% 34% 65%",
          transform: "rotate(22deg)",
        }}
      />

      <header className="relative z-[2] flex h-[112px] items-center justify-center max-[620px]:h-[89px]">
        <Link href="/" aria-label="MatchMyCourse, ir a inicio">
          {/* The site logo, not a copy of the one the standalone page served. */}
          <Image
            src={Logo}
            alt="MatchMyCourse"
            priority
            className="block h-auto w-[min(295px,72vw)]"
          />
        </Link>
      </header>

      <main className="relative z-[2]">
        <section
          aria-labelledby="page-title"
          className="mx-auto max-w-[1110px] px-7 pb-7 pt-[54px] text-center max-[620px]:px-[22px] max-[620px]:pb-[25px] max-[620px]:pt-[34px]"
        >
          <h1
            id="page-title"
            className="mx-auto mb-[25px] max-w-[1080px] text-balance text-[clamp(37px,4.75vw,68px)] font-extrabold leading-[1.12] tracking-[-.052em] text-[#171c2d] max-[620px]:text-[clamp(33px,8vw,43px)] max-[620px]:leading-[1.14]"
          >
            Crece profesionalmente estudiando en el extranjero
          </h1>
          <p className="mx-auto max-w-[880px] text-[clamp(17px,1.55vw,21px)] leading-[1.72] text-[#4c5871] max-[620px]:text-[17px]">
            Aprovecha los beneficios exclusivos de tu empresa para estudiar inglés en
            Irlanda, Canadá o Nueva Zelanda. Descubre programas diseñados para combinar
            tus vacaciones con una experiencia de aprendizaje en el extranjero.
          </p>
        </section>

        <section
          id="destinos"
          aria-label="Elige tu destino"
          className="mx-auto max-w-[1480px] px-7 pb-[57px] pt-[25px] text-center max-[620px]:px-4"
        >
          <h2 className="m-0 mb-7 text-[clamp(27px,3.1vw,39px)] font-extrabold leading-[1.2] tracking-[-.04em] text-[#1b253d] max-[620px]:mb-6">
            Elige tu próximo destino
          </h2>
          <div className="grid grid-cols-5 gap-[15px] max-[1120px]:grid-cols-3 max-[760px]:grid-cols-2 max-[710px]:gap-[13px] max-[440px]:grid-cols-1">
            {DESTINATIONS.map((destination) => (
              <Link
                key={destination.label}
                href={destination.href}
                aria-label={`Ver programas en ${destination.label}`}
                className="group relative block aspect-[3/3.8] min-h-[275px] overflow-hidden rounded-[19px] bg-[#d5e1ed] text-left shadow-[0_8px_25px_rgba(24,40,81,.11)] outline-offset-[5px] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_14px_29px_rgba(24,40,81,.17)] focus-visible:-translate-y-[3px] max-[1120px]:min-h-[260px] max-[710px]:aspect-[3/4] max-[710px]:min-h-0 max-[440px]:aspect-[4/2.9]"
              >
                <Image
                  src={destination.image}
                  alt={destination.alt}
                  width={destination.width}
                  height={destination.height}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(7,16,29,.70)_100%)]"
                />
                <span className="absolute bottom-[18px] left-4 z-[1] text-[clamp(19px,2.1vw,29px)] font-extrabold tracking-[-.04em] text-white max-[710px]:text-[25px] max-[440px]:text-[29px]">
                  {destination.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="long-title"
          className="mx-auto mb-[105px] max-w-[1360px] px-7 max-[1120px]:px-5 max-[710px]:mb-[72px] max-[710px]:px-4"
        >
          <div className="mx-auto mb-7 max-w-[980px] text-center max-[710px]:mb-[22px]">
            <h2
              id="long-title"
              className="m-0 mb-5 text-[clamp(34px,4.25vw,58px)] font-extrabold leading-[1.14] tracking-[-.048em] text-[#171c2d]"
            >
              Programas de larga duración para estudiar y trabajar
            </h2>
            <p className="mx-auto max-w-[820px] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-[#667087]">
              Descubre programas de larga duración para estudiar inglés y vivir una
              experiencia internacional en destinos como Irlanda y Nueva Zelanda.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-8">
            {/* Nueva Zelanda */}
            <article className="relative grid grid-cols-[minmax(300px,460px)_minmax(0,1fr)] items-center gap-9 rounded-[30px] border border-[#e8edf7] bg-white/95 p-8 px-[34px] shadow-[0_14px_40px_rgba(20,34,74,.08)] max-[1120px]:grid-cols-1 max-[1120px]:gap-[18px] max-[1120px]:px-6 max-[1120px]:py-7 max-[710px]:rounded-3xl max-[710px]:px-[18px] max-[710px]:py-[22px]">
              <div className="relative isolate flex min-h-[420px] items-end justify-center overflow-hidden rounded-3xl max-[1120px]:min-h-[360px] max-[710px]:min-h-[300px]">
                <div
                  aria-hidden
                  className="absolute inset-y-[12%_3%] left-[9%] right-[9%] bottom-[3%] top-[12%] z-0 rounded-3xl bg-[linear-gradient(180deg,#eff8ff_0%,#dfefff_100%)] max-[710px]:bottom-[2%] max-[710px]:left-[4%] max-[710px]:right-[4%] max-[710px]:top-[10%] max-[710px]:rounded-[26px]"
                />
                <div
                  aria-hidden
                  className="absolute left-[10%] top-[3%] z-0 h-[72%] w-[72%] bg-[radial-gradient(circle,#d5e8ff_0%,rgba(213,232,255,0)_68%)] blur-[3px]"
                />
                <Image
                  src="/beneficios/nz-study-hero.webp"
                  alt="Estudiante con cuadernos y paisaje de Nueva Zelanda"
                  width={1122}
                  height={1402}
                  loading="lazy"
                  className="relative z-[1] -mb-2 -ml-[18px] h-auto w-full max-w-[min(100%,420px)] rounded-[22px] object-contain drop-shadow-[0_22px_38px_rgba(18,36,78,.16)] max-[1120px]:ml-0 max-[1120px]:max-w-[min(100%,380px)]"
                />
              </div>
              <div className="py-1.5">
                <p className="m-0 mb-3 text-[12px] font-extrabold tracking-[.16em] text-[#4863f5]">
                  NUEVA ZELANDA
                </p>
                <h3 className="m-0 mb-3.5 text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-[-.045em] max-[710px]:text-[clamp(26px,8vw,34px)]">
                  Estudia inglés en Nueva Zelanda
                </h3>
                <p className="m-0 mb-[18px] max-w-[700px] text-[18px] leading-[1.65] text-[#566176] max-[710px]:text-[16px]">
                  Programas desde 14 hasta 44 semanas con posibilidad de trabajo según tu
                  visa.
                </p>
                <ul className={`${REQUIREMENT_LIST_CLASS} max-[710px]:gap-2 max-[710px]:text-[15px]`}>
                  {NZ_REQUIREMENTS.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
                <ProgrammeCtaButton destination="Nueva Zelanda" />
              </div>
            </article>

            {/* Irlanda (reverse) */}
            <article className="relative grid grid-cols-[minmax(0,1fr)_minmax(300px,460px)] items-center gap-9 rounded-[30px] border border-[#e8edf7] bg-white/95 p-8 px-[34px] shadow-[0_14px_40px_rgba(20,34,74,.08)] max-[1120px]:grid-cols-1 max-[1120px]:gap-[18px] max-[1120px]:px-6 max-[1120px]:py-7 max-[710px]:rounded-3xl max-[710px]:px-[18px] max-[710px]:py-[22px]">
              <div className="py-1.5 max-[1120px]:order-1">
                <p className="m-0 mb-3 text-[12px] font-extrabold tracking-[.16em] text-[#4863f5]">
                  IRLANDA
                </p>
                <h3 className="m-0 mb-3.5 text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-[-.045em] max-[710px]:text-[clamp(26px,8vw,34px)]">
                  Estudia inglés en Irlanda
                </h3>
                <p className="m-0 mb-[18px] max-w-[700px] text-[18px] leading-[1.65] text-[#566176] max-[710px]:text-[16px]">
                  Vive, estudia y trabaja en Irlanda, mejora tu inglés mientras disfrutas
                  de una experiencia de varios meses en Europa.
                </p>
                <ul className={`${REQUIREMENT_LIST_CLASS} max-[710px]:gap-2 max-[710px]:text-[15px]`}>
                  {IE_REQUIREMENTS.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
                <ProgrammeCtaButton destination="Irlanda" />
              </div>
              <div className="relative isolate flex min-h-[420px] items-end justify-center overflow-hidden rounded-3xl max-[1120px]:order-2 max-[1120px]:min-h-[360px] max-[710px]:min-h-[300px]">
                <div
                  aria-hidden
                  className="absolute bottom-[3%] left-[9%] right-[9%] top-[12%] z-0 rounded-3xl bg-[linear-gradient(180deg,#f1f7ff_0%,#e4eeff_100%)] max-[710px]:bottom-[2%] max-[710px]:left-[4%] max-[710px]:right-[4%] max-[710px]:top-[10%] max-[710px]:rounded-[26px]"
                />
                <div
                  aria-hidden
                  className="absolute left-[10%] top-[3%] z-0 h-[72%] w-[72%] bg-[radial-gradient(circle,#d5e8ff_0%,rgba(213,232,255,0)_68%)] blur-[3px]"
                />
                <Image
                  src="/beneficios/ireland-study-hero.webp"
                  alt="Estudiante con cuadernos y paisaje urbano de Irlanda"
                  width={1122}
                  height={1402}
                  loading="lazy"
                  className="relative z-[1] -mb-2 -mr-[18px] h-auto w-full max-w-[min(100%,420px)] rounded-[22px] object-contain drop-shadow-[0_22px_38px_rgba(18,36,78,.16)] max-[1120px]:mr-0 max-[1120px]:max-w-[min(100%,380px)]"
                />
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="golf-title" className="px-6 py-20">
          <div className="mx-auto max-w-[1150px]">
            <h2
              id="golf-title"
              className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-1px] text-[#182037]"
            >
              Programas de inglés para menores de 18 años
            </h2>
            <p className="mb-7 max-w-[780px] text-[18px] text-[#59657b]">
              Una oportunidad para combinar el aprendizaje del inglés con actividades
              deportivas y nuevas experiencias en Irlanda. Descubre programas que integran
              clases de idioma y golf.
            </p>
            <div className="grid grid-cols-2 gap-[22px] max-[700px]:grid-cols-1">
              {GOLF_PROGRAMMES.map((programme) => (
                <Link
                  key={programme.href}
                  href={programme.href}
                  className="overflow-hidden rounded-[20px] border border-[#dbe4f5] bg-white no-underline shadow-[0_12px_28px_#213b7113] transition-transform duration-200 hover:-translate-y-1"
                >
                  <Image
                    src={programme.image}
                    alt={programme.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="block h-[250px] w-full object-cover"
                  />
                  <div className="p-[25px]">
                    <small className="font-extrabold tracking-[1px] text-[#4964f5]">
                      {programme.location}
                    </small>
                    <h3 className="my-[9px] text-[28px] font-bold text-[#182037]">
                      Inglés + Golf
                    </h3>
                    <b className="text-[17px] text-[#273b66]">{programme.school}</b>
                    <p className="text-[#66738b]">{programme.audience}</p>
                    <span className="font-extrabold text-[#4563e6]">
                      Conocer el programa →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-[2] border-t border-[#edf0f7] px-7 pb-9 pt-[30px] text-center text-[13px] text-[#81889b]">
        © 2026 MatchMyCourse ·{" "}
        <a href="mailto:info@matchmycourse.com" className="text-[#4863f5]">
          info@matchmycourse.com
        </a>
      </footer>
    </div>
  );
}
