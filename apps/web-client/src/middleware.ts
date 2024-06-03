import { defineMiddleware } from 'astro:middleware'
import { COLOR_SCHEME_HEADER } from './constants'

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next()
  res.headers.set('Accept-CH', COLOR_SCHEME_HEADER)
  res.headers.set('Vary', COLOR_SCHEME_HEADER)
  res.headers.set('Critical-CH', COLOR_SCHEME_HEADER)

  return res
})
