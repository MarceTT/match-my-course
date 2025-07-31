"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/public/logos/Logo_Match.png";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "Cargando...",
    email: "Cargando...",
  },
  teams: [
    {
      name: "Match My Course",
      logo: Logo,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Escuelas",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Ver Escuelas",
          url: "/admin/school",
        },
      ],
    },
    {
      title: "Cargas",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Cargar Alojamiento",
          url: "/admin/cargas/alojamiento",
        },
        {
          title: "Cargar Detalle Alojamiento",
          url: "/admin/cargas/alojamiento-detalle-web",
        },
        {
          title: "Cargar Calidad",
          url: "/admin/cargas/calidad",
        },
        {
          title: "Cargar Descripcion de Escuela",
          url: "/admin/cargas/descripcion",
        },
        {
          title: "Cargar Instalaciones",
          url: "/admin/cargas/instalaciones",
        },
        {
          title: "Cargar Nacionalidades",
          url: "/admin/cargas/nacionalidades",
        },
        {
          title: "Cargar Precios",
          url: "/admin/cargas/precios",
        },
        {
          title: "Cargar Rango de Semanas",
          url: "/admin/cargas/rango-semanas-precio",
        },
        {
          title: "Cargar Semanas de Precio",
          url: "/admin/cargas/semanas-precio",
        },
        {
          title: "Cargar SEO",
          url: "/admin/cargas/seo"
        }
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Ver Blog",
          url: "/admin/blog",
        },
        {
          title: "Ver Categorias",
          url: "/admin/blog/categorias",
        },
        {
          title: "Ver Tags",
          url: "/admin/blog/tags",
        },
      ],
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user = session?.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      {loading ? (
          <p className="text-gray-500">Cargando usuario...</p>
        ) : (
          <NavUser user={user || { name: "Cargando...", email: "Cargando..." }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
