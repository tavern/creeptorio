import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { commonFields } from '../shared/common'

export const CellMeta = z.object({
  canBuild: z.boolean().default(false).optional(),
  canWalk: z.boolean().default(false).optional(),
})
export type CellMeta = z.infer<typeof CellMeta>

export const cells = sqliteTable(
  'cells',
  {
    ...commonFields,
    x: integer('x').notNull(),
    y: integer('y').notNull(),
    meta: text('meta', { mode: 'json' }).default('{}').$type<CellMeta>(),
    terrain: text('terrain', { enum: ['grass', 'water', 'dirt', 'void', 'path', 'road'] }).default('void'),
  },
  (table) => ({
    pk: primaryKey({ name: 'xy', columns: [table.x, table.y] }),
  }),
)

export type Cell = InferSelectModel<typeof cells>
export type NewCell = InferInsertModel<typeof cells>
