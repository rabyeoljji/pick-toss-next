import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { QuizType } from '@/actions/types/dto/quiz.dto'

interface QuizCountParams extends PrivateRequest {
  documentIds: number[]
  type: QuizType
}

interface QuizCountResponse {
  quizCount: number
}

export const quizCount = async (params: QuizCountParams) => {
  return await apiClient.fetch<QuizCountResponse>({
    endpoint: API_ENDPOINT.document.quizCount(),
    body: {
      documentIds: params.documentIds,
      type: params.type,
    },
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
