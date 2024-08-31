import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { SolvingData } from '@/app/(routes)/quiz/types'

interface PatchQuizResultParams extends PrivateRequest {
  data: {
    quizSetId: string
    quizzes: SolvingData
  }
}

interface PatchQuizResultResponse {
  reward: number | null
}

export const patchQuizResult = async ({ data, accessToken }: PatchQuizResultParams) => {
  return await apiClient.fetch<PatchQuizResultResponse>({
    endpoint: API_ENDPOINT.quiz.patchQuizResult(),
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
