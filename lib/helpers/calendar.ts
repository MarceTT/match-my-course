
export function isValidMonday(date: Date, holidays: Date[], minDate: Date): boolean {
  const isMonday = date.getDay() === 1;
  const isAfterMinDate = date >= minDate;
  const isHoliday = holidays.some(h => h.toDateString() === date.toDateString());

  return isMonday && isAfterMinDate && !isHoliday;
}

export function getInitialStartDate(today: Date, holidays: Date[]): Date | null {
  const sixWeeksLater = new Date(today);
  sixWeeksLater.setDate(sixWeeksLater.getDate() + 42);

  let date = new Date(sixWeeksLater);

  for (let i = 0; i < 14; i++) {
    const isMonday = date.getDay() === 1;
    const isHoliday = holidays.some(h => h.toDateString() === date.toDateString());

    if (isMonday && !isHoliday) {
      return date;
    }

    date.setDate(date.getDate() + 1);
  }

  return null;
}
