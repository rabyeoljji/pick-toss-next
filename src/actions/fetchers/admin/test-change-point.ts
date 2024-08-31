import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ChangePointParams extends PrivateRequest {
  point: number
  accessToken: string
}

export const changePoint = async ({ point, accessToken }: ChangePointParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.test.changePoint(),
    body: {
      point,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
