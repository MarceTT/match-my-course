import axiosInstance from "@/app/utils/apiClient";

import { levels } from "../data/questions";
import type { Answers } from "./scoring";
import type { LeadFormValues } from "../leadSchema";

/** One answer entry sent to the backend. */
interface PlacementAnswerPayload {
  questionId: string;
  answer: string;
  correct: boolean;
}

/** Request body for POST /placement-test/submit. */
interface PlacementTestPayload {
  name: string;
  email: string;
  country: string;
  nationality: string;
  contactOptIn: boolean;
  score: number;
  level: string;
  answers: PlacementAnswerPayload[];
}

/** Build the flat answers array (with correctness) the backend expects. */
function buildAnswersPayload(answers: Answers): PlacementAnswerPayload[] {
  return levels.flatMap((level) =>
    level.questions.map((question) => {
      const answer = answers[question.n] ?? "";
      return {
        questionId: String(question.n),
        answer,
        correct: answer === question.answer,
      };
    }),
  );
}

/**
 * Persist a completed placement test to the backend.
 *
 * Fire-and-forget from the caller's perspective: this must NEVER block or
 * break the result screen. Errors are swallowed (logged) so a network/backend
 * failure never degrades the user's experience.
 *
 * @param level the short CEFR code (e.g. "B1"), which the backend enum expects
 */
export async function savePlacementTestResult(params: {
  lead: LeadFormValues;
  score: number;
  level: string;
  answers: Answers;
}): Promise<void> {
  const payload: PlacementTestPayload = {
    name: params.lead.name,
    email: params.lead.email,
    country: params.lead.country,
    nationality: params.lead.nationality,
    contactOptIn: params.lead.contactOptIn ?? false,
    score: params.score,
    level: params.level,
    answers: buildAnswersPayload(params.answers),
  };

  try {
    await axiosInstance.post("/placement-test/submit", payload);
  } catch (error) {
    // Non-blocking: the user still sees their result even if saving fails.
    console.error("No se pudo guardar el resultado del test de nivel", error);
  }
}
