// Shared i18n locale config — used by both the generator (scripts/i18n-generate.ts)
// and nuxt.config.ts. Add a new language by appending to LOCALES.
export const LOCALES = ['th', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

// Fallback language used when an i18n token is missing a translation.
export const DEFAULT_LOCALE: Locale = 'th';

// Where authors edit (committed) and where output is generated (gitignored).
export const SRC_DIR = 'content-src';
export const OUT_DIR = 'content';

// Subfolders under SRC_DIR that the generator processes this round.
export const SRC_GLOBS = ['page/*.md'];
