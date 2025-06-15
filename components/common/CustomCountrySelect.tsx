"use client";

import React from "react";
import { Select } from "./Select";

/**
 * Representa un país con información para mostrar en el selector.
 */
export interface Country {
  label: string; // Nombre del país
  value: string; // Código ISO del país (ej: "CL")
  flag: string;  // Emoji de la bandera
  code: string;  // Código telefónico internacional (ej: "+56")
}

/**
 * Props para el componente CountrySelect.
 */
interface CountrySelectProps {
  /**
   * Lista de países disponibles para seleccionar.
   */
  options: Country[];

  /**
   * Código del país actualmente seleccionado (ej: "CL").
   */
  value?: string;

  /**
   * Función que se ejecuta al seleccionar un país.
   */
  onChange: (value: string) => void;

  /**
   * Texto que se muestra cuando no hay selección.
   * @default "Seleccionar país"
   */
  placeholder?: string;

  /**
   * Controla si se muestra o no la bandera en las opciones.
   * @default true
   */
  showFlag?: boolean;

  /**
   * Controla si se muestra o no el código telefónico en las opciones.
   * @default true
   */
  showCode?: boolean;

  /**
   * Controla si se muestra el nombre del país en el valor seleccionado.
   * Si es false, se mostrarán solo la bandera y/o el código.
   * @default true
   */
  showNameInSelectedValue?: boolean;
}

/**
 * Componente Select específico para países, que permite mostrar bandera, nombre y código telefónico.
 */
export function CustomCountrySelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar país",
  showFlag = true,
  showCode = true,
  showNameInSelectedValue = true,
}: CountrySelectProps) {
  return (
    <Select<string, { flag: string; code: string }>
      options={options}
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
        const country = options.find((c) => c.value === value);
        if (!country) return placeholder;

        return (
          <div className="flex items-center gap-2">
            {showFlag && <span className="text-xl">{country.flag}</span>}
            {showNameInSelectedValue && <span>{country.label}</span>}
            {showCode && <span>{country.code}</span>}
          </div>
        );
      }}
    />
  );
}
