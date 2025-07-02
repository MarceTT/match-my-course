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
}

export default function CourseSection({
  courseInfo,
  helperText,
  onChange,
  selectedCourse,
}: CourseSectionProps) {
  const rawLabels: string[] = courseInfo.list;
  const courseValues: CourseKey[] = parseCoursesFromApi(rawLabels);
  const courseOptions = courseValues.map((course) => ({
    label: courseToLabelMap[course],
    value: course,
  }));

  return (
    <div>
      <Select<CourseKey>
        options={courseOptions}
        value={selectedCourse}
        onChange={(id) => onChange?.(id)}
        placeholder="Seleccionar curso..."
      />
      <p className="text-xs text-gray-500 mt-1">
        {helperText}
      </p>
    </div>
  );
}
