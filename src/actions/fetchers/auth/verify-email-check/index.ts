import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface VerifyEmailCheck extends PrivateRequest {
  email: string
  verificationCode: string
}

export const verifyEmailCheck = async ({
  email,
  verificationCode,
  accessToken,
}: VerifyEmailCheck) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.auth.verifyEmailCheck(),
    body: {
      email: email,
      verificationCode: verificationCode,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
