"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import FilterDrawer from "./FilterDrawer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import filtersConfig from "@/app/utils/filterConfig";
import { useSearchParams } from "next/navigation";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const Filter = ({ isOpen, setIsOpen, filters, setFilters }: FilterProps) => {
  const searchParams = useSearchParams();

  // Marcar automáticamente checkboxes desde URL para filtros tipo array
  useEffect(() => {
    const categories = ["course", "cities", "type", "hours", "accreditation", "certification"];
    const newFilters: Record<string, any> = {};

    categories.forEach((category) => {
      const values = searchParams.getAll(category);
      if (values.length > 0) {
        newFilters[category] = values;
      }
    });

    if (Object.keys(newFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    }
  }, [searchParams, setFilters]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const isChecked = current.includes(value);
      return {
        ...prev,
        [category]: isChecked
          ? current.filter((item: string) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleSliderChange = (category: string, value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value[0],
    }));
  };

  const handleReset = () => {
    const resetFilters: Record<string, any> = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === "slider" && config.slider) {
        resetFilters[key] = config.slider.default;
      }
    });
    setFilters(resetFilters);
  };

  const isDefaultFilters = () => {
    return Object.entries(filtersConfig).every(([key, config]) => {
      const currentValue = filters[key];
      if (config.type === "slider" && config.slider) {
        return currentValue === config.slider.default;
      } else {
        return !currentValue || currentValue.length === 0;
      }
    });
  };

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <FilterContent
          filters={filters}
          onCheckboxChange={handleCheckboxChange}
          onSliderChange={handleSliderChange}
          onReset={handleReset}
          isDefaultFilters={isDefaultFilters}
        />
      </FilterDrawer>

      <div className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent
          filters={filters}
          onCheckboxChange={handleCheckboxChange}
          onSliderChange={handleSliderChange}
          onReset={handleReset}
          isDefaultFilters={isDefaultFilters}
        />
      </div>
    </div>
  );
};

export default Filter;

function FilterContent({
  filters,
  onCheckboxChange,
  onSliderChange,
  onReset,
  isDefaultFilters,
}: {
  filters: Record<string, any>;
  onCheckboxChange: (category: string, value: string) => void;
  onSliderChange: (category: string, value: number[]) => void;
  onReset: () => void;
  isDefaultFilters: () => boolean;
}) {
  return (
    <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {Object.entries(filtersConfig).map(([key, config]) => {
        if (config.type === "slider" && config.slider) {
          const value = filters[key] || config.slider.default;

          return (
            <FilterSection title={config.label} key={key}>
              <SliderSection
                value={value}
                config={config.slider}
                onChange={(val) => onSliderChange(key, val)}
              />
            </FilterSection>
          );
        }

        return (
          <FilterSection title={config.label} key={key}>
            {config.options?.map(({ id, label }) => (
              <CheckboxItem
                key={id}
                id={id}
                label={label}
                checked={(filters[key] || []).includes(id)}
                onChange={() => onCheckboxChange(key, id)}
              />
            ))}
          </FilterSection>
        );
      })}

      {!isDefaultFilters() && (
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckboxItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
}

function SliderSection({
  value,
  config,
  onChange,
}: {
  value: number;
  config: { min: number; max: number; step: number };
  onChange: (value: number[]) => void;
}) {
  const [localValue, setLocalValue] = useState<number>(value);

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const val = Math.max(config.min, localValue - config.step);
            setLocalValue(val);
            onChange([val]);
          }}
          disabled={localValue <= config.min}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="relative flex-1 mx-4">
          <Slider
            value={[localValue]}
            max={config.max}
            min={config.min}
            step={config.step}
            onValueChange={(val) => {
              setLocalValue(val[0]);
              onChange(val);
            }}
            className="my-5"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{config.min}</span>
            <span>{Math.round((config.min + config.max) / 2)}</span>
            <span>{config.max}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const val = Math.min(config.max, localValue + config.step);
            setLocalValue(val);
            onChange([val]);
          }}
          disabled={localValue >= config.max}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full" />
          <div
            className={cn(
              "absolute inset-2 bg-primary/20 rounded-full transition-all duration-300",
              "flex items-center justify-center"
            )}
          >
            <div className="text-center">
              <span className="text-3xl font-bold">{localValue}</span>
              <p className="text-xs font-medium mt-1">
                {localValue === 1 ? "Semana" : "Semanas"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
