import type { Metadata, Viewport } from "next";

import SportProgrammePage from "@/app/beneficios-empresa/components/SportProgrammePage";

export const metadata: Metadata = {
  title: "Inglés + Fútbol con Valencia CF | MatchMyCourse",
  description:
    "Conoce la experiencia de inglés y fútbol con Cork English College y Valencia CF.",
};

export const viewport: Viewport = {
  themeColor: "#4662ed",
};

export default function InglesFutbolValenciaPage() {
  return (
    <SportProgrammePage
      eyebrow="CORK · IRLANDA · EXPERIENCIA DEPORTIVA"
      title="Inglés + Fútbol con Valencia CF"
      heroText="Combina el aprendizaje del inglés con una experiencia de fútbol en Irlanda."
      heroImage="/beneficios/sport/sports-football-background.webp"
      intro="Una propuesta de Cork English College con Valencia CF que une el estudio del inglés y el deporte."
      pendingNote="Estamos preparando la información detallada de fechas, edades, alojamiento, actividades y valores. Puedes consultarnos por correo y te enviamos el detalle apenas esté disponible."
      contactHref="mailto:info@matchmycourse.com?subject=Consulta%20ingles%20y%20f%C3%BAtbol%20Valencia%20CF"
      contactLabel="Consultar este programa"
      disclaimer="Disponibilidad y condiciones sujetas a confirmación."
      partners={[
        {
          src: "/beneficios/sport/cec-golf-school-logo.png",
          alt: "Cork English College",
        },
        { src: "/beneficios/sport/sports-valencia.png", alt: "Valencia CF" },
      ]}
    />
  );
}
