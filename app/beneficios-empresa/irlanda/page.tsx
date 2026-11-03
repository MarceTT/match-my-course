import type { Metadata, Viewport } from "next";

import BeneficiosShell from "@/app/beneficios-empresa/components/BeneficiosShell";
import DestinationPacks, {
  type DestinationPack,
} from "@/app/beneficios-empresa/components/DestinationPacks";
import type { GalleryPhoto } from "@/app/beneficios-empresa/components/SchoolGalleryDialog";

export const metadata: Metadata = {
  title: "Programas de inglés en Irlanda | MatchMyCourse",
  description:
    "Cursos de inglés en Cork, Dublín, Limerick y Galway, Irlanda, con MatchMyCourse.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

/**
 * Gallery photos, named exactly as the source site serves them. The ranges are
 * not uniform — UCC keeps a legacy 117-131 numbering and some schools start at
 * 00 — so each one is declared explicitly rather than assumed from a count.
 */
const gallery = (
  school: string,
  from: number,
  to: number,
  label: string
): GalleryPhoto[] =>
  Array.from({ length: to - from + 1 }, (_, index) => ({
    src: `/beneficios/ie/${school}-${String(from + index).padStart(2, "0")}.webp`,
    alt: `${label} · foto ${index + 1}`,
  }));

const SHARED_DURATION = { label: "Duración", value: "2, 3, 4 semanas" };
const BREAKDOWN_INTRO =
  "Cada pack incluye los siguientes conceptos. La matrícula, el transfer y los fees fijos se cobran solo una vez.";
const BREAKDOWN_NOTE =
  "Los importes están expresados en EUR. No incluye pasajes aéreos. Valores sujetos a disponibilidad y confirmación antes de la reserva.";
const PRICE_NOTE =
  "Precio total del pack: curso, alojamiento, matrícula, materiales, transfer y gastos de alojamiento incluidos.";
const CURRENCY_NOTE = "Los precios se encuentran en euros.";

const contact = (school: string, city: string): string =>
  `mailto:info@matchmycourse.com?subject=Consulta%20pack%20${encodeURIComponent(
    school
  )}%20${encodeURIComponent(city)}&body=${encodeURIComponent(
    `Hola, quisiera conocer disponibilidad para el pack de ${city} con alojamiento y transfer incluidos. Gracias.`
  )}`;

const PACKS: DestinationPack[] = [
  {
    image: "/beneficios/ie/ucc-cover-vivid.webp",
    imageAlt: "University College Cork",
    photoCaption: "University College Cork",
    kicker: "CORK · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/ie/ucc-logo-oficial.png",
    logoAlt: "Logo University College Cork",
    hours: "20 horas de inglés por semana",
    prices: [
      { amount: "€1.290", label: "2 semanas" },
      { amount: "€1.875", label: "3 semanas" },
      { amount: "€2.460", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Cork, Irlanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–13:00" },
      { label: "Clases semanales", value: "20 horas" },
      { label: "Nivel mínimo", value: "A2" },
      { label: "Tipo de alojamiento", value: "Familia anfitriona" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: €315 × semanas",
        "Alojamiento: €270 × semanas · Familia anfitriona",
        "Matrícula: €0",
        "Materiales: €0",
        "Transfer aeropuerto ida y vuelta: €50",
        "Fee de alojamiento: €70",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "UNIVERSITY COLLEGE CORK",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("ucc", 117, 131, "University College Cork"),
    },
    contactHref: contact("University College Cork", "Cork"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/ie/cec-cover.webp",
    imageAlt: "Cork English College",
    photoCaption: "Cork English College",
    kicker: "CORK · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/ie/cec-logo.png",
    logoAlt: "Logo Cork English College",
    hours: "20 horas de inglés por semana",
    prices: [
      { amount: "€1.650", label: "2 semanas" },
      { amount: "€2.305", label: "3 semanas" },
      { amount: "€2.960", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Cork, Irlanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 08:40–13:00" },
      { label: "Clases semanales", value: "20 horas" },
      { label: "Nivel mínimo", value: "A2" },
      { label: "Tipo de alojamiento", value: "Residencia de estudiantes" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: €305 × semanas",
        "Alojamiento: €350 × semanas · Residencia de estudiantes",
        "Matrícula: €75",
        "Materiales: €75",
        "Transfer aeropuerto ida y vuelta: €120",
        "Fee de alojamiento: €70",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "CORK ENGLISH COLLEGE",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("cec", 1, 7, "Cork English College"),
    },
    contactHref: contact("Cork English College", "Cork"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/ie/ces-dublin-vivid.webp",
    imageAlt: "Centre of English Studies en Dublín",
    photoCaption: "Centre of English Studies",
    kicker: "DUBLÍN · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/ie/ces-logo-badge.png",
    logoAlt: "Logo Centre of English Studies",
    hours: "18 horas de inglés por semana",
    prices: [
      { amount: "€1.773", label: "2 semanas" },
      { amount: "€2.527", label: "3 semanas" },
      { amount: "€3.281", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Dublín, Irlanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–13:00" },
      { label: "Clases semanales", value: "18 horas" },
      { label: "Nivel mínimo", value: "A1" },
      { label: "Tipo de alojamiento", value: "Residencia de estudiantes" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: €355 × semanas",
        "Alojamiento: €399 × semanas · Residencia de estudiantes",
        "Matrícula: €85",
        "Materiales: €45",
        "Transfer aeropuerto ida y vuelta: €50",
        "Fee de alojamiento: €85",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "CENTRE OF ENGLISH STUDIES · DUBLÍN",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("ces", 1, 10, "Centre of English Studies Dublín"),
    },
    contactHref: contact("Centre of English Studies", "Dublín"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/ie/ul-cover-vivid.webp",
    imageAlt: "University of Limerick",
    photoCaption: "University of Limerick",
    kicker: "LIMERICK · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/ie/ul-logo.png",
    logoAlt: "Logo University of Limerick",
    hours: "15 horas de inglés por semana",
    prices: [
      { amount: "€1.290", label: "2 semanas" },
      { amount: "€1.860", label: "3 semanas" },
      { amount: "€2.430", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Limerick, Irlanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–12:50" },
      { label: "Clases semanales", value: "15 horas" },
      { label: "Nivel mínimo", value: "A2" },
      { label: "Tipo de alojamiento", value: "Residencia de estudiantes" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: €250 × semanas",
        "Alojamiento: €320 × semanas · Residencia de estudiantes",
        "Matrícula: €50",
        "Materiales: €0",
        "Transfer aeropuerto ida y vuelta: €50",
        "Fee de alojamiento: €50",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "UNIVERSITY OF LIMERICK",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("ul", 1, 8, "University of Limerick"),
    },
    contactHref: contact("University of Limerick", "Limerick"),
    contactLabel: "Consultar este programa →",
  },
  {
    image: "/beneficios/ie/gci-cover-vivid.webp",
    imageAlt: "Galway Cultural Institute",
    photoCaption: "Galway Cultural Institute",
    kicker: "GALWAY · INGLÉS GENERAL",
    title: "Curso + Alojamiento",
    logo: "/beneficios/ie/gci-logo-oficial.png",
    logoAlt: "Logo Galway Cultural Institute",
    hours: "15 horas de inglés por semana",
    prices: [
      { amount: "€1.555", label: "2 semanas" },
      { amount: "€2.175", label: "3 semanas" },
      { amount: "€2.795", label: "4 semanas" },
    ],
    priceNote: PRICE_NOTE,
    currencyNote: CURRENCY_NOTE,
    details: [
      { label: "Ciudad", value: "Galway, Irlanda" },
      SHARED_DURATION,
      { label: "Horario", value: "Lunes a viernes, 09:00–12:30" },
      { label: "Clases semanales", value: "15 horas" },
      { label: "Nivel mínimo", value: "A1" },
      { label: "Tipo de alojamiento", value: "Residencia de estudiantes" },
    ],
    breakdown: {
      intro: BREAKDOWN_INTRO,
      items: [
        "Curso de inglés: €290 × semanas",
        "Alojamiento: €330 × semanas · Residencia de estudiantes",
        "Matrícula: €70",
        "Materiales: €75",
        "Transfer aeropuerto ida y vuelta: €100",
        "Fee de alojamiento: €70",
      ],
      note: BREAKDOWN_NOTE,
    },
    gallery: {
      eyebrow: "GALWAY CULTURAL INSTITUTE",
      triggerLabel: "Ver imágenes de la escuela",
      photos: gallery("gci", 0, 8, "Galway Cultural Institute"),
    },
    contactHref: contact("Galway Cultural Institute", "Galway"),
    contactLabel: "Consultar este programa →",
  },
];

export default function IrlandaPage() {
  return (
    <BeneficiosShell>
      <DestinationPacks
        overline="IRLANDA · PROGRAMAS DISPONIBLES"
        titlePrefix="Programas de inglés en"
        titleHighlight="Irlanda"
        intro="Aprovecha tus vacaciones en Irlanda para mejorar tu inglés con packs cortos, flexibles y pensados para quienes quieren estudiar y, al mismo tiempo, disfrutar ciudades como Cork, Dublín, Limerick y Galway."
        packsLabel="Programas y precios en Irlanda"
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
