"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select as BaseSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Versión genérica del tipo de opción
type SelectOption<T extends string> = {
  label: string;
  value: T;
};

interface SelectProps<T extends string> {
  options: Array<SelectOption<T>> | Record<string, T>;
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

export function Select<T extends string>({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opción",
}: SelectProps<T>) {
  const [selected, setSelected] = useState<T | "">(value ?? "");

  const optionsArray: Array<SelectOption<T>> = useMemo(() => {
    if (Array.isArray(options)) {
      return options;
    }

    return Object.entries(options).map(([label, val]) => ({
      label,
      value: val,
    }));
  }, [options]);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
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
        {optionsArray.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
}
