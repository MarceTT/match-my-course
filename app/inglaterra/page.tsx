import type { Metadata, Viewport } from "next";

import BeneficiosShell from "@/app/beneficios/components/BeneficiosShell";
import DestinationPacks, {
  type DestinationPack,
} from "@/app/beneficios/components/DestinationPacks";

export const metadata: Metadata = {
  title: "Cursos de inglés en Inglaterra | MatchMyCourse",
  description: "Cursos de inglés en Londres, Inglaterra, con MatchMyCourse.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

const LONDON_PACK: DestinationPack = {
  image: "/beneficios/england-vivid.webp",
  imageAlt: "Centre of English Studies en Londres",
  photoCaption: "Centre of English Studies · Londres",
  kicker: "LONDRES · INGLÉS GENERAL",
  title: "Curso + Alojamiento",
  logo: "/beneficios/ces-logo-badge.png",
  logoAlt: "Logo Centre of English Studies",
  hours: "15 horas de inglés por semana",
  prices: [
    { amount: "£1.567", label: "2 semanas" },
    { amount: "£2.157", label: "3 semanas" },
    { amount: "£2.747", label: "4 semanas" },
  ],
  priceNote:
    "Precio total del pack: curso, alojamiento, matrícula, materiales, transfer y gastos de alojamiento incluidos.",
  currencyNote: "Los precios se encuentran en libras esterlinas.",
  details: [
    { label: "Ciudad", value: "Londres, Inglaterra" },
    { label: "Duración", value: "2, 3 y 4 semanas" },
    { label: "Horario", value: "Lunes a viernes, 09:30–13:00" },
    { label: "Clases semanales", value: "15 horas" },
    { label: "Nivel mínimo", value: "A1" },
    { label: "Tipo de alojamiento", value: "Host Family" },
  ],
  breakdown: {
    intro:
      "Cada pack incluye los siguientes conceptos. La matrícula, el transfer y los fees fijos se cobran solo una vez.",
    items: [
      "Curso de inglés: £275 × semanas",
      "Alojamiento: £315 × semanas · Host Family",
      "Matrícula: £75",
      "Materiales: £37",
      "Transfer aeropuerto ida y vuelta: £200",
      "Fee de alojamiento: £75",
    ],
    note: "Los importes están expresados en GBP. No incluye pasajes aéreos. Valores sujetos a disponibilidad y confirmación antes de la reserva.",
  },
  contactHref:
    "mailto:info@matchmycourse.com?subject=Consulta%20pack%20Centre%20of%20English%20Studies%20Londres&body=Hola%2C%20quisiera%20conocer%20disponibilidad%20para%20el%20pack%20de%20Londres%20con%20alojamiento%20y%20transfer%20incluidos.%20Gracias.",
  contactLabel: "Consultar este programa →",
};

export default function InglaterraPage() {
  return (
    <BeneficiosShell>
      <DestinationPacks
        overline="INGLATERRA · PROGRAMAS DISPONIBLES"
        titlePrefix="Programas de inglés en"
        titleHighlight="Inglaterra"
        intro="Descubre nuestra opción disponible en Londres con curso de inglés general, alojamiento y costos principales incluidos para que tengas una visión más clara del valor total de tu experiencia."
        packsLabel="Programas y precios en Inglaterra"
        packs={[LONDON_PACK]}
        advice={{
          overline: "LONDRES",
          title: "Una propuesta clara y simple para tus vacaciones",
          body: "Este pack ya resume curso, alojamiento y costos principales para que puedas comparar fácilmente tu experiencia de estudio en Inglaterra.",
          href: "mailto:info@matchmycourse.com?subject=Quiero%20estudiar%20ingles%20en%20Inglaterra",
          label: "Solicitar información →",
        }}
      />
    </BeneficiosShell>
  );
}
