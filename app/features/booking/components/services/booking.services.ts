export const fetchCourses = async (schoolId: string) => {
  if (!schoolId) throw new Error("School ID is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tipo-cursos/${schoolId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Error fetching courses');
  }

  const json = await res.json();
  const data = json.data;
  // Normaliza a string[] soportando { courses: [...] }, array directo, objeto plano o string CSV
  const toStringArray = (input: any): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map((v) => {
        if (typeof v === 'string') return v;
        if (typeof v === 'object' && v !== null) {
          // Intenta varias claves comunes para label de curso
          const label = (v.label || v.name || v.curso || v.descripcionCurso || v.subcategoria || v.title || v.text);
          return label ? String(label) : '';
        }
        return String(v);
      }).filter(Boolean);
    }
    if (typeof input === 'string') return input.split(',').map((s) => s.trim()).filter(Boolean);
    if (typeof input === 'object') return Object.values(input).map((v) => String(v));
    return [];
  };
  // Manejar estructura anidada { courses: { schoolName, courses: string[] }, serviceMode }
  let list: string[] = [];
  if (Array.isArray(data?.courses)) {
    list = toStringArray(data.courses);
  } else if (Array.isArray(data?.courses?.courses)) {
    list = toStringArray(data.courses.courses);
  } else if (Array.isArray(data)) {
    list = toStringArray(data);
  } else if (Array.isArray(data?.list)) {
    list = toStringArray(data.list);
  } else if (typeof data?.courses === 'object' && data?.courses) {
    // Como último recurso, toma cualquier valor de ese objeto
    list = toStringArray((data as any).courses);
  } else {
    list = toStringArray(data);
  }
  return { courses: list };
};

export const fetchSchedulesByCourse = async (schoolId: string, course: string) => {
  if (!schoolId || !course) throw new Error('School ID and course are required');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/horarios/${schoolId}/${course}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Error fetching schedules');
  }

  const json = await res.json();
  return json.data || [];
};

export async function fetchWeeksBySchool(schoolId: string, course: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/semanas/${schoolId}/${course}`, { cache: 'no-store' });

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
    { signal, cache: 'no-store' }
  );

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Error al calcular reserva');
  }

  const json = await res.json();
  
  // Check if response includes advisor contact requirement (Nueva Zelanda)
  if (json.requiresAdvisor) {
    return {
      requiresAdvisor: true,
      canBookInstantly: json.canBookInstantly || false,
      countryCode: json.countryCode,
      advisorContact: json.advisorContact,
      message: json.message
    };
  }
  
  return json.data;
};

export const fetchCheapestCourseBySchool = async (
  schoolId: string,
  course: string,
  signal?: AbortSignal
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/curso-mas-economico/${schoolId}/${course}`,
    { signal, cache: 'no-store' }
  );

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Error al calcular reserva');
  }

  const json = await res.json();
  return json.data;
};
