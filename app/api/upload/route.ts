import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    formData.forEach((value, key) => console.log(`➡️ ${key}:`, value));
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Cookie": `token=${token}`
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
