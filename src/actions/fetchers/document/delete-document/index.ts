import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface DeleteDocumentParams extends PrivateRequest {
  documentId: number
}

export const deleteDocument = async ({ documentId, accessToken }: DeleteDocumentParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.deleteDocument(documentId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
