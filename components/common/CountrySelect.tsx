"use client";

import React from "react";
import { Select } from "./Select"; // importa tu Select genérico

// Define el tipo Country con código
export interface Country {
  label: string;
  value: string;
  flag: string;
  code: string; // código telefónico internacional, ej: +56
}

interface CountrySelectProps {
  options: Country[];
  value?: string; // valor seleccionado, será el value del país
  onChange: (value: string) => void;
  placeholder?: string;
  showFlag?: boolean;
  showCode?: boolean;
}

export function CountrySelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar país",
  showFlag = true,
  showCode = true,
}: CountrySelectProps) {
  // Mapea las opciones para adaptar la etiqueta al formato deseado
  const mappedOptions = options.map(({ label, value, flag, code }) => {
    let displayLabel = label;

    if (showFlag && showCode) {
      displayLabel = `${flag} ${label} (${code})`;
    } else if (showFlag) {
      displayLabel = `${flag} ${label}`;
    } else if (showCode) {
      displayLabel = `${label} (${code})`;
    }

    return {
      label: displayLabel,
      value,
    };
  });

  return (
    <Select
      options={mappedOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}