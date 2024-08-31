type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type EndPoint = {
  url: string
  method: HttpMethod
  auth?: boolean
}
