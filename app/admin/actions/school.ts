"use server";

import { School, SchoolResponse } from "@/app/types";
import { cookies } from "next/headers";

export async function getSchools(): Promise<School[] | { error: string }> {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
        console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
        return [];
      }

    const data: SchoolResponse = await res.json();

    if (!data.data || !Array.isArray(data.data.schools)) {
        console.error("❌ Formato de respuesta inválido:", data);
        return [];
      }

    return data.data.schools;
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return [];
  }
}

export async function createSchool(formData: FormData) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`,
      },
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }

    const responseData = await res.json();
    if (!res.ok) {
        return { error: responseData.message || "Error al crear la escuela" };
      }
      return { success: true, data: responseData.school };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}

export async function updateSchool(id: string, formData: FormData) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "PUT",
      headers: {
        "Cookie": `token=${token}`,
      },
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }

    const responseData = await res.json();
    if (!res.ok) {
        return { error: responseData.message || "Error al actualizar la escuela" };
      }
      return { success: true, data: responseData.school };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}

export async function toggleSchoolStatus(id: string, status: boolean) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/disable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ status: !status }),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, responseData.message);
      return { error: responseData.message || "Error al cambiar el estado de la escuela" };
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}

export async function getSchoolById(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }
    const responseData = await res.json();

    if (!responseData?.data?.school) {
        return { error: "Datos no encontrados para esta escuela." };
      }
    return { success: true, data: responseData.data.school };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}

export async function deleteImageSchool(id: string, imageKey: string, imageType: "galleryImages" | "logo" | "mainImage") {

  //console.log("🔥 Eliminando imagen:", imageKey, "de tipo:", imageType, "con el id", id);
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}/deleteImage`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ imageKey, imageType }),
    });
    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }
    const responseData = await res.json();
    console.log("🔥 Respuesta del backend:", responseData);
    return { success: true, data: responseData.data.school };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}
