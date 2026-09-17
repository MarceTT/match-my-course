// Pure CEFR scoring module — no side effects, no DOM, fully typed.
// Ported from the standalone HTML `calculate()` / `getLevel()` logic.

import { levels } from "../data/questions";

/** Map of question number -> selected option value (or undefined/"No sé" when skipped). */
export type Answers = Record<number, string | undefined>;

export interface LevelResult {
  /** Full display level, e.g. "B1 Intermediate". */
  level: string;
  /** Short CEFR code, e.g. "B1". */
  short: string;
  /** One-paragraph explanation of the level. */
  explanation: string;
  /** What the learner can already do at this level. */
  canDo: string[];
  /** What the learner can improve next. */
  improve: string[];
  /** A forward-looking growth note ("next step"). */
  growth: string;
}

/**
 * Weighted score: each correct answer awards its level's weight.
 * A skipped ("No sé"), unanswered, or wrong answer awards 0.
 */
export function calculateScore(answers: Answers): number {
  let score = 0;
  for (const level of levels) {
    for (const question of level.questions) {
      if (answers[question.n] === question.answer) {
        score += level.weight;
      }
    }
  }
  return score;
}

/**
 * Map a raw score to a CEFR level result.
 * Bands (inclusive upper bound): <=10 A1, <=22 A2, <=40 B1, <=58 B2, else C1.
 */
export function getLevel(score: number): LevelResult {
  if (score <= 10) {
    return {
      level: "A1 Beginner",
      short: "A1",
      explanation:
        "Estás comenzando a construir tu base en inglés. Ya puedes reconocer y usar expresiones muy frecuentes, presentarte y comunicar información simple cuando la otra persona habla despacio y con claridad.",
      canDo: [
        "Presentarte y dar información personal básica.",
        "Entender palabras y frases muy frecuentes.",
        "Hacer y responder preguntas simples.",
        "Comunicar necesidades inmediatas en situaciones básicas.",
      ],
      improve: [
        "Construir vocabulario cotidiano.",
        "Formar oraciones con más seguridad.",
        "Entender conversaciones a velocidad normal.",
        "Ganar confianza al hablar sin preparar cada frase.",
      ],
      growth:
        "Tienes muchísimo espacio para avanzar. Con práctica constante puedes pasar rápidamente de frases aisladas a conversaciones sencillas y empezar a desenvolverte con mayor independencia.",
    };
  }
  if (score <= 22) {
    return {
      level: "A2 Elementary",
      short: "A2",
      explanation:
        "Ya tienes una base funcional. Puedes desenvolverte en situaciones cotidianas, comprender mensajes sencillos y hablar de temas familiares como trabajo, familia, compras, viajes y rutinas.",
      canDo: [
        "Mantener intercambios breves sobre temas conocidos.",
        "Entender instrucciones y mensajes sencillos.",
        "Hablar de tu rutina, pasado y planes básicos.",
        "Resolver situaciones comunes durante un viaje.",
      ],
      improve: [
        "Ampliar vocabulario para expresarte con más precisión.",
        "Conectar ideas en conversaciones más largas.",
        "Mejorar tiempos verbales y estructuras frecuentes.",
        "Comprender mejor cuando hablan rápido o usan expresiones naturales.",
      ],
      growth:
        "Ya puedes comunicarte, pero todavía puedes mejorar muchísimo. El siguiente gran salto es pasar de responder frases breves a sostener conversaciones con mayor fluidez y seguridad.",
    };
  }
  if (score <= 40) {
    return {
      level: "B1 Intermediate",
      short: "B1",
      explanation:
        "Tienes una buena base intermedia. Puedes comunicarte en muchas situaciones reales, entender las ideas principales de conversaciones claras y expresar opiniones sobre temas familiares, experiencias, planes y objetivos.",
      canDo: [
        "Mantener conversaciones cotidianas con bastante autonomía.",
        "Manejar la mayoría de las situaciones durante un viaje.",
        "Explicar experiencias, opiniones, planes y razones.",
        "Comprender las ideas principales de textos y conversaciones claras.",
      ],
      improve: [
        "Hablar con mayor espontaneidad y menos pausas.",
        "Ampliar vocabulario para temas menos familiares.",
        "Mejorar precisión gramatical y pronunciación.",
        "Entender conversaciones más rápidas y textos más complejos.",
      ],
      growth:
        "Estás en un punto muy bueno para acelerar. Todavía puedes mejorar mucho: llegar a B2 suele marcar una diferencia importante para estudiar, trabajar y relacionarte en inglés con mucha más independencia.",
    };
  }
  if (score <= 58) {
    return {
      level: "B2 Upper-Intermediate",
      short: "B2",
      explanation:
        "Te comunicas con bastante independencia. Puedes comprender temas complejos, participar activamente en conversaciones y explicar tus ideas con claridad en contextos sociales, académicos y laborales.",
      canDo: [
        "Conversar con hablantes de inglés con bastante fluidez.",
        "Comprender textos y conversaciones de cierta complejidad.",
        "Defender opiniones y explicar ventajas y desventajas.",
        "Trabajar o estudiar en muchos contextos donde se usa inglés.",
      ],
      improve: [
        "Sonar más natural y preciso al hablar.",
        "Dominar collocations, phrasal verbs y expresiones idiomáticas.",
        "Reducir errores gramaticales pequeños pero frecuentes.",
        "Comprender matices, humor y distintos acentos con mayor facilidad.",
      ],
      growth:
        "Tu inglés ya es fuerte, pero aún hay bastante margen para crecer. El salto hacia C1 consiste menos en 'saber reglas' y más en ganar precisión, naturalidad, vocabulario y flexibilidad para expresarte exactamente como quieres.",
    };
  }
  return {
    level: "C1 Advanced",
    short: "C1",
    explanation:
      "Tienes un nivel avanzado. Puedes usar el inglés con flexibilidad y eficacia en contextos académicos, laborales y sociales, comprender información exigente y expresar ideas complejas con claridad.",
    canDo: [
      "Participar con soltura en conversaciones complejas.",
      "Comprender textos largos y significados implícitos.",
      "Comunicar ideas detalladas con precisión y buena organización.",
      "Usar el inglés eficazmente para estudiar y trabajar.",
    ],
    improve: [
      "Pulir naturalidad, registro y estilo.",
      "Ampliar vocabulario especializado y expresiones idiomáticas.",
      "Perfeccionar pronunciación, ritmo y entonación.",
      "Trabajar matices culturales y precisión casi nativa.",
    ],
    growth:
      "Incluso en C1 hay mucho por perfeccionar. El objetivo ahora es que tu inglés sea cada vez más natural, preciso y adaptable a situaciones exigentes, especialmente si quieres estudiar o trabajar internacionalmente.",
  };
}
