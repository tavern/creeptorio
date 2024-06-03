export const COLOR_SCHEME_HEADER = 'Sec-CH-Prefers-Color-Scheme' as const
export const THEMES = ['light', 'dark'] as const

export type Theme = (typeof THEMES)[number]
