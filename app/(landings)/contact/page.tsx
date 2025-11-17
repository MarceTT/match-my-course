import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto | MatchMyCourse",
  description: "Contáctanos para más información sobre nuestros servicios de consultoría para estudiar inglés en el extranjero.",
  alternates: {
    canonical: "https://matchmycourse.com/contacto",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
