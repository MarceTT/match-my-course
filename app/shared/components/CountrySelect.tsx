'use client'

import Select, { StylesConfig, GroupBase } from "react-select"
import React from 'react'

interface Country {
  value: string
  label: string
  code: string
  flag: string
  order?: number
}

interface CountryGroup extends GroupBase<Country> {
  label: string
  options: Country[]
}

// Lista completa con orden
const countries: Country[] = [
  { value: "CL", label: "Chile", code: "+56", flag: "🇨🇱", order: 1 },
  { value: "AR", label: "Argentina", code: "+54", flag: "🇦🇷", order: 2 },
  { value: "MX", label: "México", code: "+52", flag: "🇲🇽", order: 3 },
  { value: "BR", label: "Brasil", code: "+55", flag: "🇧🇷", order: 4 },
  { value: "UY", label: "Uruguay", code: "+598", flag: "🇺🇾", order: 5 },
  { value: "PY", label: "Paraguay", code: "+595", flag: "🇵🇾", order: 6 },
  { value: "CR", label: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { value: "SV", label: "El Salvador", code: "+503", flag: "🇸🇻" },
  { value: "GT", label: "Guatemala", code: "+502", flag: "🇬🇹" },
  { value: "NI", label: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { value: "PA", label: "Panamá", code: "+507", flag: "🇵🇦" },
  { value: "ES", label: "España", code: "+34", flag: "🇪🇸" },
  { value: "FR", label: "Francia", code: "+33", flag: "🇫🇷" },
  { value: "DE", label: "Alemania", code: "+49", flag: "🇩🇪" },
  { value: "SE", label: "Suecia", code: "+46", flag: "🇸🇪" },
  { value: "CH", label: "Suiza", code: "+41", flag: "🇨🇭" },
  { value: "PL", label: "Polonia", code: "+48", flag: "🇵🇱" }
]

// Ordenamos primero por "order", luego alfabéticamente
const orderedCountries = [...countries].sort((a, b) => {
  if (a.order && b.order) return a.order - b.order
  if (a.order) return -1
  if (b.order) return 1
  return a.label.localeCompare(b.label)
})

// Agrupamos por región
const groupedOptions: CountryGroup[] = [
  {
    label: "América",
    options: orderedCountries.filter(c =>
      ["CL","AR","MX","BR","UY","PY","CR","SV","GT","NI","PA"].includes(c.value)
    )
  },
  {
    label: "Europa",
    options: orderedCountries.filter(c =>
      ["ES","FR","DE","SE","CH","PL"].includes(c.value)
    )
  }
]

interface CountrySelectProps {
  value?: Country
  onChange: (value: Country | null) => void
}

// Estilos para react-select
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

const GroupedCountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <Select
      options={groupedOptions}
      value={value}
      onChange={onChange}
      placeholder="+56"
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

export default GroupedCountrySelect
