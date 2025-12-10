import School from "../components/School";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load pagination component which loads after schools are visible
const ClientSchoolPagination = dynamic(() => import("./ClientSchoolPagination"), {
  loading: () => <div className="mt-8 h-20 bg-gray-100 rounded-lg" />,
});

interface SchoolData {
  _id: string;
  name: string;
  city: string;
  mainImage: string;
  ponderado?: number;
  prices?: Array<{
    horarios?: {
      precio?: string | number;
    };
  }>;
  lowestPrice?: number;
  courseTypes?: string[];
  cursosEos?: any[];
  generalEnglishPrice?: any; // Will be passed as-is to School component
  specificSchedule?: any;
}

async function fetchInitialSchools(): Promise<{ schools: SchoolData[] }> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      console.warn('NEXT_PUBLIC_BACKEND_URL not configured, returning empty schools');
      return { schools: [] };
    }

    const res = await fetch(
      `${backendUrl}/front/schools?limit=12`,
      {
        next: { revalidate: 900 }, // Cache for 15 minutes
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch schools: ${res.status} ${res.statusText}`);
      return { schools: [] };
    }

    const response = await res.json();
    // La estructura de la API es: { data: { schools: [...], currentPage, totalPages, hasMore } }
    return { schools: response.data?.schools || [] };
  } catch (error) {
    console.error('Error fetching initial schools:', error);
    return { schools: [] };
  }
}

export default async function SchoolListServer() {
  const { schools } = await fetchInitialSchools();

  if (!schools || schools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay escuelas disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {schools.map((school, idx) => {
          const price =
            school.prices?.[0]?.horarios?.precio &&
            !isNaN(Number(school.prices[0].horarios.precio))
              ? Number(school.prices[0].horarios.precio)
              : 0;

          return (
            <School
              key={school._id}
              _id={school._id}
              name={school.name}
              location={school.city}
              image={rewriteToCDN(school.mainImage) || "/placeholder.svg"}
              rating={parseFloat(String(school.ponderado ?? 0))}
              price={price}
              lowestPrice={school.lowestPrice}
              courseTypes={school.courseTypes}
              seoCourses={school.cursosEos}
              generalEnglishPrice={school.generalEnglishPrice}
              specificSchedule={school.specificSchedule}
              // First 6 schools get priority loading for LCP optimization
              priority={idx < 6}
            />
          );
        })}
      </div>

      {/* Client component handles infinite scroll and pagination */}
      <ClientSchoolPagination initialSchools={schools} />

      {/* SEO Internal Links Section */}
      <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Explora Escuelas por Ciudad
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link
            href="/escuelas/dublin"
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Dublin</span>
          </Link>
          <Link
            href="/escuelas/cork"
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Cork</span>
          </Link>
          <Link
            href="/escuelas/galway"
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Galway</span>
          </Link>
          <Link
            href="/escuelas/limerick"
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Limerick</span>
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="/escuelas"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Todas las Escuelas
          </Link>
        </div>
      </div>
    </>
  );
}
