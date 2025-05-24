"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiUserCircleFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Logo from "@/public/logos/final-logo.png";
import useMediaQuery from "@/app/hooks/useMediaQuery";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header className="w-full py-8 px-6 bg-white ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold lg:ml-6"
          >
            {isMobile ? (
              <Image
                src={Logo}
                alt="Logo de MatchMyCourse"
                className="h-8 w-auto mr-2"
                width={200}
                height={60}
                priority
              />
            ) : (
              <Image
                src={Logo}
                alt="Logo de MatchMyCourse"
                className="h-12 w-auto mr-2"
                width={200}
                height={60}
                priority
              />
            )}
          </Link>
          <nav className="hidden md:flex items-center space-x-4 ml-12">
            {/* <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link> */}
            <Link
              href="/servicios"
              className="text-gray-600 hover:text-gray-900"
            >
              Servicios
            </Link>
            <Link
              href="/school-search?course=ingles-visa-de-trabajo&offers=verpromociones"
              className="text-gray-600 hover:text-gray-900"
            >
              Promociones
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          {/* <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="mx-2 sm:mr-4 lg:mr-10"
          >
            <Button onClick={() => setOpen(true)} className="w-full bg-[#E51D58] hover:bg-[#E51D58]/80 text-white font-bold py-2 px-4 rounded-lg">
             Hacer match
            </Button>
            <StepForm open={open} onOpenChange={setOpen} />
          </motion.div> */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <IoMdClose className="h-8 w-8 text-gray-600" />
            ) : (
              <CiMenuFries className="h-8 w-8 text-gray-600" />
            )}
          </button>

          {/* <button className="hidden md:block">
            <PiUserCircleFill className="h-8 w-8 text-black" />
          </button> */}
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none"
            aria-label="Cerrar menú"
          >
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-4">
          {/* <Link href="/blog" className="text-2xl text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link> */}
          <Link
            href="/servicios"
            className="text-2xl text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="/school-search?course=ingles-visa-de-trabajo&offers=verpromociones"
            className="text-2xl text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Promociones
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
