import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // Tipo explícito
      accessToken: string;
      refreshToken: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"]; // Combina con tipos por defecto
    error?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Asegúrate que coincide con tu backend
    accessToken: string;
    refreshToken: string;
    emailVerified?: Date | null;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string; // Mismo tipo que en User
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
    error?: string;
    emailVerified?: Date | null;
  }
}