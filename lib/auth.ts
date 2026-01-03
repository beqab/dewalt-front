import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
import { createApiClient } from "./apiClient";
import { API_ROUTES } from "./apiRoutes";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          // Validate credentials using Zod
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Call authentication service
          const response = await createApiClient(API_ROUTES.AUTH_LOGIN).post<
            {
              email: string;
              password: string;
            },
            {
              token: string;
              refreshToken: string;
              tokenExpiresAt: string;
              user: {
                _id: string;
                name: string;
                surname: string;
                email: string;
              };
            }
          >({
            email: email,
            password: password,
          });

          const cookieStore = await cookies();
          cookieStore.set("refresh_token", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            path: "/",
          });

          if (response) {
            const user = {
              id: response.user._id,
              email: response.user.email,
              name: response.user.name,
              surname: response.user.surname,
              tokenExpiresAt: new Date(response.tokenExpiresAt).toISOString(),
              _id: response.user._id,
              token: response.token,
              refreshToken: response.refreshToken,
            };
            return user;
          }

          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error);
            return null;
          }

          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          tokenExpiresAt: user.tokenExpiresAt,
          _id: user._id,
          email: user.email || token.email || "",
          name: user.name,
          surname: user.surname,
          expiresAt: new Date(user.tokenExpiresAt).getTime(),
          refreshToken: user.refreshToken || token.refreshToken,
        };
      }

      // Ensure token has required properties before checking expiration
      if (!token.tokenExpiresAt || !token._id || !token.accessToken) {
        return token;
      }

      // Check if access token is expired
      if (Date.now() > new Date(token.tokenExpiresAt).getTime()) {
        try {
          let refreshToken = token.refreshToken;

          if (!refreshToken) {
            const cookieStore = await cookies();
            const refreshTokenCookie = cookieStore.get("refresh_token");
            refreshToken = refreshTokenCookie?.value;
          }

          if (!refreshToken) {
            console.error("No refresh token available");
            return token;
          }

          // Forward refresh token in Cookie header for server-side request
          const response = await createApiClient(API_ROUTES.AUTH_REFRESH).post<
            Record<string, never>,
            {
              token: string;
              tokenExpiresAt: string;
            }
          >(
            {},
            {
              headers: {
                Cookie: `refresh_token=${refreshToken}`,
              },
            }
          );

          const refreshedToken = {
            ...token,
            accessToken: response.token,
            tokenExpiresAt: new Date(response.tokenExpiresAt).toISOString(),
            expiresAt: new Date(response.tokenExpiresAt).getTime(),
            refreshToken: refreshToken, // Keep the same refresh token
          };
          return refreshedToken;
        } catch (error) {
          console.error("Refresh token error:", error);
          // Return token as-is if refresh fails (will be invalid but prevents type error)
          return token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user._id = token._id;
        session.user.id = token._id;
        session.user.name = token.name;
        session.user.surname = token.surname;

        if (token.email) {
          session.user.email = token.email as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 10 * 60, // 10 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
});
