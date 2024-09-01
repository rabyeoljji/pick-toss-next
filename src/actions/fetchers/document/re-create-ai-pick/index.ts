'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ReCreateAiPickParams extends NextFetchRequestConfig {
  documentId: number
}

interface ReCreateAiPickResponse {}

export const reCreateAiPick = async (params: ReCreateAiPickParams) => {
  return await apiClient.fetch<ReCreateAiPickResponse>({
    endpoint: API_ENDPOINT.document.rePostAiPick(params.documentId),
  })
}