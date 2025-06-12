"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import {
  buildReservationQuery,
  createReservationFromApiResponse,
} from "@/lib/reservation";
import { ReservationFormData } from "@/types/reservationForm";

type UseReservationParams = {
  schoolId: string;
  course: string | null;
  weeks: string | null;
  schedule: string | null;
};

export function useReservation({ schoolId, course, weeks, schedule }: UseReservationParams) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchReservation = async () => {
      const parsedWeeks = parseInt(weeks ?? "", 10);

      // Validación de parámetros
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-calculo-reserva/${schoolId}?${query}`,
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
    
    return () => {
      controller.abort(); // cancelar fetch al desmontar
    };
  }, [schoolId, course, weeks, schedule]);

  const submitReservation = async (formData: ReservationFormData) => {
    if (!reservation) {
      return { success: false, message: "Reserva no inicializada" };
    }

    const reservationData = {
      ...formData,
      totalPrice: reservation.total,
      city: reservation.city ?? "Dublín",
      course: reservation.course,
      weeks: reservation.weeks,
      schedule: reservation.schedule,
      schoolName: reservation.schoolName,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email/reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

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

  return { reservation, loading, error, submitted, submitReservation };
}
