import { hc } from 'hono/client'
import type { AppType } from '.'

export const { api } = hc<AppType>('http://localhost:4321/')
export type ClientType = typeof api

export default api
