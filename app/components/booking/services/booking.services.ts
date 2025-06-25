export const fetchCourses = async (schoolId: string) => {
  if (!schoolId) throw new Error("School ID is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tipo-cursos/${schoolId}`);

  if (!res.ok) {
    throw new Error('Error fetching courses');
  }

  const json = await res.json();
  return json.data || {};
};
