// WhatsApp CTA URL builders for the placement test result screen.
//
// Owner decision: both CTAs route to the same number (353831134401).
// The original online number (56972830119) is retired.

export const PLACEMENT_WHATSAPP = {
  online: "353831134401",
  abroad: "353831134401",
} as const;

export interface WhatsAppLeadContext {
  /** Learner's full name (first token is used as the greeting name). */
  name: string;
  /** Learner's nationality (optional; appended to the "abroad" message). */
  nationality: string;
  /** Full CEFR level, e.g. "B1 Intermediate". */
  level: string;
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}

function buildUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** wa.me URL for the "online course" CTA, mirroring the original message copy. */
export function buildOnlineWhatsAppUrl(ctx: WhatsAppLeadContext): string {
  const name = firstName(ctx.name);
  const message = `Hola, soy ${name}. Hice el examen de nivel de MatchMyCourse y obtuve un nivel ${ctx.level}. Quiero registrarme en un curso de inglés online y conocer las opciones disponibles, próximas fechas y precios.`;
  return buildUrl(PLACEMENT_WHATSAPP.online, message);
}

/** wa.me URL for the "study abroad" CTA, mirroring the original message copy. */
export function buildAbroadWhatsAppUrl(ctx: WhatsAppLeadContext): string {
  const name = firstName(ctx.name);
  const nationality = ctx.nationality.trim();
  const nationalitySuffix = nationality ? `, ${nationality.toLowerCase()}` : "";
  const message = `Hola, soy ${name}${nationalitySuffix}. Hice el examen de nivel de MatchMyCourse y obtuve un nivel ${ctx.level}. Me interesa estudiar inglés en el extranjero y quiero conocer mis opciones de destinos, cursos y precios.`;
  return buildUrl(PLACEMENT_WHATSAPP.abroad, message);
}
