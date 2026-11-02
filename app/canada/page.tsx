import type { Metadata, Viewport } from "next";

import BeneficiosShell from "@/app/beneficios/components/BeneficiosShell";
import DestinationPacks, {
  type DestinationPack,
} from "@/app/beneficios/components/DestinationPacks";
import type { GalleryPhoto } from "@/app/beneficios/components/SchoolGalleryDialog";

export const metadata: Metadata = {
  title: "Cursos de inglés en Canadá | MatchMyCourse",
  description: "Cursos de inglés en Toronto y Vancouver, Canadá, con MatchMyCourse.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

const galleryPhotos = (city: "toronto" | "vancouver", count: number): GalleryPhoto[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/beneficios/canada/${city}-0${index}.webp`,
    alt: `Centre of English Studies ${
      city === "toronto" ? "Toronto" : "Vancouver"
    } · foto ${index + 1}`,
  }));

const SHARED_DETAILS = [
  { label: "Duración", value: "2, 3, 4 semanas" },
  { label: "Horario", value: "Lunes a viernes, 09:00–12:15" },
  { label: "Clases semanales", value: "15 horas" },
  { label: "Nivel mínimo", value: "A1" },
  { label: "Tipo de alojamiento", value: "Familia anfitriona" },
];

const BREAKDOWN_INTRO =
  "Cada pack incluye los siguientes conceptos. La matrícula, el transfer y los fees fijos se cobran solo una vez.";
const BREAKDOWN_NOTE =
  "Los importes están expresados en CAD. No incluye pasajes aéreos. Valores sujetos a disponibilidad y confirmación antes de la reserva.";
const PRICE_NOTE =
  "Precio total del pack: curso, alojamiento, matrícula, materiales, transfer y gastos de alojamiento incluidos.";
const CURRENCY_NOTE = "Los precios se encuentran en dólares canadienses.";

const TORONTO_PACK: DestinationPack = {
  image: "/beneficios/canada/toronto-00.webp",
  imageAlt: "Centre of English Studies en Toronto",
  photoCaption: "Centre of English Studies · Toronto",
  kicker: "TORONTO · INGLÉS GENERAL",
  title: "Curso + Alojamiento",
  logo: "/beneficios/ces-logo-badge.png",
  logoAlt: "Logo Centre of English Studies",
  hours: "15 horas de inglés por semana",
  prices: [
    { amount: "$2.780", label: "2 semanas" },
    { amount: "$3.655", label: "3 semanas" },
    { amount: "$4.530", label: "4 semanas" },
  ],
  priceNote: PRICE_NOTE,
  currencyNote: CURRENCY_NOTE,
  details: [{ label: "Ciudad", value: "Toronto, Canadá" }, ...SHARED_DETAILS],
  breakdown: {
    intro: BREAKDOWN_INTRO,
    items: [
      "Curso de inglés: CAD $450 × semanas",
      "Alojamiento: CAD $405 × semanas · Familia anfitriona",
      "Matrícula: CAD $300",
      "Materiales: CAD $20 por semana",
      "Transfer aeropuerto ida y vuelta: CAD $455",
      "Fee de alojamiento: CAD $275",
    ],
    note: BREAKDOWN_NOTE,
  },
  gallery: {
    eyebrow: "CENTRE OF ENGLISH STUDIES · TORONTO",
    triggerLabel: "Ver imágenes de la escuela",
    photos: galleryPhotos("toronto", 7),
  },
  contactHref:
    "mailto:info@matchmycourse.com?subject=Consulta%20pack%20Centre%20of%20English%20Studies%20Toronto&body=Hola%2C%20quisiera%20conocer%20disponibilidad%20para%20el%20pack%20de%20Toronto%20con%20alojamiento%20y%20transfer%20incluidos.%20Gracias.",
  contactLabel: "Consultar este programa →",
};

const VANCOUVER_PACK: DestinationPack = {
  image: "/beneficios/canada/vancouver-00.webp",
  imageAlt: "Centre of English Studies en Vancouver",
  photoCaption: "Centre of English Studies · Vancouver",
  kicker: "VANCOUVER · INGLÉS GENERAL",
  title: "Curso + Alojamiento",
  logo: "/beneficios/ces-logo-badge.png",
  logoAlt: "Logo Centre of English Studies",
  hours: "15 horas de inglés por semana",
  prices: [
    { amount: "$2.795", label: "2 semanas" },
    { amount: "$3.695", label: "3 semanas" },
    { amount: "$4.595", label: "4 semanas" },
  ],
  priceNote: PRICE_NOTE,
  currencyNote: CURRENCY_NOTE,
  details: [{ label: "Ciudad", value: "Vancouver, Canadá" }, ...SHARED_DETAILS],
  breakdown: {
    intro: BREAKDOWN_INTRO,
    items: [
      "Curso de inglés: CAD $450 × semanas",
      "Alojamiento: CAD $430 × semanas · Familia anfitriona",
      "Matrícula: CAD $300",
      "Materiales: CAD $20 por semana",
      "Transfer aeropuerto ida y vuelta: CAD $420",
      "Fee de alojamiento: CAD $275",
    ],
    note: BREAKDOWN_NOTE,
  },
  gallery: {
    eyebrow: "CENTRE OF ENGLISH STUDIES · VANCOUVER",
    triggerLabel: "Ver imágenes de la escuela",
    photos: galleryPhotos("vancouver", 6),
  },
  contactHref:
    "mailto:info@matchmycourse.com?subject=Consulta%20pack%20Centre%20of%20English%20Studies%20Vancouver&body=Hola%2C%20quisiera%20conocer%20disponibilidad%20para%20el%20pack%20de%20Vancouver%20con%20alojamiento%20y%20transfer%20incluidos.%20Gracias.",
  contactLabel: "Consultar este programa →",
};

export default function CanadaPage() {
  return (
    <BeneficiosShell>
      <DestinationPacks
        overline="CANADÁ · PROGRAMAS DISPONIBLES"
        titlePrefix="Programas de inglés en"
        titleHighlight="Canadá"
        intro="Aprovecha tus vacaciones o una pausa en tu calendario para mejorar tu inglés en Canadá con programas cortos en Toronto y Vancouver, ideales para estudiar y conocer dos grandes ciudades."
        packsLabel="Programas y precios en Canadá"
        packs={[TORONTO_PACK, VANCOUVER_PACK]}
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
