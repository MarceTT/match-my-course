import { Country } from "../constants/countries";

export function transformReservationData(
    data: {
      name: string;
      email: string;
      phone: string;
      consent: boolean;
      nationality: string;
      country: {
        value: string;
        label: string;
        code: string;
        flag: string;
      };
    },
    countries: Country[]
  ) {
    const countryObj = countries.find((c) => c.value === data.country.value);
    const nationalityObj = countries.find((c) => c.value === data.nationality);
  
    const normalizedPhone = data.phone.replace(/\D/g, "");
  
    return {
      name: data.name,
      email: data.email,
      phone: countryObj ? `${countryObj.code} ${normalizedPhone}` : normalizedPhone,
      consent: data.consent,
      nationality: nationalityObj?.label ?? data.nationality,
      country: {
        value: countryObj?.value ?? data.country.value,
        label: countryObj?.label ?? data.country.label,
        code: countryObj?.code ?? data.country.code,
        flag: countryObj?.flag ?? data.country.flag,
      },
    };
  }
  