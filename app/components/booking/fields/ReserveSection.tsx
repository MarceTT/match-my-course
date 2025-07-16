import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ReserveSectionProps {
  onReserve: () => void;
  amount?: number;
  reserveLabel?: string;
  notes?: string[];
  buttonText?: string;
  disabled?: boolean;
}

const ReserveSection = ({
  onReserve,
  amount = 100,
  reserveLabel = "Reserva",
  notes = [
    "La parte que resta será pagada en destino.",
    "Es parte del valor total que pagarás.",
  ],
  buttonText = "Finalizar reserva",
  disabled = false,
}: ReserveSectionProps) => {
  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between text-sm mb-2">
        <span>{reserveLabel}</span>
        <span className="font-semibold">€{amount}</span>
      </div>
      {notes.map((text, index) => (
        <p key={index} className="text-xs text-gray-500 mb-4">
          {text}
        </p>
      ))}
      <Button
        className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold"
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
