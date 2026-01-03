import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPaths = ["/profile", "/orders"];
  const pathname = request.nextUrl.pathname;

  // Extract locale from pathname (e.g., /en/profile or /ka/profile)
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ka)/, "") || pathname;

  // Check if the path is a protected route (without locale prefix)
  const isProtectedPath = protectedPaths.some((path) =>
    pathnameWithoutLocale.includes(path)
  );

  if (isProtectedPath) {
    // Check authentication
    const session = await auth();

    if (!session) {
      // Get locale from pathname or use default
      const locale = pathname.match(/^\/(en|ka)/)?.[1] || routing.defaultLocale;
      // Redirect to login with callback URL
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue with internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
