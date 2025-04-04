"use client";

import { AppSidebar } from "@/components/app-sidebar";
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
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "../providers";
import { AuthProvider } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <SessionProvider>
      <AuthProvider>
        <ReactQueryProvider>
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
        </ReactQueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

const formatSegment = (segment: string) => {
  return segment
    .replace(/-/g, " ") // Reemplaza guiones por espacios
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitaliza cada palabra
};
