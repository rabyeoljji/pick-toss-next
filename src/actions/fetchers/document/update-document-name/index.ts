import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface UpdateDocumentNameParams extends PrivateRequest {
  documentId: number
  name: string
}

export const updateDocumentName = async ({
  documentId,
  name,
  accessToken,
}: UpdateDocumentNameParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.updateDocumentName(documentId),
    body: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
