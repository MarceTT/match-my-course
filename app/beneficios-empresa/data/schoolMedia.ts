/**
 * School media for the country pages' galleries.
 *
 * Extracted verbatim from the source, where it lives in script rather than in
 * the markup: a file for Irlanda and Nueva Zelanda, an inline <script> for
 * Canadá. Keys match the `data-school` attribute on each offering card.
 *
 * Because these photos are never referenced by the HTML, a check that only
 * inspects the rendered page cannot tell they are missing — which is how 72 of
 * them were nearly shipped absent. `scripts/microsite/checkCountryPages.mjs`
 * now opens a gallery and asserts the photo loads.
 *
 * Re-extract with `scripts/microsite/extractSchoolMedia.mjs`.
 */

export type SchoolPhoto = { src: string; alt: string };

export type SchoolMedia = {
  eyebrow: string;
  photoTitle: string;
  videoTitle: string;
  videoEmbed?: string;
  videoFrameTitle?: string;
  videoNote?: string;
  photos: SchoolPhoto[];
};

export const IrlandaSchoolMedia: Record<string, SchoolMedia> = {
  cec: {
    eyebrow: "CORK ENGLISH COLLEGE · CORK",
    photoTitle: "Imágenes de la escuela",
    videoTitle: "Video de la escuela",
    videoEmbed: "https://www.youtube-nocookie.com/embed/mMHHwIorrfA?rel=0",
    videoFrameTitle: "Cork English College",
    videoNote: "Video pendiente de enlace.",
    photos: [
      {
        src: "/beneficios-empresa/irlanda/cec-01.webp",
        alt: "Pasillo interior de Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-02.webp",
        alt: "Escalera interior de Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-03.webp",
        alt: "Sala de clases de Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-04.webp",
        alt: "Aula con estudiantes en Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-05.webp",
        alt: "Sala de clases en Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-06.webp",
        alt: "Aula de Cork English College",
      },
      {
        src: "/beneficios-empresa/irlanda/cec-07.webp",
        alt: "Lounge y recepción de Cork English College",
      },
    ],
  },
  gci: {
    eyebrow: "GALWAY CULTURAL INSTITUTE · GALWAY",
    photoTitle: "Imágenes de la escuela",
    videoTitle: "Video de la escuela",
    videoEmbed: "https://www.youtube-nocookie.com/embed/62Ai5YvnJ7E?rel=0",
    videoFrameTitle: "Galway Cultural Institute",
    videoNote: "Video pendiente de enlace.",
    photos: [
      {
        src: "/beneficios-empresa/irlanda/gci-00.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-01.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-02.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-03.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-04.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-05.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-06.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-07.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
      {
        src: "/beneficios-empresa/irlanda/gci-08.webp",
        alt: "Galway Cultural Institute: instalaciones y entorno",
      },
    ],
  },
  ul: {
    eyebrow: "UNIVERSITY OF LIMERICK",
    photoTitle: "Imágenes de la universidad",
    videoTitle: "Video de la universidad",
    videoEmbed: "https://www.youtube-nocookie.com/embed/otMUxkTost4?rel=0",
    videoFrameTitle: "University of Limerick",
    videoNote: "Video pendiente.",
    photos: [
      {
        src: "/beneficios-empresa/irlanda/ul-01.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-02.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-03.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-04.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-05.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-06.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-07.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
      {
        src: "/beneficios-empresa/irlanda/ul-08.webp",
        alt: "Instalaciones y vida universitaria en University of Limerick",
      },
    ],
  },
  ucc: {
    eyebrow: "UNIVERSITY COLLEGE CORK",
    photoTitle: "Imágenes de la escuela",
    videoTitle: "Video de la escuela",
    videoEmbed: "https://www.youtube-nocookie.com/embed/S2TxRjbu7EU?start=17&rel=0",
    videoFrameTitle: "Video de University College Cork",
    videoNote: "Video de University College Cork en YouTube. La reproducción requiere conexión a internet.",
    photos: [
      {
        src: "/beneficios-empresa/irlanda/ucc-117.webp",
        alt: "Mardyke Arena y gimnasio en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-118.webp",
        alt: "Sala de clases en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-119.webp",
        alt: "Sala de clases moderna en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-120.webp",
        alt: "Sala de clases colaborativa en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-121.webp",
        alt: "Sala de clases tradicional en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-122.webp",
        alt: "Aula de clases en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-123.webp",
        alt: "Hall del campus University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-124.webp",
        alt: "Escaleras y arquitectura interior de University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-125.webp",
        alt: "Pasillo interior de University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-126.webp",
        alt: "Espacio común de University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-127.webp",
        alt: "Edificio principal de University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-128.webp",
        alt: "Ingreso a Mardyke Arena en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-129.webp",
        alt: "Trotadoras con vista al exterior en University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-130.webp",
        alt: "Gimnasio de University College Cork",
      },
      {
        src: "/beneficios-empresa/irlanda/ucc-131.webp",
        alt: "Piscina de University College Cork",
      },
    ],
  },
  ces: {
    eyebrow: "CENTRE OF ENGLISH STUDIES · DUBLÍN",
    photoTitle: "Imágenes de la escuela",
    videoTitle: "Video de la escuela",
    videoEmbed: "https://www.youtube-nocookie.com/embed/MHk5TVz_IkQ?rel=0",
    videoFrameTitle: "Video de Centre of English Studies",
    videoNote: "El botón de video ya quedó listo para CES. Si luego nos compartes el enlace exacto del video, lo conectamos aquí de inmediato.",
    photos: [
      {
        src: "/beneficios-empresa/irlanda/ces-01.webp",
        alt: "Cafetería de Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-02.webp",
        alt: "Sala común de estudiantes en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-03.webp",
        alt: "Área social para estudiantes en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-04.webp",
        alt: "Sala de clases en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-05.webp",
        alt: "Aula de clases en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-06.webp",
        alt: "Clase en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-07.webp",
        alt: "Sala de clases pequeña en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-08.webp",
        alt: "Fachada de Centre of English Studies en Dublín",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-09.webp",
        alt: "Sala de reuniones o aula en Centre of English Studies",
      },
      {
        src: "/beneficios-empresa/irlanda/ces-10.webp",
        alt: "Vista amplia de la cafetería de Centre of English Studies",
      },
    ],
  },
};

export const NuevaZelandaSchoolMedia: Record<string, SchoolMedia> = {
  rela: {
    eyebrow: "ROTORUA ENGLISH LANGUAGE ACADEMY · ROTORUA",
    photoTitle: "Imágenes de Rotorua English Language Academy",
    videoTitle: "Video de la escuela",
    videoEmbed: "",
    videoFrameTitle: "Rotorua English Language Academy",
    videoNote: "Video no disponible por ahora",
    photos: [
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-new.webp",
        alt: "Rotorua English Language Academy · nueva fotografía",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-01.webp",
        alt: "Rotorua English Language Academy · Fachada",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-02.webp",
        alt: "Rotorua English Language Academy · Recepción",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-03.webp",
        alt: "Rotorua English Language Academy · Pasillo",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-04.webp",
        alt: "Rotorua English Language Academy · Sala común 1",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-05.webp",
        alt: "Rotorua English Language Academy · Sala común 2",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-06.webp",
        alt: "Rotorua English Language Academy · Sala de clases 2",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/rotorua-07.webp",
        alt: "Rotorua English Language Academy · Sala de clases 1",
      },
    ],
  },
  mount: {
    eyebrow: "MOUNT MAUNGANUI LANGUAGE CENTRE · TAURANGA",
    photoTitle: "Imágenes de Mount Maunganui Language Centre",
    videoTitle: "Video de la escuela",
    videoEmbed: "",
    videoFrameTitle: "Mount Maunganui Language Centre",
    videoNote: "Video no disponible",
    photos: [
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-new.webp",
        alt: "Surfistas en Tauranga · nueva fotografía",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-01.webp",
        alt: "Mount Maunganui Language Centre · Sala de clases 2",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-02.webp",
        alt: "Mount Maunganui Language Centre · Lounge",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-03.webp",
        alt: "Mount Maunganui Language Centre · Sala de clases 1",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-04.webp",
        alt: "Mount Maunganui Language Centre · Cocina 2",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-05.webp",
        alt: "Mount Maunganui Language Centre · Terraza",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/tauranga-06.webp",
        alt: "Mount Maunganui Language Centre · Cocina 1",
      },
    ],
  },
  worldwide: {
    eyebrow: "WORLDWIDE SCHOOL OF ENGLISH · AUCKLAND",
    photoTitle: "Imágenes de Worldwide School of English",
    videoTitle: "Video de la escuela",
    videoEmbed: "",
    videoFrameTitle: "Worldwide School of English Auckland",
    videoNote: "Video no disponible por ahora",
    photos: [
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-new.webp",
        alt: "Worldwide School of English Auckland · nueva fotografía",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-01.webp",
        alt: "Worldwide School of English Auckland · foto 2",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-02.webp",
        alt: "Worldwide School of English Auckland · foto 3",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-03.webp",
        alt: "Worldwide School of English Auckland · foto 4",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-04.webp",
        alt: "Worldwide School of English Auckland · foto 5",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-05.webp",
        alt: "Worldwide School of English Auckland · foto 6",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-06.webp",
        alt: "Worldwide School of English Auckland · foto 7",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-07.webp",
        alt: "Worldwide School of English Auckland · foto 8",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-08.webp",
        alt: "Worldwide School of English Auckland · foto 9",
      },
      {
        src: "/beneficios-empresa/nueva-zelanda/auckland-09.webp",
        alt: "Worldwide School of English Auckland · foto 10",
      },
    ],
  },
};

