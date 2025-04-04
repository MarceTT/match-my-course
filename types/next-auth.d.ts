import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        accessToken: string;
        refreshToken: string;
        emailVerified?: Date | null; // Añade esto
      };
      error?: string;
    }
  
    interface User {
      id: string;
      name: string;
      email: string;
      role: string;
      accessToken: string;
      refreshToken: string;
      emailVerified?: Date | null; // Añade esto
      accessTokenExpires?: number;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      name: string;
      email: string;
      role: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpires?: number;
      error?: string;
      emailVerified?: Date | null; // Añade esto
    }
  }
