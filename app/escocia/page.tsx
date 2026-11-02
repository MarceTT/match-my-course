import type { Metadata, Viewport } from "next";

import BeneficiosShell from "@/app/beneficios/components/BeneficiosShell";
import DestinationPacks, {
  type DestinationPack,
} from "@/app/beneficios/components/DestinationPacks";

export const metadata: Metadata = {
  title: "Cursos de inglés en Escocia | MatchMyCourse",
  description: "Cursos de inglés en Edimburgo, Escocia, con MatchMyCourse.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

const EDINBURGH_PACK: DestinationPack = {
  image: "/beneficios/scotland-vivid.webp",
  imageAlt: "Centre of English Studies en Edimburgo",
  photoCaption: "Centre of English Studies · Edimburgo",
  kicker: "EDIMBURGO · INGLÉS GENERAL",
  title: "Curso + Alojamiento",
  logo: "/beneficios/ces-logo-badge.png",
  logoAlt: "Logo Centre of English Studies",
  hours: "15 horas de inglés por semana",
  prices: [
    { amount: "£1.647", label: "2 semanas" },
    { amount: "£2.237", label: "3 semanas" },
    { amount: "£2.827", label: "4 semanas" },
  ],
  priceNote:
    "Precio total del pack: curso, alojamiento, matrícula, materiales, transfer y gastos de alojamiento incluidos.",
  currencyNote: "Los precios se encuentran en libras esterlinas.",
  details: [
    { label: "Ciudad", value: "Edimburgo, Escocia" },
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
      "Transfer aeropuerto ida y vuelta: £280",
      "Fee de alojamiento: £75",
    ],
    note: "Los importes están expresados en GBP. No incluye pasajes aéreos. Valores sujetos a disponibilidad y confirmación antes de la reserva.",
  },
  contactHref:
    "mailto:info@matchmycourse.com?subject=Consulta%20pack%20Centre%20of%20English%20Studies%20Edimburgo&body=Hola%2C%20quisiera%20conocer%20disponibilidad%20para%20el%20pack%20de%20Edimburgo%20con%20alojamiento%20y%20transfer%20incluidos.%20Gracias.",
  contactLabel: "Consultar este programa →",
};

export default function EscociaPage() {
  return (
    <BeneficiosShell>
      <DestinationPacks
        overline="ESCOCIA · PROGRAMAS DISPONIBLES"
        titlePrefix="Programas de inglés en"
        titleHighlight="Escocia"
        intro="Explora nuestra opción disponible en Edimburgo con curso de inglés general, alojamiento y costos principales incluidos para ayudarte a evaluar mejor tu inversión total."
        packsLabel="Programas y precios en Escocia"
        packs={[EDINBURGH_PACK]}
        advice={{
          overline: "EDIMBURGO",
          title: "Todo el valor del pack, más claro",
          body: "El detalle está preparado para que puedas revisar rápidamente el precio total del pack y entender qué incluye tu experiencia en Escocia.",
          href: "mailto:info@matchmycourse.com?subject=Quiero%20estudiar%20ingles%20en%20Escocia",
          label: "Solicitar información →",
        }}
      />
    </BeneficiosShell>
  );
}
