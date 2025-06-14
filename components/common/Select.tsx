"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select as BaseSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SelectOption<T extends string, Extra = unknown> = {
  label: string;
  value: T;
} & Extra;

interface SelectProps<T extends string, Extra = unknown> {
  options: Array<SelectOption<T, Extra>> | Record<string, T>;
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  renderOption?: (option: SelectOption<T, Extra>) => React.ReactNode;
  formatSelectedValue?: (value: T) => React.ReactNode;
}

export function Select<T extends string, Extra = unknown>({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opción",
  renderOption,
  formatSelectedValue,
}: SelectProps<T, Extra>) {
  const [selected, setSelected] = useState<T | "">(value ?? "");

  const optionsArray: Array<SelectOption<T, Extra>> = useMemo(() => {
    if (Array.isArray(options)) {
      return options;
    }
    return Object.entries(options).map(([label, val]) => ({
      label,
      value: val as T,
    })) as Array<SelectOption<T, Extra>>;
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
        <SelectValue placeholder={placeholder}>
          {formatSelectedValue
            ? formatSelectedValue(selected as T)
            : optionsArray.find((opt) => opt.value === selected)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {optionsArray.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {renderOption ? renderOption(option) : option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
}
