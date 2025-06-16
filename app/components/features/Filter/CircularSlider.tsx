"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircularWeekSliderProps {
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
  onConfirm?: () => void;
  isMobile?: boolean;
}

export function CircularWeekSlider({
  value,
  onChange,
  disabled = false,
  onConfirm,
  isMobile = false,
}: CircularWeekSliderProps) {
  const [weeks, setWeeks] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<SVGSVGElement>(null);
  const centerX = 120;
  const centerY = 120;
  const radius = 90;
  const maxWeeks = 36;
  const circumference = 2 * Math.PI * radius;

  const progress = (weeks / maxWeeks) * circumference;
  const dashOffset = circumference - progress;

  useEffect(() => {
    if (!isDragging) setWeeks(value);
  }, [value, isDragging]);

  useEffect(() => {
    const handlePointerUp = () => {
      setIsDragging(false);
      if (isMobile && !disabled) onConfirm?.();
    };
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, [isMobile, onConfirm, disabled]);

  const updateWeeksFromPointer = (e: React.PointerEvent) => {
    if (!sliderRef.current || !isDragging || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;

    const newWeeks = Math.max(1, Math.min(maxWeeks, Math.round((angle / (2 * Math.PI)) * maxWeeks)));
    setWeeks(newWeeks);
    onChange(newWeeks);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateWeeksFromPointer(e);
  };

  const incrementWeeks = () => {
    const newVal = Math.min(maxWeeks, weeks + 1);
    setWeeks(newVal);
    onChange(newVal);
    if (isMobile && !disabled) onConfirm?.();
  };

  const decrementWeeks = () => {
    const newVal = Math.max(1, weeks - 1);
    setWeeks(newVal);
    onChange(newVal);
    if (isMobile && !disabled) onConfirm?.();
  };

  const ticks = Array.from({ length: maxWeeks }, (_, i) => {
    const angle = ((i + 1) / maxWeeks) * 2 * Math.PI - Math.PI / 2;
    const tickRadius = radius - 10;
    const x = centerX + tickRadius * Math.cos(angle);
    const y = centerY + tickRadius * Math.sin(angle);
    const isActive = i + 1 <= weeks;
    return { x, y, isActive, value: i + 1 };
  });

  return (
    <div className="relative select-none">
      <svg
        ref={sliderRef}
        width="240"
        height="240"
        viewBox="0 0 240 240"
        onPointerDown={handlePointerDown}
        onPointerMove={updateWeeksFromPointer}
        className={cn("touch-none", disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
          className="dark:stroke-slate-700"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${centerX} ${centerY})`}
          className="transition-all duration-300 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5373FD" />
            <stop offset="100%" stopColor="#5373FD" />
          </linearGradient>
        </defs>
        {ticks.map((tick, i) => (
          <circle
            key={i}
            cx={tick.x}
            cy={tick.y}
            r={3}
            fill={tick.isActive ? "#5373FD" : "#cbd5e1"}
            className={cn(
              "transition-all duration-300",
              tick.isActive ? "dark:fill-[#5373FD]" : "dark:fill-slate-600"
            )}
          />
        ))}
        {ticks
          .filter((_, i) => (i + 1) % 4 === 0)
          .map((tick, i) => (
            <circle
              key={i}
              cx={tick.x}
              cy={tick.y}
              r={5}
              fill={tick.isActive ? "#5373FD" : "#94a3b8"}
              className={cn(
                "transition-all duration-300",
                tick.isActive ? "dark:fill-[#5373FD]" : "dark:fill-slate-500"
              )}
            />
          ))}
        <foreignObject x={centerX - 50} y={centerY - 50} width="100" height="100">
          <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
            <motion.div
              key={weeks}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-slate-900 dark:text-slate-100"
            >
              {weeks}
            </motion.div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {weeks === 1 ? "semana" : "semanas"}
            </div>
          </div>
        </foreignObject>
      </svg>

      {!disabled && (
        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementWeeks}
            disabled={weeks <= 1}
            className="rounded-full h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementWeeks}
            disabled={weeks >= maxWeeks}
            className="rounded-full h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
