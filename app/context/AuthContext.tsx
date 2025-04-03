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
import { User } from "@/app/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    const userData = await getInfoUser();

    if ("error" in userData) {
      logout();
    } else {
      setUser(userData.user);
      setToken(userData.token || null); // 👈 importante
    }

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    document.cookie = "refreshToken=; Path=/; Max-Age=0";
    document.cookie = "isLoggedIn=; Path=/; Max-Age=0";
    setUser(null);
    setToken(null); // 👈 limpiar token también
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};