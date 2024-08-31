import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ReCreateAiPickParams extends PrivateRequest {
  documentId: number
}

interface ReCreateAiPickResponse {}

export const reCreateAiPick = async (params: ReCreateAiPickParams) => {
  return await apiClient.fetch<ReCreateAiPickResponse>({
    endpoint: API_ENDPOINT.document.rePostAiPick(params.documentId),
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
