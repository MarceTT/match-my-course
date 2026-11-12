import type { Metadata } from "next";

import { dmSans } from "@/app/ui/fonts";

// The microsite ships its own stylesheets. They are imported here so they load
// only for this route segment, and so the pages can reproduce the source markup
// class-for-class instead of being re-approximated in Tailwind.
//
// Every selector in them is scoped under `.mmc-microsite` (see the wrapper
// below). Without that scope the two sets of styles collide on generic class
// names: Tailwind emits its own `.container { width: 100% }`, which overrode
// the source's `.container { width: min(1160px, calc(100% - 48px)); margin: auto }`
// and flattened every page margin. Eight files outside this segment use
// Tailwind's container, so disabling it was not an option — scoping fixes the
// collision in both directions and keeps these sheets from leaking out.
import "./styles/style.css";
import "./styles/partners-marquee.css";
import "./styles/why-matchmycourse.css";
import "./styles/conoce-matchmycourse.css";
import "./styles/como-funciona-matchmycourse.css";
import "./styles/empresas-colegios.css";
import "./styles/portada-fondo-unificado.css";
import "./styles/portada-fondo-estilo-irlanda.css";

export const metadata: Metadata = {
  title: "Beneficios para estudiar inglés en el extranjero | MatchMyCourse",
};

export default function BeneficiosEmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`mmc-microsite ${dmSans.className}`}>{children}</div>;
}
