import { Select } from "@/components/common/Select";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";

interface CourseSectionProps {
  basePrice: number;
  editable: boolean;
  selectedCourse?: Course;
  onChange?: (course: Course) => void;
  helperText: string;
  labelText?: string; // opcional override del texto
}

export default function CourseSection({
  basePrice,
  editable,
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
      {editable ? (
        <Select<Course>
          options={courseLabelToIdMap}
          value={selectedCourse}
          onChange={(id) => onChange?.(id)}
          placeholder="Seleccionar curso"
        />
      ) : (
        <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
          {courseLabelToIdMap[selectedCourse || ""] || "Curso seleccionado"}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-1">{helperText}</p>
    </div>
  );
}
