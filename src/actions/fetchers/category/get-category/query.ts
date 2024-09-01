'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategory } from '.'
import { useSession } from 'next-auth/react'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Params {
  categoryId: number
}

export const useGetCategoryQuery = ({ categoryId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    ...queries.category.item(categoryId),
    queryFn: () =>
      getCategory({
        categoryId,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
