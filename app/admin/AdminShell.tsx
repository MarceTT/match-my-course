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
import { ThemeProvider } from "@/app/admin/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "../providers";
import { AuthProvider } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import ClientOnly from "./client-only";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
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
