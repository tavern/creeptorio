import { db, type Cell } from '@pkgs/db'
import { Hono } from 'hono'

export const app = new Hono().basePath('/api')

const routes = app.get('/map', async (c) => {
  const cells = await db.query.cells.findMany()
  return c.json<Cell[], 200>(cells)
})

export type AppType = typeof routes
