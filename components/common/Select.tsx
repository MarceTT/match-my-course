"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select as BaseSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectProps<T extends string> {
  options: Array<{ label: string; value: T; flag?: string }> | Record<string, T>;
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

  // Normalizar options a array si es un objeto Record
  const optionsArray = useMemo(() => {
    return Array.isArray(options)
      ? options
      : Object.entries(options).map(([label, val]) => ({
          label,
          value: val,
        }));
  }, [options]);

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
        {optionsArray.map(({ label, value, flag }) => (
          <SelectItem key={value} value={value}>
            {flag && <span className="mr-2">{flag}</span>}
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
}
