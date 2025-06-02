"use client";

import { useEffect, useState } from "react";
import {
  Select as BaseSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectProps<T extends string> {
  options: Record<string, T>; // label → id
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

/**
 * Componente Select genérico que recibe un objeto 
 * de opciones (label → id) y controla su valor con 
 * estado interno.
 *
 * @example
 * const options = {
 *   "Inglés general": "ingles-general",
 *   "Inglés intensivo": "ingles-intensivo",
 * };
 *
 * <Select
 *   options={options}
 *   value={curso}
 *   onChange={(newValue) => setCurso(newValue)}
 *   placeholder="Seleccionar..."
 * />
 */
export function Select<T extends string>({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opción",
}: SelectProps<T>) {
  const [selected, setSelected] = useState<T | "">(value ?? "");

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  return (
    <BaseSelect
      value={selected}
      onValueChange={(val) => {
        setSelected(val as T);
        onChange(val as T);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([label, id]) => (
          <SelectItem key={id} value={id}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
}
