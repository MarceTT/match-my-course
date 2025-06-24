"use client";

import { Select } from "@/components/common/Select";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";

interface ScheduleSectionProps {
  value?: string;
  scheduleInfo: ScheduleInfo;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ScheduleSection({
  value,
  scheduleInfo,
  onChange,
  label = "Horario de clases",
  placeholder = "Seleccionar..."
}: ScheduleSectionProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <Select
        options={(scheduleInfo?.list || []).map((item) => ({ label: item, value: item }))}
        value={value || ""}
        onChange={(val) => onChange(val)}
        placeholder={placeholder}
      />
    </div>
  );
}
