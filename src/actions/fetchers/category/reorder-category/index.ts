import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ReorderCategoryParams extends PrivateRequest {
  categoryId: number
  preDragCategoryOrder: number
  afterDragCategoryOrder: number
}

export const reorderCategory = async ({
  categoryId,
  preDragCategoryOrder,
  afterDragCategoryOrder,
  accessToken,
}: ReorderCategoryParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.category.reorderCategory(),
    body: {
      categoryId,
      preDragCategoryOrder,
      afterDragCategoryOrder,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
