// app/privacy-policy/page.tsx
"use client"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | MatchMyCourse",
  description: "Política de privacidad de MatchMyCourse. Conoce cómo protegemos tus datos personales.",
  alternates: {
    canonical: "https://matchmycourse.com/politica-privacidad",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="px-4 py-10">
      <div className="text-justify w-full max-w-none sm:max-w-[900px] sm:ml-28 space-y-4">
        <h1 className="text-3xl font-bold mb-6">
          Política de Privacidad de MatchMyCourse
        </h1>
        <h2 className="text-2xl font-bold">
          1. Introducción
        </h2>
        <p>
          MatchMyCourse, la privacidad de nuestros estudiantes es una prioridad. 
          Esta Política de Privacidad tiene como objetivo explicar de manera clara 
          y transparente cómo recopilamos, utilizamos, almacenamos y protegemos los 
          datos personales de las personas que utilizan nuestros servicios y navegan 
          por nuestro sitio web. Al acceder y utilizar nuestros servicios, el estudiante 
          acepta los términos descritos en este documento.
        </p>
        <h2 className="text-2xl font-bold">
          2. Confidencialidad y tratamiento de datos personales
        </h2>
        <p>
          Al aceptar nuestros términos y condiciones, el estudiante declara haber leído y 
          aceptado esta Política de Privacidad. Asimismo, otorga su consentimiento explícito 
          para que MatchMyCourse procese sus datos personales por medios automatizados y manuales 
          con el objetivo de brindar los servicios contratados de forma eficiente y segura.
        </p>
        <p>
          El tratamiento de datos incluye, pero no se limita a:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Recolección y registro de información personal.
          </li>
          <li>
            Organización, almacenamiento y uso de dicha información para fines administrativos y operativos.
          </li>
          <li>
            Transmisión de los datos a terceros autorizados, como instituciones educativas, aseguradoras y
              proveedores de servicios logísticos.
          </li>
          <li>
            Eliminación, bloqueo o modificación de los datos cuando así se requiera por ley o a solicitud 
            del estudiante.
          </li>
        </ul>
        <p>
          En caso de que el estudiante decida retirar su consentimiento, MatchMyCourse podrá 
          seguir procesando los datos personales si existen razones legales o contractuales que 
          lo justifiquen, tales como la obligación de conservar registros de facturación o procesos 
          de inscripción previamente realizados.
        </p>
        <h2 className="text-2xl font-bold">
          3. Tipos de datos que recopilamos
        </h2>
        <p>
          Durante el proceso de inscripción o uso de nuestros servicios, MatchMyCourse puede recopilar 
          la siguiente información:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Nombre completo y apellidos.
          </li>
          <li>
            Dirección de correo electrónico.
          </li>
          <li>
            Nacionalidad y país de residencia.
          </li>
          <li>
            Currículum vitae, formación académica y experiencia laboral relevante.
          </li>
          <li>
            Documentación requerida por las escuelas de destino (como pasaporte, carta de motivación, etc.).
          </li>
          <li>
            Preferencias respecto al curso, ubicación, tipo de alojamiento y fechas de inicio.
          </li>
          <li>
            Información necesaria para contratar seguros médicos o gestionar requisitos administrativos 
            relacionados.
          </li>
        </ul>
        <h2 className="text-2xl font-bold">
          4. Finalidad del tratamiento de datos
        </h2>
        <p>
          La recopilación de datos personales tiene como propósito principal garantizar una 
          experiencia educativa personalizada, segura y adaptada a las necesidades del estudiante. 
          En concreto, los datos se utilizan para:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Gestionar la inscripción en cursos de inglés en Irlanda y la reserva de alojamiento.
          </li>
          <li>
            Emitir cartas de aceptación y otros documentos requeridos por las escuelas.  
          </li>
          <li>
            Coordinar la contratación de seguros médicos obligatorios.
          </li>
          <li>
            Brindar asesoría personalizada antes, durante y después del viaje.
          </li>
          <li>
            Cumplir con obligaciones contractuales y legales asociadas al servicio prestado.
          </li>
        </ul>
        <h2 className="text-2xl font-bold">
          5. Base legal del tratamiento  
        </h2>
        <p>
          El tratamiento de los datos personales por parte de MatchMyCourse se fundamenta 
          en las siguientes bases legales: El consentimiento libre, específico, informado 
          e inequívoco del estudiante. La necesidad de ejecutar el contrato de servicios 
          firmado entre el estudiante y MatchMyCourse. El cumplimiento de obligaciones 
          legales aplicables a la empresa, como la emisión de facturas o la gestión de seguros.
        </p>
        <h2 className="text-2xl font-bold">
          6. Compartición de datos con terceros
        </h2>
        <p>
          Con el objetivo de prestar un servicio integral, MatchMyCourse podrá compartir los datos 
          personales del estudiante con terceros cuando sea necesario. Estos terceros pueden incluir:
          Escuelas de inglés asociadas para efectuar la matrícula. Compañías de seguros para gestionar 
          coberturas médicas. Plataformas de pago, bancos u otras entidades financieras para procesar transacciones.
          Proveedores de alojamiento, si el estudiante opta por contratar este servicio a través 
          de nuestra plataforma. En todos los casos, MatchMyCourse se asegura de que los terceros 
          cumplan con estándares adecuados de protección de datos.
        </p>
        <h2 className="text-2xl font-bold">
          7. Tiempo de conservación de los datos
        </h2>
        <p>
          Los datos personales recopilados serán conservados mientras dure la relación contractual 
          entre el estudiante y MatchMyCourse y, posteriormente, por un periodo máximo de dos (2) años. 
          Este período podrá extenderse si existen requisitos legales, tributarios o contractuales que 
          así lo exijan. Pasado este tiempo, los datos serán eliminados de forma segura.
        </p>
        <h2 className="text-2xl font-bold">
          8. Derechos del titular de los datos
        </h2>
        <p>
          En conformidad con las normativas vigentes en materia de protección de datos, el estudiante 
          tiene derecho a: Solicitar acceso a sus datos personales para conocer qué información conservamos.
          Rectificar datos que sean inexactos, incompletos o desactualizados.
          Solicitar la eliminación de sus datos cuando ya no sean necesarios para los fines para 
          los cuales fueron recopilados.
          Limitar el tratamiento de sus datos o revocar su consentimiento en cualquier momento.
          Para ejercer cualquiera de estos derechos, el estudiante puede enviar una solicitud 
          escrita al correo: <strong>info@matchmycourse.com.</strong>
        </p>
        <h2 className="text-2xl font-bold">
          9. Medidas de seguridad
        </h2>
        <p>
          MatchMyCourse ha implementado medidas técnicas, administrativas y organizativas para proteger 
          los datos personales de sus estudiantes. Estas medidas están diseñadas para evitar el acceso 
          no autorizado, la alteración, pérdida, destrucción o divulgación indebida de la información. 
          Además, se revisan periódicamente para garantizar su eficacia frente a nuevos riesgos.
        </p>
        <h2 className="text-2xl font-bold">
          10. Cambios en esta política  
        </h2>
        <p>
          Esta Política de Privacidad podrá ser actualizada o modificada por MatchMyCourse en cualquier 
          momento. Cualquier cambio relevante será notificado en el sitio web oficial, y los estudiantes 
          serán invitados a revisarla nuevamente antes de continuar utilizando los servicios.
        </p>
        <h2 className="text-2xl font-bold">
          11. Contacto
        </h2>
        <p>
          Para cualquier consulta relacionada con esta Política de Privacidad o el tratamiento de datos 
          personales, el estudiante puede contactarse a través de los siguientes canales:
        </p>
        <ul>
          <li>
            Correo electrónico general: <strong>contacto@matchmycourse.com</strong>
          </li>
          <li>
            Correo legal: <strong>info@matchmycourse.com</strong>
          </li>
          <li></li>
        </ul>
      </div>
    </section>
  )
}