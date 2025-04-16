import { SchoolDetails } from "@/app/types/index";

export interface SchoolPriceInfo {
  price: number;
  offer: number | null;
  fromLabel: boolean;
}

export const getBestSchoolPrice = (school: SchoolDetails): SchoolPriceInfo => {
  const visaPrice = school.prices?.[0]?.horarios?.precio;
  const visaOffer = school.prices?.[0]?.horarios?.oferta;
  const bestPrice = school.bestPrice ?? 0;

  const hasVisaData = visaPrice !== undefined || visaOffer !== undefined;
  const hasGeneralData = bestPrice > 0;

  if (hasVisaData) {
    return {
      price: Number(visaPrice ?? 0),
      offer: visaOffer ? Number(visaOffer) : null,
      fromLabel: false
    };
  }

  if (hasGeneralData) {
    return {
      price: bestPrice,
      offer: null,
      fromLabel: true
    };
  }

  return { price: 0, offer: null, fromLabel: false };
};
