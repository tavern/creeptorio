import { defineAction } from 'astro:actions'
import { z } from 'zod'
import { DEFAULT_COOKIE_OPTIONS, THEME_CHOICES } from '~/constants'

export const server = {
  selectTheme: defineAction({
    input: z.enum(THEME_CHOICES),
    handler: (input, ctx) => {
      if (input === 'system') {
        ctx.cookies.delete('theme', DEFAULT_COOKIE_OPTIONS)
      } else {
        ctx.cookies.set('theme', input, DEFAULT_COOKIE_OPTIONS)
      }
    },
  }),
}
