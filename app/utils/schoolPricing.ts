import { SchoolDetails } from "@/app/types/index";

interface PriceResult {
    price: number;
    offer: number | null;
    fromLabel: boolean;
  }
  
  export const getBestSchoolPrice = (school: SchoolDetails): PriceResult => {
    const raw = school.prices?.[0];
    const offer = raw?.oferta
      ? parseFloat(String(raw.oferta).replace(/[^0-9.,]/g, "").replace(",", "."))
      : null;
    const regular = raw?.precio
      ? parseFloat(String(raw.precio).replace(/[^0-9.,]/g, "").replace(",", "."))
      : 0;
  
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
  