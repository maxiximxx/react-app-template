import { routePath } from '../common/config/config'
import http from '../utils/http'

export const baseUrl = `${routePath}/api`

export const api = () => http.get(`${baseUrl}`)
