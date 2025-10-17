"use client";

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
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { raleway } from "@/app/ui/fonts";
import ChatBot from "./ChatBot";
import { MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

interface FooterProps {
  avoidOverlap?: boolean;
  showWhatsApp?: boolean;
}

const Footer = ({ avoidOverlap = false, showWhatsApp = true }: FooterProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [chatOpen, setChatOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({ scale: 1 });
    }
  }, [isHovered, controls]);

  const handleWhatsappClick = () => {
    setChatOpen(true);
  };

  const handleChatError = (error: Error) => {
    console.error('ChatBot Error:', error);
    
    toast.error("Error en el chat", {
      description: "No pudimos conectar con el asistente. Por favor, intenta de nuevo.",
      action: {
        label: "Reintentar",
        onClick: () => setChatOpen(false)
      }
    });
  };

  const bottomOffset = avoidOverlap ? "bottom-20" : "bottom-20";

  return (
    <footer
      className={`${raleway.className} antialiased bg-[#ededed] text-[#535353] py-12`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8 text-center lg:text-left">
          {/* Logo y descripción - Columna izquierda */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="inline-block mb-6">
              <div className="w-[300px] h-[40px] mx-auto lg:mx-0">
                <Image
                  src={Logo}
                  alt="Logo de MatchMyCourse"
                  width={300}
                  height={40}
                  sizes="(max-width: 768px) 200px, 300px"
                  className="object-contain w-full h-full"
                  priority={false}
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
              <div
                className="p-2 bg-white rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={handleWhatsappClick}
              >
                <FaWhatsapp className="h-5 w-5 text-[#535353]" />
              </div>
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
                      Material de apoyo al estudiante
                    </Link>
                  </li>
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
                      href="/school-search?course=ingles-general"
                      className="hover:text-[#333] transition-colors"
                    >
                      Buscador de escuelas
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
                      href="/servicios"
                      className="hover:text-[#333] transition-colors"
                    >
                      Asesorías gratis
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
                    <a
                      href="https://abroad.cl/programas/estudiar-trabajar-nueva-zelanda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#333] transition-colors"
                    >
                      Nueva Zelanda
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://abroad.cl/programas/estudiar-italiano-italia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#333] transition-colors"
                    >
                      Italia
                    </a>
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

     
      {/* {showWhatsApp && !chatOpen && (
        <motion.div
          className={`fixed ${bottomOffset} right-6 z-50`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {showWelcomeBubble && (
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-xs relative">
                <button 
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowWelcomeBubble(false)}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
                
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-base mb-1">
                    Hola 👋
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    ¿Cómo podemos ayudar hoy?
                  </p>
                </div>
                
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
              </div>
            </motion.div>
          )}


          <motion.div
            animate={controls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
            className="flex justify-end"
          >
            <button
              id="whatsapp-launcher"
              className="relative bg-gray-900 hover:bg-gray-800 p-4 rounded-full shadow-2xl transition-all duration-300 group"
              aria-label="Abrir chat de MatchMyCourse"
              onClick={handleWhatsappClick}
            >
              <MessageCircle className="h-8 w-8 text-white" />
              
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </motion.div>
      )}

      {showWhatsApp && chatOpen && (
        <motion.div
          className={`fixed ${bottomOffset} right-6 z-40`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-lg border border-gray-300 transition-all duration-200"
            onClick={() => setChatOpen(false)}
            aria-label="Minimizar chat"
          >
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </button>
        </motion.div>
      )}

      <ChatBot
        open={chatOpen}
        onOpenChange={setChatOpen}
        showLauncher={false}
        anchorElementId="whatsapp-launcher"
        anchorGap={8}
        anchorOffsetY={20}
        panelSize={{ width: 420, height: 650 }}
        welcomeMessage="¡Hola! 👋 Soy el asistente de MatchMyCourse. ¿Cómo puedo ayudarte hoy?"
        companyName="MatchMyCourse"
        persistMessages={true}
        apiEndpoint="http://localhost:8500/api/chatbot/chat"
        apiHeaders={{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        }}
        onError={handleChatError}
      /> */}
    </footer>
  );
};

export default Footer;