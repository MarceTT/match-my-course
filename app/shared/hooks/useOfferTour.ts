import { useState, useEffect } from "react";

const TOUR_KEY = "offer-tour-last-shown";

export function useOfferTour(showCondition: boolean, days = 7) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!showCondition) return;

    const lastShown = localStorage.getItem(TOUR_KEY);
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > days * 24 * 60 * 60 * 1000) {
      setRun(true);
      localStorage.setItem(TOUR_KEY, now.toString());
    }
  }, [showCondition, days]);

  return { run, setRun };
}