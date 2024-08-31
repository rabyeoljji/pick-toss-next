import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface DeleteQuizParams extends PrivateRequest {
  documentId: number
  quizSetId: string
  quizId: number
}

export interface DeleteQuizResponse {
  quizSetId: string
}

export const deleteQuiz = async ({
  documentId,
  quizSetId,
  quizId,
  accessToken,
}: DeleteQuizParams) => {
  return await apiClient.fetch<DeleteQuizResponse>({
    endpoint: API_ENDPOINT.quiz.deleteQuiz(documentId, quizSetId, quizId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
