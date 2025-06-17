import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AccommodationSectionProps {
  value?: "si" | "no";
  onChange: (val: "si" | "no") => void;
}

const AccommodationSection = ({ value, onChange }: AccommodationSectionProps) => {
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
            if (val === "si" || val === "no") {
              onChange(val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Elegir" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="si">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
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
