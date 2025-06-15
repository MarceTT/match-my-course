// lib/utils/calendar.ts

/**
 * Determina si una fecha debe estar deshabilitada en el calendario.
 *
 * Reglas:
 * - Solo los lunes pueden estar habilitados, excepto cuando ese lunes es feriado.
 * - Si el lunes es feriado, se habilita el siguiente día hábil (es decir, no fin de semana ni feriado).
 *
 * @param date Fecha a evaluar.
 * @param holidays Lista de feriados (como objetos Date).
 * @returns true si la fecha debe estar deshabilitada, false si está habilitada.
 */
export function isDateDisabled(date: Date, holidays: Date[]): boolean {
  const isMonday = date.getDay() === 1;
  if (!isMonday) return true;

  const isHoliday = holidays.some(
    (h) => h.toDateString() === date.toDateString()
  );

  if (!isHoliday) return false;

  const fallbackDate = getNextAvailableDate(date, holidays);
  return date.toDateString() !== fallbackDate?.toDateString();
}

/**
 * Retorna el siguiente día hábil a partir de una fecha dada (excluyendo fines de semana y feriados).
 * Si no se encuentra un día válido dentro de un límite de días, retorna null.
 *
 * @param startDate Fecha desde donde comenzar la búsqueda.
 * @param holidays Lista de fechas feriadas.
 * @param maxAttempts Número máximo de días a revisar para evitar loops infinitos. Default: 10.
 * @returns Fecha del siguiente día hábil o null si no se encuentra.
 */
export function getNextAvailableDate(
  startDate: Date,
  holidays: Date[],
  maxAttempts = 10
): Date | null {
  const nextDate = new Date(startDate);
  let attempts = 0;

  while (attempts < maxAttempts) {
    nextDate.setDate(nextDate.getDate() + 1);
    attempts++;

    const isWeekend = nextDate.getDay() === 0 || nextDate.getDay() === 6;
    const isHoliday = holidays.some(
      (h) => h.toDateString() === nextDate.toDateString()
    );

    if (!isWeekend && !isHoliday) {
      return nextDate;
    }
  }

  return null; // No se encontró un día hábil dentro del límite
}
