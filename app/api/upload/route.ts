import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const session = await auth();
    const user = (session as any)?.user;
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const token = user.accessToken as string;
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(responseData, { status: backendResponse.status });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al subir archivos" }, { status: 500 });
  }
}
