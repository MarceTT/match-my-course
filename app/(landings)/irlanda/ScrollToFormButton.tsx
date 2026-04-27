"use client";

import { Button } from "@/components/ui/button";

interface ScrollToFormButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollToFormButton({ children, className }: ScrollToFormButtonProps) {
  const handleClick = () => {
    const form = document.getElementById("irlanda-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={className}
    >
      {children}
    </Button>
  );
}
