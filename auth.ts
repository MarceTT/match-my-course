import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
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
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
        if (user) {
            return {
              ...token,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              accessTokenExpires: Date.now() + 5 * 60 * 1000,
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        
          if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
            return token;
          }
        
          return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        emailVerified: token.emailVerified as Date | null,
      };

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
  secret: process.env.NEXTAUTH_SECRET,
});



async function refreshAccessToken(token: any) {
  try {
    console.log("[NextAuth] Intentando refrescar token...");
    console.log("[NextAuth] Refresh token usado:", token.refreshToken);

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
    console.log("[NextAuth] Respuesta del backend:", result);

    if (!response.ok) {
      throw new Error(result.message || `Error ${response.status}`);
    }

    const newAccessToken = result.data?.accessToken;

    if (!newAccessToken) {
      console.error("[NextAuth] Formato inesperado. Se esperaba:", {
        expectedFormat: { accessToken: "..." },
        actualResponse: result,
      });
      throw new Error("El backend no devolvió un accessToken válido");
    }

    console.log("[NextAuth] Nuevo token obtenido con éxito:", newAccessToken);

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 5 * 60 * 1000, // 5 minutos
    };
  } catch (error) {
    console.error("[RefreshToken] Error al refrescar token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
