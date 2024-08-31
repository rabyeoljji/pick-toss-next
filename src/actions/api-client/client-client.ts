import { EndPoint } from '../endpoints/types'
import { BaseApiClient } from './base-client'

export class ClientApiClient extends BaseApiClient {
  private token: string | null

  constructor(baseUrl: string, token: string | null) {
    super(baseUrl)
    this.token = token
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async getHeaders(endpoint: EndPoint): Promise<HeadersInit> {
    const headers: HeadersInit = {}

    if (endpoint.auth) {
      if (!this.token) {
        throw new Error('Unauthorized')
      }
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }
}
