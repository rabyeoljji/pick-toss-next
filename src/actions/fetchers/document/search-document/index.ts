import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface SearchDocumentParams extends PrivateRequest {
  term: string
}

export interface SearchDocumentResponse {
  documents: {
    documentId: number
    documentName: string
    content: string
    category: {
      id: number
      name: string
    }
  }[]
}

export const searchDocument = async ({ term, accessToken }: SearchDocumentParams) => {
  return await apiClient.fetch<SearchDocumentResponse>({
    endpoint: API_ENDPOINT.document.searchDocument(),
    body: {
      word: term,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
