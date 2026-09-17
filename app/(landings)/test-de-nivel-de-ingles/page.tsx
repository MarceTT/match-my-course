import type { Metadata } from "next";
import { PlacementTest } from "./PlacementTest";

export const metadata: Metadata = {
  title: "Test de Nivel de Inglés | MatchMyCourse",
  description:
    "Descubre tu nivel de inglés en 5 minutos con nuestro test de 25 preguntas. Resultado inmediato de A1 a C1 y recomendaciones para seguir aprendiendo.",
  alternates: {
    canonical: "https://matchmycourse.com/test-de-nivel-de-ingles",
  },
};

export default function PlacementTestPage() {
  return <PlacementTest />;
}
