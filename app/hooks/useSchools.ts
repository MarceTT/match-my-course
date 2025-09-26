"use client";

import { useQuery } from "@tanstack/react-query";
import { School } from "@/app/types";
import axiosInstance from "../utils/apiClient";
import { getSupportedCountries } from "@/app/utils/countryUtils";

export function useSchools() {
  return useQuery<School[]>({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/schools");
      const schools = (data?.data?.schools ?? []) as any[];

      // Normalize country to { value,label,code,flag }
      const countries = getSupportedCountries();
      const byCode = new Map(countries.map((c) => [c.code, c]));

      const normalized: School[] = schools.map((s: any) => {
        // Prefer explicit country object
        let rawCountry = s.country;

        // Root-level variants: countryCode / code / CountryCode
        if (!rawCountry) {
          const rootCode = s.countryCode || s.CountryCode || s.code;
          const rootName = s.countryName || s.Country || s.pais;
          if (typeof rootCode === "string") {
            const info = byCode.get(rootCode as any);
            return {
              ...s,
              country: info
                ? { value: info.name, label: info.name, code: info.code, flag: info.flag }
                : { value: rootCode, label: rootCode, code: rootCode, flag: "" },
            } as School;
          }
          if (typeof rootName === "string") {
            const infoByName = countries.find((c) => c.name.toLowerCase() === rootName.toLowerCase());
            return {
              ...s,
              country: infoByName
                ? { value: infoByName.name, label: infoByName.name, code: infoByName.code, flag: infoByName.flag }
                : { value: rootName, label: rootName, code: "", flag: "" },
            } as School;
          }
          // Fallback to backend-provided countryInfo
          const infoObj = s.countryInfo;
          if (infoObj && (infoObj.code || infoObj.name)) {
            const code = infoObj.code;
            const name = infoObj.name;
            const info = code ? byCode.get(code) : countries.find((c) => c.name.toLowerCase() === String(name).toLowerCase());
            return {
              ...s,
              country: info
                ? { value: info.name, label: info.name, code: info.code, flag: info.flag }
                : { value: name || code || "", label: name || code || "", code: code || "", flag: "" },
            } as School;
          }
        }

        if (!rawCountry) return { ...s } as School;

        if (typeof rawCountry === "string") {
          // Could be a code (IE) or a name (Ireland)
          const byCodeInfo = byCode.get(rawCountry as any);
          const byNameInfo = countries.find((c) => c.name.toLowerCase() === String(rawCountry).toLowerCase());
          const match = byCodeInfo || byNameInfo;
          return {
            ...s,
            country: match
              ? { value: match.name, label: match.name, code: match.code, flag: match.flag }
              : { value: rawCountry, label: rawCountry, code: String(rawCountry), flag: "" },
          } as School;
        }

        if (typeof rawCountry === "object") {
          const code = rawCountry.code || rawCountry.Code || rawCountry.countryCode || "";
          const name = rawCountry.name || rawCountry.label || rawCountry.Nombre || rawCountry.pais || "";
          const info = code ? byCode.get(code) : countries.find((c) => c.name.toLowerCase() === String(name).toLowerCase());
          return {
            ...s,
            country: {
              value: name || info?.name || code,
              label: name || info?.name || code,
              code: code || info?.code || "",
              flag: rawCountry.flag || info?.flag || "",
            },
          } as School;
        }

        return { ...s } as School;
      });

      return normalized;
    },
    // Always refetch on mount to reflect recent creates/updates in admin
    refetchOnMount: true,
    staleTime: 0,
  });
}
