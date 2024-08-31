import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { CategoryTagType } from '../get-categories'
import { PrivateRequest } from '@/actions/types'

interface GetCategoryParams extends PrivateRequest {
  categoryId: number
}

interface GetCategoryResponse {
  id: number
  name: string
  tag: CategoryTagType
  emoji: string
  order: number
}

export const getCategory = async ({ categoryId, accessToken }: GetCategoryParams) => {
  return await apiClient.fetch<GetCategoryResponse>({
    endpoint: API_ENDPOINT.category.getCategory(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
