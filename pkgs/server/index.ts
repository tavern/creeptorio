import { db, type Cell } from '@pkgs/db'
import { Hono } from 'hono'

export const app = new Hono().basePath('/api')

const routes = app.get('/map', async (c) => {
  const cells = await db.query.cells.findMany()
  return c.json(
    cells.reduce((acc, cell) => {
      if (!acc[cell.x]) acc[cell.x] = []
      acc[cell.x][cell.y] = cell
      acc[cell.x] = acc[cell.x].sort((a, b) => a.y - b.y)
      return acc
    }, [] as Cell[][]),
  )
})

export type AppType = typeof routes
