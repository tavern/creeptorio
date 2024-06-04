import { app } from '@pkgs/server'
import type { APIRoute } from 'astro'

const handler: APIRoute = ({ request }) => app.fetch(request)

export {
  handler as CONNECT,
  handler as DELETE,
  handler as GET,
  handler as HEAD,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
  handler as TRACE,
}
