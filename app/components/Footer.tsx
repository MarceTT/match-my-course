import Link from "next/link";
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Logo from "../../public/logos/logo2.png"

const Footer = () => {
  return (
    <footer className="bg-[#3D3D3D] text-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-4 gap-8 md:gap-4 text-center md:text-left">
          <div className="mt-5 mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold mb-6 lg:items-center"
            >
              <Image src={Logo} alt="Logo de MatchMyCourse" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <div className="p-2 bg-white rounded-md">
                  <FaFacebook className="h-6 w-6 text-gray-600" />
                </div>
                <div className="p-2 bg-white rounded-md">
                  <FaInstagram className="h-6 w-6 text-gray-600" />
                </div>
                <div className="p-2 bg-white rounded-md">
                  <FaYoutube className="h-6 w-6 text-gray-600" />
                </div>
                <div className="p-2 bg-white rounded-md">
                  <FaWhatsapp className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <h3 className="font-semibold mb-4">DESTINOS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/canada">Canadá</Link>
              </li>
              <li>
                <Link href="/irlanda">Irlanda</Link>
              </li>
              <li>
                <Link href="/italia">Italia</Link>
              </li>
              <li>
                <Link href="/malta">Malta</Link>
              </li>
              <li>
                <Link href="/nueva-zelanda">Nueva Zelanda</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <h3 className="font-semibold mb-4">ABROAD</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quienes-somos">Quiénes somos</Link>
              </li>
              <li>
                <Link href="/programas">Programas</Link>
              </li>
              <li>
                <Link href="/escuelas">Escuelas</Link>
              </li>
              <li>
                <Link href="/clases">Clases de inglés online</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
              <li>
                <Link href="/faq">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8">
        <button className="bg-white p-4 rounded-full shadow-lg">
          <FaWhatsapp className="h-6 w-6 text-[#489751]" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
