import type { Metadata, Viewport } from "next";

import GolfProgrammePage from "@/app/beneficios-empresa/components/GolfProgrammePage";
import type { GolfProgram } from "@/app/beneficios-empresa/components/GolfProgramTabs";

export const metadata: Metadata = {
  title: "Sandford Park School | Emerald Cultural Institute · MatchMyCourse",
  description:
    "Programas de inglés para jóvenes en Dublín con Emerald Cultural Institute en Sandford Park School: Multi-Activity, inglés intensivo y Young Adult.",
};

export const viewport: Viewport = {
  themeColor: "#4765ed",
};

const PROGRAMS: GolfProgram[] = [
  {
    id: "multi",
    tabLabel: "Multi-Activity",
    kicker: "VERANO · 27 DE JUNIO AL 8 DE AGOSTO",
    title: "Inglés + Multi-Activity",
    description:
      "Una alternativa para jóvenes que buscan combinar aprendizaje del idioma con actividades deportivas, recreativas y excursiones durante su estancia en Dublín.",
    price: {
      caption: "Edad",
      amount: "11 a 17 años",
      note: "Programa junior con actividades y excursiones",
    },
    facts: [
      { value: "15 horas", label: "Clases de inglés por semana" },
      { value: "Todos los niveles", label: "Disponible en verano" },
      { value: "2 actividades", label: "En la tarde o noche por semana" },
      { value: "1 excursión", label: "De día completo por semana" },
    ],
    calendarTitle: "Calendario orientativo",
    calendar: [
      { day: "Lunes", morning: "Inglés", afternoon: "Actividad de tarde" },
      { day: "Martes", morning: "Inglés", afternoon: "Deportes / juegos" },
      { day: "Miércoles", morning: "Inglés", afternoon: "Actividad social" },
      { day: "Sábado o domingo", morning: "Excursión", afternoon: "Fuera de Dublín" },
    ],
    calendarNote:
      "Las actividades y horarios pueden variar según el calendario semanal de la escuela.",
    lists: [
      {
        title: "¿Qué incluye?",
        items: [
          "15 horas semanales de clases de inglés.",
          "Materiales y uso del libro de texto durante el curso.",
          "Programa de actividades, deportes y excursiones.",
          "Dos actividades de tarde o noche por semana.",
          "Una excursión de día completo por semana.",
        ],
      },
      {
        title: "Alojamiento y acompañamiento",
        items: [
          "Opción de familia anfitriona en la zona local.",
          "Traslados cotidianos caminando o en trayectos cortos en bus / tranvía.",
          "Transporte incluido cuando sea necesario para ir a la escuela.",
          "Asistencia y acompañamiento del equipo de Emerald Cultural Institute.",
        ],
      },
    ],
  },
  {
    id: "intensivo",
    tabLabel: "Inglés intensivo",
    kicker: "VERANO · 4 DE JULIO AL 8 DE AGOSTO",
    title: "Inglés intensivo",
    description:
      "Programa pensado para jóvenes que desean reforzar el idioma durante el verano, con clases de inglés y un entorno activo, internacional y supervisado.",
    price: {
      caption: "Edad",
      amount: "14 a 17 años",
      note: "Curso intensivo junior de verano",
    },
    facts: [
      { value: "15 horas", label: "Clases de inglés por semana" },
      { value: "Refuerzo", label: "Lecciones adicionales de inglés" },
      { value: "Verano", label: "Disponible en julio y agosto" },
      { value: "Actividades", label: "Programa social incluido" },
    ],
    calendarTitle: "Calendario orientativo",
    calendar: [
      { day: "Lunes", morning: "Inglés", afternoon: "Actividad de tarde" },
      { day: "Martes", morning: "Inglés", afternoon: "Lecciones adicionales" },
      { day: "Miércoles", morning: "Inglés", afternoon: "Actividad social" },
      { day: "Sábado o domingo", morning: "Excursión", afternoon: "Programa semanal" },
    ],
    calendarNote:
      "La escuela confirma el calendario definitivo antes del inicio de cada semana.",
    lists: [
      {
        title: "¿Qué incluye?",
        items: [
          "Clases de inglés general con profesores especializados.",
          "Lecciones adicionales para reforzar el aprendizaje.",
          "Materiales académicos del curso.",
          "Actividades, excursiones y programa social.",
        ],
      },
      {
        title: "Alojamiento",
        items: [
          "Opción de familia anfitriona.",
          "Acompañamiento y supervisión durante el programa.",
          "Ubicación bien conectada por bus y tranvía.",
          "Entorno seguro y orientado a estudiantes jóvenes.",
        ],
      },
    ],
  },
  {
    id: "youngadult",
    tabLabel: "Young Adult",
    kicker: "VERANO · 27 DE JUNIO AL 8 DE AGOSTO",
    title: "Inglés para Jóvenes (Young Adult)",
    description:
      "Este programa está dirigido a jóvenes que desean mejorar su inglés mientras desarrollan habilidades personales y sociales. Combina formación idiomática con talleres y seminarios.",
    price: {
      caption: "Edad",
      amount: "16 a 19 años",
      note: "Curso Young Adult con enfoque en soft skills",
    },
    facts: [
      { value: "15 horas", label: "Clases de inglés por semana" },
      { value: "5 horas", label: "Talleres y seminarios de soft skills" },
      { value: "Residencia / homestay", label: "Dos opciones de alojamiento" },
      { value: "Trinity Hall", label: "Residencia para quienes la eligen" },
    ],
    calendarTitle: "Calendario orientativo",
    calendar: [
      { day: "Lunes", morning: "Inglés", afternoon: "Taller de habilidades" },
      { day: "Martes", morning: "Inglés", afternoon: "Discover Dublin workshop" },
      { day: "Miércoles", morning: "Inglés", afternoon: "Actividad social" },
      { day: "Jueves", morning: "Inglés", afternoon: "Seminario / taller" },
    ],
    calendarNote:
      "La combinación de clases, talleres y actividades puede variar según la semana del programa.",
    lists: [
      {
        title: "¿Qué incluye este programa?",
        items: [
          "15 horas semanales de clases de inglés.",
          "5 horas semanales de talleres y seminarios sobre habilidades blandas.",
          "Materiales de estudio y uso de libro de texto durante el curso.",
          "Actividades sociales, culturales y excursiones según calendario.",
          "Clases impartidas en Sandford Park School.",
        ],
      },
      {
        title: "Alojamiento y experiencia",
        items: [
          "Opción de residencia en Trinity Hall.",
          "Opción de familia anfitriona (homestay).",
          "Entorno residencial bien conectado con el centro de Dublín.",
          "Experiencia internacional con estudiantes de diferentes nacionalidades.",
        ],
      },
    ],
  },
];

