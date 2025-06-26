import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import { courseToLabelMap, isValidCourse } from "@/lib/helpers/courseHelper";

type Props = {
  reservation: Reservation | null;
  formData: Partial<ReservationFormData>;
  onNext: () => void;
};

export default function SummaryStepOne({ reservation, formData, onNext }: Props) {
  const courseKey = formData.courseType ?? reservation?.courseKey;

  return (
    <div className="space-y-2 text-sm text-gray-700">
      <p>
        <strong>Escuela:</strong>{" "}
        {reservation?.schoolName}
      </p>
      <p>
        <strong>Ciudad:</strong>{" "}
        {reservation?.city}
      </p>
      <p>
        <strong>Curso:</strong>{" "}
        {isValidCourse(courseKey) ? courseToLabelMap[courseKey] : "No seleccionado"}
      </p>
      <p>
        <strong>Modalidad:</strong>{" "}
        {formData.schedule?.toUpperCase() ?? reservation?.schedule.toUpperCase()}
      </p>
      <p>
        <strong>Semanas de estudio:</strong>{" "}
        {formData.studyDuration ?? reservation?.weeks}
      </p>
      <p>
        <strong>Inicio:</strong>{" "}
        {formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : "No seleccionado"}
      </p>
      {formData.accommodation && (
        <p>
          <strong>Alojamiento:</strong>{" "}
          {formData.accommodation}
        </p>
      )}
      <p>
        <strong>Precio final:</strong>{" "}
        €{reservation?.basePrice?.toLocaleString()}
      </p>
      <p>
        <strong>Gastos adicionales:</strong>{" "}
        Matrícula, materiales, exámen de salida, seguro médico.
      </p>
      <div className="pt-6">
        <Button className="w-full bg-red-500 hover:bg-red-600" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
