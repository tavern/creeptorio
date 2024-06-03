import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TURSO_DB_TOKEN: z.string().optional(),
  TURSO_DB_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export default envSchema.parse(process.env)
