export const COLOR_SCHEME_HEADER = 'Sec-CH-Prefers-Color-Scheme' as const
export const THEMES = ['light', 'dark'] as const
export const THEME_CHOICES = [...THEMES, 'system'] as const

export type Theme = (typeof THEMES)[number]
export type ThemeChoice = (typeof THEME_CHOICES)[number]
