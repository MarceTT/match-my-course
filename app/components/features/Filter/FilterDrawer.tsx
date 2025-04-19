import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const FilterDrawer = ({ isOpen, setIsOpen, children }: FilterDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full justify-center lg:hidden"
        >
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 pt-8">
        {children}
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Aplicar filtros
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
