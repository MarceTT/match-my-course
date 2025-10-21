"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import SchoolSearch from "./SchoolSearch";
import { sendGTMEvent } from "@/app/lib/gtm";
import type { NavItem } from "./HeaderServer";

interface MobileNavProps {
  navItems: NavItem[];
}

const MobileNav = ({ navItems }: MobileNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const handleLinkClick = (label: string, href: string) => {
    sendGTMEvent("link_click", {
      label,
      destination: href,
      location: "header",
    });
    setIsMenuOpen(false);
  };

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center">
        <button
          className="xl:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative w-8 h-8">
            <Menu
              className={`absolute inset-0 w-8 h-8 text-gray-600 transition-all duration-300 ${
                isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 w-8 h-8 text-gray-600 transition-all duration-300 ${
                isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      <div
        className={`xl:hidden fixed inset-0 z-50 bg-white transform transition-all duration-300 ease-in-out ${
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
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="md:hidden px-6 mb-4 flex items-center justify-center">
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
                    <ChevronDown
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
    </>
  );
};

export default MobileNav;
