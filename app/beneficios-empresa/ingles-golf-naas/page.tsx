import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/final-logo.png";

import { dmSans } from "@/app/ui/fonts";
import GolfProgramTabs, { type GolfProgram } from "./components/GolfProgramTabs";

/**
 * /ingles-golf-naas — faithful port of the Avanti golf programme page.
 *
 * Unlike the destination pages, this one does NOT reuse `BeneficiosShell`: the
 * original ships its own stylesheet with a different background (#fafcfe), its
 * own navbar and footer, and even a slightly different blue (#4765ed instead of
 * #4863f5). Reproducing it faithfully means keeping that structure.
 */

export const metadata: Metadata = {
  title: "Estudia inglés mientras juegas golf | Avanti · MatchMyCourse",
  description:
    "Estudia inglés por la mañana y practica golf por la tarde en Naas, Irlanda, con Avanti Language Institute. Opciones para adultos y jóvenes.",
};

export const viewport: Viewport = {
  themeColor: "#4765ed",
};

const PROGRAMS: GolfProgram[] = [
  {
    id: "adulto",
    tabLabel: "Para adultos",
    kicker: "DISPONIBLE DURANTE EL AÑO",
    title: "Inglés y golf para adultos",
    description:
      "Ideal para quienes desean aprovechar unos días libres para mejorar el inglés y disfrutar del golf, con la posibilidad de adaptar la cantidad de clases o rondas según disponibilidad.",
    price: {
      caption: "Ejemplo de 1 semana",
      amount: "Desde €930",
      note: "Precio orientativo del folleto 2027*",
    },
    facts: [
      { value: "20 horas", label: "Inglés por semana" },
      { value: "9:00–13:00", label: "Clases de inglés" },
      { value: "1 a 1", label: "Golf con entrenador PGA" },
      { value: "Todo el año", label: "Según disponibilidad" },
    ],
    calendarTitle: "Una semana de ejemplo",
    calendar: [
      { day: "Lunes", morning: "Inglés 9:00–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Martes", morning: "Inglés 9:00–13:00", afternoon: "Ronda desde 15:00" },
      { day: "Miércoles", morning: "Inglés 9:00–13:00", afternoon: "Golf 14:30–15:30" },
      {
        day: "Jueves",
        morning: "Inglés 9:00–13:00",
        afternoon: "Ronda de golf desde 15:00",
      },
      { day: "Viernes", morning: "Inglés 9:00–13:00", afternoon: "Golf 14:30–15:30" },
    ],
    calendarNote:
      "Ejemplo del folleto. Las rondas, clases y horarios pueden variar según las reservas y disponibilidad.",
    lists: [
      {
        title: "Opciones de golf",
        items: [
          "Clases particulares con entrenador profesional PGA: €100 por hora.",
          "Rondas de 9 hoyos: €25.",
          "Rondas de 18 hoyos: €45 de lunes a jueves; €50 de viernes a domingo.",
          "Préstamo de palos y pelotas sin costo adicional para quienes reservan clases de golf.",
        ],
      },
      {
        title: "Alojamiento y otros cargos",
        items: [
          "Familia anfitriona, habitación individual y media pensión: €270 por semana en el ejemplo.",
          "Matrícula y materiales: €190.",
          "Gestión del alojamiento: €120.",
          "Gestión de clases de golf: €120 (o €50 por rondas).",
          "Traslado privado desde el aeropuerto de Dublín: €120 por trayecto, opcional.",
        ],
      },
    ],
  },
  {
    id: "junior",
    tabLabel: "Para jóvenes",
    kicker: "VERANO · JULIO A MEDIADOS DE AGOSTO",
    title: "Inglés y golf para jóvenes",
    description:
      "Una propuesta que combina clases de inglés, golf, actividades sociales y excursiones. El ejemplo de Avanti contempla dos semanas con alojamiento en familia anfitriona y pensión completa.",
    price: {
      caption: "Ejemplo de 2 semanas",
      amount: "€2.530",
      note: "Total de referencia del folleto 2027*",
    },
    facts: [
      { value: "17,5 horas", label: "Inglés semanal" },
      { value: "9:30–13:00", label: "Clases de inglés" },
      { value: "2 semanas", label: "Ejemplo de estancia" },
      { value: "Verano", label: "Julio–mediados de agosto" },
    ],
    calendarTitle: "Una semana de ejemplo",
    calendar: [
      {
        day: "Lunes",
        morning: "Inglés 9:30–13:00",
        afternoon: "Actividades 14:00–18:00",
      },
      { day: "Martes", morning: "Inglés 9:30–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Miércoles", morning: "Inglés 9:30–13:00", afternoon: "Actividad social" },
      { day: "Jueves", morning: "Inglés 9:30–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Viernes", morning: "Inglés 9:30–13:00", afternoon: "Actividad social" },
      {
        day: "Sábado",
        morning: "Excursión de día completo",
        afternoon: "Según programa",
      },
    ],
    calendarNote:
      "Calendario orientativo de la primera semana. La escuela confirma actividades y plazas antes de reservar.",
    lists: [
      {
        title: "El ejemplo incluye",
        items: [
          "Dos semanas de inglés general: €540.",
          "Cuatro clases privadas de golf de una hora: €400.",
          "Actividades sociales y excursiones: €340.",
          "Alojamiento con familia, habitación individual y pensión completa: €580.",
        ],
      },
      {
        title: "Cargos considerados",
        items: [
          "Matrícula y materiales: €190.",
          "Gestión del alojamiento: €120.",
          "Gestión de las clases de golf: €120.",
          "Traslado de ida y vuelta aeropuerto de Dublín–Naas: €240.",
        ],
      },
    ],
  },
];

