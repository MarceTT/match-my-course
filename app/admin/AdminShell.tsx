"use client";

import dynamic from "next/dynamic";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "../providers";
import { AuthProvider } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import ClientOnly from "./client-only";

// Dynamic imports for heavy components
const AppSidebar = dynamic(() => import("@/components/app-sidebar").then(mod => ({ default: mod.AppSidebar })), {
  loading: () => <div className="w-64 h-screen bg-sidebar animate-pulse" />,
  ssr: false
});

const ThemeProvider = dynamic(() => import("@/app/admin/components/theme-provider").then(mod => ({ default: mod.ThemeProvider })), {
  loading: () => <div />,
  ssr: false
});

const ModeToggle = dynamic(() => import("@/components/mode-toggle").then(mod => ({ default: mod.ModeToggle })), {
  loading: () => <div className="w-8 h-8 rounded bg-gray-200 animate-pulse" />,
  ssr: false
});

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [status, session?.error]);

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (

      <AuthProvider>
        <ReactQueryProvider>
        <ClientOnly>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <ModeToggle />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/admin/dashboard">
                            Inicio
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {pathSegments.map((segment, index) => {
                          const path = `/${pathSegments
                            .slice(0, index + 1)
                            .join("/")}`;
                          const isLast = index === pathSegments.length - 1;
                          return (
                            <span key={path} className="flex items-center">
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                {isLast ? (
                                  <BreadcrumbPage>
                                    {formatSegment(segment)}
                                  </BreadcrumbPage>
                                ) : (
                                  <BreadcrumbLink href={path}>
                                    {formatSegment(segment)}
                                  </BreadcrumbLink>
                                )}
                              </BreadcrumbItem>
                            </span>
                          );
                        })}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                {children}
                <Toaster position="top-center" richColors closeButton />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
          </ClientOnly>
        </ReactQueryProvider>
      </AuthProvider>
  );
}

const formatSegment = (segment: string) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
