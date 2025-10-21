"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { sendGTMEvent } from "@/app/lib/gtm";
import type { NavItem } from "./HeaderServer";

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [activeDropdown]);

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (label: string, href: string) => {
    sendGTMEvent("link_click", {
      label,
      destination: href,
      location: "header",
    });
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden xl:flex items-center space-x-4 ml-12">
      {navItems.map((item) => (
        <div
          key={item.name}
          className="relative"
          ref={(el) => {
            dropdownRefs.current[item.name] = el;
          }}
        >
          {item.dropdown ? (
            <div
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="relative px-2 lg:px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group text-base lg:text-lg flex items-center space-x-1"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === item.name ? null : item.name
                  )
                }
              >
                <span>{item.name}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === item.name ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-72 lg:w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
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
              className="relative px-2 lg:px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group text-base lg:text-lg"
              onClick={() => handleLinkClick(item.name, item.href!)}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;
