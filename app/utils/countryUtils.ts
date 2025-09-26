import { SchoolDetails } from "@/app/lib/types";

/**
 * Utility functions for handling multi-country support
 */

export const SUPPORTED_COUNTRIES = {
  IE: { code: 'IE', name: 'Ireland', currency: 'EUR', flag: '🇮🇪' },
  NZ: { code: 'NZ', name: 'New Zealand', currency: 'NZD', flag: '🇳🇿' },
} as const;

export type SupportedCountryCode = keyof typeof SUPPORTED_COUNTRIES;

/**
 * Get country information from school data
 */
export function getSchoolCountryInfo(school: SchoolDetails) {
  const countryCode = school.country?.code as SupportedCountryCode;
  
  return {
    code: countryCode || 'IE', // Default to Ireland
    name: school.country?.label || SUPPORTED_COUNTRIES.IE.name,
    currency: school.settings?.currency || SUPPORTED_COUNTRIES[countryCode || 'IE'].currency,
    allowInstantBooking: school.settings?.allowInstantBooking ?? true,
    accommodationAvailable: school.settings?.accommodationAvailable ?? true,
    contactOnly: school.settings?.contactOnly ?? false,
  };
}

/**
 * Check if a school allows instant booking
 */
export function canBookInstantly(school: SchoolDetails): boolean {
  const countryInfo = getSchoolCountryInfo(school);
  
  // New Zealand requires advisor contact only
  if (countryInfo.code === 'NZ') {
    return false;
  }
  
  return countryInfo.allowInstantBooking;
}

/**
 * Check if accommodation should be shown for a school
 */
export function shouldShowAccommodation(school: SchoolDetails): boolean {
  const countryInfo = getSchoolCountryInfo(school);
  
  // New Zealand typically doesn't have accommodation
  if (countryInfo.code === 'NZ') {
    return false;
  }
  
  return countryInfo.accommodationAvailable;
}

/**
 * Get currency symbol based on school settings
 */
export function getCurrencySymbol(school: SchoolDetails): string {
  const countryInfo = getSchoolCountryInfo(school);
  
  switch (countryInfo.currency) {
    case 'EUR':
      return '€';
    case 'NZD':
      return 'NZ$';
    case 'USD':
      return '$';
    default:
      return '€'; // Default to EUR
  }
}

/**
 * Get currency name based on school settings
 */
export function getCurrencyName(school: SchoolDetails): string {
  const countryInfo = getSchoolCountryInfo(school);
  
  switch (countryInfo.currency) {
    case 'EUR':
      return 'Euro';
    case 'NZD':
      return 'New Zealand Dollar';
    case 'USD':
      return 'US Dollar';
    default:
      return 'Euro';
  }
}

/**
 * Get advisor contact information for countries that require it
 */
export function getAdvisorContact(countryCode: string) {
  switch (countryCode) {
    case 'NZ':
      return {
        email: 'newzealand@matchmycourse.com',
        advisorName: 'New Zealand Education Advisor',
        message: 'Las escuelas de Nueva Zelanda requieren contacto directo con un asesor educativo.',
      };
    default:
      return null;
  }
}

/**
 * Validate week range based on country-specific rules
 */
export function validateWeekRange(school: SchoolDetails, courseType: string, weeks: number): boolean {
  const countryInfo = getSchoolCountryInfo(school);
  
  switch (countryInfo.code) {
    case 'NZ':
      // New Zealand specific rules
      if (courseType === 'work-study') {
        return weeks >= 14 && weeks <= 48; // Flexible range for NZ
      }
      return weeks >= 1 && weeks <= 48; // General courses
    
    case 'IE':
    default:
      // Ireland rules (existing logic)
      if (courseType === 'work-study') {
        return weeks === 25; // Fixed for Ireland
      }
      return weeks >= 1 && weeks <= 12; // General courses
  }
}

/**
 * Get country-specific course duration options
 */
export function getCourseDurationOptions(countryCode: SupportedCountryCode, courseType: string) {
  switch (countryCode) {
    case 'NZ':
      if (courseType === 'work-study') {
        return { min: 14, max: 48, recommended: [14, 20, 25, 30, 40, 48] };
      }
      return { min: 1, max: 48, recommended: [4, 8, 12, 16, 20, 24] };
    
    case 'IE':
    default:
      if (courseType === 'work-study') {
        return { min: 25, max: 25, recommended: [25] };
      }
      return { min: 1, max: 12, recommended: [4, 8, 12] };
  }
}

/**
 * Format price with appropriate currency
 */
export function formatPrice(amount: number, school: SchoolDetails): string {
  const symbol = getCurrencySymbol(school);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return `${symbol}${formatted}`;
}

/**
 * Check if country is supported for multi-country features
 */
export function isCountrySupported(countryCode: string): countryCode is SupportedCountryCode {
  return countryCode in SUPPORTED_COUNTRIES;
}

/**
 * Get all supported countries for display
 */
export function getSupportedCountries(): Array<{ code: SupportedCountryCode; name: string; currency: string; flag: string }> {
  return Object.entries(SUPPORTED_COUNTRIES).map(([code, info]) => {
    const { name, currency, flag } = info;
    return {
      code: code as SupportedCountryCode,
      name,
      currency,
      flag,
    };
  });
}
