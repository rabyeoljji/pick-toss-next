import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { DocumentStatus } from '@/actions/types/dto/document.dto'

interface GetKeyPointsByIdParams extends PrivateRequest {
  documentId: number
}

export interface GetKeyPointsByIdResponse {
  documentStatus: DocumentStatus
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
    updatedAt: Date
  }[]
}

export const getKeyPointsById = async ({ documentId, accessToken }: GetKeyPointsByIdParams) => {
  return await apiClient.fetch<GetKeyPointsByIdResponse>({
    endpoint: API_ENDPOINT.keyPoint.getPickPointsById(documentId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
