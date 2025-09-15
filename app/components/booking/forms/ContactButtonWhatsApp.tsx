import { Button } from '@/components/ui/button'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Reservation } from '@/types';
import { sendGTMEvent } from "@/app/lib/gtm";

interface ContactButtonWhatsAppProps {
    reservation: Reservation;
}



const ContactButtonWhatsApp = ({ reservation }: ContactButtonWhatsAppProps) => {

//   console.log("reservation", reservation);

    const handleOpenWhatsApp = () => {
        const phone = "+56931714541"; // Número destino
      
        const courseName = reservation?.course ?? "Programa de estudio y trabajo";
        const schedule = reservation?.specificSchedule ?? "Horario no definido";
        const school = reservation?.schoolName ?? "Escuela no definida";
        const city = reservation?.city ?? "Ciudad no definida";
      
        const message = `Hola, estoy interesado en el curso "${courseName}", horario "${schedule}", de la escuela "${school}" de la ciudad de "${city}" .`;
      
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        if(reservation?.schoolName === "University of Limerick Language Centre"){
          sendGTMEvent('click_whatsapp_limerick_ad');
        }
      };
  return (
    <Button
    onClick={() => handleOpenWhatsApp()}
    className="w-full mt-4 bg-[#00C851] hover:bg-[#00C851] text-white py-2 rounded font-semibold flex items-center justify-center group transition-all"
  >
    <span className="mr-2">Hablar con un asesor</span>
    <FaWhatsapp className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
  </Button>
  )
}

export default ContactButtonWhatsApp