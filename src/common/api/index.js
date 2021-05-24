import { routePath } from '../config/config'
import http from './http'

export const baseUrl = `${routePath}/api`

export const api = () => http.get(`${baseUrl}`)
