import { sql } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const id = () => text('id').$defaultFn(nanoid).primaryKey()

export const commonFields = {
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch('now', 'subsec'))`)
    .$type<Date | string>(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$onUpdateFn(() => sql`(unixepoch('now', 'subsec'))`)
    .$type<Date | string>(),
}
