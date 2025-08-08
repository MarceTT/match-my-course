"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiUserCircleFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";
import { IoClose, IoChevronDown } from "react-icons/io5";
import Logo from "@/public/logos/final-logo.png";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import SchoolSearch from "./SchoolSearch";
import { sendGTMEvent } from "@/app/lib/gtm";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    name: "Cómo funciona",
    href: "/como-funciona-matchmycourse",
  },
  {
    name: "Servicios",
    dropdown: [
      {
        name: "Asesoría gratis",
        href: "/servicios",
      },
      {
        name: "Testimonios",
        href: "/testimonios",
      },
      {
        name: "Contacto",
        href: "/contacto",
      },
    ],
  },
  {
    name: "Escuelas socias",
    dropdown: [
      {
        name: "Escuelas",
        href: "/escuelas-socias",
      },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, activeDropdown]);

  const handleLinkClick = (label: string, href: string) => {
    sendGTMEvent("link_click", {
      label,
      destination: href,
      location: "header",
    });
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <header className="w-full py-8 px-6 bg-white transition-all duration-300 ease-in-out shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold lg:ml-6 group"
            onClick={() => handleLinkClick("Logo", "/")}
          >
            <div className="relative">
              <Image
                src={Logo}
                alt="Logo de MatchMyCourse"
                className={
                  isMobile
                    ? "h-8 w-auto mr-2"
                    : "h-12 w-auto mr-2 group-hover:scale-105 transition-transform duration-300"
                }
                width={200}
                height={60}
                priority
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 ml-12">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[item.name] = el;
                }}
              >
                {item.dropdown ? (
                  <div>
                    <button
                      className="relative px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group text-lg flex items-center space-x-1"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                    >
                      <span>{item.name}</span>
                      <IoChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in-0 zoom-in-95 duration-200"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group"
                            onClick={() =>
                              handleLinkClick(
                                dropdownItem.name,
                                dropdownItem.href
                              )
                            }
                          >
                            <div className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                              {dropdownItem.name}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-sm text-gray-500 mt-1 group-hover:text-blue-500">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="relative px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group text-lg"
                    onClick={() => handleLinkClick(item.name, item.href!)}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
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
              <IoClose
                className={`absolute inset-0 w-8 h-8 text-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none"
            aria-label="Cerrar menú"
          >
            <IoClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="px-6 mb-4 flex items-center justify-center">
          <SchoolSearch />
        </div>

        <nav className="flex flex-col items-center space-y-2 px-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={item.name} className="w-full">
              {item.dropdown ? (
                <div className="w-full">
                  <button
                    className="w-full text-2xl text-gray-600 hover:text-blue-600 transition-all duration-200 font-semibold py-2 flex items-center justify-center space-x-2"
                    onClick={() => toggleMobileDropdown(item.name)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span>{item.name}</span>
                    <IoChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        mobileDropdowns[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileDropdowns[item.name]
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 rounded-lg mx-4 my-2 py-2">
                      {item.dropdown.map((dropdownItem, dropIndex) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-3 text-gray-600 hover:text-blue-600 transition-all duration-200 text-center"
                          onClick={() =>
                            handleLinkClick(
                              dropdownItem.name,
                              dropdownItem.href
                            )
                          }
                          style={{
                            animationDelay: `${index * 50 + dropIndex * 25}ms`,
                          }}
                        >
                          <div className="font-medium text-lg">
                            {dropdownItem.name}
                          </div>
                          {dropdownItem.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {dropdownItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className="text-2xl text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:translate-x-2 font-semibold block text-center py-2"
                  onClick={() => handleLinkClick(item.name, item.href!)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
