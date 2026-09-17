"use client";

import { useState } from "react";

import { levels } from "./data/questions";
import { calculateScore, getLevel, type Answers, type LevelResult } from "./lib/scoring";
import { savePlacementTestResult } from "./lib/api";
import type { LeadFormValues } from "./leadSchema";
import { WelcomeScreen } from "./WelcomeScreen";
import { QuizScreen } from "./QuizScreen";
import { LeadForm } from "./LeadForm";
import { ResultScreen } from "./ResultScreen";

const SCREEN = {
  WELCOME: "welcome",
  QUIZ: "quiz",
  LEAD: "lead",
  RESULT: "result",
} as const;

type Screen = (typeof SCREEN)[keyof typeof SCREEN];

interface ResultState {
  score: number;
  result: LevelResult;
  lead: LeadFormValues;
}

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function PlacementTest() {
  const [screen, setScreen] = useState<Screen>(SCREEN.WELCOME);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [resultState, setResultState] = useState<ResultState | null>(null);

  const startTest = () => {
    setCurrentPage(0);
    setAnswers({});
    setResultState(null);
    setScreen(SCREEN.QUIZ);
    scrollToTop();
  };

  const handleAnswer = (questionNumber: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(0, page - 1));
    scrollToTop();
  };

  const goToNextPage = () => {
    if (currentPage < levels.length - 1) {
      setCurrentPage((page) => page + 1);
      scrollToTop();
    } else {
      setScreen(SCREEN.LEAD);
      scrollToTop();
    }
  };

  const handleLeadSubmit = (lead: LeadFormValues) => {
    const score = calculateScore(answers);
    const result = getLevel(score);
    setResultState({ score, result, lead });
    setScreen(SCREEN.RESULT);
    scrollToTop();

    // Persist the result in the background. Non-blocking: the user already
    // sees their result; a save failure never degrades the experience.
    void savePlacementTestResult({ lead, score, level: result.short, answers });
  };

  const restartTest = () => {
    setCurrentPage(0);
    setAnswers({});
    setResultState(null);
    setScreen(SCREEN.WELCOME);
    scrollToTop();
  };

  return (
    <section className="mx-auto w-[92vw] max-w-6xl px-0 py-10 sm:py-14">
      {screen === SCREEN.WELCOME ? <WelcomeScreen onStart={startTest} /> : null}

      {screen === SCREEN.QUIZ ? (
        <QuizScreen
          currentPage={currentPage}
          answers={answers}
          onAnswer={handleAnswer}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
        />
      ) : null}

      {screen === SCREEN.LEAD ? <LeadForm onSubmit={handleLeadSubmit} /> : null}

      {screen === SCREEN.RESULT && resultState ? (
        <ResultScreen
          score={resultState.score}
          result={resultState.result}
          lead={resultState.lead}
          onRestart={restartTest}
        />
      ) : null}

      <p className="mt-6 text-center text-xs text-slate-400">
        MatchMyCourse · English Placement Test
      </p>
    </section>
  );
}
