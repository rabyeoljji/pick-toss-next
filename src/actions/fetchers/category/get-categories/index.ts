import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { DocumentStatus } from '@/actions/types/dto/document.dto'

export const CATEGORY_TAG_TYPE = [
  'IT',
  'ECONOMY',
  'HISTORY',
  'LANGUAGE',
  'MATH',
  'ART',
  'MEDICINE',
  'ETC',
  'DEFAULT',
] as const

export type CategoryTagType = (typeof CATEGORY_TAG_TYPE)[number]

export interface Category {
  id: number
  name: string
  tag: CategoryTagType
  order: number
  emoji?: string
  documents: {
    id: number
    name: string
    order: number
    documentStatus: DocumentStatus
  }[]
}

interface GetCategoriesParams extends PrivateRequest {}

interface GetCategoriesResponse {
  categories: Category[]
}

export const getCategories = async ({ accessToken }: GetCategoriesParams) => {
  return await apiClient.fetch<GetCategoriesResponse>({
    endpoint: API_ENDPOINT.category.getCategories(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
