import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

export interface VerifyEmailParams extends PrivateRequest {
  email: string
  accessToken: string
}

export const verifyEmail = async ({ email, accessToken }: VerifyEmailParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.auth.verifyEmail(),
    body: {
      email,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
