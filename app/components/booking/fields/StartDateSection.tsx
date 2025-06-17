import { DatePicker } from "@/components/common/DatePicker";
import { isDateDisabled } from "@/lib/helpers/calendar";
import { irishHolidays } from "@/lib/constants/holidays";

interface StartDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
}

const StartDatePicker = ({
  value,
  onChange,
  label = "Inicio de clases",
}: StartDatePickerProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <DatePicker
        value={value}
        onChange={onChange}
        disabled={(date) => isDateDisabled(date, irishHolidays)}
      />
    </div>
  );
};

export default StartDatePicker;
