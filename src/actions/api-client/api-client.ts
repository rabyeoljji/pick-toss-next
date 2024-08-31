import { ServerEnv } from '@/actions/api-client/server-env'
import { ApiError } from './api-error'
import QS from 'qs'
import { EndPoint } from '@/actions/endpoints/types'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { ApiResponse } from './types'

interface Config {
  baseUrl: string
  revalidate: number
}

interface FetchParams {
  endpoint: EndPoint
  headers?: HeadersInit
  query?: object
  body?: object | FormData
  next?: {
    revalidate: number
  }
}

class ApiClient {
  constructor(private readonly config: Config) {}

  async fetch<T extends ApiResponse>(params: FetchParams): Promise<T> {
    const headers = await this.getHeaders(params)

    const response = await fetch(this.getUrl(params), {
      headers,
      next: this.getNextOptions(params.next),
      body: this.getBody(params.body),
      method: params.endpoint.method,
    })

    return await this.handleResponse<T>(params, response)
  }

  private getUrl({ endpoint, query }: Pick<FetchParams, 'endpoint' | 'query'>): string {
    const searchParamsUrl = query ? `?${QS.stringify(query)}` : ''
    return `${this.config.baseUrl}${endpoint.url}${searchParamsUrl}`
  }

  private async getHeaders(params: FetchParams): Promise<HeadersInit> {
    const headers = new Headers(params.headers)

    if (params.endpoint.auth && typeof window === 'undefined') {
      if (typeof window === 'undefined') {
        const session = await auth()
        if (!session) {
          throw new Error('Unauthorized')
        }
        headers.set('Authorization', `Bearer ${session.user.accessToken}`)
      } else {
      }
    }

    if (!(params.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    return headers
  }

  private getNextOptions(next: FetchParams['next']): NextFetchRequestConfig | undefined {
    return {
      revalidate: next?.revalidate ?? this.config.revalidate,
      ...next,
    }
  }

  private getBody(body?: FetchParams['body']): string | FormData | undefined {
    if (!body) {
      return undefined
    }
    if (body instanceof FormData) {
      return body
    }
    return JSON.stringify(body)
  }

  private async handleResponse<T extends ApiResponse>(params: FetchParams, res: Response) {
    if (!res.ok) {
      console.error(await res.json())
      const url = this.getUrl(params)
      throw new ApiError(`${res.statusText}: [${params.endpoint.method}] ${url}`, {
        status: res.status,
        url,
      })
    }

    const data = (await res.json().catch(() => ({}))) as T
    return data
  }
}

export const apiClient = new ApiClient({
  baseUrl: ServerEnv.apiUrl(),
  revalidate: 0,
})
