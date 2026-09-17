"use client";

import { FaWhatsapp } from "react-icons/fa";

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

export function ResultScreen({ score, result, lead, onRestart }: ResultScreenProps) {
  const whatsappContext = {
    name: lead.name,
    nationality: lead.nationality,
    level: result.level,
  };
  const onlineUrl = buildOnlineWhatsAppUrl(whatsappContext);
  const abroadUrl = buildAbroadWhatsAppUrl(whatsappContext);

  return (
    <Card className="p-6 text-center sm:p-10 lg:p-12">
      <span className="mb-4 inline-flex rounded-lg bg-primary/10 px-3 py-2 text-sm font-extrabold text-primary">
        Resultado · {score}/{MAX_SCORE} puntos
      </span>

      <div className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        {result.level}
      </div>

      <div className="mx-auto my-6 grid h-28 w-28 place-items-center rounded-full border-[12px] border-emerald-100 bg-emerald-50 text-3xl font-extrabold text-emerald-500">
        {result.short}
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
          className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-4 text-center font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <FaWhatsapp className="h-5 w-5" />
          Quiero registrarme en un curso de inglés online
        </a>
        <a
          href={abroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-4 text-center font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <FaWhatsapp className="h-5 w-5" />
          Me interesa estudiar inglés en el extranjero
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
