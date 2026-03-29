import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tarda el proceso de inscripción a una escuela?",
    answer:
      "El proceso de inscripción suele tomar entre 1 y 3 días hábiles una vez que tenemos toda tu documentación. Te acompañamos en cada paso para que sea lo más rápido y sencillo posible.",
  },
  {
    question: "¿El servicio de asesoría tiene algún costo?",
    answer:
      "No, nuestra asesoría es 100% gratuita. Trabajamos directamente con las escuelas, por lo que no hay ningún cargo adicional para ti. El precio que ves es el precio oficial de la escuela.",
  },
  {
    question: "¿En qué horarios atienden?",
    answer:
      "Nuestro equipo está disponible de lunes a viernes de 9:00 a 18:00 (hora de Irlanda). También puedes escribirnos por WhatsApp y te responderemos lo antes posible.",
  },
  {
    question: "¿Puedo agendar una videollamada con un asesor?",
    answer:
      "¡Por supuesto! Una vez que nos contactes, podemos coordinar una videollamada para resolver todas tus dudas de manera personalizada. Solo indícanos tu disponibilidad.",
  },
  {
    question: "¿Qué pasa si no hablo inglés?",
    answer:
      "No te preocupes, todo nuestro equipo habla español. Te asesoramos en tu idioma durante todo el proceso, desde la búsqueda de escuela hasta tu llegada al destino.",
  },
  {
    question: "¿Ayudan con el proceso de visa?",
    answer:
      "Sí, te orientamos sobre los requisitos de visa para estudiantes en Irlanda y otros destinos. Te explicamos qué documentos necesitas y cómo preparar tu aplicación.",
  },
];

export default function ContactFAQ() {
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Preguntas Frecuentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional contact info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:info@matchmycourse.com"
              className="text-blue-600 hover:underline"
            >
              info@matchmycourse.com
            </a>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <a
              href="https://wa.me/393925210018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              +39 392 521 0018
            </a>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Tiempo de respuesta</h3>
            <p className="text-gray-600">Máximo 48 horas hábiles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
