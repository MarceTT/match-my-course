import type { Metadata, Viewport } from "next";

import GolfProgrammePage from "@/app/beneficios-empresa/components/GolfProgrammePage";
import type { GolfProgram } from "@/app/beneficios-empresa/components/GolfProgramTabs";

export const metadata: Metadata = {
  title:
    "Mejora tu inglés mientras disfrutas del golf en Naas | Avanti · MatchMyCourse",
  description:
    "Estudia inglés por la mañana y practica golf por la tarde en Naas, Irlanda, con Avanti Language Institute. Opciones para adultos y jóvenes.",
};

export const viewport: Viewport = {
  themeColor: "#4765ed",
};

const PROGRAMS: GolfProgram[] = [
  {
    id: "adulto",
    tabLabel: "Para adultos",
    kicker: "DISPONIBLE DURANTE EL AÑO",
    title: "Inglés y golf para adultos",
    description:
      "Ideal para quienes desean aprovechar unos días libres para mejorar el inglés y disfrutar del golf, con la posibilidad de adaptar la cantidad de clases o rondas según disponibilidad.",
    price: {
      caption: "Desde",
      amount: "Desde €930",
      note: "Programa de referencia para adultos",
    },
    facts: [
      { value: "20 horas", label: "Inglés por semana" },
      { value: "9:00–13:00", label: "Clases de inglés" },
      { value: "1 a 1", label: "Golf con entrenador PGA" },
      { value: "Todo el año", label: "Según disponibilidad" },
    ],
    calendarTitle: "Calendario de actividades",
    calendar: [
      { day: "Lunes", morning: "Inglés 9:00–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Martes", morning: "Inglés 9:00–13:00", afternoon: "Ronda desde 15:00" },
      {
        day: "Miércoles",
        morning: "Inglés 9:00–13:00",
        afternoon: "Golf 14:30–15:30",
      },
      {
        day: "Jueves",
        morning: "Inglés 9:00–13:00",
        afternoon: "Ronda de golf desde 15:00",
      },
      { day: "Viernes", morning: "Inglés 9:00–13:00", afternoon: "Golf 14:30–15:30" },
    ],
    calendarNote:
      "Las rondas, clases y horarios pueden variar según las reservas y disponibilidad.",
    lists: [
      {
        title: "Golf: actividades que puedes elegir",
        intro:
          "Las clases privadas y las rondas tienen un precio variable y se reservan por separado. El importe de €930 no incluye las horas de golf ni las rondas; sí contempla la gestión de las rondas.",
        items: [
          "Clases particulares con entrenador profesional PGA: €100 por hora.",
          "Rondas de 9 hoyos: €25.",
          "Rondas de 18 hoyos: €45 de lunes a jueves; €50 de viernes a domingo.",
          "Préstamo de palos y pelotas sin costo adicional para quienes reservan clases de golf.",
        ],
      },
      {
        title: "¿Qué incluye el precio desde €930?",
        items: [
          "Curso de inglés general (20 horas por semana).",
          "Alojamiento con familia anfitriona en habitación individual y media pensión.",
          "Matrícula y materiales del curso.",
          "Gestión del alojamiento.",
          "Gestión de las rondas de golf (no incluye el valor de las rondas).",
          "No incluye: rondas de golf, clases particulares ni traslado privado desde el aeropuerto de Dublín (€120 por trayecto, opcional).",
        ],
      },
    ],
  },
  {
    id: "junior",
    tabLabel: "Para jóvenes",
    kicker: "VERANO · JULIO A MEDIADOS DE AGOSTO",
    title: "Inglés y golf para jóvenes",
    description:
      "Una propuesta que combina clases de inglés, golf, actividades sociales y excursiones. El ejemplo de Avanti contempla dos semanas con alojamiento en familia anfitriona y pensión completa.",
    price: {
      caption: "Desde",
      amount: "€2.530",
      note: "Programa completo para jóvenes",
    },
    facts: [
      { value: "17,5 horas", label: "Inglés semanal" },
      { value: "9:30–13:00", label: "Clases de inglés" },
      { value: "2 semanas", label: "Ejemplo de estancia" },
      { value: "Verano", label: "Julio–mediados de agosto" },
    ],
    calendarTitle: "Calendario de actividades",
    calendar: [
      {
        day: "Lunes",
        morning: "Inglés 9:30–13:00",
        afternoon: "Actividades 14:00–18:00",
      },
      { day: "Martes", morning: "Inglés 9:30–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Miércoles", morning: "Inglés 9:30–13:00", afternoon: "Actividad social" },
      { day: "Jueves", morning: "Inglés 9:30–13:00", afternoon: "Golf 14:30–15:30" },
      { day: "Viernes", morning: "Inglés 9:30–13:00", afternoon: "Actividad social" },
      {
        day: "Sábado",
        morning: "Excursión de día completo",
        afternoon: "Según programa",
      },
    ],
    calendarNote:
      "Calendario orientativo de la primera semana. La escuela confirma actividades y plazas antes de reservar.",
    lists: [
      {
        title: "¿Qué incluye el precio de €2.530?",
        items: [
          "Dos semanas de inglés general.",
          "Cuatro clases privadas de golf de una hora.",
          "Actividades sociales y excursiones.",
          "Alojamiento con familia, habitación individual y pensión completa.",
        ],
      },
      {
        title: "Servicios y cargos incluidos",
        items: [
          "Matrícula y materiales.",
          "Gestión del alojamiento.",
          "Gestión de las clases de golf.",
          "Traslado de ida y vuelta entre el aeropuerto de Dublín y Naas.",
        ],
      },
    ],
  },
];

