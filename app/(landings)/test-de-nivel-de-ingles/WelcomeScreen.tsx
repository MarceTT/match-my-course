"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: "📝", title: "25 preguntas", description: "Un test corto y práctico." },
  { icon: "⚡", title: "Resultado inmediato", description: "Conoce tu nivel al instante." },
  { icon: "A1", title: "Niveles A1 – C1", description: "Desde principiante hasta avanzado." },
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-7">
      <Card className="p-6 sm:p-8 lg:p-12">
        <span className="mb-5 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
          Tu futuro empieza aquí
        </span>
        <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Test de nivel de inglés
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
          <strong className="text-primary">
            Descubre tu nivel de inglés en solo 5 minutos.
          </strong>
          <br />
          Nuestro test tiene 25 preguntas y te entrega un resultado inmediato de A1 a C1.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-lg font-extrabold text-primary">
                {feature.icon}
              </div>
              <strong className="mb-1 block text-sm text-slate-900">
                {feature.title}
              </strong>
              <small className="text-sm leading-snug text-slate-500">
                {feature.description}
              </small>
            </div>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col justify-center p-6 sm:p-8">
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          ¿Listo para empezar?
        </h2>
        <p className="mb-6 text-base leading-relaxed text-slate-500">
          Para que el resultado sea lo más preciso posible, responde todas las preguntas.{" "}
          <strong className="text-slate-700">
            Si no sabes una respuesta, simplemente marca &ldquo;No sé&rdquo; para avanzar.
          </strong>{" "}
          No adivines: reconocer que no sabes una respuesta también nos ayuda a determinar
          mejor tu nivel.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={onStart}
          className="w-full text-base font-bold sm:w-auto sm:self-start"
        >
          Empezar test →
        </Button>
      </Card>
    </div>
  );
}
