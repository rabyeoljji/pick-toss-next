import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface VerifyEmail extends PrivateRequest {
  email: string
  accessToken: string
}

export const verifyEmail = async ({ email, accessToken }: VerifyEmail) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.auth.verifyEmail(),
    body: {
      email: email,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
