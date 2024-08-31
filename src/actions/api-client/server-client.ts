import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { BaseApiClient } from './base-client'
import { EndPoint } from '../endpoints/types'

export class ServerApiClient extends BaseApiClient {
  protected async getHeaders(endpoint: EndPoint): Promise<HeadersInit> {
    const headers: HeadersInit = {}

    if (endpoint.auth) {
      const session = await auth()
      if (!session) {
        throw new Error('Unauthorized')
      }
      headers['Authorization'] = `Bearer ${session.user.accessToken}`
    }

    return headers
  }
}
