import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import { courseToLabelMap, isValidCourse } from "@/lib/helpers/courseHelper";
import {
  GraduationCap,
  MapPin,
  Clock,
  Users,
  Calendar,
  Home,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  reservation: Reservation | null;
  formData: Partial<ReservationFormData>;
  onNext: () => void;
}

export default function SummaryStepOne({ reservation, formData, onNext }: Props) {
  const courseKey = formData.courseType ?? reservation?.courseKey;
  const finalPrice = reservation?.total ?? reservation?.offer ?? reservation?.basePrice;
  const basePriceToShow = reservation?.basePrice ?? null;

  console.log("🗓 Fecha en resumen:", formData.startDate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Item icon={<GraduationCap className="h-5 w-5 text-blue-600" />} label="Escuela" value={reservation?.schoolName} />
        <Item icon={<MapPin className="h-5 w-5 text-green-600" />} label="Ciudad" value={reservation?.city} />
        <Item icon={<GraduationCap className="h-5 w-5 text-purple-600" />} label="Curso" value={isValidCourse(courseKey) ? courseToLabelMap[courseKey] : "No seleccionado"} />
        <Item icon={<Clock className="h-5 w-5 text-orange-600" />} label="Modalidad" value={formData.schedule?.toUpperCase() ?? reservation?.schedule.toUpperCase()} />
        <Item icon={<Users className="h-5 w-5 text-indigo-600" />} label="Semanas de estudio" value={`${formData.studyDuration ?? reservation?.weeks} semanas`} />
        <Item icon={<Calendar className="h-5 w-5 text-teal-600" />} label="Inicio" value={formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : "No seleccionado"} />
        {formData.accommodation && (
          <Item
          icon={<Home className="h-5 w-5 text-gray-600" />}
          label="Alojamiento"
          value={
            formData.accommodation === "posterior"
              ? "Lo veo más adelante"
              : formData.accommodation === "si"
              ? "Sí"
              : formData.accommodation === "no"
              ? "No"
              : undefined
          }
        />
        )}
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-gray-900 font-semibold">Precio final</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-green-700">€{(finalPrice ?? 0).toLocaleString()}</span>

          {typeof basePriceToShow === "number" && typeof finalPrice === "number" && basePriceToShow > finalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">€{basePriceToShow.toLocaleString()}</span>
              <Badge className="ml-2 bg-green-100 text-green-800">
                Ahorro de €{(basePriceToShow - finalPrice).toLocaleString()}
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Gastos adicionales</h4>
            <p className="text-sm text-amber-700">Matrícula, materiales, examen de salida, seguro médico</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | number | null }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900 mb-1">{label}</h4>
        <p className="text-gray-700 text-sm">{value ?? "No disponible"}</p>
      </div>
    </div>
  );
}
