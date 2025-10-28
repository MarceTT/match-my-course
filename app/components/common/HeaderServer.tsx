import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logos/final-logo.png";
import SchoolSearch from "./SchoolSearch";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AnnouncementBanner from "./AnnouncementBanner";

export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export const navItems: NavItem[] = [
  {
    name: "Cómo funciona",
    href: "/como-funciona-matchmycourse",
  },
  {
    name: "Paises",
    dropdown: [
      {
        name: "Irlanda",
        href: "/estudiar-ingles-irlanda",
      },
      {
        name: "Nueva Zelanda",
        href: "/estudiar-ingles-nueva-zelanda",
      },
    ],
  },
  {
    name: "Cursos",
    href: "/cursos-ingles-extranjero",
  },
  {
    name: "Nosotros",
    dropdown: [
      {
        name: "Escuelas",
        href: "/escuelas-socias",
      },
      {
        name: "Quiénes somos",
        href: "/quienes-somos",
      },
      {
        name: "Misión y visión",
        href: "/mision-vision-matchmycourse",
      },
      {
        name: "Nuestros servicios",
        href: "/servicios-matchmycourse",
      },
      {
        name: "Contacto",
        href: "/contacto",
      },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

const HeaderServer = () => {
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBanner />

      <header className="w-full py-6 md:py-8 px-4 md:px-6 bg-white transition-all duration-300 ease-in-out shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold md:lg:ml-6 group"
            >
              <div className="relative">
                <Image
                  src={Logo}
                  alt="Logo de MatchMyCourse"
                  className="h-8 md:h-10 lg:h-12 w-auto mr-2 group-hover:scale-105 transition-transform duration-300"
                  width={200}
                  height={60}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation - Client Island */}
            <DesktopNav navItems={navItems} />
          </div>

          {/* Search bars for different breakpoints */}
          <div className="hidden md:flex xl:hidden items-center ml-auto mr-4">
            <SchoolSearch />
          </div>

          <div className="hidden xl:block ml-auto">
            <SchoolSearch />
          </div>

          {/* Mobile Menu Toggle & Full Menu - Client Island */}
          <MobileNav navItems={navItems} />
        </div>
      </header>
    </div>
  );
};

export default HeaderServer;
