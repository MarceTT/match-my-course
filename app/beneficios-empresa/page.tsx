import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

import HomeShell from "./components/HomeShell";
import ProgrammeCtaButton from "./components/ProgrammeCtaButton";

/**
 * /beneficios-empresa — the redesigned microsite landing.
 *
 * The source replaced the previous layout entirely: a new hero, the five
 * destinations as a card row, an institutions marquee, a four-reason block,
 * an about section with a photo mosaic, a three-step explainer and a section
 * addressed to companies and schools.
 *
 * The sport and junior-school card sections are gone from the source landing.
 * Those pages still exist and keep working; they are reached from the country
 * pages in the new hierarchy, which arrive in the following slices.
 */

export const metadata: Metadata = {
  title: "Beneficios para estudiar inglés en el extranjero | MatchMyCourse",
  description:
    "Programas internacionales de inglés para adultos y jóvenes en Irlanda, Nueva Zelanda, Canadá, Inglaterra y Escocia.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

const DESTINATIONS = [
  {
    href: "/beneficios-empresa/irlanda/",
    label: "Irlanda",
    image: "/beneficios/home/irlanda-fallback.webp",
    alt: "Paisaje en Irlanda",
  },
  {
    href: "/beneficios-empresa/nueva-zelanda/",
    label: "Nueva Zelanda",
    image: "/beneficios/home/nueva-zelanda-fallback.webp",
    alt: "Lago y montañas de Nueva Zelanda",
  },
  {
    href: "/beneficios-empresa/canada/",
    label: "Canadá",
    image: "/beneficios/home/canada-fallback.webp",
    alt: "Toronto, Canadá",
  },
  {
    href: "/beneficios-empresa/inglaterra/",
    label: "Inglaterra",
    image: "/beneficios/home/england-scenery.webp",
    alt: "Vista de Londres con el Big Ben",
  },
  {
    href: "/beneficios-empresa/escocia/",
    label: "Escocia",
    image: "/beneficios/home/scotland-scenery.webp",
    alt: "Castillo de Edimburgo, Escocia",
  },
] as const;

const REASONS = [
  {
    title: "Diversas instituciones educativas",
    body: "Explora programas de distintas escuelas e instituciones internacionales y encuentra alternativas según tu destino, intereses y objetivos.",
  },
  {
    title: "Información clara y transparente",
    body: "Conoce los precios, la duración, las características y las condiciones de cada programa antes de tomar una decisión.",
  },
  {
    title: "Orientación personalizada",
    body: "Te ayudamos a resolver tus dudas y a encontrar una alternativa adecuada según tus necesidades y preferencias.",
  },
  {
    title: "Acompañamiento en tu experiencia",
    body: "Recibe orientación durante la preparación de tu viaje y apoyo en las diferentes etapas del proceso, según los servicios de tu programa.",
  },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Elige tu destino",
    body: "Explora nuestros cinco países y descubre las ciudades donde puedes estudiar inglés.",
  },
  {
    number: "02",
    title: "Encuentra tu curso",
    body: "Revisa los cursos y ofertas disponibles, sus precios, alojamiento y características.",
  },
  {
    number: "03",
    title: "Consulta y reserva",
    body: "Contáctanos para resolver tus dudas y recibir orientación antes de reservar tu programa.",
  },
] as const;

const ABOUT_PHOTOS = [
  { src: "/beneficios/home/conoce/visita-estudiantes.webp", alt: "Visita a estudiantes" },
  { src: "/beneficios/home/conoce/experiencia-grupal.webp", alt: "Experiencia grupal" },
  { src: "/beneficios/home/conoce/visita-cec.webp", alt: "Visita a Cork English College" },
  { src: "/beneficios/home/conoce/visita-galway.webp", alt: "Visita a Galway" },
  { src: "/beneficios/home/conoce/visita-linguaviva.webp", alt: "Visita a Linguaviva" },
  { src: "/beneficios/home/conoce/estudiantes-escuela.webp", alt: "Estudiantes en la escuela" },
  { src: "/beneficios/home/conoce/experiencia-dublin.webp", alt: "Experiencia en Dublín" },
  { src: "/beneficios/home/conoce/experiencia-castillo.webp", alt: "Experiencia en un castillo" },
] as const;

