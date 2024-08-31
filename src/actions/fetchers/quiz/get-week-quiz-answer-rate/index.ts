import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface GetWeekQuizAnswerRateParams extends PrivateRequest {
  categoryId: number
}

interface GetWeekQuizAnswerRateResponse {
  totalQuizCount: number
  mixUpQuizCount: number
  multipleQuizCount: number
  incorrectAnswerCount: number
  elapsedTime: number
  quizzes: {
    date: string
    totalQuizCount: number
    incorrectAnswerCount: number
  }[]
}

export const getWeekQuizAnswerRate = async ({
  categoryId,
  accessToken,
}: GetWeekQuizAnswerRateParams) => {
  return await apiClient.fetch<GetWeekQuizAnswerRateResponse>({
    endpoint: API_ENDPOINT.quiz.getWeekQuizAnswerRate(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
