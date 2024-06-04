import env from '@pkgs/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: './index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: env.TURSO_DB_URL,
    authToken: env.TURSO_DB_TOKEN,
  },
} satisfies Config
