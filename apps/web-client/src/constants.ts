import env from '@pkgs/env'
import type { AstroCookieSetOptions } from 'astro'
import { addMonths } from 'date-fns'

export const COLOR_SCHEME_HEADER = 'Sec-CH-Prefers-Color-Scheme' as const
export const THEMES = ['light', 'dark'] as const
export const THEME_CHOICES = [...THEMES, 'system'] as const

export type Theme = (typeof THEMES)[number]
export type ThemeChoice = (typeof THEME_CHOICES)[number]

export const DEFAULT_COOKIE_OPTIONS: AstroCookieSetOptions = {
  httpOnly: true,
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
  expires: addMonths(new Date(), 6),
}
