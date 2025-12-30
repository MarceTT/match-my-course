"use client";

interface ScrollToTopButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollToTopButton({ children, className }: ScrollToTopButtonProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
