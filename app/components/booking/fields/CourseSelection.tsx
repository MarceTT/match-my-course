import { Select } from "@/components/common/Select";
import { Course, courseToLabelMap, parseCoursesFromApi } from "@/lib/constants/courses";
import { CoursesInfo } from "@/lib/types/coursesInfo";

interface CourseSectionProps {
  basePrice: number;
  bookingAmound: number;
  selectedCourse?: Course;
  courseInfo: CoursesInfo;
  onChange?: (course: Course) => void;
  helperText: string;
  labelText?: string; // opcional override del texto
}

export default function CourseSection({
  basePrice,
  bookingAmound,
  selectedCourse,
  onChange,
  helperText,
  labelText = "Curso",
  courseInfo
}: CourseSectionProps) {
  const rawLabels: string[] = courseInfo.list;
  const courseValues: Course[] = parseCoursesFromApi(rawLabels);
  const courseOptions = courseValues.map((course) => ({
    label: courseToLabelMap[course],
    value: course,
  }));
  return (
    <div>
      <div className="flex justify-between">
        <label className="block text-sm text-gray-600 mb-1">{labelText}</label>
        <div className="text-sm text-gray-900 mb-2 font-semibold">€{basePrice - bookingAmound}</div>
      </div>
      <Select<Course>
        options={courseOptions}
        value={selectedCourse}
        onChange={(id) => onChange?.(id)}
        placeholder="Seleccionar curso..."
      />
      <p className="text-xs text-gray-500 mt-1">{helperText}</p>
    </div>
  );
}
