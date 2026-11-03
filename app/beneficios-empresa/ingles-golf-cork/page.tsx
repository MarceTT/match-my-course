import type { Metadata, Viewport } from "next";

import GolfProgrammePage from "@/app/beneficios-empresa/components/GolfProgrammePage";
import type { GolfProgram } from "@/app/beneficios-empresa/components/GolfProgramTabs";

export const metadata: Metadata = {
  title:
    "Mejora tu inglés mientras disfrutas del golf en Cork | Cork English College · MatchMyCourse",
  description:
    "Programa de inglés y golf para jóvenes de 11 a 17 años en Cork, Irlanda, con Cork English College y Fota Golf Academy. Residencia o familia anfitriona.",
};

export const viewport: Viewport = {
  themeColor: "#4765ed",
};

/** Both programmes share the same week; only the Sunday differs. */
const weekdays = (sunday: string): GolfProgram["calendar"] => [
  { day: "Lunes", morning: "Inglés 09:00–12:15", afternoon: "Golf 14:00–17:00" },
  { day: "Martes", morning: "Inglés 09:00–12:15", afternoon: "Golf 14:00–17:00" },
  { day: "Miércoles", morning: "Inglés 09:00–12:15", afternoon: "Golf 14:00–17:00" },
  { day: "Jueves", morning: "Inglés 09:00–12:15", afternoon: "Golf 14:00–17:00" },
  {
    day: "Viernes",
    morning: "Inglés 09:00–12:15",
    afternoon: "Deportes y actividades",
  },
  {
    day: "Sábado",
    morning: "Excursión de día completo",
    afternoon: "Según calendario",
  },
  { day: "Domingo", morning: sunday, afternoon: "Según programa" },
];

const SHARED_FACTS = [
  { value: "11–17 años", label: "Edad del programa" },
  { value: "09:00–12:15", label: "Inglés de lunes a viernes*" },
  { value: "4 tardes", label: "Golf semanal con profesional PGA" },
  { value: "2 semanas", label: "Duración mínima" },
];

const CALENDAR_NOTE =
  "*Calendario de referencia. Las clases pueden programarse por la mañana o por la tarde; las actividades están sujetas a modificaciones.";

const PROGRAMS: GolfProgram[] = [
  {
    id: "residencia",
    tabLabel: "Con residencia",
    kicker: "PROGRAMA DE VERANO · 11 A 17 AÑOS",
    title: "Inglés + golf con residencia",
    description:
      "Clases de inglés en el campus de Munster Technological University (MTU) y alojamiento en habitación individual con baño privado, junto a estudiantes internacionales.",
    price: {
      caption: "Desde",
      amount: "Desde €2.830",
      note: "Programa de 2 semanas · alojamiento incluido",
    },
    facts: SHARED_FACTS,
    calendarTitle: "Calendario de actividades",
    calendar: weekdays("Día libre supervisado"),
    calendarNote: CALENDAR_NOTE,
    lists: [
      {
        title: "¿Qué incluye el programa?",
        items: [
          "Curso de inglés de lunes a viernes.",
          "Cuatro tardes de golf por semana con profesional PGA.",
          "Transporte privado entre las clases y Fota Golf Academy.",
          "Residencia con habitación individual y baño privado.",
          "Pensión completa: desayuno, almuerzo y cena.",
          "Matrícula y materiales de aprendizaje.",
          "Excursión semanal, actividades de tarde y entretenimiento nocturno.",
          "Supervisión y personal de CEC en residencia las 24 horas.",
        ],
      },
    ],
  },
  {
    id: "familia",
    tabLabel: "Con familia anfitriona",
    kicker: "PROGRAMA DE VERANO · 11 A 17 AÑOS",
    title: "Inglés + golf con familia anfitriona",
    description:
      "Estudia inglés en Douglas Community School (DCS) y comparte la vida cotidiana de una familia irlandesa en alojamiento compartido, con comidas y transporte local incluidos.",
    price: {
      caption: "Desde",
      amount: "Desde €2.530",
      note: "Programa de 2 semanas · alojamiento incluido",
    },
    facts: SHARED_FACTS,
    calendarTitle: "Calendario de actividades",
    calendar: weekdays("Actividades familiares"),
    calendarNote: CALENDAR_NOTE,
    lists: [
      {
        title: "¿Qué incluye el programa?",
        items: [
          "Curso de inglés de lunes a viernes.",
          "Cuatro tardes de golf semanales con profesional PGA.",
          "Traslado privado al campo de golf.",
          "Familia anfitriona, habitación compartida para dos personas.",
          "Pensión completa: desayuno, almuerzo para llevar y cena.",
          "Matrícula y materiales.",
          "Transfer de llegada y salida desde el aeropuerto de Cork.",
          "Abono semanal de transporte local.",
          "Excursiones y actividades sociales y nocturnas.",
        ],
      },
    ],
  },
];

export default function InglesGolfCorkPage() {
  return (
    <GolfProgrammePage
      eyebrow="CORK · IRLANDA · CORK ENGLISH COLLEGE"
      titleTop="Mejora tu inglés"
      titleHighlight="mientras disfrutas del golf en Cork"
      heroText="Vive un verano diferente en Cork: clases de inglés y entrenamiento de golf en Fota Golf Academy, acompañados de nuevas amistades y experiencias en Irlanda."
      heroImage="/beneficios/golf-cork/fota-hero.webp"
      heroImageAlt="Campo de golf de Fota Island en Cork"
      heroCta="Descubre los programas ↓"
      school={{
        logo: "/beneficios/golf-cork/cec-logo.png",
        logoAlt: "Logotipo de Cork English College",
        location: "Cork, Irlanda",
      }}
      introKicker="INGLÉS + GOLF"
      introTitle="Elige tu programa"
      introText="Cork English College organiza esta experiencia junto a Fota Golf Academy para jóvenes de 11 a 17 años. Las mañanas se dedican al aprendizaje del inglés y las tardes al golf. Puedes elegir alojamiento en residencia estudiantil o con una familia anfitriona."
      programs={PROGRAMS}
      gallery={{
        kicker: "CONOCE LA EXPERIENCIA",
        title: "Una experiencia de verano entre inglés, deporte y amigos",
        photos: [
          {
            src: "/beneficios/golf-cork/fota-green.webp",
            alt: "Green del campo de golf de Fota Island",
          },
          {
            src: "/beneficios/golf-cork/jovenes-golf.webp",
            alt: "Jóvenes practicando golf",
          },
          {
            src: "/beneficios/golf-cork/campus.webp",
            alt: "Campus donde se dictan las clases de inglés",
          },
          {
            src: "/beneficios/golf-cork/familia.webp",
            alt: "Alojamiento con familia anfitriona",
          },
        ],
        note: "Imágenes ilustrativas obtenidas de los materiales compartidos del programa y fotografías de referencia.",
      }}
      closing={{
        title: "¿Te interesa este programa?",
        body: "Te ayudamos a consultar la próxima temporada, cupos, condiciones de alojamiento y traslados para organizar el viaje.",
        href: "mailto:info@matchmycourse.com?subject=Consulta%20programa%20Ingl%C3%A9s%20y%20Golf%20Cork%20English%20College",
        label: "Consultar disponibilidad ↗",
      }}
      disclaimer="Tarifas y fechas del folleto de verano 2026: residencia €1.415 por semana y familia €1.265 por semana, con mínimo de dos semanas. Las fechas publicadas y los cupos pueden variar; confirma disponibilidad antes de reservar."
    />
  );
}
