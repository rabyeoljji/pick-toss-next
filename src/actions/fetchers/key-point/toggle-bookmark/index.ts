import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'

interface ToggleBookmarkParams extends PrivateRequest {
  keypointId: number
  bookmark: boolean
}

export interface ToggleBookmarkResponse {}

export const toggleBookmark = async ({
  keypointId,
  bookmark,
  accessToken,
}: ToggleBookmarkParams) => {
  return await apiClient.fetch<ToggleBookmarkResponse>({
    endpoint: API_ENDPOINT.keyPoint.patchBookmark(keypointId),
    body: {
      bookmark,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