const GALLERY = [
  { src: "/beneficios/golf/practica.webp", alt: "Práctica de golf entre dos participantes" },
  { src: "/beneficios/golf/amigos.webp", alt: "Dos personas en un campo de golf" },
  { src: "/beneficios/golf/grupo.webp", alt: "Grupo de golfistas en el campo" },
  { src: "/beneficios/golf/bunker.webp", alt: "Práctica de golf cerca de un búnker" },
];

export default function InglesGolfNaasPage() {
  return (
    <div
      className={`${dmSans.className} min-h-screen bg-[#fafcfe] leading-[1.6] text-[#151e34] antialiased`}
    >
      {/*
        Resets for the root layout's critical-CSS `header{...}` element rule
        (white background, shadow, sticky, z-index 50), which would otherwise
        paint a white sticky bar over this page's #fafcfe background. The
        original navbar is a plain flex row.
      */}
      <header className="mx-auto flex max-w-[1240px] relative items-center justify-between !bg-transparent px-[25px] py-[21px] !shadow-none max-[700px]:p-[17px]">
        <Link href="/beneficios-empresa">
          <Image
            src={Logo}
            alt="MatchMyCourse"
            priority
            className="h-auto w-[197px] max-[700px]:w-[155px]"
          />
        </Link>
        <Link href="/beneficios-empresa" className="text-sm font-bold text-[#59677c] no-underline">
          ← Volver a programas
        </Link>
      </header>

      <main>
        <section className="relative mx-auto min-h-[560px] max-w-[1280px] overflow-hidden rounded-[26px] bg-[#175e4c] max-[700px]:min-h-[520px] max-[700px]:rounded-none">
          <Image
            src="/beneficios/golf/golf-hero.webp"
            alt="Campo de golf verde en un día soleado"
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,39,.86),rgba(10,45,54,.58)_48%,rgba(9,29,39,.03))]"
          />
          <div className="relative max-w-[780px] px-16 py-24 text-white max-[700px]:px-[26px] max-[700px]:py-[75px]">
            <span className="text-[12px] font-extrabold tracking-[2px] text-[#b1f0ca]">
              NAAS · IRLANDA · AVANTI LANGUAGE INSTITUTE
            </span>
            <h1 className="my-5 text-[clamp(37px,5.4vw,68px)] font-bold leading-[1.12] tracking-[-2.7px]">
              Estudia inglés
              <br />
              <em className="not-italic text-[#b4f6cf]">mientras juegas golf</em>
            </h1>
            <p className="max-w-[650px] text-[19px] leading-[1.75] max-[700px]:text-base">
              Combina clases de inglés por la mañana con entrenamiento y experiencias de
              golf por la tarde, en una de las regiones más reconocidas de Irlanda por sus
              campos de golf.
            </p>
            <a
              href="#programas"
              className="mt-3 inline-block rounded-xl bg-[#4367f6] px-6 py-3.5 font-extrabold text-white no-underline hover:bg-[#304dc8]"
            >
              Descubre los programas ↓
            </a>
          </div>
        </section>

        <section
          id="programas"
          className="mx-auto flex max-w-[1160px] items-center justify-between gap-[46px] px-7 pb-[55px] pt-20 max-[700px]:flex-col max-[700px]:pt-[55px]"
        >
          <div className="max-w-[750px]">
            <span className="text-[12px] font-extrabold tracking-[2px] text-[#4765ed]">
              INGLÉS + GOLF
            </span>
            <h2 className="my-4 mb-5 text-[clamp(29px,3.3vw,43px)] font-bold leading-[1.16] tracking-[-1.4px]">
              Dos maneras de vivir esta experiencia
            </h2>
            <p className="text-[18px] text-[#59677c]">
              Avanti Language Institute, en la ciudad de Naas, propone una experiencia que
              combina aprendizaje del idioma, deporte y convivencia en Irlanda. Puedes
              elegir una modalidad para adultos o un programa de verano para jóvenes.
            </p>
          </div>
          <div className="min-w-[180px] text-center max-[700px]:hidden">
            <Image
              src="/beneficios/golf/avanti-logo.png"
              alt="Logotipo de Avanti Language Institute"
              width={125}
              height={125}
              className="h-[125px] w-[125px] object-contain"
            />
            <span className="block text-[13px] text-[#59677c]">
              Naas · Condado de Kildare
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-7">
          <GolfProgramTabs programs={PROGRAMS} />
        </section>

        <section className="mx-auto max-w-[1160px] px-7 pb-[85px] pt-[55px]">
          <span className="text-[12px] font-extrabold tracking-[2px] text-[#4765ed]">
            CONOCE LA EXPERIENCIA
          </span>
          <h2 className="my-4 mb-5 text-[clamp(29px,3.3vw,43px)] font-bold leading-[1.16] tracking-[-1.4px]">
            Golf en un entorno natural
          </h2>
          <div className="grid grid-cols-[1.3fr_1fr_1fr] grid-rows-[200px_200px] gap-[13px] max-[700px]:grid-cols-2 max-[700px]:grid-rows-[170px_170px]">
            {GALLERY.map((photo, index) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={600}
                loading="lazy"
                className={`h-full w-full rounded-2xl object-cover ${
                  index === 0 ? "row-span-2 max-[700px]:row-auto" : ""
                }`}
              />
            ))}
          </div>
          <p className="text-[13px] text-[#69798e]">
            Fotografías compartidas para ilustrar la experiencia de golf en Naas.
          </p>
        </section>

        <section className="mx-auto mb-[30px] flex max-w-[1160px] items-center justify-between gap-5 rounded-[22px] bg-[#eff3ff] p-[42px] max-[700px]:mx-[17px] max-[700px]:mb-[26px] max-[700px]:flex-col max-[700px]:p-[25px]">
          <div>
            <span className="text-[12px] font-extrabold tracking-[2px] text-[#4765ed]">
              MATCHMYCOURSE
            </span>
            <h2 className="my-4 mb-5 text-[clamp(29px,3.3vw,43px)] font-bold leading-[1.16] tracking-[-1.4px]">
              ¿Te interesa este programa?
            </h2>
            <p className="max-w-[620px] text-[#59677c]">
              Te ayudamos a revisar fechas, disponibilidad de clases de golf, alojamiento y
              presupuesto para tu viaje.
            </p>
          </div>
          <a
            href="mailto:info@matchmycourse.com?subject=Consulta%20programa%20Ingl%C3%A9s%20y%20Golf%20Avanti%20Naas"
            className="inline-block whitespace-nowrap rounded-xl bg-[#4367f6] px-6 py-3.5 font-extrabold text-white no-underline hover:bg-[#304dc8]"
          >
            Consultar disponibilidad ↗
          </a>
        </section>

        <p className="mx-auto max-w-[1160px] px-7 pb-[55px] text-[12px] text-[#69798e]">
          * Los importes reproducen ejemplos de la propuesta 2027 de Avanti. El precio
          final depende de la duración, actividades elegidas y disponibilidad; consulta una
          cotización antes de reservar. En adultos, el “desde €930” aparece en el folleto
          como referencia y puede variar según los servicios seleccionados.
        </p>
      </main>

      <footer className="bg-[#eef2f8] p-[30px] text-center text-[13px] text-[#617084]">
        © 2026 MatchMyCourse ·{" "}
        <Link href="/beneficios-empresa">Volver al inicio</Link>
      </footer>
    </div>
  );
}
