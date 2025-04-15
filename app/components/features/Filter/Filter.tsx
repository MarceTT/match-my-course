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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

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
  "Killarney", "Sligo", "Cahersiveen", "Wexford",
];

const normalize = (str: string) =>
  str.normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\(.*?\)/g, "")
    .replace(/\+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

    const getQueryParams = (filters: Record<string, any>) => {
      const params = new URLSearchParams();
    
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          if (key === 'cities') {
            const citiesLabels = value.map((cityId: string) => {
              const option = filtersConfig.cities.options?.find(o => o.id === cityId);
              return option?.label || cityId;
            });
            params.set(key, citiesLabels.join(","));
          } else {
            params.set(key, value.join(","));
          }
        } else if (
          !Array.isArray(value) &&
          value !== undefined &&
          value !== null &&
          value !== 0
        ) {
          params.set(key, String(value));
        }
      });
    
      return params;
    };
    

const Filter = ({ isOpen, setIsOpen, filters, setFilters, onResetFilters }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const courseFromUrl = searchParams.get("course") || "todos";

    setFilters((prev) => {
      const updatedFilters = { ...prev };

      if (!prev.course?.includes(normalize(courseFromUrl))) {
        updatedFilters.course = [normalize(courseFromUrl)];
        updatedFilters.cities = [];
        updatedFilters.hours = [];
        updatedFilters.type = [];
        updatedFilters.accreditation = [];
        updatedFilters.certification = [];

        if (courseFromUrl !== "ingles-visa-de-trabajo") {
          updatedFilters.offers = [];
        }
      }

      if (courseFromUrl !== "ingles-visa-de-trabajo") {
        const params = getQueryParams(updatedFilters);
        params.delete("offers");
        router.push(`?${params.toString()}`);
      }

      return updatedFilters;
    });
  }, [searchParams, setFilters, router]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const isChecked = current.includes(value);
      const updatedFilters = { ...prev };

      if (category === "course") {
        updatedFilters.course = isChecked ? ["todos"] : [value];
        if (!isChecked) {
          updatedFilters.cities = [];
          updatedFilters.hours = [];
          updatedFilters.type = [];
          updatedFilters.accreditation = [];
          updatedFilters.certification = [];

          if (value !== "ingles-visa-de-trabajo") {
            updatedFilters.offers = [];
            const params = getQueryParams(updatedFilters);
            params.delete("offers");
            router.push(`?${params.toString()}`);
          }
        }
      } else {
        updatedFilters[category] = isChecked
          ? current.filter((item: string) => item !== value)
          : [...current.filter((item: string) => item !== "todos"), value];
      }

      return updatedFilters;
    });
  };

  const handleSliderChange = (category: string, value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleReset = () => {
    const resetFilters: Record<string, any> = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === "slider" && config.slider) {
        resetFilters[key] = config.slider.default;
      } else {
        resetFilters[key] = [];
      }
    });
    setFilters(resetFilters);
  };

  const isDefaultFilters = () => {
    return Object.entries(filtersConfig).every(([key, config]) => {
      const currentValue = filters[key];
      if (config.type === "slider" && config.slider) {
        return Array.isArray(currentValue)
          ? currentValue[0] === config.slider.min &&
              currentValue[1] === config.slider.max
          : currentValue === config.slider.default;
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
  const isVisaCourseSelected = selectedCourse.includes(
    "ingles-visa-de-trabajo"
  );
  const actualSelectedCourses = selectedCourse.filter(
    (id: string) => id !== "todos"
  );

  return (
    <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {Object.entries(filtersConfig).map(([key, config]) => {
  if (key === "offers" && !isVisaCourseSelected) return null;

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
          value={value}
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
            (!isVisaCourseSelected &&
              id === "ingles-visa-de-trabajo" &&
              actualSelectedCourses.length > 0));

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
                  <p>
                    Solo se puede seleccionar un curso de visa o cursos generales
                  </p>
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
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
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
  value: number[] | number;
  config: { min: number; max: number; step: number };
  onChange: (value: number[]) => void;
  disabled?: boolean;
}) {
  const [localValue, setLocalValue] = useState<number[]>(
    Array.isArray(value) ? value : [config.min, config.max]
  );

  useEffect(() => {
    if (Array.isArray(value)) {
      setLocalValue(value);
    }
  }, [value]);

  return (
    <div className="px-2">
      <Slider
        value={localValue}
        min={config.min}
        max={config.max}
        step={config.step}
        onValueChange={(val) => setLocalValue(val)}
        onValueCommit={(val) => onChange(val)}
        className="w-full"
        disabled={disabled}
      />
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div className="bg-primary text-white px-2 py-1 rounded shadow">
          {localValue[0]} semanas
        </div>
        <div className="bg-primary text-white px-2 py-1 rounded shadow">
          {localValue[1]} semanas
        </div>
      </div>
    </div>
  );
}