export default function SandfordParkSchoolPage() {
  return (
    <GolfProgrammePage
      eyebrow="DUBLÍN · IRLANDA · EMERALD CULTURAL INSTITUTE"
      titleTop="Estudia inglés en"
      titleHighlight="Sandford Park School"
      heroText="Descubre una experiencia junior en Dublín que combina clases de inglés, actividades, talleres y convivencia internacional en un entorno académico con mucha personalidad."
      heroImage="/beneficios/sandford/hero.webp"
      heroImageAlt="Campus de Sandford Park School en Dublín"
      heroCta="Descubre los programas ↓"
      school={{
        logo: "/beneficios/sandford/emerald-logo.png",
        logoAlt: "Logotipo de Emerald Cultural Institute",
        location: "Ranelagh, Dublín 6",
      }}
      introKicker="INGLÉS JUNIOR"
      introTitle="Una experiencia de inglés para jóvenes en Dublín"
      introText="Sandford Park School, operado por Emerald Cultural Institute, ofrece programas para jóvenes en verano con clases de inglés, actividades recreativas y excursiones. El programa Young Adult añade además talleres y seminarios orientados al desarrollo personal."
      programs={PROGRAMS}
      campus={{
        kicker: "CAMPUS Y ALOJAMIENTO",
        title: "Un entorno académico con buena conexión a la ciudad",
        body: "Sandford Park School se ubica en Ranelagh, Dublín 6, sobre hermosos terrenos arbolados y muy bien comunicados con el centro de la ciudad. El campus cuenta con aulas modernas, espacios recreativos y acceso a instalaciones deportivas.",
        items: [
          "Ranelagh y Beechwood LUAS a pocos minutos caminando.",
          "Instalaciones para deportes, actividades y eventos en campus.",
          "Comedor, salas de clase luminosas y ambiente internacional.",
          "Residencia en Trinity Hall para estudiantes que opten por esa modalidad.",
        ],
      }}
      closing={{
        title: "¿Te interesa este programa?",
        body: "Te ayudamos a revisar fechas, edades, opciones de alojamiento y disponibilidad para organizar el viaje.",
        href: "mailto:info@matchmycourse.com?subject=Consulta%20programa%20junior%20Sandford%20Park%20School",
        label: "Consultar disponibilidad ↗",
      }}
      disclaimer="* La información y las fechas publicadas corresponden al material compartido para el programa junior en Sandford Park School. La escuela confirma disponibilidad, calendario final y condiciones de reserva antes de confirmar la inscripción."
    />
  );
}
