import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface CreateTodayQuizParams extends PrivateRequest {
  quizSetId: string
  accessToken: string
}

export const createTodayQuiz = async ({ quizSetId, accessToken }: CreateTodayQuizParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.test.createTodayQuiz(),
    body: {
      quizSetId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
