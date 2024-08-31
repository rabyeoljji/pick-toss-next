import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

export interface TopFive {
  documents: {
    id: number
    name: string
    incorrectAnswerCount: number
    category: {
      id: number
      name: string
    }
  }[]
}

interface GetTopFiveParams extends PrivateRequest {}

interface GetTopFiveResponse extends TopFive {}

export const getTopFive = async ({ accessToken }: GetTopFiveParams) => {
  return await apiClient.fetch<GetTopFiveResponse>({
    endpoint: API_ENDPOINT.document.getTopFive(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
