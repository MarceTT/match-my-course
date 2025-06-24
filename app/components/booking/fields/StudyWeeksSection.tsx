import { Select } from "@/components/common/Select";
import { WeeksBySchoolInfo } from "@/lib/types/weeksBySchoolInfo";

interface StudyWeeksSectionProps {
  value?: number;
  weeksBySchoolInfo: WeeksBySchoolInfo;
  onChange: (weeks: number) => void;
  placeholder?: string;
}

const StudyWeeksSection = ({
  value,
  onChange,
  weeksBySchoolInfo,
  placeholder = 'Seleccionar...'
}: StudyWeeksSectionProps) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        Semanas a estudiar
      </label>
      <Select
        options={(weeksBySchoolInfo?.list || []).map((item) => ({
          label: `${item} semana${Number(item) === 1 ? '' : 's'}`,
          value: String(item)
        }))}
        value={value?.toString() ?? ""}
        onChange={(val) => onChange(Number(val))}
        placeholder={placeholder}
      />
    </div>
  );
};

export default StudyWeeksSection;
