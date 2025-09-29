import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          return null;
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        const json = await res.json();
        const data = json.data;

        if (
          !res.ok ||
          !data?.user ||
          !data?.accessToken ||
          !data?.refreshToken
        ) {
          return null;
        }

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpires: Date.now() + 5 * 60 * 1000, // 5 minutos - consistente con backend
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
        if (user) {
            return {
              ...token,
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role, 
              accessToken: user.accessToken,
              // Mantener refreshToken solo en el JWT (no exponer en session)
              refreshToken: (user as any).refreshToken,
              accessTokenExpires: Date.now() + 5 * 60 * 1000,
            };
      }

      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Exponer solo los datos necesarios; NO incluir refreshToken en el cliente
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
        emailVerified: (token as any).emailVerified as Date | null,
      } as any;

      // Añade el error si existe en el token
      if (token.error && typeof token.error === "string") {
        session.error = token.error;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    // Duración de la sesión (cookie NextAuth). 'Remember me' se gestiona en cliente
    // para terminar la sesión al cerrar el navegador cuando el usuario NO marca recordar.
    // Aquí se establece un máximo razonable para sesiones persistentes.
    maxAge: 60 * 60 * 24 * 30, // 30 días
  } as any,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: true,
};

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-refresh-token": token.refreshToken,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Error ${response.status}`);
    }

    const newAccessToken = result.data?.accessToken;
    const rotatedRefresh = result.data?.refreshToken as string | undefined;

    if (!newAccessToken) {
      console.error("[NextAuth] Formato inesperado. Se esperaba:", {
        expectedFormat: { accessToken: "..." },
        actualResponse: result,
      });
      throw new Error("El backend no devolvió un accessToken válido");
    }

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 5 * 60 * 1000, // 5 minutos
      // Si el backend rota refreshToken, persistirlo; de lo contrario mantener el actual
      refreshToken: rotatedRefresh ?? token.refreshToken,
      id: token.id,
      name: token.name,
      email: token.email,
      role: token.role,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
