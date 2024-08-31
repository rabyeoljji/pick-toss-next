import { EndPoint } from '../types'

export const createEndPoint = ({ url, method, auth = false }: EndPoint) => ({
  url,
  method,
  auth,
})
