import { levels } from "@/app/(landings)/test-de-nivel-de-ingles/data/questions";

export interface QuestionInfo {
  questionText: string;
  options: string[];
  correctAnswer: string;
  level: string;
}

/**
 * Lookup from a question number (as a string, matching the stored
 * `answer.questionId`) to its full context: prompt, options, correct answer
 * and the CEFR level it belongs to. Built once from the static test content.
 */
export const QUESTION_LOOKUP: Record<string, QuestionInfo> = levels.reduce(
  (acc, level) => {
    for (const question of level.questions) {
      acc[String(question.n)] = {
        questionText: question.q,
        options: question.options,
        correctAnswer: question.answer,
        level: level.title,
      };
    }
    return acc;
  },
  {} as Record<string, QuestionInfo>
);

/** Sentinel the placement test stores when the user skipped a question. */
export const NO_ANSWER = "No sé" as const;
