import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://dewaltstore.ge";

export function getSiteUrl() {
  return SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
}

export function getMetadataBase() {
  return new URL(`${getSiteUrl()}/`);
}

export function getSafeLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildLocalizedPath(locale: Locale, path = "") {
  return `/${locale}${normalizePath(path)}`;
}

export function buildAbsoluteUrl(path = "") {
  return `${getSiteUrl()}${normalizePath(path) || "/"}`;
}

export function buildSocialImageUrl(imageUrl: string) {
  const trimmedImageUrl = imageUrl.trim();

  if (!trimmedImageUrl) return undefined;

  let absoluteImageUrl: string;

  try {
    absoluteImageUrl =
      trimmedImageUrl.startsWith("http://") ||
      trimmedImageUrl.startsWith("https://")
        ? new URL(trimmedImageUrl).toString()
        : buildAbsoluteUrl(trimmedImageUrl);
  } catch {
    return undefined;
  }

  const params = new URLSearchParams({
    url: absoluteImageUrl,
    w: "1200",
    q: "75",
  });

  return buildAbsoluteUrl(`/_next/image?${params.toString()}`);
}

export function getImageMimeType(imageUrl: string) {
  let pathname: string;

  try {
    pathname = new URL(imageUrl).pathname.toLowerCase();
  } catch {
    pathname = imageUrl.toLowerCase();
  }

  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  return undefined;
}

export function buildCanonicalUrl(locale: Locale, path = "") {
  return buildAbsoluteUrl(buildLocalizedPath(locale, path));
}

export function buildLanguageAlternates(path = "") {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, buildCanonicalUrl(locale, path)])
    ),
    "x-default": buildCanonicalUrl(routing.defaultLocale, path),
  };
}

export function buildLanguageAlternatesByLocale(
  pathsByLocale: Partial<Record<Locale, string>>
) {
  const languages = Object.fromEntries(
    routing.locales
      .map((locale) => {
        const path = pathsByLocale[locale];
        if (!path) return null;
        return [locale, buildCanonicalUrl(locale, path)];
      })
      .filter((entry): entry is [Locale, string] => entry !== null)
  );

  const defaultPath = pathsByLocale[routing.defaultLocale];
  if (defaultPath) {
    return {
      ...languages,
      "x-default": buildCanonicalUrl(routing.defaultLocale, defaultPath),
    };
  }

  return languages;
}

const HTML_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

/** HTML-ს ასუფთავებს და meta description-ისთვის ჭრის სიტყვის საზღვარზე. */
export function toMetaDescription(html: string | undefined | null, max = 160) {
  if (!html) return "";

  const text = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (entity) => HTML_ENTITIES[entity] ?? " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= max) return text;

  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function getOgLocale(locale: Locale) {
  return locale === "ka" ? "ka_GE" : "en_US";
}

export function getAlternateOgLocales(locale: Locale) {
  return routing.locales.filter((l) => l !== locale).map(getOgLocale);
}

type StaticPageMetaKey =
  | "about"
  | "contact"
  | "serviceCenter"
  | "terms"
  | "privacy";

type PageMetaMessages = {
  meta?: {
    pages?: Partial<
      Record<StaticPageMetaKey, { title?: string; description?: string }>
    >;
  };
};

/** title/description/canonical/hreflang საჯარო სტატიკური გვერდისთვის. */
export async function buildStaticPageMetadata(
  routeLocale: string,
  key: StaticPageMetaKey,
  path: string
): Promise<Metadata> {
  const locale = getSafeLocale(routeLocale);
  const messages = (await import(`@/messages/${locale}.json`))
    .default as PageMetaMessages;
  const page = messages.meta?.pages?.[key];

  return buildPageMetadata({
    locale,
    path,
    title: page?.title,
    description: page?.description,
  });
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const canonicalUrl = buildCanonicalUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: locale === "ka" ? "DEWALT საქართველო" : "DEWALT Georgia",
      locale: getOgLocale(locale),
    },
  };
}

/** საძიებოში არ უნდა მოხვდეს (კალათა, checkout, ავტორიზაცია...). */
export const NO_INDEX_METADATA: Metadata = {
  robots: { index: false, follow: true },
};
