"use client";

import { Select } from "@/components/common/Select";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";

interface ScheduleSectionProps {
  value?: string;
  scheduleInfo: ScheduleInfo;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function ScheduleSection({
  value,
  scheduleInfo,
  onChange,
  label = "Horario de clases",
  placeholder = "Seleccionar...",
  disabled = false,
}: ScheduleSectionProps) {
  // Robust list handling: in dev some backends may return non-array shapes.
  const rawList: any = scheduleInfo?.list as any;
  const list: any[] = Array.isArray(rawList) ? rawList : [];
  const options = list
    .map((item: any) => {
      const val = typeof item === "string" ? item : item?.horario;
      if (!val) return null;
      return { label: val, value: val };
    })
    .filter(Boolean) as Array<{ label: string; value: string }>;
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <Select
        options={options}
        value={value || ""}
        onChange={(val) => onChange(val)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
