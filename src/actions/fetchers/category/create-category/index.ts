import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface CreateCategoryParams extends PrivateRequest {
  name: string
  tag: string
  emoji: string
}

interface CreateCategoryResponse {
  id: number
}

export const createCategory = async ({ name, tag, emoji, accessToken }: CreateCategoryParams) => {
  return await apiClient.fetch<CreateCategoryResponse>({
    endpoint: API_ENDPOINT.category.createCategory(),
    body: {
      name: name,
      tag: tag,
      emoji: emoji,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
