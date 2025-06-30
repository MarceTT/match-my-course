// import { buildReservationQuery } from "../reservation";

export const getSchoolRedirectUrl = (
  schoolId: string,
  params: {
    course?: string;
    weeks?: number;
    city?: string;
    schedule?: string;
  } = {}
) => {
  const searchParams = new URLSearchParams();

  searchParams.set('schoolId', schoolId);

  if (params.course) searchParams.set('curso', params.course);
  if (params.weeks) searchParams.set('semanas', String(params.weeks));
  if (params.city) searchParams.set('ciudad', params.city);
  if (params.schedule) searchParams.set('horario', params.schedule);

  const queryString = searchParams.toString();
  return queryString ? `/school-detail/${schoolId}?${queryString}` : `/school-detail/${schoolId}`;
};
