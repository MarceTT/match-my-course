"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingPannelProps } from "@/app/lib/types";
import GeneralBookingForm from "./forms/GeneralBookingForm";
import WorkAndStudyBookingForm from "./forms/WorkAndStudyBookingForm";

const BookingPannel = ({ reservation, loading, error }: BookingPannelProps) => {
  // const [courseType, setCourseType] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [duration, setDuration] = useState("");

  // "Inglés general": "ingles-general",
  // "Inglés general más sesiones individuales": "ingles-general-mas-sesiones-individuales",
  // "Inglés general intensivo": "ingles-general-intensivo",
  // "Inglés general orientado a negocios": "ingles-general-orientado-a-negocios",
  // "Inglés general más trabajo (6 meses)": "ingles-visa-de-trabajo",

  // const reservationMock = {
  //   // "course": "ingles-general",
  //   // "course": "ingles-general-intensivo",
  //   "course": "ingles-general-mas-sesiones-individuales",
  //   // "course": "ingles-general-orientado-a-negocios",
  //   // "course": "ingles-general-orientado-a-negocios",
  //   // "course": "ingles-visa-de-trabajo",
  //   "school": "Centre of English Studies (CES)",
  //   "schedule": "AM",
  //   "price": 4150,
  //   "weeks": 25
  // }

  console.log('BookingPannel --> reservation', reservation)
  // console.log('BookingPannel --> reservationMock', reservationMock)

  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 border border-red-500 bg-red-50 text-red-700">
        <p>Error: {error}</p>
      </Card>
    );
  }

  // if (!reservationMock) {
  if (!reservation) {
    return (
      <Card className="p-4">
        <p>No hay datos de reserva disponibles.</p>
      </Card>
    );
  }

  switch (reservation.course) {
    // case "ingles-general":
    // case "ingles-general-intensivo":
    // case "ingles-general-mas-sesiones-individuales":
    //   return <GeneralBookingForm reservation={reservation} />;
    case "ingles-general-mas-trabajo":
      return <WorkAndStudyBookingForm reservation={reservation} />;
    default:
      return <GeneralBookingForm reservation={reservation} />;
  }
}

export default BookingPannel;
