"use client";

import React, { useEffect, useRef } from 'react';
import { usePerformanceMonitor } from '@/app/utils/performanceMonitor';

interface PerformanceWrapperProps {
  name: string;
  children: React.ReactNode;
  measureRenders?: boolean;
  measureMemory?: boolean;
}

export default function PerformanceWrapper({ 
  name, 
  children, 
  measureRenders = false,
  measureMemory = false 
}: PerformanceWrapperProps) {
  const { measureComponentRender, measureMemoryUsage } = usePerformanceMonitor();
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(0);

  useEffect(() => {
    if (measureRenders) {
      const currentTime = performance.now();
      const renderTime = currentTime - lastRenderTimeRef.current;
      renderCountRef.current++;
      
      if (renderCountRef.current > 1) { // Skip initial render
        measureComponentRender(name, () => {});
      }
      
      lastRenderTimeRef.current = currentTime;
      
      // Log excessive re-renders
      if (renderCountRef.current > 10) {
        console.warn(`Component ${name} has re-rendered ${renderCountRef.current} times`);
      }
    }
  });

  useEffect(() => {
    if (measureMemory) {
      const interval = setInterval(() => {
        measureMemoryUsage();
      }, 5000); // Check every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [measureMemory, measureMemoryUsage]);

  return <>{children}</>;
}