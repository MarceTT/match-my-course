import { Select } from "@/components/common/Select";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";

interface CourseSectionProps {
  basePrice: number;
  selectedCourse?: Course;
  onChange?: (course: Course) => void;
  helperText: string;
  labelText?: string; // opcional override del texto
}

export default function CourseSection({
  basePrice,
  selectedCourse,
  onChange,
  helperText,
  labelText = "Curso",
}: CourseSectionProps) {
  return (
    <div>
      <div className="flex justify-between">
        <label className="block text-sm text-gray-600 mb-1">{labelText}</label>
        <div className="text-sm text-gray-900 mb-2 font-semibold">€{basePrice}</div>
      </div>
      <Select<Course>
        options={courseLabelToIdMap}
        value={selectedCourse}
        onChange={(id) => onChange?.(id)}
        placeholder="Seleccionar curso..."
      />
      <p className="text-xs text-gray-500 mt-1">{helperText}</p>
    </div>
  );
}
