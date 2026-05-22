import { Student } from '@/types';
import { Lang } from '@/lib/i18n';

/**
 * Returns the student's name in the current UI language.
 * In Arabic mode → uses firstNameAr/lastNameAr if available (falls back to Latin).
 * In EN/FR     → uses firstName/lastName.
 */
export function displayName(s: Student, lang: Lang): string {
  if (lang === 'ar' && s.firstNameAr && s.lastNameAr) {
    return `${s.firstNameAr} ${s.lastNameAr}`.trim();
  }
  return `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim() || '—';
}

/** Two-letter initials for avatars — same logic for all languages. */
export function initials(s: Student): string {
  const f = (s.firstName ?? '').trim();
  const l = (s.lastName ?? '').trim();
  return `${f[0] ?? ''}${l[0] ?? ''}`.toUpperCase() || '?';
}

/** Returns YYYY-MM-DD from the timestamp stored in `birthDate`. */
export function birthDateYMD(s: Student): string {
  if (!s.birthDate) return '';
  // Handles both "2008-05-12" and "2008-05-12T00:00:00..." formats
  return s.birthDate.split('T')[0];
}
