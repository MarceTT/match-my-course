"use client";

import { useSession, signOut } from "next-auth/react";
import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";

interface AuthContextType {
  user: any; // o define tu tipo si quieres
  token: string | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const user = session?.user ?? null;
  const token = session?.user?.accessToken ?? null;

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
