"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StepFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StepForm = ({ open, onOpenChange }: StepFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-lg sm:max-w-[80vw] sm:max-h-[80vh]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Custom Dialog</DialogTitle>
            <DialogDescription>
              This is a customized dialog component from the Shadcn UI library.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4">
            <p>
              You can add any content you want inside the dialog, such as forms,
              charts, or other components.
            </p>
          </div>
          <DialogFooter className="border-t p-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StepForm;
