"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useSearchParams, useRouter } from "next/navigation";
import filtersConfig from "@/app/utils/filterConfig";
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
import { CircularWeekSlider } from "./CircularSlider";
import dynamic from "next/dynamic";
import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";

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
    "Athlone",
    "Naas",
    "Limerick",
    "Waterford",
    "Bray",
    "Wexford",
    "Tralee",
  ],
  "ingles-general-mas-sesiones-individuales": ["Dublín", "Galway", "Wexford"],
  "ingles-general-intensivo": [
    "Dublín",
    "Galway",
    "Cork",
    "Bray",
    "Limerick",
    "Tralee",
  ],
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
  onResetFilters,
}: FilterProps) => {
  const searchParams = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams.toString(), 150);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(debouncedSearchParams);
    const courseFromUrl = params.get("course") || "ingles-general";
    const normalizedCourse = normalize(courseFromUrl);

    setFilters((prev) => {
      const prevCourse = prev.course?.[0] || "";
      if (prevCourse === normalizedCourse) return prev;

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
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    const resetFilters: Record<string, any> = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === "slider" && config.slider) {
        resetFilters[key] = [config.slider.min];
      } else {
        resetFilters[key] = [];
      }
    });

    if (filters.course?.length > 0) {
      resetFilters.course = [...filters.course];
    }

    setFilters(resetFilters);
    const params = new URLSearchParams(window.location.search);
    params.delete("weeksMin");
    router.replace(`?${params.toString()}`);
  };

  const isDefaultFilters = () =>
    Object.entries(filtersConfig).every(([key, config]) => {
      const currentValue = filters[key];
      if (config.type === "slider" && config.slider) {
        return Array.isArray(currentValue)
          ? currentValue.length === 0 || currentValue[0] === config.slider.min
          : currentValue === config.slider.default;
      } else {
        return !currentValue || currentValue.length === 0;
      }
    });

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
  const selectedCourseName = selectedCourse[0];
  const isVisaCourseSelected = selectedCourseName === "ingles-visa-de-trabajo";
  const customCities = courseCitiesMap[selectedCourseName] || [];

  const [run, setRun] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isVisaCourseSelected) return;
  
    const lastShown = localStorage.getItem("offerTourLastShown");
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
  
    if (!lastShown || now - parseInt(lastShown, 10) > sevenDays) {
      localStorage.setItem("offerTourLastShown", now.toString());
  
      // Centrar el checkbox ANTES de que empiece Joyride
      setTimeout(() => {
        offerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
  
      // Iniciar Joyride después de que terminó el scroll
      setTimeout(() => {
        setRun(true);
      }, 1000);
    }
  }, [isVisaCourseSelected]);
  

  const steps: Step[] = [
    {
      target: '[data-tour="offers-checkbox"]',
      content: "Filtra aquí los cursos en oferta y encuentra los mejores precios",
      placement: "right",
      disableBeacon: true,
      hideCloseButton: true,
      locale: {
        close: 'Cerrar',
      },
    },
  ];

  return (
    <>
      {isVisaCourseSelected && (
        <Joyride
          steps={steps}
          run={run}
          continuous={false}
          showSkipButton={false}
          showProgress={false}
          spotlightClicks={false}
          disableOverlayClose={false}
          disableScrolling
          disableScrollParentFix
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: "#5371FF",
              textColor: "#000",
              backgroundColor: "#fff",
            },
          }}
          callback={(data: CallBackProps) => {
            const { status } = data;
            if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
              setRun(false);
            }
          }}
        />
      )}
      <div className="border rounded-md p-4 space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {Object.entries(filtersConfig).map(([key, config]) => {
          if (key === "offers" && !isVisaCourseSelected) return null;

          const isCities = key === "cities";
          const options =
            isCities && customCities.length
              ? customCities.map((label) => ({ id: normalize(label), label }))
              : config.options;

          if (key === "offers") {
            return (
              <div key={key} ref={offerRef}>
                <FilterSection title={config.label}>
                  {options?.map(({ id, label }) => (
                    <div key={id} data-tour="offers-checkbox">
                      <CheckboxItem
                        id={id}
                        label={label}
                        checked={(filters[key] || []).includes(id)}
                        onChange={() => onCheckboxChange(key, id)}
                      />
                    </div>
                  ))}
                </FilterSection>
              </div>
            );
          }

          if (config.type === "slider" && config.slider) {
            const value = filters[key] || config.slider.default;
            return (
              <FilterSection title={config.label} key={key}>
                <SliderSection
                  value={
                    Array.isArray(filters[key]) ? filters[key] : [filters[key]]
                  }
                  config={config.slider!}
                  onChange={(val) => onSliderChange(key, val)}
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
    </>
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
  const isOfferCheckbox = label.toLowerCase().includes("promociones");
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

      {isOfferCheckbox && (
        <span className="ml-2 inline-block px-2 py-0.5 text-xs font-bold bg-yellow-400 text-black rounded-full animate-bounce shadow-md lg:hidden">
          ¡Ofertas!
        </span>
      )}
    </div>
  );
}

interface SliderSectionProps {
  value: number[];
  config: {
    min: number;
    max: number;
    step: number;
    default: number | [number, number];
  };
  onChange: (val: number[]) => void;
  disabled: boolean;
}

function SliderSection({
  value,
  config,
  onChange,
  disabled,
}: SliderSectionProps) {
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

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <CircularWeekSlider
        value={localValue}
        onChange={(val) => onChange([val])}
        disabled={disabled}
      />
      <div className="mt-2 text-sm text-primary font-semibold">
        {disabled ? "25 semanas (fijo)" : `${localValue} semanas`}
      </div>
    </div>
  );
}
