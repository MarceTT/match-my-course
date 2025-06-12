import { ContactFormData } from "@/app/(landings)/contact/page";
import { Country } from "../constants/countries";

export function transformCountryFormData(contactFormData: ContactFormData, countries: Country[]) {
  const countryObj = countries.find(c => c.value === contactFormData.country);
  const nationalityObj = countries.find(c => c.value === contactFormData.nationality);

  const normalizedPhone = contactFormData.phone.replace(/\D/g, '');

  return {
    ...contactFormData,
    country: countryObj ? countryObj.label : contactFormData.country,
    nationality: nationalityObj ? nationalityObj.label : contactFormData.nationality,
    phone: countryObj ? `${countryObj.code} ${normalizedPhone}` : normalizedPhone,
  };
}
