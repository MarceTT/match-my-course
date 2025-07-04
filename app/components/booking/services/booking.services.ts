export const fetchCourses = async (schoolId: string) => {
  if (!schoolId) throw new Error("School ID is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tipo-cursos/${schoolId}`);

  if (!res.ok) {
    throw new Error('Error fetching courses');
  }

  const json = await res.json();
  return json.data || {};
};

export const fetchSchedulesByCourse = async (schoolId: string, course: string) => {
  if (!schoolId || !course) throw new Error('School ID and course are required');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/horarios/${schoolId}/${course}`);

  if (!res.ok) {
    throw new Error('Error fetching schedules');
  }

  const json = await res.json();
  return json.data || [];
};

export async function fetchWeeksBySchool(schoolId: string, course: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/semanas/${schoolId}/${course}`);

  if (!res.ok) {
    throw new Error("Error fetching weeks");
  }

  const json = await res.json();
  return json.data.semanas || [];
}

export const fetchReservationCalculation = async (
  schoolId: string,
  course: string,
  weeks: number,
  schedule: string,
  signal?: AbortSignal // opcional, por si quieres abortar la consulta
) => {
  const query = new URLSearchParams({
    schoolId,
    curso: course,
    semanas: weeks.toString(),
    horario: schedule,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/calculo-reserva/${schoolId}?${query}`,
    { signal }
  );

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Error al calcular reserva');
  }

  const json = await res.json();
  return json.data;
};
