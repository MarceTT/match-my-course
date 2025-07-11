
const normalizeSlug = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  
  export async function getSchoolRedirectUrl(
    schoolId: string,
    { course, weeks, schedule, city }: { course: string; weeks: number; schedule: string; city: string }
  ): Promise<string> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seo/school/${schoolId}`);
      const { data } = await res.json();
  
      const matched = data.find(
        (item: any) => normalizeSlug(item.subcategoria || "") === normalizeSlug(course)
      );
  
      const baseUrl = matched?.url || `/school-detail/${schoolId}`;
      const params = new URLSearchParams({
        semanas: weeks.toString(),
        horario: schedule,
        city: city || "",
      });
  
      return `${baseUrl}?${params.toString()}`;
    } catch (error) {
      console.error("Error in getSchoolRedirectUrl:", error);
      return `/school-detail/${schoolId}`;
    }
  }
  