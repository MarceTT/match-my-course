"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiUserCircleFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Logo from "@/public/logos/final-logo.png";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import SchoolSearch from "./SchoolSearch";

const navItems = [
  { name: "Asesorías gratis", href: "/servicios" },
  // {
  //   name: "Promociones",
  //   href: "/school-search?course=ingles-visa-de-trabajo&offers=verpromociones",
  // },
  {
    name: "Escuelas socias",
    href: "/escuelas-socias",
  },
  {
    name: "Contáctanos",
    href: "/contacto",
  },
  {
    name: "Testimonios",
    href: "/testimonios",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
    <header className="w-full py-8 px-6 bg-white transition-all duration-300 ease-in-out shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold lg:ml-6 group"
          >
            <div className="relative">
              <Image
                src={Logo}
                alt="Logo de MatchMyCourse"
                className={
                  isMobile ? "h-8 w-auto mr-2" : "h-12 w-auto mr-2 group-hover:scale-105 transition-transform duration-300"
                }
                width={200}
                height={60}
                priority
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 ml-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group text-lg"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
        </div>

        <div className="hidden md:block ml-auto">
            <SchoolSearch />
          </div>

        <div className="flex items-center">
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="relative w-8 h-8">
              <CiMenuFries
                className={`absolute inset-0 w-8 h-8 text-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <IoMdClose
                className={`absolute inset-0 w-8 h-8 text-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-50 bg-white transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
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
        <div className="px-6 mb-4 flex items-center justify-center">
          <SchoolSearch />
        </div>
        <nav className="flex flex-col items-center space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:translate-x-2 font-semibold"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
