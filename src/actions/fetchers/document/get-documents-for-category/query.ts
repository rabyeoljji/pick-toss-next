'use client'

import { useQuery } from '@tanstack/react-query'
import { getDocumentsForCategory } from '.'
import { useSession } from 'next-auth/react'

export const GET_DOCUMENTS_FOR_CATEGORY_KEY = 'document-for-category'
export const SORT_OPTION = ['createdAt', 'name', 'updatedAt'] as const

interface Params {
  categoryId: number
  sortOption: (typeof SORT_OPTION)[number]
}

export const useGetDocumentsForCategoryQuery = ({ categoryId, sortOption }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_DOCUMENTS_FOR_CATEGORY_KEY, categoryId, sortOption],
    queryFn: () =>
      getDocumentsForCategory({
        categoryId,
        sortOption,
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.documents),
  })
}
