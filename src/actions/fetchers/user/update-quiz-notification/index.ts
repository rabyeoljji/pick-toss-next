import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface UpdateQuizNotificationParams extends PrivateRequest {
  quizNotificationEnabled: boolean
}

export const updateQuizNotification = async ({
  quizNotificationEnabled,
  accessToken,
}: UpdateQuizNotificationParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.user.updateQuizNotification(),
    body: {
      quizNotificationEnabled,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
