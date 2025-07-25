import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { Loader2 } from "lucide-react";

interface ReserveSectionProps {
  onReserve: () => void;
  amount?: number;
  reserveLabel?: string;
  pendingToPay?: string;
  notes?: string[];
  buttonText?: string;
  disabled?: boolean;
  reservation?: {total: number, offer: number};
}

const ReserveSection = ({
  onReserve,
  amount = 100,
  reserveLabel = "Reserva ahora con solo",
  pendingToPay = "Pendiente por pagar",
  notes = [
    "Con tu reserva aseguras tu cupo y tu matricula.",
  ],
  buttonText = "Finalizar reserva",
  disabled = false,
  reservation,
}: ReserveSectionProps) => {
  console.log("reservation reserva",reservation);
  return (
    <div className="pt-2">
      <hr className="my-2 border-gray-300 mb-4" />
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-gray-500 italic">{reserveLabel}</span>
        <span className="text-xl font-bold text-[#1F2937]">€{amount}</span>
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <p className="text-sm text-gray-500 mb-2 font-semibold italic">{pendingToPay}</p>
        <p className="text-xl font-bold text-[#1F2937]">€{(reservation?.total ?? 0) - amount}</p>
      </div>
      {notes.map((text, index) => (
        <p key={index} className="text-xs text-gray-500 mb-4 italic">
          {text}
        </p>
      ))}
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
    </div>
  );
};

export default ReserveSection;
