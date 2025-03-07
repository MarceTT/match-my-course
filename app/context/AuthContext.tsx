"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInfoUser } from "@/app/admin/actions/user";
import { User } from "@/app/types";
import { redirect, usePathname, useRouter } from "next/navigation";
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔥 Hook para usar el contexto en cualquier parte de la app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

// 🔥 Componente proveedor del contexto de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (response.status === 401 || response.status === 403) {
        console.warn("⚠️ Sesión expirada o token inválido.");
        logout(); // Invalidar sesión y redirigir
      }
      return response;
    };
  }, []);

  // Consulta de autenticación
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: getInfoUser,
    retry: false, // No hacer reintentos si falla
    enabled: mounted,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  // Determine el usuario basado en la respuesta
  const user = data && !("error" in data) ? data : null;


  // Redirigir al login si la sesión expira
  useEffect(() => {
    if (mounted && !isLoading && !user && pathname !== "/login") {
      toast.error("⚠️ Sesión expirada. Redirigiendo al login...");
      router.push("/login");
    }
  }, [pathname, isLoading, user, mounted, router]);


  const logout = () => {
    document.cookie = "token=; Path=/; Max-Age=0"; // Elimina la cookie
    refetch(); // 🔄 Revalida la sesión
    router.push("/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
