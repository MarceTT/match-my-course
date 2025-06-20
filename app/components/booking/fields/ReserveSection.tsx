import { Button } from "@/components/ui/button";

interface ReserveSectionProps {
  onReserve: () => void;
  amount?: number;
  reserveLabel?: string;
  notes?: string[];
  buttonText?: string;
}

const ReserveSection = ({
  onReserve,
  amount = 100,
  reserveLabel = "Reserva",
  notes = [
    "La parte que resta será pagada en destino.",
    "Es parte del valor total que pagarás.",
  ],
  buttonText = "Reservar",
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
        className="w-full bg-red-500 hover:bg-red-600"
        onClick={onReserve}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ReserveSection;
