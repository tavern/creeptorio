import env from '@pkgs/env'
import { defineAction } from 'astro:actions'
import { z } from 'zod'
import { THEME_CHOICES } from '~/constants'

const cookieOptions = {
  httpOnly: true,
  path: '/',
  secure: env.NODE_ENV === 'production',
}

export const server = {
  selectTheme: defineAction({
    input: z.enum(THEME_CHOICES),
    handler: (input, ctx) => {
      if (input === 'system') {
        ctx.cookies.delete('theme', cookieOptions)
      } else {
        ctx.cookies.set('theme', input, cookieOptions)
      }
    },
  }),
}
