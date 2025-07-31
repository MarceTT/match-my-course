"use client";

import { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
  options?: string[];
}

export default function TagSelector({
  value,
  onChange,
  options = [],
}: TagSelectorProps) {
  const formattedOptions = useMemo<Option[]>(
    () => options.map((tag) => ({ label: tag, value: tag })),
    [options]
  );

  const selectedOptions = useMemo<Option[]>(
    () => value.map((tag) => ({ label: tag, value: tag })),
    [value]
  );

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map((opt) => opt.value));
  };

  return (
    <CreatableSelect
      isMulti
      options={formattedOptions}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Selecciona o escribe tags..."
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}
