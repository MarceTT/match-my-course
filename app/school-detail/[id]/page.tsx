import { fetchSeoSchoolById } from "@/app/actions/seo";
import SchoolHome from "./SchoolHome";
import { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 🔁 Normaliza strings (acentos, espacios, etc.)
const normalizeSlug = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .replace(/\s+/g, "-");

// 📄 METADATOS PARA SEO (Server-side)
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const cursoParam = typeof searchParams?.curso === "string" ? searchParams.curso : undefined;
  const seoCourses = await fetchSeoSchoolById(params.id);

  const cursoMap: Record<string, string> = {
    "ingles-general": "Inglés General",
    "ingles-general-mas-sesiones-individuales": "Inglés General + Sesiones Individuales",
    "ingles-general-intensivo": "Inglés General Intensivo",
    "ingles-general-orientado-a-negocios": "Inglés de Negocios",
    "ingles-visa-de-trabajo": "Programa Estudio y Trabajo (25 semanas)",
  };

  let seo;

  if (cursoParam && cursoMap[cursoParam]) {
    seo = seoCourses.find(
      (c: any) => (c.subcategoria || "").trim().toLowerCase() === cursoMap[cursoParam].toLowerCase()
    );
  }

  if (!seo) seo = seoCourses[0];

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.keywordPrincipal,
    alternates: {
      canonical: `https://www.matchmycourse.com${seo.url}`,
    },
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      url: `https://www.matchmycourse.com${seo.url}/${params.id}?schoolId=${params.id}&curso=${searchParams?.curso}&semanas=1&horario=PM&city=${searchParams?.city}`,
      type: "website",
    },
  };
}

// ✅ PÁGINA PRINCIPAL
export default async function Page({ params, searchParams }: Props) {
  const seoCourses = await fetchSeoSchoolById(params.id);

  // Selección del curso SEO actual
  const cursoParam = typeof searchParams?.curso === "string" ? searchParams.curso : undefined;
  let selectedSeo = seoCourses.find(
    (c: any) => normalizeSlug(c.subcategoria || "") === normalizeSlug(cursoParam || "")
  );
  if (!selectedSeo) selectedSeo = seoCourses[0];

  return (
    <>
      {/* 📌 JSON-LD para Rich Results (SEO estructurado) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": selectedSeo?.h1 || "Curso de inglés en el extranjero",
            "description":
              selectedSeo?.metaDescription ||
              "Estudia inglés en Irlanda con MatchMyCourse. Cursos personalizados y flexibles.",
            "provider": {
              "@type": "Organization",
              "name": "Match My Course",
              "sameAs": "https://www.matchmycourse.com",
              "logo": "https://www.matchmycourse.com/logo.png",
            },
            "educationalCredentialAwarded": selectedSeo?.subcategoria,
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Presencial",
              "instructor": {
                "@type": "Person",
                "name": `Profesores de ${selectedSeo?.escuela}`,
              },
              "location": {
                "@type": "Place",
                "name": selectedSeo?.escuela,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": selectedSeo?.ciudad || "Irlanda",
                  "addressCountry": "IE",
                },
              },
              "startDate": "2025-08-01",
              "endDate": "2025-12-20",
            },
          }),
        }}
      />
      <SchoolHome
        schoolId={params.id}
        seoCourses={seoCourses}
      />
    </>
  );
}
