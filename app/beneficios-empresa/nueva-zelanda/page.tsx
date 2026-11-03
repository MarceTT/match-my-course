import type { Metadata, Viewport } from "next";

import BeneficiosShell from "@/app/beneficios-empresa/components/BeneficiosShell";
import DestinationPacks, {
  type DestinationPack,
} from "@/app/beneficios-empresa/components/DestinationPacks";
import type { GalleryPhoto } from "@/app/beneficios-empresa/components/SchoolGalleryDialog";

export const metadata: Metadata = {
  title: "Cursos de inglés en Nueva Zelanda | MatchMyCourse",
  description:
    "Cursos de inglés en Auckland, Tauranga y Rotorua, Nueva Zelanda, con MatchMyCourse.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

/** Gallery photos, named exactly as the source site serves them (city-NN.webp). */
const gallery = (
  city: string,
  from: number,
  to: number,
  label: string
): GalleryPhoto[] =>
  Array.from({ length: to - from + 1 }, (_, index) => ({
    src: `/beneficios/nz/${city}-${String(from + index).padStart(2, "0")}.webp`,
    alt: `${label} · foto ${index + 1}`,
  }));

const SHARED_DURATION = { label: "Duración", value: "2, 3, 4 semanas" };
const BREAKDOWN_INTRO =
  "Cada pack incluye los siguientes conceptos. La matrícula, el transfer y los fees fijos se cobran solo una vez.";
const BREAKDOWN_NOTE =
  "Los importes están expresados en NZD. No incluye pasajes aéreos. Valores sujetos a disponibilidad y confirmación antes de la reserva.";
const PRICE_NOTE =
  "Precio total del pack: curso, alojamiento, matrícula, materiales, transfer y gastos de alojamiento incluidos.";
const CURRENCY_NOTE = "Los precios se encuentran en dólares neozelandeses.";

const contact = (school: string, city: string): string =>
  `mailto:info@matchmycourse.com?subject=Consulta%20pack%20${encodeURIComponent(
    school
  )}%20${encodeURIComponent(city)}&body=${encodeURIComponent(
    `Hola, quisiera conocer disponibilidad para el pack de ${city} con alojamiento y transfer incluidos. Gracias.`
  )}`;

const PACKS: DestinationPack[] = [
  {
    image: "/beneficios/nz/auckland-05.webp",
    imageAlt: "Worldwide School of English en Auckland",
    photoCaption: "Worldwide School of English",
    kicker: "AUCKLAND · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/nz/worldwide-logo.png",
    logoAlt: "Logo Worldwide School of English",
    hours: "20 horas de inglés por semana",
    prices: [
      { amount: "$2.310", label: "2 semanas" },
      { amount: "$3.145", label: "3 semanas" },
      { amount: "$3.980", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Auckland, Nueva Zelanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–14:20" },
      { label: "Clases semanales", value: "20 horas" },
      { label: "Nivel mínimo", value: "A1" },
      { label: "Tipo de alojamiento", value: "Residencia de estudiantes" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: NZD $480 × semanas",
        "Alojamiento: NZD $350 × semanas · Residencia de estudiantes",
        "Matrícula: NZD $270",
        "Materiales: NZD $5 por semana",
        "Transfer aeropuerto ida y vuelta: NZD $120",
        "Fee de alojamiento: NZD $250",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "WORLDWIDE SCHOOL OF ENGLISH · AUCKLAND",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("auckland", 0, 9, "Worldwide School of English"),
    },
    contactHref: contact("Worldwide School of English", "Auckland"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/nz/tauranga-00.webp",
    imageAlt: "Mount Maunganui Language Centre en Tauranga",
    photoCaption: "Mount Maunganui Language Centre",
    kicker: "TAURANGA · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    // No logo on the source site for this school.
    hours: "15 horas de inglés por semana",
    prices: [
      { amount: "$2.503", label: "2 semanas" },
      { amount: "$3.332", label: "3 semanas" },
      { amount: "$4.161", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Tauranga, Nueva Zelanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–12:15" },
      { label: "Clases semanales", value: "15 horas" },
      { label: "Nivel mínimo", value: "A1" },
      { label: "Tipo de alojamiento", value: "Familia anfitriona" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: NZD $395 × semanas",
        "Alojamiento: NZD $434 × semanas · Familia anfitriona",
        "Matrícula: NZD $275",
        "Materiales: NZD $120",
        "Transfer aeropuerto ida y vuelta: NZD $350",
        "Fee de alojamiento: NZD $100",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "MOUNT MAUNGANUI LANGUAGE CENTRE · TAURANGA",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("tauranga", 0, 6, "Mount Maunganui Language Centre"),
    },
    contactHref: contact("Mount Maunganui Language Centre", "Tauranga"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/nz/rotorua-00.webp",
    imageAlt: "Rotorua English Language Academy",
    photoCaption: "Rotorua English Language Academy",
    kicker: "ROTORUA · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/nz/rela-logo.png",
    logoAlt: "Logo Rotorua English Language Academy",
    hours: "15 horas de inglés por semana",
    prices: [
      { amount: "$2.402", label: "2 semanas" },
      { amount: "$3.072", label: "3 semanas" },
      { amount: "$3.742", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Rotorua, Nueva Zelanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–12:15" },
      { label: "Clases semanales", value: "15 horas" },
      { label: "Nivel mínimo", value: "A1" },
      { label: "Tipo de alojamiento", value: "Familia anfitriona" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: NZD $350 × semanas",
        "Alojamiento: NZD $320 × semanas · Familia anfitriona",
        "Matrícula: NZD $250",
        "Materiales: NZD $120",
        "Transfer aeropuerto ida y vuelta: NZD $442",
        "Fee de alojamiento: NZD $250",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "ROTORUA ENGLISH LANGUAGE ACADEMY",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("rotorua", 0, 7, "Rotorua English Language Academy"),
    },
    contactHref: contact("Rotorua English Language Academy", "Rotorua"),
    contactLabel: "Consultar este programa →",
  },
];

export default function NuevaZelandaPage() {
  return (
    <BeneficiosShell>
      <DestinationPacks
        overline="NUEVA ZELANDA · PROGRAMAS DISPONIBLES"
        titlePrefix="Programas de inglés en"
        titleHighlight="Nueva Zelanda"
        intro="Aprovecha tu tiempo en Nueva Zelanda para estudiar inglés con packs flexibles en Auckland, Tauranga y Rotorua, combinando aprendizaje, naturaleza y una gran experiencia internacional."
        packsLabel="Programas y precios en Nueva Zelanda"
        packs={PACKS}
        advice={{
          overline: "SIGUIENTE PASO",
          title: "Formato listo para seguir cargando escuelas",
          body: "La estructura ya quedó preparada para sumar más escuelas dentro de Irlanda manteniendo el mismo estándar visual, comercial y ordenado.",
          href: "mailto:info@matchmycourse.com?subject=Quiero%20continuar%20cargando%20programas",
          label: "Continuar con otra escuela →",
        }}
      />
    </BeneficiosShell>
  );
}
