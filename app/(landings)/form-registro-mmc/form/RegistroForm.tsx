"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerEnrollment } from "@/app/(landings)/form-registro-mmc/components/DatePickerEnrollment";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import {
  type EnrollmentStudentInfoFormData,
  type EnrollmentSchoolInfoFormData,
  enrollmentInfoSchema,
  enrollmentSchoolInfoSchema,
  getMinimumClassStartDate,
} from "./enrollmentSchema";
import { useToast } from "@/hooks/use-toast";
import { convertFormDataDatesToString } from "./utils/date-format";
import ThankYouPage from "../thank-you-page";
import { CITIES } from "../data/cities";
import { SCHOOLS_BY_CITY } from "../data/schoolsByCity";

type FormData = EnrollmentStudentInfoFormData & EnrollmentSchoolInfoFormData;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Student Information
    applicationDate: new Date(),
    fullName: "",
    passportNumber: "",
    gender: undefined as any,
    nationality: "",
    nationalId: "",
    birthDate: undefined as any,
    age: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactEmail: "",
    emergencyPhone: "",
    medicalConditions: "",

    // Step 2: School Information
    studyCountry: "",
    studyCity: "",
    school: "",
    studyDuration: "",
    courseModality: [],
    classStartDate: undefined as any,
    needsAccommodation: undefined as any,
    accommodationType: [""],
    accommodationArrivalDate: undefined,
    accommodationWeeks: "",
    estimatedArrivalDate: undefined as any,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper functions for cascading selects
  const getAvailableCities = () => {
    if (formData.studyCountry === "irlanda") {
      return CITIES;
    }
    return [];
  };

  const getAvailableSchools = () => {
    if (formData.studyCity && SCHOOLS_BY_CITY[formData.studyCity as keyof typeof SCHOOLS_BY_CITY]) {
      return SCHOOLS_BY_CITY[formData.studyCity as keyof typeof SCHOOLS_BY_CITY];
    }
    return [];
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Reset dependent fields when parent changes
      if (field === "studyCountry") {
        newData.studyCity = "";
        newData.school = "";
      } else if (field === "studyCity") {
        newData.school = "";
      } else if (field === "needsAccommodation" && value === "no") {
        // Reset accommodation fields when accommodation is not needed
        newData.accommodationType = [""];
        newData.accommodationArrivalDate = undefined;
        newData.accommodationWeeks = "";
      }

      return newData;
    });

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };


  const disableNonMondaysAndEarlyDates = (date: Date) => {
    const minDate = getMinimumClassStartDate()
    // Disable if before minimum date OR not a Monday
    return date < minDate || date.getDay() !== 1
  }

  const disableNonWeekendsAndEarlyDates = (date: Date) => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14); // 2 weeks from today
    // Disable if before minimum date OR not a weekend (Saturday=6, Sunday=0)
    return date < minDate || (date.getDay() !== 0 && date.getDay() !== 6);
  }

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    return date < today;
  }

  const validateStep1 = () => {
    try {
      const step1Data = {
        applicationDate: formData.applicationDate,
        fullName: formData.fullName,
        passportNumber: formData.passportNumber,
        gender: formData.gender,
        nationality: formData.nationality,
        nationalId: formData.nationalId,
        birthDate: formData.birthDate,
        age: formData.age,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactEmail: formData.emergencyContactEmail,
        emergencyPhone: formData.emergencyPhone,
        medicalConditions: formData.medicalConditions,
      };

      enrollmentInfoSchema.parse(step1Data);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);

      toast({
        title: "Error de validación",
        description:
          "Por favor, complete todos los campos requeridos correctamente.",
        variant: "destructive",
      });

      return false;
    }
  };

  const validateStep2 = () => {
    try {
      const step2Data = {
        studyCountry: formData.studyCountry,
        studyCity: formData.studyCity,
        school: formData.school,
        studyDuration: formData.studyDuration,
        courseModality: formData.courseModality,
        classStartDate: formData.classStartDate,
        needsAccommodation: formData.needsAccommodation,
        accommodationType: formData.accommodationType,
        accommodationArrivalDate: formData.accommodationArrivalDate,
        accommodationWeeks: formData.accommodationWeeks,
        estimatedArrivalDate: formData.estimatedArrivalDate,
      };

      enrollmentSchoolInfoSchema.parse(step2Data);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);

      toast({
        title: "Error de validación",
        description:
          "Por favor, complete todos los campos requeridos correctamente.",
        variant: "destructive",
      });

      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = convertFormDataDatesToString(formData);

      // Debug: Log the data being sent to backend
      // console.log("=== FORM DATA BEING SENT ===");
      // console.log("needsAccommodation:", formData.needsAccommodation);
      // console.log("Formatted data:", JSON.stringify(formattedData, null, 2));
      // console.log("============================");

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enrollment/send-enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("Enrollment submitted successfully:", result);

      setSubmitted(true);
      toast({
        title: "Formulario enviado",
        description: "Su solicitud ha sido enviada exitosamente.",
      });
    } catch (error) {
      // console.error("Error submitting enrollment:", error);
      toast({
        title: "Error al enviar formulario",
        description: "Hubo un problema al enviar su solicitud. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false)
    setStep(1)
    setFormData({
      applicationDate: new Date(),
      fullName: "",
      passportNumber: "",
      gender: undefined as any,
      nationality: "",
      nationalId: "",
      birthDate: undefined as any,
      age: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactEmail: "",
      emergencyPhone: "",
      medicalConditions: "",
      studyCountry: "",
      studyCity: "",
      school: "",
      studyDuration: "",
      courseModality: [],
      classStartDate: undefined as any,
      needsAccommodation: undefined as any,
      accommodationType: [""],
      accommodationArrivalDate: undefined,
      accommodationWeeks: "",
      estimatedArrivalDate: undefined as any,
    })
    setErrors({})
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  if (submitted) {
    return <ThankYouPage onReset={handleReset} confetti={true} />
  }

  return (
    <div className="space-y-6" ref={formRef}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
              step === 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary bg-card text-primary"
            }`}
          >
            {step > 1 ? <Check className="h-5 w-5" /> : "1"}
          </div>
          <span
            className={`hidden md:inline font-medium ${
              step === 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Información del Alumno
          </span>
        </div>

        <div className="h-0.5 w-12 bg-border md:w-24" />

        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
              step === 2
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            2
          </div>
          <span
            className={`hidden md:inline font-medium ${
              step === 2 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Información de la Escuela
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Student Information */}
        {step === 1 && (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl text-primary">
                Información General del Alumno
              </CardTitle>
              <CardDescription>
                Complete todos los campos con su información personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="applicationDate">Fecha de la solicitud</Label>
                  <DatePickerEnrollment
                    date={formData.applicationDate}
                    onDateChange={(date) =>
                      updateFormData("applicationDate", date)
                    }
                    placeholder="Seleccione la fecha"
                    disabled
                  />
                  {errors.applicationDate && (
                    <p className="text-sm text-destructive">
                      {errors.applicationDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Nombre completo según pasaporte
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="Nombre completo"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passportNumber">
                    Número de pasaporte (si lo tiene)
                  </Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      updateFormData("passportNumber", e.target.value)
                    }
                    placeholder="Número de pasaporte"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Género</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData("gender", value)}
                  >
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="femenino" id="femenino" />
                        <Label
                          htmlFor="femenino"
                          className="font-normal cursor-pointer"
                        >
                          Femenino
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="masculino" id="masculino" />
                        <Label
                          htmlFor="masculino"
                          className="font-normal cursor-pointer"
                        >
                          Masculino
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="otro" id="otro" />
                        <Label
                          htmlFor="otro"
                          className="font-normal cursor-pointer"
                        >
                          Otro
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-sm text-destructive">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nacionalidad</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) =>
                      updateFormData("nationality", e.target.value)
                    }
                    placeholder="Nacionalidad"
                  />
                  {errors.nationality && (
                    <p className="text-sm text-destructive">
                      {errors.nationality}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalId">Rut o ID nacional</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) =>
                      updateFormData("nationalId", e.target.value)
                    }
                    placeholder="Rut o ID nacional"
                  />
                  {errors.nationalId && (
                    <p className="text-sm text-destructive">
                      {errors.nationalId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha Nacimiento</Label>
                  <DatePickerEnrollment
                   date={formData.birthDate}
                   onDateChange={(date) => updateFormData("birthDate", date)}
                   placeholder="Seleccione la fecha"
                   showYearSelector={true}
                  />
                  {errors.birthDate && (
                    <p className="text-sm text-destructive">
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    placeholder="Edad"
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="Dirección completa"
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    placeholder="Ciudad"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Código postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) =>
                      updateFormData("postalCode", e.target.value)
                    }
                    placeholder="Código postal"
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-destructive">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Teléfono (agregar prefijo del país)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Teléfono emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      updateFormData("emergencyPhone", e.target.value)
                    }
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.emergencyPhone && (
                    <p className="text-sm text-destructive">
                      {errors.emergencyPhone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">
                    Nombre del contacto de emergencia
                  </Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      updateFormData("emergencyContactName", e.target.value)
                    }
                    placeholder="Nombre completo"
                  />
                  {errors.emergencyContactName && (
                    <p className="text-sm text-destructive">
                      {errors.emergencyContactName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactEmail">
                    Email del contacto de emergencia
                  </Label>
                  <Input
                    id="emergencyContactEmail"
                    type="email"
                    value={formData.emergencyContactEmail}
                    onChange={(e) =>
                      updateFormData("emergencyContactEmail", e.target.value)
                    }
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.emergencyContactEmail && (
                    <p className="text-sm text-destructive">
                      {errors.emergencyContactEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medicalConditions">
                    Enfermedades, alergias o condiciones que la escuela deba
                    saber antes de tu viaje (comenta)
                  </Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      updateFormData("medicalConditions", e.target.value)
                    }
                    placeholder="Describa cualquier condición médica relevante..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={nextStep}
                  size="lg"
                  className="gap-2"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: School Information */}
        {step === 2 && (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl text-primary">
                Información de la Escuela
              </CardTitle>
              <CardDescription>
                Complete los detalles de su programa de estudios y alojamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="studyCountry">
                    País de estudio (Irlanda)
                  </Label>
                  <Select
                    value={formData.studyCountry}
                    onValueChange={(value) =>
                      updateFormData("studyCountry", value)
                    }
                  >
                    <SelectTrigger id="studyCountry">
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="irlanda">Irlanda</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.studyCountry && (
                    <p className="text-sm text-destructive">
                      {errors.studyCountry}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="studyCity">Ciudad de estudio</Label>
                  <Select
                    value={formData.studyCity}
                    onValueChange={(value) =>
                      updateFormData("studyCity", value)
                    }
                    disabled={!formData.studyCountry}
                  >
                    <SelectTrigger id="studyCity">
                      <SelectValue placeholder="Seleccione una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCities().map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.studyCity && (
                    <p className="text-sm text-destructive">
                      {errors.studyCity}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="school">Escuela donde estudiará</Label>
                  <Select
                    value={formData.school}
                    onValueChange={(value) => updateFormData("school", value)}
                    disabled={!formData.studyCity}
                  >
                    <SelectTrigger id="school">
                      <SelectValue placeholder="Seleccione una escuela" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSchools().map((school) => (
                        <SelectItem key={school.id} value={school.name}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.school && (
                    <p className="text-sm text-destructive">{errors.school}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="studyDuration">
                    ¿Cuántas semanas o meses estudiará?
                  </Label>
                  <Input
                    id="studyDuration"
                    value={formData.studyDuration}
                    onChange={(e) =>
                      updateFormData("studyDuration", e.target.value)
                    }
                    placeholder="Ej: 4 semanas, 3 meses"
                  />
                  {errors.studyDuration && (
                    <p className="text-sm text-destructive">
                      {errors.studyDuration}
                    </p>
                  )}
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Modalidad de curso</Label>
                  <RadioGroup
                    value={formData.courseModality[0] || ""}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        courseModality: [value],
                      }));
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label
                        htmlFor="morning"
                        className="font-normal cursor-pointer"
                      >
                        Curso por la mañana
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label
                        htmlFor="afternoon"
                        className="font-normal cursor-pointer"
                      >
                        Curso por la tarde
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.courseModality && (
                    <p className="text-sm text-destructive">
                      {errors.courseModality}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="classStartDate">
                    Fecha de inicio de clases (tiene que ser un lunes)
                  </Label>
                  <DatePickerEnrollment
                    date={formData.classStartDate}
                    onDateChange={(date) => updateFormData("classStartDate", date)}
                    placeholder="Seleccione un lunes"
                    disabledDates={disableNonMondaysAndEarlyDates}
                  />
                  <p className="text-sm text-muted-foreground">
                    Debe seleccionar un lunes
                  </p>
                  {errors.classStartDate && (
                    <p className="text-sm text-destructive">
                      {errors.classStartDate}
                    </p>
                  )}
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>¿Necesita alojamiento?</Label>
                  <RadioGroup
                    value={formData.needsAccommodation}
                    onValueChange={(value) =>
                      updateFormData("needsAccommodation", value)
                    }
                  >
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="accommodation-yes" />
                        <Label
                          htmlFor="accommodation-yes"
                          className="font-normal cursor-pointer"
                        >
                          Sí
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="accommodation-no" />
                        <Label
                          htmlFor="accommodation-no"
                          className="font-normal cursor-pointer"
                        >
                          No
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {errors.needsAccommodation && (
                    <p className="text-sm text-destructive">
                      {errors.needsAccommodation}
                    </p>
                  )}
                </div>

                {formData.needsAccommodation === "si" && (
                  <>
                    <div className="space-y-3 md:col-span-2">
                      <Label>Tipo de alojamiento</Label>
                      <RadioGroup
                        value={formData.accommodationType?.[0] || ""}
                        onValueChange={(value) => {
                          updateFormData("accommodationType", value ? [value] : [""]);
                        }}
                      >
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="accommodation" id="accommodation" />
                            <Label
                              htmlFor="accommodation"
                              className="font-normal cursor-pointer"
                            >
                              Accommodation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="residencia" id="residencia" />
                            <Label
                              htmlFor="residencia"
                              className="font-normal cursor-pointer"
                            >
                              Residencia
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="host-family" id="host-family" />
                            <Label
                              htmlFor="host-family"
                              className="font-normal cursor-pointer"
                            >
                              Host Family
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {errors.accommodationType && (
                        <p className="text-sm text-destructive">
                          {errors.accommodationType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="accommodationArrivalDate">
                        Fecha de llegada al alojamiento (debe ser un sábado o
                        domingo, mínimo 2 semanas desde hoy)
                      </Label>
                      <DatePickerEnrollment
                        date={formData.accommodationArrivalDate}
                        onDateChange={(date) =>
                          updateFormData("accommodationArrivalDate", date)
                        }
                        placeholder="Seleccione un sábado o domingo"
                        disabledDates={disableNonWeekendsAndEarlyDates}
                      />
                      <p className="text-sm text-muted-foreground">
                        Debe ser un sábado o domingo, mínimo 2 semanas desde hoy
                      </p>
                      {errors.accommodationArrivalDate && (
                        <p className="text-sm text-destructive">
                          {errors.accommodationArrivalDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="accommodationWeeks">
                        ¿Cuántas semanas de alojamiento tomará?
                      </Label>
                      <Input
                        id="accommodationWeeks"
                        value={formData.accommodationWeeks}
                        onChange={(e) =>
                          updateFormData("accommodationWeeks", e.target.value)
                        }
                        placeholder="Número de semanas"
                      />
                      {errors.accommodationWeeks && (
                        <p className="text-sm text-destructive">
                          {errors.accommodationWeeks}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="estimatedArrivalDate">
                    Fecha de llegada (real o estimada)
                  </Label>
                  <DatePickerEnrollment
                    date={formData.estimatedArrivalDate}
                    onDateChange={(date) =>
                      updateFormData("estimatedArrivalDate", date)
                    }
                    placeholder="Seleccione la fecha"
                    disabledDates={disablePastDates}
                  />
                  <p className="text-sm text-muted-foreground">
                    No se pueden seleccionar fechas pasadas
                  </p>
                  {errors.estimatedArrivalDate && (
                    <p className="text-sm text-destructive">
                      {errors.estimatedArrivalDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button type="submit" size="lg" className="gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Enviando..." : "Enviar Formulario"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
