"use client";

import { useTour } from "@reactour/tour";

/**
 * Safe wrapper for useTour that returns no-op functions
 * when TourProvider is not available (e.g., on mobile <1024px).
 * 
 * TourProvider only wraps the app on desktop. Calling useTour()
 * without a provider causes a client-side crash.
 */
export function useTourSafe() {
  try {
    return useTour();
  } catch {
    // Return no-op functions when TourProvider is not available
    return {
      setIsOpen: () => {},
      setSteps: () => {},
      setCurrentStep: () => {},
      isOpen: false,
      currentStep: 0,
      steps: [],
    };
  }
}
