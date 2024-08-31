import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface GetMonthQuizAnswerRateParams extends PrivateRequest {
  categoryId: number
  date: {
    year: number
    month: number
  }
}

interface GetMonthQuizAnswerRateResponse {
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

export const getMonthQuizAnswerRate = async ({
  categoryId,
  date,
  accessToken,
}: GetMonthQuizAnswerRateParams) => {
  return await apiClient.fetch<GetMonthQuizAnswerRateResponse>({
    endpoint: API_ENDPOINT.quiz.getMonthQuizAnswerRate(categoryId, date.year, date.month),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