const INSTITUTION_LOGOS = Array.from({ length: 16 }, (_, index) => ({
  src: `/beneficios/home/logos/logo-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Institución asociada ${index + 1}`,
}));

const EYEBROW = "text-[12px] font-extrabold tracking-[.16em] text-[#4863f5]";
const SECTION_TITLE =
  "mx-auto mt-3 max-w-[760px] text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.15] tracking-[-.04em] text-[#171c2d]";

export default function BeneficiosEmpresaPage() {
  return (
    <HomeShell>
      <section className="mx-auto max-w-[1100px] px-6 pb-14 pt-10 text-center">
        <p className={EYEBROW}>Tu próxima experiencia comienza aquí</p>
        <h1 className="mx-auto mt-4 max-w-[980px] text-[clamp(38px,5.2vw,70px)] font-extrabold leading-[1.08] tracking-[-.05em] text-[#171c2d]">
          Aprende inglés en el
          <br />
          extranjero. <span className="text-[#4863f5]">Vive mucho más.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[760px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-[#4c5871]">
          Programas internacionales de inglés para <strong>adultos y jóvenes</strong>.
          Desde cursos durante tus vacaciones hasta experiencias de larga duración y
          campamentos de verano.
        </p>
      </section>

      <section id="elige" className="mx-auto max-w-[1480px] px-6 pb-20 text-center">
        <h2 className={SECTION_TITLE}>
          Elige dónde quieres vivir <span className="text-[#4863f5]">tu experiencia</span>
        </h2>
        <p className="mx-auto mb-10 mt-4 max-w-[620px] text-[17px] text-[#4c5871]">
          Elige tu curso y descubre los precios y detalles
        </p>
        <div className="grid grid-cols-5 gap-[15px] max-[1120px]:grid-cols-3 max-[760px]:grid-cols-2 max-[440px]:grid-cols-1">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.label}
              href={destination.href}
              className="group relative block aspect-[3/3.8] min-h-[275px] overflow-hidden rounded-[19px] bg-[#d5e1ed] text-left shadow-[0_8px_25px_rgba(24,40,81,.11)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_14px_29px_rgba(24,40,81,.17)] max-[1120px]:min-h-[260px] max-[710px]:aspect-[3/4] max-[710px]:min-h-0"
            >
              <Image
                src={destination.image}
                alt={destination.alt}
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(7,16,29,.70)_100%)]"
              />
              <span className="absolute bottom-[18px] left-4 z-[1] text-[clamp(19px,2.1vw,29px)] font-extrabold tracking-[-.04em] text-white">
                {destination.label} ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-[#e6ebfa] bg-[#f7f9ff] py-14">
        <div className="mx-auto max-w-[1240px] px-6 text-center">
          <p className={EYEBROW}>INSTITUCIONES Y ESCUELAS</p>
          <h2 className={SECTION_TITLE}>Conoce las instituciones con las que trabajamos</h2>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6">
          {INSTITUTION_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={90}
              loading="lazy"
              className="h-[52px] w-auto max-w-[150px] object-contain opacity-80"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 text-center">
        <p className={EYEBROW}>POR QUÉ MATCHMYCOURSE</p>
        <h2 className={SECTION_TITLE}>
          Tu experiencia internacional comienza con{" "}
          <span className="text-[#4863f5]">una buena elección</span>
        </h2>
        <p className="mx-auto mb-12 mt-5 max-w-[820px] text-[17px] leading-[1.7] text-[#4c5871]">
          En MatchMyCourse te ayudamos a explorar programas de inglés en diferentes
          destinos, comparar alternativas y encontrar una experiencia educativa que se
          adapte a tus objetivos.
        </p>
        <div className="grid grid-cols-4 gap-6 text-left max-[980px]:grid-cols-2 max-[600px]:grid-cols-1">
          {REASONS.map((reason) => (
            <article
              key={reason.title}
              className="rounded-[20px] border border-[#e7ebf7] bg-white p-7 shadow-[0_8px_26px_#1a2c5010]"
            >
              <h3 className="mb-3 text-[19px] font-extrabold leading-[1.25] text-[#171c2d]">
                {reason.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#59677c]">{reason.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-20">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 items-center gap-14 px-6 max-[980px]:grid-cols-1">
          <div>
            <p className={EYEBROW}>CONOCE MATCHMYCOURSE</p>
            <h2 className="mt-3 max-w-[560px] text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.15] tracking-[-.04em] text-[#171c2d]">
              Personas reales detrás de{" "}
              <span className="text-[#4863f5]">cada experiencia</span>
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-[1.75] text-[#4c5871]">
              <p>
                En MatchMyCourse conectamos a estudiantes con escuelas e instituciones
                educativas internacionales, ayudándolos a explorar programas de inglés y
                experiencias en el extranjero.
              </p>
              <p>
                Creemos que elegir dónde estudiar es una decisión importante. Por eso,
                trabajamos directamente con instituciones educativas y buscamos entregar
                información clara, orientación personalizada y apoyo durante el proceso.
              </p>
              <p>
                Nuestro trabajo nos permite conocer de cerca las escuelas, sus programas y
                las experiencias que ofrecen, para ayudarte a encontrar una alternativa que
                se adapte a tus objetivos.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-[600px]:grid-cols-2">
            {ABOUT_PHOTOS.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={600}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 text-center">
        <p className={EYEBROW}>ASÍ FUNCIONA MATCHMYCOURSE</p>
        <h2 className={SECTION_TITLE}>
          Tu próxima experiencia en <span className="text-[#4863f5]">3 pasos</span>
        </h2>
        <div className="mt-12 grid grid-cols-3 gap-6 text-left max-[820px]:grid-cols-1">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="rounded-[20px] border border-[#e7ebf7] bg-white p-8 shadow-[0_8px_26px_#1a2c5010]"
            >
              <span className="text-[13px] font-extrabold tracking-[.14em] text-[#4863f5]">
                {step.number}
              </span>
              <h3 className="mb-3 mt-2 text-[22px] font-extrabold leading-[1.2] text-[#171c2d]">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#59677c]">{step.body}</p>
            </article>
          ))}
        </div>
        <a
          href="#elige"
          className="mt-10 inline-block rounded-full bg-[#4863f5] px-7 py-3.5 font-extrabold text-white"
        >
          Elige tu destino
        </a>
      </section>

      <section className="border-t border-[#e6ebfa] bg-[#f7f9ff] py-20">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="text-center">
            <p className={EYEBROW}>EMPRESAS Y COLEGIOS</p>
            <h2 className={SECTION_TITLE}>
              Acercamos las experiencias internacionales a{" "}
              <span className="text-[#4863f5]">tu organización</span>
            </h2>
            <p className="mx-auto mb-12 mt-5 max-w-[820px] text-[17px] leading-[1.7] text-[#4c5871]">
              En MatchMyCourse ayudamos a empresas y establecimientos educacionales a
              acercar oportunidades de aprendizaje de inglés en el extranjero a sus
              trabajadores, estudiantes y familias.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 max-[820px]:grid-cols-1">
            <article className="rounded-[20px] border border-[#e7ebf7] bg-white p-8">
              <p className={EYEBROW}>PARA EMPRESAS</p>
              <h3 className="mb-3 mt-2 text-[22px] font-extrabold leading-[1.25] text-[#171c2d]">
                Oportunidades internacionales para tus trabajadores
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#59677c]">
                Facilita a tus colaboradores el acceso a cursos de inglés en el extranjero,
                con alternativas de distinta duración, destinos y precios. Una oportunidad
                para que puedan aprovechar sus vacaciones y vivir una experiencia educativa
                internacional.
              </p>
            </article>
            <article className="rounded-[20px] border border-[#e7ebf7] bg-white p-8">
              <p className={EYEBROW}>PARA COLEGIOS</p>
              <h3 className="mb-3 mt-2 text-[22px] font-extrabold leading-[1.25] text-[#171c2d]">
                Experiencias educativas para tus estudiantes
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#59677c]">
                Presenta a padres y apoderados programas de inglés, campamentos y
                experiencias internacionales para jóvenes. Descubre alternativas que pueden
                combinar aprendizaje, actividades culturales y excursiones en distintos
                destinos.
              </p>
            </article>
          </div>
          <div className="mt-10 text-center">
            <ProgrammeCtaButton destination="Empresas y colegios" />
          </div>
        </div>
      </section>
    </HomeShell>
  );
}
