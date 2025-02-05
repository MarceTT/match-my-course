"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FilterDrawer from "./FilterDrawer";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Filter = ({ isOpen, setIsOpen }: FilterProps) => {
  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      {/* Botón para abrir el filtro en mobile */}
      <FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="space-y-6">
          <FilterSection title="Tipo de curso">
            <CheckboxItem id="ingles-general" label="Inglés general" />
            <CheckboxItem id="ingles-trabajo" label="Inglés + visa de trabajo" />
            <CheckboxItem
              id="cursos-profesores"
              label="Cursos para profesores de inglés"
            />
            <CheckboxItem
              id="preparacion-examenes"
              label="Curso para preparación de exámenes"
            />
          </FilterSection>

          <FilterSection title="Semanas a estudiar">
            <Slider defaultValue={[20]} max={100} step={1} />
            <div className="mt-2">
              <div className="h-24 w-full bg-gray-100" />
            </div>
          </FilterSection>

          <FilterSection title="Ciudad">
            {["Dublin", "Cork", "Galway", "Limerick", "Tralee", "Bray"].map(
              (city) => (
                <CheckboxItem key={city} id={city.toLowerCase()} label={city} />
              )
            )}
          </FilterSection>

          <FilterSection title="Certificación educacional">
            {["Alta", "Media", "Baja"].map((certification) => (
              <CheckboxItem
                key={certification}
                id={certification.toLowerCase().replace(/\s/g, "-")}
                label={certification}
              />
            ))}
          </FilterSection>

          <FilterSection title="Porcentaje de compañeros hispanohablantes">
            {[
              "Bajo (10% - 25%)",
              "Medio (25%-34%)",
              "Alto medio (35% - 65%)",
            ].map((percentage) => (
              <CheckboxItem
                key={percentage}
                id={percentage.toLowerCase().replace(/\s/g, "-")}
                label={percentage}
              />
            ))}
          </FilterSection>

          <FilterSection title="Instalaciones">
            {[
              "Library",
              "Computer Lab",
              "Study Area",
              "Cafeteria/Canteen",
              "Free Wi-Fi",
              "Student Room",
            ].map((facility) => (
              <CheckboxItem
                key={facility}
                id={facility.toLowerCase().replace(/\s/g, "-")}
                label={facility}
              />
            ))}
          </FilterSection>
        </div>
      </FilterDrawer>

      {/* Filtro en desktop (sin cambios) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="space-y-6">
          <FilterSection title="Tipo de curso">
            <CheckboxItem id="ingles-general" label="Inglés general" />
            <CheckboxItem
              id="ingles-trabajo"
              label="Inglés + visa de trabajo"
            />
            <CheckboxItem
              id="cursos-profesores"
              label="Cursos para profesores de inglés"
            />
            <CheckboxItem
              id="preparacion-examenes"
              label="Curso para preparación de exámenes"
            />
          </FilterSection>

          <FilterSection title="Semanas a estudiar">
            <Slider defaultValue={[20]} max={100} step={1} />
            <div className="mt-2">
              <div className="h-24 w-full bg-gray-100" />
            </div>
          </FilterSection>

          <FilterSection title="Ciudad">
            {["Dublin", "Cork", "Galway", "Limerick", "Tralee", "Bray"].map(
              (city) => (
                <CheckboxItem key={city} id={city.toLowerCase()} label={city} />
              )
            )}
          </FilterSection>

          <FilterSection title="Certificación educacional">
            {["Alta", "Media", "Baja"].map((certification) => (
              <CheckboxItem
                key={certification}
                id={certification.toLowerCase().replace(/\s/g, "-")}
                label={certification}
              />
            ))}
          </FilterSection>

          <FilterSection title="Porcentaje de compañeros hispanohablantes">
            {[
              "Bajo (10% - 25%)",
              "Medio (25%-34%)",
              "Alto medio (35% - 65%)",
            ].map((percentage) => (
              <CheckboxItem
                key={percentage}
                id={percentage.toLowerCase().replace(/\s/g, "-")}
                label={percentage}
              />
            ))}
          </FilterSection>

          <FilterSection title="Instalaciones">
            {[
              "Library",
              "Computer Lab",
              "Study Area",
              "Cafeteria/Canteen",
              "Free Wi-Fi",
              "Student Room",
            ].map((facility) => (
              <CheckboxItem
                key={facility}
                id={facility.toLowerCase().replace(/\s/g, "-")}
                label={facility}
              />
            ))}
          </FilterSection>
        </div>
      </div>
    </div>
  );
};

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

function CheckboxItem({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
}

export default Filter;
