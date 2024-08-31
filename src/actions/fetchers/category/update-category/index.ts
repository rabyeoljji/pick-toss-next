import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { CategoryTagType } from '../get-categories'
import { PrivateRequest } from '@/actions/types'

interface UpdateCategoryParams extends PrivateRequest {
  categoryId: number
  tag: CategoryTagType
  name: string
  emoji: string
}

export const updateCategory = async ({
  categoryId,
  name,
  tag,
  emoji,
  accessToken,
}: UpdateCategoryParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.category.updateCategory(categoryId),
    body: {
      name: name,
      categoryTag: tag,
      emoji: emoji,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
