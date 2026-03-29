import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SchoolFAQProps {
  schoolName: string;
  city: string;
  courseType: string;
}

export default function SchoolFAQ({ schoolName, city, courseType }: SchoolFAQProps) {
  const faqs = [
    {
      question: `¿Cuáles son los requisitos para estudiar en ${schoolName}?`,
      answer: `Para estudiar en ${schoolName} necesitas un pasaporte válido, completar el formulario de inscripción y realizar el pago del curso. Si planeas estudiar más de 90 días en Irlanda, también necesitarás solicitar una visa de estudiante. Te ayudamos con todo el proceso.`,
    },
    {
      question: `¿Qué nivel de inglés necesito para comenzar?`,
      answer: `${schoolName} acepta estudiantes de todos los niveles, desde principiante (A1) hasta avanzado (C2). El primer día de clases realizarás un test de nivel para ubicarte en el grupo adecuado.`,
    },
    {
      question: `¿Puedo trabajar mientras estudio en ${city}?`,
      answer: `Sí, con una visa de estudiante en Irlanda puedes trabajar hasta 20 horas semanales durante el período de clases y 40 horas en vacaciones. El programa de estudio + trabajo (25 semanas) está diseñado específicamente para esto.`,
    },
    {
      question: `¿Cuánto cuesta vivir en ${city} mientras estudio?`,
      answer: `El costo de vida en ${city} varía según tu estilo de vida. En promedio, un estudiante necesita entre €800 y €1,200 mensuales para alojamiento, transporte, alimentación y gastos personales. Te ayudamos a planificar tu presupuesto.`,
    },
    {
      question: `¿La escuela ofrece alojamiento?`,
      answer: `${schoolName} puede ayudarte a encontrar alojamiento, ya sea en residencias estudiantiles, casas de familia (homestay) o apartamentos compartidos. Cada opción tiene diferentes costos y beneficios que podemos explicarte.`,
    },
    {
      question: `¿Qué incluye el precio del curso?`,
      answer: `El precio del curso generalmente incluye las clases, material didáctico básico y acceso a las instalaciones de la escuela. Algunos cursos incluyen extras como actividades sociales, preparación para exámenes o tutorías adicionales.`,
    },
  ];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-8 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="px-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Preguntas Frecuentes sobre {schoolName}
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
