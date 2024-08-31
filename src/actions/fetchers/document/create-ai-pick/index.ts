import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface CreateAiPickParams extends PrivateRequest {
  documentId: number
}

interface CreateAiPickResponse {
  firstUseAiPick: boolean
}

export const createAiPick = async (params: CreateAiPickParams) => {
  return await apiClient.fetch<CreateAiPickResponse>({
    endpoint: API_ENDPOINT.document.postAiPick(params.documentId),
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
