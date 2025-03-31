import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/app/utils/requestServer";

export const config = {
  api: {
    bodyParser: false, // Esto es esencial para recibir FormData
  },
};

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    // 1. Verificar autenticación
    const token = await refreshAccessToken();
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Obtener FormData directamente
    const formData = await req.formData();

    // 3. Enviar TODO el FormData directamente al backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      body: formData, // Enviamos el FormData original sin modificaciones
    });

    // 4. Devolver la respuesta del backend tal cual
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar la escuela" },
      { status: 500 }
    );
  }
}