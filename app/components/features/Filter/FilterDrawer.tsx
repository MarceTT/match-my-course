"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface FilterDrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode; // Contenido del filtro
  }

const FilterDrawer = ({ isOpen, setIsOpen, children }: FilterDrawerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        className="w-full mb-4 flex justify-between items-center lg:hidden"
      >
        Filtros
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
    </SheetTrigger>

    {/* Contenido del drawer (Sheet) en mobile */}
    <SheetContent side="right" className="w-64 sm:w-96 p-0">
      <SheetHeader className="p-4 border-b">
        <SheetTitle>Filtros</SheetTitle>
      </SheetHeader>

      {/* Contenido del filtro */}
      <div className="h-[calc(100vh-200px)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {children}
      </div>
    </SheetContent>
  </Sheet>
  )
}

export default FilterDrawer