"use server";

import { SchoolDetailsResponse } from "@/app/lib/types";

export async function fetchSchoolsWithDetails() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener escuelas");
  return res.json();
  }

  export const fetchSchoolById = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/front/school/${id}`, {
      next: { revalidate: 60 },
    });
  
    if (!res.ok) return null;
  
    const json = await res.json();
    return json.data;
  };

  export async function fetchSchools(courseType: string): Promise<SchoolDetailsResponse> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-by-type?course=${courseType}`;
    console.log("FETCH URL:", url);
  
    const res = await fetch(url, { cache: "no-store" });
  
    if (!res.ok) {
      console.error("Error en la respuesta:", res.status);
      throw new Error("Error al obtener escuelas");
    }

    console.log("Response:", res);
  
    const json = await res.json();
  
    return json;
  }
  