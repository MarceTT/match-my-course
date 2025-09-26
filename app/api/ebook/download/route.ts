import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

// Default remote PDF location (can be overridden via ?url=)
const DEFAULT_PDF_URL = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Ebook+Irlanda+Estudio+y+Trabajo.pdf"
);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const remoteUrl = url.searchParams.get("url") || DEFAULT_PDF_URL;
    const filename =
      url.searchParams.get("filename") || "Ebook-Irlanda-Estudio-y-Trabajo.pdf";

    const upstream = await fetch(remoteUrl, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return new Response("Archivo no encontrado", { status: 404 });
    }

    const headers: HeadersInit = new Headers();
    const contentType = upstream.headers.get("content-type") || "application/pdf";
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename.replace(/"/g, '')}"`
    );
    const len = upstream.headers.get("content-length");
    if (len) headers.set("Content-Length", len);

    return new Response(upstream.body, { headers });
  } catch (err) {
    console.error("[ebook/download] error: ", err);
    return new Response("Error interno al descargar", { status: 500 });
  }
}

