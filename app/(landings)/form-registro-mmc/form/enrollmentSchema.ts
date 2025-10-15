import { z } from "zod"

const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const getMinimumClassStartDate = (): Date => {
  const today = new Date()
  const twoWeeksFromNow = new Date(today)
  twoWeeksFromNow.setDate(today.getDate() + 14)

  // Find the next Monday from two weeks from now
  const dayOfWeek = twoWeeksFromNow.getDay()
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek

  const nextMonday = new Date(twoWeeksFromNow)
  nextMonday.setDate(twoWeeksFromNow.getDate() + daysUntilMonday)
  nextMonday.setHours(0, 0, 0, 0)

  return nextMonday
}

// Step 1: Student Information Schema
export const enrollmentInfoSchema = z.object({
  applicationDate: z.date({
    required_error: "La fecha de solicitud es requerida",
  }),
  fullName: z.string().min(3, "El nombre completo debe tener al menos 3 caracteres"),
  passportNumber: z.string().min(6, "El número de pasaporte debe tener al menos 6 caracteres"),
  gender: z.enum(["femenino", "masculino", "otro"], {
    required_error: "Debe seleccionar un género",
  }),
  nationality: z.string().min(2, "La nacionalidad es requerida"),
  nationalId: z.string().min(3, "El RUT o ID nacional es requerido"),
  birthDate: z
    .date({
      required_error: "La fecha de nacimiento es requerida",
    })
    .refine((date) => {
      const age = calculateAge(date)
      return age >= 16
    }, "Debe tener al menos 16 años para enviar el formulario"),
    age: z
    .string()
    .min(1, "La edad es requerida")
    .refine((val) => {
      const age = Number.parseInt(val)
      return !isNaN(age) && age >= 16
    }, "Debe tener al menos 16 años para enviar el formulario"),
  email: z.string().email("Debe ingresar un correo electrónico válido"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad es requerida"),
  postalCode: z.string().min(3, "El código postal es requerido"),
  phone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .refine((val) => val.startsWith("+56"), "El teléfono debe comenzar con el prefijo +56"),
  emergencyContactName: z.string().min(3, "El nombre del contacto de emergencia es requerido"),
  emergencyContactEmail: z.string().email("Debe ingresar un correo electrónico válido"),
  emergencyPhone: z
    .string()
    .min(8, "El teléfono de emergencia debe tener al menos 8 caracteres")
    .refine((val) => val.startsWith("+56"), "El teléfono de emergencia debe comenzar con el prefijo +56"),
  medicalConditions: z.string().optional(),
})

// Step 2: School Information Schema
export const enrollmentSchoolInfoSchema = z
  .object({
    studyCountry: z.string().min(1, "Debe seleccionar un país de estudio"),
    studyCity: z.string().min(1, "Debe seleccionar una ciudad de estudio"),
    school: z.string().min(3, "El nombre de la escuela es requerido"),
    studyDuration: z.string().min(1, "La duración del estudio es requerida"),
    courseModality: z.array(z.string()).min(1, "Debe seleccionar al menos una modalidad de curso"),
    classStartDate: z
      .date({
        required_error: "La fecha de inicio de clases es requerida",
      })
      .refine((date) => {
        // Validate that it's a Monday (getDay() returns 1 for Monday)
        return date.getDay() === 1
      }, "La fecha de inicio debe ser un lunes")
      .refine((date) => {
        const minDate = getMinimumClassStartDate()
        return date >= minDate
      }, "La fecha de inicio debe ser al menos 2 semanas desde hoy"),
    needsAccommodation: z.enum(["si", "no"], {
      required_error: "Debe indicar si necesita alojamiento",
    }),
    accommodationType: z.array(z.string()).optional(),
    accommodationArrivalDate: z.date().optional(),
    accommodationWeeks: z.string().optional(),
    estimatedArrivalDate: z.date({
      required_error: "La fecha de llegada es requerida",
    }),
  })
  .refine(
    (data) => {
      // If accommodation is needed, validate accommodation fields
      if (data.needsAccommodation === "si") {
        return (
          data.accommodationType &&
          data.accommodationType.length > 0 &&
          data.accommodationArrivalDate &&
          data.accommodationWeeks
        )
      }
      return true
    },
    {
      message: "Debe completar todos los campos de alojamiento si necesita alojamiento",
      path: ["accommodationType"],
    },
  )
  .refine(
    (data) => {
      // Validate accommodation arrival date is Saturday or Sunday
      if (data.needsAccommodation === "si" && data.accommodationArrivalDate) {
        const day = data.accommodationArrivalDate.getDay()
        return day === 0 || day === 6 // 0 = Sunday, 6 = Saturday
      }
      return true
    },
    {
      message: "La fecha de llegada al alojamiento debe ser un sábado o domingo",
      path: ["accommodationArrivalDate"],
    },
  )

export type EnrollmentStudentInfoFormData = z.infer<typeof enrollmentInfoSchema>
export type EnrollmentSchoolInfoFormData = z.infer<typeof enrollmentSchoolInfoSchema>

export { getMinimumClassStartDate }