export const CanadaSchoolMedia: Record<string, SchoolMedia> = {
  toronto: {
    eyebrow: "CENTRE OF ENGLISH STUDIES · TORONTO",
    photoTitle: "Imágenes de CES Toronto",
    videoTitle: "Video de la escuela",
    videoEmbed: "",
    videoFrameTitle: "CES Toronto",
    videoNote: "Video no disponible",
    photos: [
      {
        src: "/beneficios-empresa/canada/toronto-00.webp",
        alt: "Centre of English Studies Toronto · foto 1",
      },
      {
        src: "/beneficios-empresa/canada/toronto-01.webp",
        alt: "Centre of English Studies Toronto · foto 2",
      },
      {
        src: "/beneficios-empresa/canada/toronto-02.webp",
        alt: "Centre of English Studies Toronto · foto 3",
      },
      {
        src: "/beneficios-empresa/canada/toronto-03.webp",
        alt: "Centre of English Studies Toronto · foto 4",
      },
      {
        src: "/beneficios-empresa/canada/toronto-04.webp",
        alt: "Centre of English Studies Toronto · foto 5",
      },
      {
        src: "/beneficios-empresa/canada/toronto-05.webp",
        alt: "Centre of English Studies Toronto · foto 6",
      },
      {
        src: "/beneficios-empresa/canada/toronto-06.webp",
        alt: "Centre of English Studies Toronto · foto 7",
      },
    ],
  },
  vancouver: {
    eyebrow: "CENTRE OF ENGLISH STUDIES · VANCOUVER",
    photoTitle: "Imágenes de CES Vancouver",
    videoTitle: "Video de la escuela",
    videoEmbed: "",
    videoFrameTitle: "CES Vancouver",
    videoNote: "Video no disponible",
    photos: [
      {
        src: "/beneficios-empresa/canada/vancouver-00.webp",
        alt: "Centre of English Studies Vancouver · foto 1",
      },
      {
        src: "/beneficios-empresa/canada/vancouver-01.webp",
        alt: "Centre of English Studies Vancouver · foto 2",
      },
      {
        src: "/beneficios-empresa/canada/vancouver-02.webp",
        alt: "Centre of English Studies Vancouver · foto 3",
      },
      {
        src: "/beneficios-empresa/canada/vancouver-03.webp",
        alt: "Centre of English Studies Vancouver · foto 4",
      },
      {
        src: "/beneficios-empresa/canada/vancouver-04.webp",
        alt: "Centre of English Studies Vancouver · foto 5",
      },
      {
        src: "/beneficios-empresa/canada/vancouver-05.webp",
        alt: "Centre of English Studies Vancouver · foto 6",
      },
    ],
  },
};

