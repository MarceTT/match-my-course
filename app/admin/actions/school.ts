"use server";

import { School, SchoolResponse } from "@/app/types";
import axiosInstance from "@/app/utils/apiClient";
import { refreshAccessToken } from "@/app/utils/requestServer";

export async function getSchools(): Promise<School[] | { error: string }> {
  try {

    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
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
    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }

    const responseData = await res.json();
//     console.log("🚀 Response:", responseData);
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
    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
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
    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/disable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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

export async function getSchoolById(id: string): Promise<{ data?: School; error?: string }> {
  try {
    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const responseData = await res.json();

    if (!res.ok || !responseData?.data?.school) {
      console.error("❌ Error en getSchoolById", responseData);
      return { error: "Error al obtener escuela" };
    }

    return { data: responseData.data.school };
  } catch (err) {
    console.error("❌ Error general en getSchoolById:", err);
    return { error: "Error inesperado" };
  }
}

export async function deleteImageSchool(
  id: string,
  imageKey: string,
  imageType: "galleryImages" | "logo" | "mainImage"
) {
  try {
    const token = await refreshAccessToken();
    if (!token) return { error: "No autorizado" };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}/deleteImage`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageKey, imageType }),
      }
    );

    if (!res.ok) {
      console.error("❌ Error en la respuesta del backend:", res.status, res.statusText);
      return { error: "Error en la solicitud" };
    }

    const responseData = await res.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return { error: "Error en la solicitud" };
  }
}
