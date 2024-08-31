import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { FeedbackType } from '@/actions/types/dto/feedback.dto'

interface PostFeedbackParams extends PrivateRequest {
  content: string
  type: FeedbackType
}

export const postFeedback = async ({ content, type, accessToken }: PostFeedbackParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.feedback.postFeedback(),
    body: {
      content,
      type,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
