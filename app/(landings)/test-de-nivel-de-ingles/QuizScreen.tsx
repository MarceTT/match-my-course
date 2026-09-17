"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { levels, NO_SE, TOTAL_QUESTIONS } from "./data/questions";
import type { Answers } from "./lib/scoring";

interface QuizScreenProps {
  currentPage: number;
  answers: Answers;
  onAnswer: (questionNumber: number, value: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function QuizScreen({
  currentPage,
  answers,
  onAnswer,
  onPrev,
  onNext,
}: QuizScreenProps) {
  const [showValidation, setShowValidation] = useState(false);

  const level = levels[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === levels.length - 1;

  const answeredCount = Object.values(answers).filter(
    (value) => value !== null && value !== undefined && value !== ""
  ).length;

  const unanswered = level.questions.filter((question) => {
    const value = answers[question.n];
    return value === undefined || value === null || value === "";
  });

  const progressValue = (currentPage / levels.length) * 100;
  const pointsLabel = `${level.weight} punto${level.weight > 1 ? "s" : ""} por respuesta correcta`;

  const handleNext = () => {
    if (unanswered.length > 0) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    onNext();
  };

  const handlePrev = () => {
    setShowValidation(false);
    onPrev();
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3 text-sm font-bold text-slate-500">
          <span>
            Nivel {currentPage + 1} de {levels.length}
          </span>
          <span>
            {answeredCount} de {TOTAL_QUESTIONS} respondidas
          </span>
        </div>
        <Progress value={progressValue} />
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              {level.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{level.desc}</p>
          </div>
          <span className="inline-flex w-fit whitespace-nowrap rounded-lg bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
            {pointsLabel}
          </span>
        </div>

        <div className="grid gap-4">
          {level.questions.map((question, index) => {
            const options = [...question.options, NO_SE];
            const isMissing = showValidation && answers[question.n] === undefined;
            const questionNumber = currentPage * 5 + index + 1;

            return (
              <article
                key={question.n}
                className={cn(
                  "rounded-2xl border border-slate-200 bg-white p-5",
                  isMissing && "border-red-400"
                )}
              >
                <div className="text-base font-bold leading-relaxed text-slate-900">
                  {questionNumber}. {question.q}
                </div>
                <p className="mb-3 mt-1 text-xs italic leading-snug text-slate-400">
                  * Si no sabes la respuesta, marca &ldquo;No sé&rdquo;.
                </p>
                <RadioGroup
                  value={answers[question.n] ?? ""}
                  onValueChange={(value) => onAnswer(question.n, value)}
                  className="gap-2"
                >
                  {options.map((option) => {
                    const optionId = `q${question.n}-${option}`;
                    const isSkip = option === NO_SE;
                    return (
                      <Label
                        key={option}
                        htmlFor={optionId}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:border-primary/40 hover:bg-primary/5",
                          isSkip && "bg-slate-50 text-slate-500"
                        )}
                      >
                        <RadioGroupItem value={option} id={optionId} className="mt-0.5" />
                        <span>{option}</span>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </article>
            );
          })}
        </div>

        {showValidation && unanswered.length > 0 ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            Te falta{unanswered.length > 1 ? "n" : ""} {unanswered.length} pregunta
            {unanswered.length > 1 ? "s" : ""}. Si no sabes la respuesta, marca
            &ldquo;No sé&rdquo; para avanzar.
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            className={cn("font-bold", isFirstPage && "invisible")}
          >
            ← Anterior
          </Button>
          <Button type="button" onClick={handleNext} className="font-bold">
            {isLastPage ? "Finalizar test →" : "Siguiente →"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
