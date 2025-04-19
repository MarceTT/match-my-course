"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import filtersConfig from "@/app/utils/filterConfig";
import FilterDrawer from "./FilterDrawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const visaCities = [
  "Dublín", "Bray", "Galway", "Schull", "Naas", "Tralee", "Cork",
  "Ennis", "Donegal", "Drogheda", "Limerick", "Athlone", "Waterford",
  "Killarney", "Sligo", "Cahersiveen", "Wexford"
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
      if (key === "weeks") {
        const slider = filtersConfig.weeks.slider;
        if (slider && (value[0] !== slider.min || value[1] !== slider.max)) {
          params.set("weeksMin", String(value[0]));
          params.set("weeksMax", String(value[1]));
        }
      } else if (key === "cities") {
        params.set(key, value.map((v) => normalize(v)).join(","));
      } else {
        params.set(key, value.join(","));
      }
    } else if (!Array.isArray(value) && value !== undefined && value !== null && value !== 0) {
      params.set(key, String(value));
    }
  });

  return params;
};

const Filter = ({ isOpen, setIsOpen, filters, setFilters }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const course = searchParams.get("course") || "ingles-general";
    setFilters((prev: any) => ({ ...prev, course: [normalize(course)] }));
  }, [searchParams, setFilters]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev: any) => {
      const updatedFilters = { ...prev };
      if (category === "course") {
        updatedFilters.course = [value];
        updatedFilters.cities = [];
        updatedFilters.weeks = filtersConfig.weeks.slider?.default;
        updatedFilters.offers = value === "ingles-visa-de-trabajo" ? ["ver-promociones"] : [];
        const params = getQueryParams(updatedFilters);
        router.push(`/school-search?${params.toString()}`);
      } else {
        const current = prev[category] || [];
        const isChecked = current.includes(value);
        updatedFilters[category] = isChecked
          ? current.filter((v: string) => v !== value)
          : [...current, value];
      }
      return updatedFilters;
    });
  };

  const handleSliderChange = (category: string, value: number[]) => {
    setFilters((prev: any) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    const resetFilters: any = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === "slider" && config.slider) {
        resetFilters[key] = config.slider.default;
      } else {
        resetFilters[key] = [];
      }
    });
    resetFilters.course = ["ingles-general"];
    setFilters(resetFilters);
    router.push(`/school-search?course=ingles-general`);
  };

  const selectedCourse = filters.course?.[0] || "ingles-general";
  const isVisa = selectedCourse === "ingles-visa-de-trabajo";

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <FilterContent
          filters={filters}
          onCheckboxChange={handleCheckboxChange}
          onSliderChange={handleSliderChange}
          onReset={handleReset}
          isVisa={isVisa}
        />
      </FilterDrawer>
    </div>
  );
};

export default Filter;

function FilterContent({ filters, onCheckboxChange, onSliderChange, onReset, isVisa }: any) {
  return (
    <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto">
      {Object.entries(filtersConfig).map(([key, config]) => {
        if (key === "offers" && !isVisa) return null;
        if (config.type === "slider") {
          const value = filters[key] || config.slider?.default;
          return (
            <FilterSection title={config.label} key={key}>
              <SliderSection
                value={value}
                config={config.slider}
                onChange={(val: any) => onSliderChange(key, val)}
                disabled={isVisa}
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
      <Button variant="outline" onClick={onReset} className="w-full">Limpiar filtros</Button>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckboxItem({ id, label, checked, onChange }: any) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="text-sm cursor-pointer">{label}</label>
    </div>
  );
}

function SliderSection({ value, config, onChange, disabled }: any) {
  const [localValue, setLocalValue] = useState<number[]>(Array.isArray(value) ? value : [config.min, config.max]);

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
        onValueChange={setLocalValue}
        onValueCommit={onChange}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
}
