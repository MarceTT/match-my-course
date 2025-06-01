// lib/helpers/courseHelpers.ts

import { Course, courseMetadataMap } from "../constants/courses";

export function getCourseMetadata(course: Course) {
  return courseMetadataMap[course] ?? null;
}

export function isValidCourse(value: string): value is Course {
  return Object.values(Course).includes(value as Course);
}

// Agregar aquí más helpers relacionados con cursos en el futuro
