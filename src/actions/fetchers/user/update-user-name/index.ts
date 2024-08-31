import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface UpdateUserNameParams extends PrivateRequest {
  name: string
}

export const updateUserName = async ({ name, accessToken }: UpdateUserNameParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.user.updateUserName(),
    body: {
      name,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
