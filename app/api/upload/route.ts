import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/app/utils/requestServer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Permite archivos grandes
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const token = await refreshAccessToken();

    if (!token) {
      return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }
    formData.forEach((value, key) => console.log(`➡️ ${key}:`, value));
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: formData,
      });

    const responseData = await backendResponse.json();

    console.log("📥 Respuesta del backend:", responseData); 

    if (!backendResponse.ok) {
      return NextResponse.json(responseData, { status: backendResponse.status });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al subir archivos" }, { status: 500 });
  }
}
