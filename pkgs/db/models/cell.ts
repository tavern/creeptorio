import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { commonFields } from '../shared/common'

export const CellMeta = z.object({
  canBuild: z.boolean().default(false).optional(),
  canWalk: z.boolean().default(false).optional(),
})
export type CellMeta = z.infer<typeof CellMeta>

export const cells = sqliteTable('cells', {
  ...commonFields,
  x: integer('x'),
  y: integer('y'),
  meta: text('meta', { mode: 'json' }).default('{}').$type<CellMeta>(),
  terrain: text('terrain', { enum: ['grass', 'water', 'dirt', 'void', 'path', 'road'] }).default('void'),
})
