import type { Metadata } from "next";

import { dmSans } from "@/app/ui/fonts";

// The microsite ships its own stylesheets. They are imported here so they load
// only for this route segment, and so the pages can reproduce the source markup
// class-for-class instead of being re-approximated in Tailwind.
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
  return <div className={dmSans.className}>{children}</div>;
}
