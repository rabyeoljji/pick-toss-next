import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface CreateQuizzesParams extends PrivateRequest {
  documentIds: number[]
  point: number
  quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'
}

export interface CreateQuizzesResponse {
  quizSetId: string
}

export const createQuizzes = async ({
  documentIds,
  point,
  quizType,
  accessToken,
}: CreateQuizzesParams) => {
  return await apiClient.fetch<CreateQuizzesResponse>({
    endpoint: API_ENDPOINT.quiz.postQuizzes(),
    body: {
      documents: documentIds,
      point,
      quizType,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
