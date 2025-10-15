import { format } from "date-fns"

/**
 * Converts a Date object to dd/mm/yyyy string format
 */
export function formatDateToDDMMYYYY(date: Date | undefined): string {
  if (!date) return ""
  return format(date, "dd/MM/yyyy")
}

/**
 * Converts form data dates to dd/mm/yyyy format
 */
export function convertFormDataDatesToString(formData: any) {
  // Extract accommodation fields first to handle them separately
  const { accommodationArrivalDate, accommodationType, accommodationWeeks, ...baseFormData } = formData;

  const baseData = {
    ...baseFormData,
    applicationDate: formatDateToDDMMYYYY(formData.applicationDate),
    birthDate: formatDateToDDMMYYYY(formData.birthDate),
    classStartDate: formatDateToDDMMYYYY(formData.classStartDate),
    estimatedArrivalDate: formatDateToDDMMYYYY(formData.estimatedArrivalDate),
  };

  // Handle accommodation fields based on needsAccommodation
  if (formData.needsAccommodation === "si") {
    return {
      ...baseData,
      accommodationArrivalDate: accommodationArrivalDate
        ? formatDateToDDMMYYYY(accommodationArrivalDate)
        : undefined,
      accommodationType: accommodationType && accommodationType[0] !== ""
        ? accommodationType
        : undefined,
      accommodationWeeks: accommodationWeeks || undefined,
    };
  } else {
    // When accommodation is not needed, return only base data without accommodation fields
    return baseData;
  }
}
