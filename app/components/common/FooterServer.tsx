import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Logo from "@/public/logos/final-logo.png";
import { raleway } from "@/app/ui/fonts";

interface FooterServerProps {
  avoidOverlap?: boolean;
  showWhatsApp?: boolean;
}

const FooterServer = ({ avoidOverlap = false, showWhatsApp = true }: FooterServerProps) => {
  return (
    <footer
      className={`${raleway.className} antialiased bg-[#ededed] text-[#535353] py-12`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8 text-center lg:text-left">
          {/* Logo y descripción - Columna izquierda */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-[300px] h-[40px] mx-auto lg:mx-0">
                <Image
                  src={Logo}
                  alt="Logo de MatchMyCourse"
                  fill
                  sizes="(max-width: 768px) 200px, 400px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </Link>

            <p className="text-sm mb-6 leading-relaxed max-w-md text-justify">
              Maximizamos la compatibilidad entre estudiantes y escuelas de
              inglés con una plataforma transparente, confiable y personalizada,
              que permite tomar decisiones informadas, simplificando todo el
              proceso de búsqueda, comparación y reserva.
            </p>

            {/* Redes sociales */}
            <div className="flex justify-center items-center gap-1 lg:justify-start">
              <div className="p-2 bg-white rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Link
                  href="https://www.facebook.com/matchmycourse"
                  target="_blank"
                >
                  <FaFacebook className="h-5 w-5 text-[#535353]" />
                </Link>
              </div>
              <div className="p-2 bg-white rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Link
                  href="https://www.linkedin.com/company/matchmycourse/about/"
                  target="_blank"
                >
                  <FaLinkedin className="h-5 w-5 text-[#535353]" />
                </Link>
              </div>
              <div className="p-2 bg-white rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Link
                  href="https://www.instagram.com/match.my.course/"
                  target="_blank"
                >
                  <FaInstagram className="h-5 w-5 text-[#535353]" />
                </Link>
              </div>
              <div className="p-2 bg-white rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Link
                  href="https://www.youtube.com/@matchmycourse"
                  target="_blank"
                >
                  <FaYoutube className="h-5 w-5 text-[#535353]" />
                </Link>
              </div>
              {/* WhatsApp link removed - can be added as client component if needed */}
            </div>
          </div>

          {/* Área de enlaces - Columna derecha con 2 sub-columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sub-columna izquierda */}
            <div className="space-y-8 text-center md:text-left">
              {/* Navegación */}
              <div>
                <h3 className="font-semibold mb-4 text-[#535353] underline">
                  Navegación
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/servicios"
                      className="hover:text-[#333] transition-colors"
                    >
                      Asesorías personalizadas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buscador-cursos-de-ingles?course=ingles-general"
                      className="hover:text-[#333] transition-colors"
                    >
                      Buscador de escuelas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/escuelas"
                      className="hover:text-[#333] transition-colors"
                    >
                      Todas las escuelas
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Nosotros */}
              <div>
                <h3 className="font-semibold mb-4 text-[#535353] underline">
                  Nosotros
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/estudiar-ingles-irlanda"
                      className="hover:text-[#333] transition-colors"
                    >
                      Asesoría Irlanda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/estudiar-ingles-nueva-zelanda"
                      className="hover:text-[#333] transition-colors"
                    >
                      Asesoría Nueva Zelanda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/escuelas-socias"
                      className="hover:text-[#333] transition-colors"
                    >
                      Escuelas socias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terminos-y-condiciones"
                      className="hover:text-[#333] transition-colors"
                    >
                      Términos y condiciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/politica-de-privacidad"
                      className="hover:text-[#333] transition-colors"
                    >
                      Políticas de privacidad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonios"
                      className="hover:text-[#333] transition-colors"
                    >
                      Testimonios
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacto"
                      className="hover:text-[#333] transition-colors"
                    >
                      Contáctanos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sub-columna derecha */}
            <div className="space-y-4 text-center md:text-left">
              {/* Súmate */}
              <div>
                <h3 className="font-semibold mb-2 text-[#535353] underline">
                  Súmate
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/contacto"
                      className="hover:text-[#333] transition-colors"
                    >
                      Soy una escuela
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacto"
                      className="hover:text-[#333] transition-colors"
                    >
                      Trabaja con nosotros
                    </Link>
                  </li>
                </ul>
                <div>
                  <h3 className="font-semibold mt-4 text-[#535353] underline">
                    Email
                  </h3>
                  <a
                    href="mailto:info@matchmycourse.com"
                    className="text-sm hover:text-[#333] transition-colors"
                  >
                    info@matchmycourse.com
                  </a>
                </div>
              </div>

              {/* Otros destinos */}
              <div>
                <h3 className="font-semibold mt-4 text-[#535353] underline">
                  Otros destinos
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/estudiar-ingles-nueva-zelanda"
                      className="hover:text-[#333] transition-colors"
                    >
                      Nueva Zelanda
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dirección */}
              <div>
                <h3 className="font-semibold mt-4 text-[#535353] underline">
                  Dirección
                </h3>
                <p className="text-sm">
                  77 Camden Street Lower, Dublin, Ireland
                </p>
              </div>

              {/* Teléfonos */}
              <div>
                <h3 className="font-semibold mt-4 text-[#535353] underline">
                  Teléfonos
                </h3>
                <div className="space-y-1 text-sm">
                  <p>+393925210018</p>
                  <p>+56931714541</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterServer;
