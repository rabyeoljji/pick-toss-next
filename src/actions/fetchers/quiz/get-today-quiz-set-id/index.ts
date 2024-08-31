import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

export type TodayQuizSetType = 'READY' | 'NOT_READY' | 'DONE'

interface GetTodayQuizSetIdParams extends PrivateRequest {}

interface GetTodayQuizSetIdResponse {
  quizSetId: string
  type: TodayQuizSetType
}

export const getTodayQuizSetId = async ({ accessToken }: GetTodayQuizSetIdParams) => {
  return await apiClient.fetch<GetTodayQuizSetIdResponse>({
    endpoint: API_ENDPOINT.quiz.getTodayQuizSetId(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
