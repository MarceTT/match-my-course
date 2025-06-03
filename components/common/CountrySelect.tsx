'use client'

import Select, { StylesConfig } from "react-select"
import React from 'react'

interface Country {
  value: string
  label: string
  code: string
  flag: string
}

const countries: Country[] = [
  { value: "CL", label: "Chile", code: "+56", flag: "🇨🇱" },
  { value: "ES", label: "España", code: "+34", flag: "🇪🇸" },
  { value: "BR", label: "Brasil", code: "+55", flag: "🇧🇷" },
  { value: "AR", label: "Argentina", code: "+54", flag: "🇦🇷" },
  { value: "PE", label: "Perú", code: "+51", flag: "🇵🇪" },
  { value: "CO", label: "Colombia", code: "+57", flag: "🇨🇴" },
  { value: "MX", label: "México", code: "+52", flag: "🇲🇽" },
  { value: "EC", label: "Ecuador", code: "+593", flag: "🇪🇨" },
  { value: "UY", label: "Uruguay", code: "+598", flag: "🇺🇾" },
  { value: "PY", label: "Paraguay", code: "+595", flag: "🇵🇾" },
  { value: "BO", label: "Bolivia", code: "+591", flag: "🇧🇴" },
  { value: "VE", label: "Venezuela", code: "+58", flag: "🇻🇪" },
]

interface CountrySelectProps {
  value?: Country
  onChange: (value: Country | null) => void
}

// Definir correctamente los estilos con Typescript
const customStyles: StylesConfig<Country, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgb(249 250 251)",
    borderColor: "rgb(229 231 235)",
    height: "48px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "rgb(209 213 219)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgb(59 130 246)" : "white",
    "&:hover": {
      backgroundColor: state.isSelected ? "rgb(59 130 246)" : "rgb(243 244 246)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <Select
      options={countries}
      value={value}
      onChange={onChange}
      styles={customStyles}
      getOptionLabel={(country) => `${country.flag} ${country.label} (${country.code})`}
      formatOptionLabel={(country) => (
        <div className="flex items-center gap-2">
          <span className="text-xl">{country.flag}</span>
          <span>{country.code}</span>
        </div>
      )}
    />
  )
}

export default CountrySelect
