import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

export interface DeleteCategoryParams extends PrivateRequest {
  categoryId: number
}

export const deleteCategory = async ({ categoryId, accessToken }: DeleteCategoryParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.category.deleteCategory(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
