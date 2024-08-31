import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ChangeAiPickParams extends PrivateRequest {
  aiPickCount: number
  accessToken: string
}

export const changeAiPick = async ({ aiPickCount, accessToken }: ChangeAiPickParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.test.changeAiPick(),
    body: {
      aiPickCount,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
