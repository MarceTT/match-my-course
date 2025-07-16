import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AccommodationSectionProps {
  value?: "si" | "no" | "posterior";
  onChange: (val: "si" | "no" | "posterior") => void;
  disabled?: boolean;
}

const AccommodationSection = ({ value, onChange, disabled = false }: AccommodationSectionProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <label className="block text-sm text-gray-600 mb-1">
          Alojamiento de la escuela para tus primeras semanas.
        </label>
      </div>
      <div className="flex gap-2">
        <Select
          value={value || ""}
          onValueChange={(val) => {
            if (val === "si" || val === "no" || val === "posterior") {
              onChange(val);
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="si">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="posterior">Lo veo mas adelante</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        El valor semanal de un alojamiento es de €250 - €350 euros semanales y
        adicional al valor del curso de inglés.
      </p>
    </div>
  );
};

export default AccommodationSection;
