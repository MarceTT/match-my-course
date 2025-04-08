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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onResetFilters?: () => void;
}

const visaCities = [
  "Dublín", "Bray", "Galway", "Schull", "Naas", "Tralee", "Cork",
  "Ennis", "Donegal", "Drogheda", "Limerick", "Athlone", "Waterford",
  "Killarney", "Sligo", "Cahersiveen", "Wexford"
];

const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\(.*?\)/g, "")
    .replace(/\+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

const Filter = ({ isOpen, setIsOpen, filters, setFilters, onResetFilters }: FilterProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const defaultKeys = ["course", "cities", "type", "hours", "accreditation", "certification"];
    const updatedFilters: Record<string, any> = { ...filters };

    defaultKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value && !updatedFilters[key]?.length) {
        const match = filtersConfig[key]?.options?.find(
          (opt) =>
            opt.id === value ||
            opt.label.toLowerCase() === decodeURIComponent(value).toLowerCase()
        );
        if (match) {
          updatedFilters[key] = [match.id];
        }
      }
    });

    setFilters(updatedFilters);
  }, [searchParams, setFilters]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const isChecked = current.includes(value);
      const newFilters = {
        ...prev,
        [category]: isChecked
          ? current.filter((item: string) => item !== value)
          : [...current, value],
      };

      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        setIsOpen(false);
      }

      return newFilters;
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
  const selectedCourse = filters.course || [];
  const isVisaCourseSelected = selectedCourse.includes("ingles-visa-de-trabajo");

  return (
    <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {Object.entries(filtersConfig).map(([key, config]) => {
        const isCities = key === "cities";
        const options =
          isCities && isVisaCourseSelected
            ? visaCities.map((label) => ({ id: normalize(label), label }))
            : config.options;

        if (config.type === "slider" && config.slider) {
          const value = filters[key] || config.slider.default;
          return (
            <FilterSection title={config.label} key={key}>
              <SliderSection
                value={isVisaCourseSelected ? 25 : value}
                config={config.slider}
                onChange={(val) => {
                  if (!isVisaCourseSelected) onSliderChange(key, val);
                }}
                disabled={isVisaCourseSelected}
              />
            </FilterSection>
          );
        }

        return (
          <FilterSection title={config.label} key={key}>
            {options?.map(({ id, label }) => {
              const disabled =
                key === "course" &&
                ((isVisaCourseSelected && id !== "ingles-visa-de-trabajo") ||
                  (!isVisaCourseSelected && id === "ingles-visa-de-trabajo" && selectedCourse.length > 0));
              return (
                <TooltipProvider key={id}>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <div>
                        <CheckboxItem
                          id={id}
                          label={label}
                          checked={(filters[key] || []).includes(id)}
                          onChange={() => onCheckboxChange(key, id)}
                          disabled={disabled || undefined}
                        />
                      </div>
                    </TooltipTrigger>
                    {disabled && (
                      <TooltipContent side="right">
                        <p>Solo se puede seleccionar un curso de visa o cursos generales</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
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
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} disabled={disabled} />
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
  disabled,
}: {
  value: number;
  config: { min: number; max: number; step: number };
  onChange: (value: number[]) => void;
  disabled?: boolean;
}) {
  const [localValue, setLocalValue] = useState<number>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

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
          disabled={localValue <= config.min || disabled}
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
            disabled={disabled}
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
          disabled={localValue >= config.max || disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full" />
          <div className={cn("absolute inset-2 bg-primary/20 rounded-full transition-all duration-300", "flex items-center justify-center")}
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
