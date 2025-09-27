import { Select } from "@/components/common/Select";
import {
  CourseKey,
  courseToLabelMap,
  parseCoursesFromApi
} from "@/lib/helpers/courseHelper";
import { CoursesInfo } from "@/lib/types/coursesInfo";

interface CourseSectionProps {
  courseInfo: CoursesInfo;
  helperText: string;
  onChange?: (course: CourseKey) => void;
  selectedCourse?: CourseKey;
  disabled?: boolean;
}

export default function CourseSection({
  courseInfo,
  helperText,
  onChange,
  selectedCourse,
  disabled = false,
}: CourseSectionProps) {
  const rawLabels: string[] = Array.isArray(courseInfo?.list) ? courseInfo.list : [];
  const courseValues: CourseKey[] = parseCoursesFromApi(rawLabels);
  let courseOptions = courseValues.map((course) => ({
    label: courseToLabelMap[course],
    value: course,
  }));

  // Fallback: si el backend no trajo cursos, muestra al menos el seleccionado
  if (courseOptions.length === 0 && selectedCourse) {
    courseOptions = [{ label: courseToLabelMap[selectedCourse], value: selectedCourse }];
  }

  return (
    <div>
      <Select<CourseKey>
        options={courseOptions}
        value={selectedCourse}
        onChange={(id) => onChange?.(id)}
        placeholder="Seleccionar curso..."
        disabled={disabled}
      />
      <p className="text-xs text-gray-500 mt-1">
        {helperText}
      </p>
    </div>
  );
}
