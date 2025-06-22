"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import {
  buildReservationQuery,
  createReservationFromApiResponse,
} from "@/lib/reservation";
import { ReservationFormData } from "@/types/reservationForm";

// Datos adicionales que no participan del cálculo de reserva,
// pero sí se envían al backend
type ExtraReservationData = {
  startDate?: Date;
  accommodation?: "si" | "no";
};

type UseReservationParams = {
  schoolId: string;
  course: string | null;
  weeks: string | null;
  schedule: string | null;
};

export function useBooking({ schoolId, course, weeks, schedule }: UseReservationParams) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [courses, setCourses] = useState<string[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCourses, setErrorCourses] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchReservation = async () => {
      const parsedWeeks = parseInt(weeks ?? "", 10);

      if (!schoolId || !course || !schedule || isNaN(parsedWeeks)) {
        setReservation(null);
        setError("Parámetros incompletos o inválidos");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const query = buildReservationQuery({
          schoolId,
          course,
          weeks: parsedWeeks,
          schedule,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/calculo-reserva/${schoolId}?${query}`,
          { signal }
        );

        const json = await res.json();

        if (res.ok) {
          const reservation = createReservationFromApiResponse(json.data);
          setReservation(reservation);
          setError("");
        } else {
          setReservation(null);
          setError(json.message || "Error al calcular reserva");
        }
      } catch (err) {
        console.error(err);
        setReservation(null);
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
    return () => controller.abort();
  }, [schoolId, course, weeks, schedule]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tipo-cursos/${schoolId}`);
        const json = await res.json();
        setCourses(json.data || []);
      } catch (error) {
        setErrorCourses(error as Error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [schoolId]);

  const onSubmitReservation = async (formData: ReservationFormData, extras: ExtraReservationData = {}) => {
    if (!reservation) {
      return { success: false, message: "Reserva no inicializada" };
    }

    const reservationData = {
      ...formData,
      ...extras,
      totalPrice: reservation.total,
      city: reservation.city ?? "Dublín",
      course: reservation.course,
      weeks: reservation.weeks,
      schedule: reservation.schedule,
      schoolName: reservation.schoolName,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/email/reservation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        return { success: true };
      } else {
        return { success: false, message: result.message || "Error al enviar" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  return {
    reservation,
    loading,
    error,
    submitted,
    onSubmitReservation,
    courseInfo: {
      list: courses,
      loading: loadingCourses,
      error: !!errorCourses
    },
  };
}
