"use client";

import { FaWhatsapp } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MAX_SCORE } from "./data/questions";
import type { LevelResult } from "./lib/scoring";
import {
  buildAbroadWhatsAppUrl,
  buildOnlineWhatsAppUrl,
} from "./lib/whatsapp";
import type { LeadFormValues } from "./leadSchema";

interface ResultScreenProps {
  score: number;
  result: LevelResult;
  lead: LeadFormValues;
  onRestart: () => void;
}

/** Gradient theme per CEFR level — softer for beginners, richer for advanced. */
const LEVEL_THEME: Record<string, { from: string; to: string; glow: string }> = {
  A1: { from: "from-sky-400", to: "to-blue-500", glow: "shadow-sky-500/30" },
  A2: { from: "from-teal-400", to: "to-emerald-500", glow: "shadow-teal-500/30" },
  B1: { from: "from-emerald-400", to: "to-green-600", glow: "shadow-emerald-500/30" },
  B2: { from: "from-indigo-400", to: "to-blue-600", glow: "shadow-indigo-500/30" },
  C1: { from: "from-violet-500", to: "to-fuchsia-600", glow: "shadow-violet-500/40" },
};

export function ResultScreen({ score, result, lead, onRestart }: ResultScreenProps) {
  const whatsappContext = {
    name: lead.name,
    nationality: lead.nationality,
    level: result.level,
  };
  const onlineUrl = buildOnlineWhatsAppUrl(whatsappContext);
  const abroadUrl = buildAbroadWhatsAppUrl(whatsappContext);
  const theme = LEVEL_THEME[result.short] ?? LEVEL_THEME.B1;

  return (
    <Card className="p-6 text-center sm:p-10 lg:p-12">
      <span className="mb-4 inline-flex rounded-lg bg-primary/10 px-3 py-2 text-sm font-extrabold text-primary">
        Resultado · {score}/{MAX_SCORE} puntos
      </span>

      <div className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        {result.level}
      </div>

      <div className="relative mx-auto my-8 grid h-36 w-36 place-items-center">
        {/* Soft outer halo */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br opacity-20 blur-xl",
            theme.from,
            theme.to,
          )}
        />
        {/* Outer ring (medal effect) */}
        <div
          className={cn(
            "absolute inset-2 rounded-full bg-gradient-to-br opacity-25",
            theme.from,
            theme.to,
          )}
        />
        {/* Main gradient badge */}
        <div
          className={cn(
            "relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br text-4xl font-extrabold tracking-tight text-white shadow-xl ring-4 ring-white",
            theme.from,
            theme.to,
            theme.glow,
          )}
        >
          {result.short}
        </div>
      </div>

      <p className="mx-auto mb-2 max-w-2xl text-lg font-extrabold text-slate-900">
        Tu nivel de inglés es {result.level}
      </p>
      <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500">
        {result.explanation}
      </p>

      <div className="mx-auto mt-7 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-base font-bold text-slate-900">
            Lo que ya puedes hacer
          </h3>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-slate-600">
            {result.canDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-base font-bold text-slate-900">
            Lo que puedes mejorar ahora
          </h3>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-slate-600">
            {result.improve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-left leading-relaxed text-slate-600">
        <strong className="text-slate-900">Tu próximo paso:</strong> {result.growth}
      </div>

      <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-primary/20 bg-primary/5 p-4 text-left leading-relaxed text-slate-600">
        Este resultado es una estimación orientativa de tu nivel actual de inglés
        según tus respuestas en el test.
      </div>

      <div className="mx-auto mt-7 grid max-w-2xl gap-4 sm:grid-cols-2">
        <a
          href={onlineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-left text-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
            <FaWhatsapp className="h-6 w-6" />
          </span>
          <span className="flex-1 text-sm font-bold leading-snug sm:text-[15px]">
            Quiero registrarme en un curso de inglés online
          </span>
          <span aria-hidden className="shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <a
          href={abroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-left text-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
            <FaWhatsapp className="h-6 w-6" />
          </span>
          <span className="flex-1 text-sm font-bold leading-snug sm:text-[15px]">
            Me interesa estudiar inglés en el extranjero
          </span>
          <span aria-hidden className="shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>

      <div className="mt-6 flex justify-center">
        <Button type="button" variant="outline" onClick={onRestart} className="font-bold">
          Volver a hacer el test
        </Button>
      </div>
    </Card>
  );
}
