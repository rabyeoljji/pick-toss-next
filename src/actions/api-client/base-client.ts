import QS from 'qs'
import { ApiError } from './api-error'
import { ApiResponse } from './types'
import { EndPoint } from '../endpoints/types'

export abstract class BaseApiClient {
  constructor(protected readonly baseUrl: string) {}

  protected abstract getHeaders(endpoint: EndPoint): Promise<HeadersInit>

  async fetch<T extends ApiResponse>(
    endpoint: EndPoint,
    options: {
      query?: object
      body?: object | FormData
      headers?: HeadersInit
    } = {}
  ): Promise<T> {
    const { query, body, headers: customHeaders } = options
    const headers = await this.prepareHeaders(endpoint, customHeaders, body)

    const response = await fetch(this.getUrl(endpoint, query), {
      method: endpoint.method,
      headers,
      body: this.getBody(body),
    })

    return this.handleResponse<T>(endpoint, response)
  }

  private async prepareHeaders(
    endpoint: EndPoint,
    customHeaders?: HeadersInit,
    body?: object | FormData
  ): Promise<Headers> {
    const baseHeaders = await this.getHeaders(endpoint)
    const headers = new Headers(baseHeaders)

    this.applyCustomHeaders(headers, customHeaders)
    this.setContentTypeIfNeeded(headers, body)

    return headers
  }

  private applyCustomHeaders(headers: Headers, customHeaders?: HeadersInit): void {
    if (!customHeaders) return

    if (customHeaders instanceof Headers) {
      customHeaders.forEach((value, key) => headers.set(key, value))
    } else if (Array.isArray(customHeaders)) {
      customHeaders.forEach(([key, value]) => headers.set(key, value))
    } else {
      Object.entries(customHeaders).forEach(([key, value]) => headers.set(key, value))
    }
  }

  private setContentTypeIfNeeded(headers: Headers, body?: object | FormData): void {
    if (!(body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
  }

  private getUrl(endpoint: EndPoint, query?: object): string {
    const searchParamsUrl = query ? `?${QS.stringify(query)}` : ''
    return `${this.baseUrl}${endpoint.url}${searchParamsUrl}`
  }

  private getBody(body?: object | FormData): string | FormData | undefined {
    if (!body) return undefined
    if (body instanceof FormData) return body
    return JSON.stringify(body)
  }

  private async handleResponse<T extends ApiResponse>(
    endpoint: EndPoint,
    res: Response
  ): Promise<T> {
    if (!res.ok) {
      console.error(await res.json())
      throw new ApiError(`${res.statusText}: [${endpoint.method}] ${res.url}`, {
        status: res.status,
        url: res.url,
      })
    }

    return (await res.json().catch(() => ({}))) as T
  }
}
