'use client'

import { useQuery } from '@tanstack/react-query'
import { getDocumentsForCategory } from '.'
import { useSession } from 'next-auth/react'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export const SORT_OPTION = ['createdAt', 'name', 'updatedAt'] as const

interface Params {
  categoryId: number
  sortOption: (typeof SORT_OPTION)[number]
}

export const useGetDocumentsForCategoryQuery = ({ categoryId, sortOption }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    ...queries.document.list(categoryId, sortOption),
    queryFn: () =>
      getDocumentsForCategory({
        categoryId,
        sortOption,
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.documents),
  })
}
