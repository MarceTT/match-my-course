// Unit tests for the pure scoring module.
//
// NOTE: The frontend currently has NO test runner wired (no vitest/jest in
// package.json). This file is written against the Vitest API and will run once
// a runner is added (e.g. `npm i -D vitest` + a `test` script). It is
// intentionally dependency-light so it also works under Bun's test runner
// (`bun test`) with the same `describe/it/expect` globals.

import { describe, it, expect } from "vitest";

import { levels, MAX_SCORE } from "../data/questions";
import { calculateScore, getLevel, type Answers } from "./scoring";

/**
 * Build an Answers map that yields exactly `target` points using a greedy
 * selection of correct answers (highest weight first). Any integer in [0, 75]
 * is reachable because weights {1..5} are each available 5 times.
 */
function answersForScore(target: number): Answers {
  const answers: Answers = {};
  let remaining = target;
  // Highest weight first so we can always land exactly on the target.
  const byWeightDesc = [...levels].sort((a, b) => b.weight - a.weight);
  for (const level of byWeightDesc) {
    for (const question of level.questions) {
      if (remaining >= level.weight) {
        answers[question.n] = question.answer;
        remaining -= level.weight;
      }
    }
  }
  return answers;
}

/** All questions answered correctly. */
function perfectAnswers(): Answers {
  const answers: Answers = {};
  for (const level of levels) {
    for (const question of level.questions) {
      answers[question.n] = question.answer;
    }
  }
  return answers;
}

describe("calculateScore", () => {
  it("returns 0 when no questions are answered", () => {
    expect(calculateScore({})).toBe(0);
  });

  it("returns the max score (75) for a perfect run", () => {
    expect(calculateScore(perfectAnswers())).toBe(MAX_SCORE);
    expect(MAX_SCORE).toBe(75);
  });

  it("does not award points for the 'No sé' option", () => {
    const answers: Answers = {};
    for (const level of levels) {
      for (const question of level.questions) {
        answers[question.n] = "No sé";
      }
    }
    expect(calculateScore(answers)).toBe(0);
  });

  it("does not award points for unanswered questions", () => {
    // Only answer the first A1 question correctly; the rest stay undefined.
    const first = levels[0].questions[0];
    expect(calculateScore({ [first.n]: first.answer })).toBe(levels[0].weight);
  });

  it("does not award points for wrong answers", () => {
    const answers: Answers = {};
    for (const level of levels) {
      for (const question of level.questions) {
        const wrong = question.options.find((o) => o !== question.answer);
        answers[question.n] = wrong;
      }
    }
    expect(calculateScore(answers)).toBe(0);
  });

  it("builds the exact target score via the greedy helper", () => {
    for (const target of [0, 10, 11, 22, 23, 40, 41, 58, 59, 75]) {
      expect(calculateScore(answersForScore(target))).toBe(target);
    }
  });
});

describe("getLevel band boundaries", () => {
  const cases: Array<{ score: number; short: string }> = [
    { score: 0, short: "A1" },
    { score: 10, short: "A1" },
    { score: 11, short: "A2" },
    { score: 22, short: "A2" },
    { score: 23, short: "B1" },
    { score: 40, short: "B1" },
    { score: 41, short: "B2" },
    { score: 58, short: "B2" },
    { score: 59, short: "C1" },
    { score: 75, short: "C1" },
  ];

  for (const { score, short } of cases) {
    it(`maps score ${score} to level ${short}`, () => {
      expect(getLevel(score).short).toBe(short);
    });
  }

  it("returns fully populated result objects", () => {
    const result = getLevel(35);
    expect(result.level).toBe("B1 Intermediate");
    expect(result.canDo.length).toBeGreaterThan(0);
    expect(result.improve.length).toBeGreaterThan(0);
    expect(result.explanation).not.toBe("");
    expect(result.growth).not.toBe("");
  });
});
