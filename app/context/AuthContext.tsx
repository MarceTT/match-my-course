"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getInfoUser } from "@/app/admin/actions/user";
import { refreshAccessToken } from "@/app/utils/requestServer";
import { User } from "@/app/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    let userData = await getInfoUser();

    if ("error" in userData) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        userData = await getInfoUser();
        if (!("error" in userData)) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } else {
        logout();
        return;
      }
    } else {
      setUser(userData);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    document.cookie = "refreshToken=; Path=/; Max-Age=0";
    router.replace("/login");
    setUser(null);
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
