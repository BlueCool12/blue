import { routing, type Locale } from './routing';

export const SITE_URL = 'https://pyomin.com';

export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return `/${locale}${path}`;
}

export function localizedAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = localizedPath(loc, path);
  }
  languages['x-default'] = localizedPath(routing.defaultLocale, path);
  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}

export function sitemapLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}${localizedPath(loc, path)}`;
  }
  return languages;
}

export function alternateLocales(currentLocale: string): string[] {
  return routing.locales
    .filter((l) => l !== currentLocale)
    .map((l) => OG_LOCALE_MAP[l] ?? l);
}

const OG_LOCALE_MAP: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
};

export function ogLocale(locale: string): string {
  return OG_LOCALE_MAP[locale as Locale] ?? locale;
}