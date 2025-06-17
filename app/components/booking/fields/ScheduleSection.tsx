"use client";

import { Select } from "@/components/common/Select";

interface ScheduleSectionProps {
  value?: "am" | "pm";
  onChange: (val: "am" | "pm") => void;
  label?: string;
  placeholder?: string;
}

const scheduleOptions = [
  { label: "AM - 09:00 a 12:00", value: "am" },
  { label: "PM - 13:00 a 16:00", value: "pm" },
];

export default function ScheduleSection({
  value,
  onChange,
  label = "Horario de clases",
  placeholder = "Elegir"
}: ScheduleSectionProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <Select
        options={scheduleOptions}
        value={value || ""}
        onChange={(val) => onChange(val as "am" | "pm")}
        placeholder={placeholder}
      />
    </div>
  );
}
