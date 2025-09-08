import { DatePicker } from "@/components/common/DatePicker";
import { isValidMonday } from "@/lib/helpers/calendar";
import { irishHolidays } from "@/lib/constants/holidays";
import { toast } from "sonner";

interface StartDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  disabled?: boolean;
}

function getFirstValidMonday(from: Date, holidays: Date[]): Date {
  const date = new Date(from);
  while (true) {
    const isMonday = date.getDay() === 1;
    const isHoliday = holidays.some(
      (h) => h.toDateString() === date.toDateString()
    );
    if (isMonday && !isHoliday) return new Date(date);
    date.setDate(date.getDate() + 1);
  }
}

const StartDatePicker = ({
  value,
  onChange,
  label = "Inicio de clases",
  disabled = false,
}: StartDatePickerProps) => {
  const today = new Date();
  const minSelectableDate = new Date(today);
  minSelectableDate.setDate(minSelectableDate.getDate() + 42); // hoy + 6 semanas

  const firstValidMonday = getFirstValidMonday(
    minSelectableDate,
    irishHolidays
  );

  const selectedDate =
    !value || value < firstValidMonday ? firstValidMonday : value;

  const handleChange = (date: Date | undefined) => {
    if (!date || date < firstValidMonday) {
      toast.warning(
        `Solo puedes reservar a partir del ${firstValidMonday.toLocaleDateString(
          "es-ES"
        )}`
      );
      onChange(firstValidMonday);
    } else {
      onChange(date);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <DatePicker
        value={selectedDate}
        onChange={handleChange}
        disabled={(date) =>
          disabled ||
          date < firstValidMonday ||
          !isValidMonday(date, irishHolidays, minSelectableDate)
        }
        fromDate={firstValidMonday}
        defaultMonth={firstValidMonday}
      />
    </div>
  );
};

export default StartDatePicker;
