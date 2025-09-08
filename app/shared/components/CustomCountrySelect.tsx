"use client";

import React from "react";
import { Select } from "../../../components/common/Select";

export interface Country {
  label: string;
  value: string;
  flag: string;
  code: string;
  order?: number;
}

interface CountrySelectProps {
  options: Country[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showFlag?: boolean;
  showCode?: boolean;
  showNameInSelectedValue?: boolean;
  className?: string;
}

export function CustomCountrySelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar país",
  showFlag = true,
  showCode = true,
  showNameInSelectedValue = true,
  className,
}: CountrySelectProps) {
  const allowedCountries = [
    "CL", "ES", "AR", "BR", "UY", "MX", "PA", "NI",
    "CR", "SV", "GT", "PY", "FR", "DE", "SE", "CH", "PL"
  ];

  const filteredOptions = options
    .filter((country) => allowedCountries.includes(country.value))
    .sort((a, b) => {
      if (a.order && b.order) return a.order - b.order;
      if (a.order) return -1;
      if (b.order) return 1;
      return a.label.localeCompare(b.label);
    });

  return (
    <div className={className}>
      <Select<string, { flag: string; code: string }>
        options={filteredOptions}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        renderOption={(option) => (
          <div className="flex items-center justify-between gap-2">
            {showFlag && <span className="text-xl">{option.flag}</span>}
            <span>{option.label}</span>
            {showCode && <span className="text-sm text-gray-500">({option.code})</span>}
          </div>
        )}
        formatSelectedValue={(value) => {
          const country = filteredOptions.find((c) => c.value === value);
          if (!country) {
            return (
              <div className="flex items-center gap-2">
                {showFlag && <span className="text-xl">🌎</span>} {/* bandera genérica */}
                <span>{placeholder}</span>
              </div>
            );
          }

          return (
            <div className="flex items-center gap-2">
              {showFlag && <span className="text-xl">{country.flag}</span>}
              {showNameInSelectedValue && <span>{country.label}</span>}
              {showCode && <span>{country.code}</span>}
            </div>
          );
        }}
      />
    </div>
  );
}