export default function InglesGolfNaasPage() {
  return (
    <GolfProgrammePage
      eyebrow="NAAS · IRLANDA · AVANTI LANGUAGE INSTITUTE"
      titleTop="Mejora tu inglés"
      titleHighlight="mientras disfrutas del golf en Naas"
      heroText="Descubre Naas, en el condado de Kildare, una región reconocida por su tradición golfística y sus excelentes campos de golf."
      heroImage="/beneficios/golf/golf-hero.webp"
      heroImageAlt="Campo de golf verde en un día soleado"
      heroCta="Descubre los programas ↓"
      school={{
        logo: "/beneficios/golf/avanti-logo.png",
        logoAlt: "Logotipo de Avanti Language Institute",
        location: "Naas, condado de Kildare",
      }}
      introKicker="INGLÉS + GOLF"
      introTitle="Elige tu programa"
      introText="Avanti Language Institute, en la ciudad de Naas, propone una experiencia que combina aprendizaje del idioma, deporte y convivencia en Irlanda. Puedes elegir una modalidad para adultos o un programa de verano para jóvenes."
      programs={PROGRAMS}
      gallery={{
        kicker: "CONOCE LA EXPERIENCIA",
        title: "Golf en un entorno natural",
        photos: [
          {
            src: "/beneficios/golf/practica.webp",
            alt: "Práctica de golf entre dos participantes",
          },
          { src: "/beneficios/golf/amigos.webp", alt: "Dos personas en un campo de golf" },
          { src: "/beneficios/golf/grupo.webp", alt: "Grupo de golfistas en el campo" },
          {
            src: "/beneficios/golf/bunker.webp",
            alt: "Práctica de golf cerca de un búnker",
          },
        ],
        note: "Fotografías compartidas para ilustrar la experiencia de golf en Naas.",
      }}
      closing={{
        title: "¿Te interesa este programa?",
        body: "Te ayudamos a revisar fechas, disponibilidad de clases de golf, alojamiento y presupuesto para tu viaje.",
        href: "mailto:info@matchmycourse.com?subject=Consulta%20programa%20Ingl%C3%A9s%20y%20Golf%20Avanti%20Naas",
        label: "Consultar disponibilidad ↗",
      }}
      disclaimer="* Precios de referencia del programa 2027, sujetos a disponibilidad y confirmación. En adultos, el precio desde €930 incluye el curso de inglés, alojamiento y gestiones, pero no las rondas ni las clases de golf."
    />
  );
}
