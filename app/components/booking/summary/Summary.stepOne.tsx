import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import { courseToLabelMap } from "@/lib/constants/courses";

type Props = {
  reservation: Reservation;
  formData: Partial<ReservationFormData>;
  onNext: () => void;
};

export default function SummaryStepOne({ reservation, formData, onNext }: Props) {
  return (
    <div className="space-y-2 text-sm text-gray-700">
      <p><strong>Escuela:</strong> {reservation.schoolName}</p>
      <p><strong>Ciudad:</strong> Dublín</p>
      <p><strong>Curso:</strong> {formData.courseType ? courseToLabelMap[formData.courseType] : "No seleccionado"}</p>
      <p><strong>Modalidad:</strong> {reservation.schedule}</p>
      <p><strong>Semanas de estudio:</strong> {reservation.weeks}</p>
      <p><strong>Inicio:</strong> {formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : "No seleccionado"}</p>
      {formData.accommodation && <p><strong>Alojamiento:</strong> {formData.accommodation}</p>}
      <p><strong>Precio final:</strong> €{reservation.basePrice?.toLocaleString()}</p>
      <p><strong>Gastos adicionales:</strong> Matrícula, materiales, exámen de salida, seguro médico.</p>
      <div className="pt-6">
        <Button className="w-full bg-red-500 hover:bg-red-600" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
