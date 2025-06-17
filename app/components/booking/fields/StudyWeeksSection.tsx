import { Select } from "@/components/common/Select";

interface StudyWeeksSectionProps {
  value?: number;
  onChange: (weeks: number) => void;
  options: { label: string; value: string }[];
}

const StudyWeeksSection = ({
  value,
  onChange,
  options,
}: StudyWeeksSectionProps) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">Semanas a estudiar</label>
      <Select
        options={options}
        value={value?.toString() ?? ""}
        onChange={(val) => onChange(Number(val))}
        placeholder="Elegir"
      />
    </div>
  );
};

export default StudyWeeksSection;
