// English placement test content, ported faithfully from the standalone HTML source.
// 5 CEFR levels (A1-C1), each with 5 questions and a per-level weight.

export interface Question {
  /** Original question number from the source test. */
  n: number;
  /** Question prompt. */
  q: string;
  /** Answer options (the "No sé" option is added by the UI, not stored here). */
  options: string[];
  /** The single correct option value. */
  answer: string;
}

export interface Level {
  /** Display title, e.g. "A1 Foundations". */
  title: string;
  /** Short description shown under the title. */
  desc: string;
  /** Points awarded per correct answer at this level. */
  weight: number;
  /** The five questions for this level. */
  questions: Question[];
}

/** Sentinel value used by the UI for the "No sé" (I don't know) option. */
export const NO_SE = "No sé" as const;

/** Total number of questions across all levels. */
export const TOTAL_QUESTIONS = 25;

/** Maximum achievable score: sum of (5 questions * weight) for weights 1..5 = 5*(1+2+3+4+5). */
export const MAX_SCORE = 75;

export const levels: Level[] = [
  {
    title: "A1 Foundations",
    desc: "Preguntas básicas para medir tu base inicial.",
    weight: 1,
    questions: [
      { n: 1, q: "I ________ from France.", options: ["is", "are", "am", "be"], answer: "am" },
      { n: 2, q: "This is my friend. _________ name is Peter.", options: ["Her", "Our", "Yours", "His"], answer: "His" },
      { n: 4, q: "My brother is ______ artist.", options: ["the", "an", "a", "am"], answer: "an" },
      { n: 6, q: "Paul _____________ romantic films.", options: ["likes not", "don't like", "doesn't like", "isn't like"], answer: "doesn't like" },
      { n: 9, q: "I __________ the film last night.", options: ["like", "likes", "liking", "liked"], answer: "liked" },
    ],
  },
  {
    title: "A2 Elementary",
    desc: "Preguntas de estructuras cotidianas y vocabulario funcional.",
    weight: 2,
    questions: [
      { n: 11, q: "The living room is _________________ than the bedroom.", options: ["more big", "more bigger", "biggest", "bigger"], answer: "bigger" },
      { n: 13, q: "Jane is a vegetarian. She ____________ meat.", options: ["sometimes eats", "never eats", "often eats", "usually eats"], answer: "never eats" },
      { n: 16, q: "Sue ______________ shopping every day.", options: ["is going", "go", "going", "goes"], answer: "goes" },
      { n: 18, q: "________________ seen fireworks before?", options: ["Did you ever", "Are you ever", "Have you ever", "Do you ever"], answer: "Have you ever" },
      { n: 20, q: "You ________ pay for the tickets. They're free.", options: ["have to", "don't have", "don't need to", "doesn't have to"], answer: "don't need to" },
    ],
  },
  {
    title: "B1 Intermediate",
    desc: "Preguntas para medir comunicación en situaciones reales.",
    weight: 3,
    questions: [
      { n: 23, q: "We'll stay at home if it ______________ this afternoon.", options: ["raining", "rains", "will rain", "rain"], answer: "rains" },
      { n: 24, q: "He doesn't smoke now, but he ________ a lot when he was young.", options: ["has smoked", "smokes", "used to smoke", "was smoked"], answer: "used to smoke" },
      { n: 26, q: "I promise I _________ you as soon as I've finished this cleaning.", options: ["will help", "am helping", "going to help", "have helped"], answer: "will help" },
      { n: 29, q: "How about _________ to the cinema tonight?", options: ["going", "go", "to go", "for going"], answer: "going" },
      { n: 30, q: "Excuse me, can you __________ me the way to the station, please?", options: ["give", "take", "tell", "say"], answer: "tell" },
    ],
  },
  {
    title: "B2 Upper-Intermediate",
    desc: "Preguntas de estructuras más complejas y precisión gramatical.",
    weight: 4,
    questions: [
      { n: 31, q: "I wasn't interested in the performance very much. ______________.", options: ["I didn't, too.", "Neither was I.", "Nor I did.", "So I wasn't."], answer: "Neither was I." },
      { n: 33, q: "_________ this great book and I can't wait to see how it ends.", options: ["I don't read.", "I've read", "I've been reading", "I read"], answer: "I've been reading" },
      { n: 35, q: "She _____ for her cat for two days when she finally found it in the garage.", options: ["looked", "had been looked", "had been looking", "were looking"], answer: "had been looking" },
      { n: 36, q: "We won't catch the plane ___________ we leave home now! Please hurry up!", options: ["if", "providing that", "except", "unless"], answer: "unless" },
      { n: 37, q: "If I had replied to your email, I __________ here with you now.", options: ["can't be", "wouldn't be", "won't be", "haven't been"], answer: "wouldn't be" },
    ],
  },
  {
    title: "C1 Advanced",
    desc: "Preguntas avanzadas de expresiones, collocations y phrasal verbs.",
    weight: 5,
    questions: [
      { n: 41, q: "You may not like the cold weather here, but you'll have to ____________. I'm afraid.", options: ["tell it off", "sort itself out", "put up with it", "put it off"], answer: "put up with it" },
      { n: 43, q: "Paul will look ________ our dogs while we're on holiday.", options: ["at", "for", "into", "after"], answer: "after" },
      { n: 47, q: "I think it's very easy to ______ debt these days.", options: ["go into", "become", "go down to", "get into"], answer: "get into" },
      { n: 48, q: "Come on! Quick! Let's get ________!", options: ["highlight", "cracking", "massive", "with immediate effect"], answer: "cracking" },
      { n: 49, q: "I phoned her ________ I heard the news.", options: ["minute", "during", "by the hour", "the moment"], answer: "the moment" },
    ],
  },
];
