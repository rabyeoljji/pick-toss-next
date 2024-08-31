import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ReorderDocumentParams extends PrivateRequest {
  documentId: number
  preDragDocumentOrder: number
  afterDragDocumentOrder: number
}

export const reorderDocument = async ({
  documentId,
  preDragDocumentOrder,
  afterDragDocumentOrder,
  accessToken,
}: ReorderDocumentParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.reorderDocument(),
    body: {
      documentId,
      preDragDocumentOrder,
      afterDragDocumentOrder,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
