import { defineAction } from 'astro:actions'
import { z } from 'zod'
import { THEME_CHOICES } from '~/constants'

export const server = {
  toggleDarkMode: defineAction({
    input: z.enum(THEME_CHOICES),
    handler: (input, ctx) => {
      // FIX: this doesn't persist, waiting on astro issue:
      // @see https://github.com/withastro/roadmap/pull/912#issuecomment-2146122153
      if (input === 'system') {
        ctx.cookies.delete('theme')
      } else {
        ctx.cookies.set('theme', input, {
          httpOnly: true,
          sameSite: 'lax',
        })
      }
    },
  }),
}
