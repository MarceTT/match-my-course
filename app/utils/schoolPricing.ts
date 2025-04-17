import { SchoolDetails } from "@/app/types/index";

interface PriceResult {
    price: number;
    offer: number | null;
    fromLabel: boolean;
  }
  
  export const getBestSchoolPrice = (school: SchoolDetails): PriceResult => {
    // Caso 1: visa-trabajo u otros con prices.horarios
    const raw = school.prices?.[0]?.horarios;
    const offer = raw?.oferta ? parseFloat(String(raw.oferta).replace(/[^0-9.,]/g, "").replace(",", ".")) : null;
    const regular = raw?.precio ? parseFloat(String(raw.precio).replace(/[^0-9.,]/g, "").replace(",", ".")) : 0;
  
    if (!isNaN(offer ?? NaN) && offer && offer > 0) {
      return {
        price: regular,
        offer,
        fromLabel: false,
      };
    }
  
    if (!isNaN(regular) && regular > 0) {
      return {
        price: regular,
        offer: null,
        fromLabel: false,
      };
    }
  
    // Caso 2: pipelines con bestPrice y priceSource
    if (
        typeof school.bestPrice === "number" &&
        school.bestPrice > 0 &&
        ["weekprices", "weekranges"].includes(school.priceSource ?? "")
      ) {
        return { price: school.bestPrice, offer: null, fromLabel: true };
      }
    
  
    return {
      price: 0,
      offer: null,
      fromLabel: false,
    };
  };
  