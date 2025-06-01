"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface GenericSelectProps<T extends string> {
  options: Record<string, T>; // label → id
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

export default function GenericSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opción",
}: GenericSelectProps<T>) {
  const [selected, setSelected] = useState<T | "">(value ?? "");

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  return (
    <Select
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
    </Select>
  );
}
