"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce"; // 💥 Vamos a crearlo
import { useSearchParams, useRouter } from "next/navigation";
import filtersConfig from "@/app/utils/filterConfig";
import FilterDrawer from "./FilterDrawer";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const visaCities: string[] = [
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

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onResetFilters?: () => void;
}

const Filter = ({
  isOpen,
  setIsOpen,
  filters,
  setFilters,
  onResetFilters,
}: FilterProps) => {
  const searchParams = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams.toString(), 150); // 💥 debounce 150ms
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(debouncedSearchParams);
    const courseFromUrl = params.get("course") || "ingles-general";
    const normalizedCourse = normalize(courseFromUrl);

    setFilters((prev) => {
      const prevCourse = prev.course?.[0] || "";
      if (prevCourse === normalizedCourse) {
        return prev;
      }

      const citiesFromUrl = params.get("cities");
      const normalizedCities = citiesFromUrl
        ? citiesFromUrl.split(",").map((c) => normalize(c))
        : [];

      return {
        ...prev,
        course: [normalizedCourse],
        cities: normalizedCities,
      };
    });
  }, [debouncedSearchParams, setFilters]);
  

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const isChecked = current.includes(value);
      const updatedFilters = { ...prev };

      if (category === "course") {
        if (isChecked) {
          if (current.length === 1) return prev;
          updatedFilters.course = current.filter(
            (item: string) => item !== value
          );
        } else {
          updatedFilters.course = [value];
        }
        updatedFilters.cities = [];
        updatedFilters.hours = [];
        updatedFilters.type = [];
        updatedFilters.accreditation = [];
        updatedFilters.certification = [];
        if (value !== "ingles-mas-visa-de-trabajo-6-meses") {
          updatedFilters.offers = [];
        }
      } else {
        updatedFilters[category] = isChecked
          ? current.filter((item: string) => item !== value)
          : [...current, value];
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
        if (key === "weeks") {
          resetFilters[key] = []; // 🔥 Weeks vacías, no enviar weeksMin
        } else {
          resetFilters[key] = config.slider.default;
        }
      } else {
        resetFilters[key] = [];
      }
    });

    // 🔥 Mantener el curso actual
    if (filters.course) {
      resetFilters.course = [...filters.course];
    }

    setFilters(resetFilters);

    setTimeout(() => {
      const slider = document.querySelector<HTMLInputElement>('[role="slider"]');
      if (slider) {
        slider.value = String(filtersConfig.weeks.slider?.min || 1); // forzamos a "1"
      }
    }, 100);

    // 🔥 Opcional: limpiar weeksMin de la URL
    const params = new URLSearchParams(window.location.search);
    params.delete("weeksMin");
    router.replace(`?${params.toString()}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDefaultFilters = () => {
    return Object.entries(filtersConfig).every(([key, config]) => {
      const currentValue = filters[key];
      if (config.type === "slider" && config.slider) {
        return Array.isArray(currentValue)
          ? currentValue.length === 0 || currentValue[0] === config.slider.min
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
}: any) {
  const selectedCourse = filters.course || [];
  const isVisaCourseSelected = selectedCourse.includes(
    "ingles-visa-de-trabajo"
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
                onChange={(val: number[]) => {
                  if (!isVisaCourseSelected) onSliderChange(key, val);
                }}
                disabled={isVisaCourseSelected}
              />
            </FilterSection>
          );
        }

        return (
          <FilterSection title={config.label} key={key}>
            {options?.map(({ id, label }) => (
              <TooltipProvider key={id}>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div>
                      <CheckboxItem
                        id={id}
                        label={label}
                        checked={(filters[key] || []).includes(id)}
                        onChange={() => onCheckboxChange(key, id)}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Solo se puede seleccionar un curso a la vez</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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

function CheckboxItem({ id, label, checked, onChange, disabled }: any) {
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

function SliderSection({ value, config, onChange, disabled }: any) {
  const [localValue, setLocalValue] = useState<number>(config.min);

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value[0]);
    } else {
      setLocalValue(config.min);
    }
  }, [value, config.min]); // 👈 escucha cambios en `value`

  return (
    <div className="px-2">
      <Slider
        value={[localValue]}
        min={config.min}
        max={config.max}
        step={config.step}
        onValueChange={(val) => {
          const newMin = val[0];
          setLocalValue(newMin);
          onChange([newMin]);
        }}
        className="w-full"
        disabled={disabled}
      />
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div className="bg-primary text-white px-2 py-1 rounded shadow">
          {localValue} semanas
        </div>
      </div>
    </div>
  );
}

