import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const user = (session as any)?.user;
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Extraer id desde la URL para evitar conflictos con tipos de rutas
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const token = user.accessToken as string;

    // 2. Obtener FormData directamente
    const formData = await request.formData();

    // 3. Enviar TODO el FormData directamente al backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
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
