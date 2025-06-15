"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // 💥 Vamos a crearlo
import { useSearchParams, useRouter } from "next/navigation";
import filtersConfig from "@/app/utils/filterConfig";
import { Button } from "@/components/ui/button";
import { RotateCcw , GraduationCap} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";
import CircularSlider from "@fseehawer/react-circular-slider";

const FilterDrawer = dynamic(() => import("./FilterDrawer"), {
  ssr: false,
});

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

const courseCitiesMap: Record<string, string[]> = {
  "ingles-visa-de-trabajo": [
    "Dublín",
    "Bray",
    "Galway",
    "Naas",
    "Tralee",
    "Cork",
    "Donegal",
    "Drogheda",
    "Limerick",
    "Athlone",
    "Waterford",
    "Killarney",
    "Wexford",
  ],
  "ingles-general": [
    "Dublín",
    "Cork",
    "Galway",
    "Limerick",
    "Waterford",
    "Bray",
    "Schull",
  ],
  "ingles-general-mas-sesiones-individuales": [
    "Dublín",
    "Galway",
    "Wexford",
    "Schull",
  ],
  "ingles-general-intensivo": ["Dublín", "Galway", "Cork", "Limerick"],
  "ingles-general-orientado-a-negocios": ["Dublín", "Cork"],
};

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
  // onResetFilters,
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
      const slider =
        document.querySelector<HTMLInputElement>('[role="slider"]');
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
  const selectedCourseName = selectedCourse[0]; // solo se permite uno
  const isVisaCourseSelected = selectedCourseName === "ingles-visa-de-trabajo";
  const customCities = courseCitiesMap[selectedCourseName] || [];

  return (
    <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {Object.entries(filtersConfig).map(([key, config]) => {
        if (key === "offers" && !isVisaCourseSelected) return null;
        const isCities = key === "cities";
        const options =
          isCities && customCities.length
            ? customCities.map((label) => ({ id: normalize(label), label }))
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
      <div className="space-y-2 lg:mt-4 xl:mt-4">{children}</div>
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
    if (disabled) {
      setLocalValue(25);
    } else if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value[0]);
    } else {
      setLocalValue(config.min);
    }
  }, [value, config.min, disabled]);

  const weeksRange = Array.from(
    { length: config.max - config.min + 1 },
    (_, i) => config.min + i
  );

  const displayIndex = Math.max(0, (disabled ? 25 : localValue) - config.min);

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={disabled ? "cursor-not-allowed opacity-70" : ""}>
              <CircularSlider
                width={180}
                data={weeksRange}
                dataIndex={displayIndex}
                knobColor={disabled ? "#A3A3A3" : "#5271FF"}
                progressColorFrom={disabled ? "#D1D5DB" : "#5271FF"}
                progressColorTo={disabled ? "#D1D5DB" : "#5271FF"}
                trackColor="#E5E7EB"
                label="Semanas"
                labelColor="#4B5563"
                valueFontSize="1.8rem"
                verticalOffset="1.5rem"
                progressSize={6}
                trackSize={3}
                onChange={(val) => {
                  if (!disabled) {
                    const num = Number(val);
                    setLocalValue(num);
                    onChange([num]);
                  }
                }}
              >
                <GraduationCap className="text-white" x="9" y="9" width="18px" height="18px" />
              </CircularSlider>
            </div>
          </TooltipTrigger>
          {disabled && (
            <TooltipContent side="right">
              <p>Este curso requiere una duración fija de 25 semanas.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <div className="mt-2 text-sm text-primary font-semibold">
        {disabled ? "25 semanas (fijo)" : `${localValue} semanas`}
      </div>
    </div>
  );
}

