"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import {
  buildReservationQuery,
  createReservationFromApiResponse,
} from "@/lib/reservation";

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

  useEffect(() => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-calculo-reserva/${schoolId}?${query}`
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
  }, [schoolId, course, weeks, schedule]);

  return { reservation, loading, error };
}
