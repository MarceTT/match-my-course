import type { Metadata, Viewport } from "next";

import SportProgrammePage from "@/app/beneficios-empresa/components/SportProgrammePage";

export const metadata: Metadata = {
  title: "Inglés + Rugby con Munster Rugby | MatchMyCourse",
  description:
    "Conoce la experiencia de inglés y rugby con Cork English College y Munster Rugby.",
};

export const viewport: Viewport = {
  themeColor: "#4662ed",
};

export default function InglesRugbyMunsterPage() {
  return (
    <SportProgrammePage
      eyebrow="CORK · IRLANDA · EXPERIENCIA DEPORTIVA"
      title="Inglés + Rugby con Munster Rugby"
      heroText="Combina el aprendizaje del inglés con una experiencia de rugby en Irlanda."
      heroImage="/beneficios/sport/sports-rugby-background.webp"
      intro="Una propuesta de Cork English College con Munster Rugby que une el estudio del inglés y el deporte."
      pendingNote="Estamos preparando la información detallada de fechas, edades, alojamiento, actividades y valores. Puedes consultarnos por correo y te enviamos el detalle apenas esté disponible."
      contactHref="mailto:info@matchmycourse.com?subject=Consulta%20ingles%20y%20rugby%20Munster%20Rugby"
      contactLabel="Consultar este programa"
      disclaimer="Disponibilidad y condiciones sujetas a confirmación."
      partners={[
        {
          src: "/beneficios/sport/cec-golf-school-logo.png",
          alt: "Cork English College",
        },
        { src: "/beneficios/sport/sports-munster.png", alt: "Munster Rugby" },
      ]}
    />
  );
}
