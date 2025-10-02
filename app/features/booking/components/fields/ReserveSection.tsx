import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { Loader2 } from "lucide-react";
import ContactButtonWhatsApp from "../forms/ContactButtonWhatsApp";

interface ReserveSectionProps {
  onReserve: () => void;
  amount?: number;
  reserveLabel?: string;
  pendingToPay?: string;
  notes?: string[];
  buttonText?: string;
  disabled?: boolean;
  reservation?: { total: number; offer: number };
  reservationData?: Reservation;
  horizontalButtons?: boolean;
}

const ReserveSection = ({
  onReserve,
  amount = 100,
  reserveLabel = "Reserva ahora con solo",
  pendingToPay = "Pendiente por pagar",
  notes = ["Con tu reserva aseguras tu cupo y tu matricula."],
  buttonText = "Finalizar reserva",
  disabled = false,
  reservation,
  reservationData,
  horizontalButtons = false,
}: ReserveSectionProps) => {
  return (
    <div className="pt-2">
      <hr className="my-2 border-gray-300 mb-4" />
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-gray-500 italic">
          {reserveLabel}
        </span>
        <span className="text-xl font-bold text-[#1F2937]">€{amount}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <p className="text-sm text-gray-500 mb-2 font-semibold italic">
          {pendingToPay}
        </p>
        <p className="text-xl font-bold text-[#1F2937]">
          €{(reservation?.offer || reservation?.total || 0) - amount}
        </p>
      </div>
      {notes.map((text, index) => (
        <p key={index} className="text-xs text-gray-500 mb-4 italic">
          {text}
        </p>
      ))}
      {horizontalButtons ? (
        <div className="mt-2 flex flex-row gap-1 items-stretch">
          <Button
            className="flex-1 basis-0 min-w-0 bg-[#FF385C] hover:bg-[#E51D58] text-white px-2 py-2 rounded font-semibold inline-flex items-center justify-center gap-2 group transition-all text-[11px] sm:text-sm md:text-base leading-tight text-center whitespace-normal break-words"
            onClick={onReserve}
            disabled={disabled}
          >
            {disabled ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <span>{buttonText}</span>
            )}
          </Button>
          {reservationData && (
            <ContactButtonWhatsApp
              reservation={reservationData}
              className="flex-1 basis-0 min-w-0 px-2 py-2 text-[11px] sm:text-sm md:text-base leading-tight text-center whitespace-normal break-words"
            />
          )}
        </div>
      ) : (
        <>
          <Button
            className="w-full bg-[#FF385C] hover:bg-[#E51D58] text-white py-2 rounded font-extrabold"
            onClick={onReserve}
            disabled={disabled}
          >
            {disabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              buttonText
            )}
          </Button>
          {reservationData && (
            <ContactButtonWhatsApp reservation={reservationData} />
          )}
        </>
      )}
    </div>
  );
};

export default ReserveSection;
