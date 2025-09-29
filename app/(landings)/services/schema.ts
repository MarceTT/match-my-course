import { z } from "zod";
import locations from "./service/locations.json";
import { subYears, format as formatDate } from "date-fns";

export const parseDDMMYYYY = (s: string): Date | undefined => {
    if (!s || typeof s !== "string") return undefined;
    const parts = s.split("/");
    if (parts.length !== 3) return undefined;
    const [dd, mm, yyyy] = parts;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d.getTime()) ? undefined : d;
  };
  
  export type City = { code: string; name: string };
  export type Country = { code: string; name: string; cities: City[] };

export const COUNTRIES: Country[] = locations.countries as Country[];
export const countryCodes = COUNTRIES.map((c) => c.code);

export const cityOptionsByCountry: Record<string, City[]> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c.cities])
);

export const formSchema = z
  .object({
    nombre: z.string().min(2, "Rellena este campo obligatorio"),
    apellido: z.string().min(2, "Rellena este campo obligatorio"),
    email: z.string().email("El correo no es válido"),
    nacionalidad: z.string().min(1, "Selecciona tu nacionalidad"),
    paisEstudiar: z
      .string({ required_error: "Selecciona un país" })
      .refine((v) => countryCodes.includes(v), "Selecciona un país válido"),
    ciudadEstudiar: z.string().min(1, "Selecciona tu ciudad de estudio"),
    nivelProfesional: z.string().min(1, "Selecciona tu nivel profesional"),
    nivelAproximado: z.string().min(1, "Selecciona tu nivel aproximado"),
    fechaInicioCurso: z.string().min(1, "Selecciona tu fecha de inicio"),
    nacimiento: z
      .string()
      .min(1, "Ingresa tu fecha de nacimiento")
      .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
        message: "Formato inválido. Usa dd/mm/yyyy",
      })
      .refine(
        (val) => {
          const d = parseDDMMYYYY(val);
          if (!d) return false;
          const max = subYears(new Date(), 16);
          return d <= max;
        },
        { message: "Debes ser mayor de 16 años" }
      ),
    respaldoEconomico: z.string().min(1, "Selecciona tu respaldo económico"),
    aceptaTerminos: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
    aceptaPoliticaDePrivacidad: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar la política de privacidad",
    }),
  })
  .superRefine((data, ctx) => {
    // Por qué: garantizamos coherencia país/ciudad contra el JSON fuente.
    const ok = !!cityOptionsByCountry[data.paisEstudiar]?.some(
      (c) => c.code === data.ciudadEstudiar
    );
    if (!ok) {
      ctx.addIssue({
        path: ["ciudadEstudiar"],
        code: z.ZodIssueCode.custom,
        message: "La ciudad no corresponde al país seleccionado",
      });
    }
  });