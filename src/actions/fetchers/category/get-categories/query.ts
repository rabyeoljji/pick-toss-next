'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategories } from '.'
import { useSession } from 'next-auth/react'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export const useGetCategoriesQuery = () => {
  const { data: session } = useSession()

  return useQuery({
    ...queries.category.list(),
    queryFn: () =>
      getCategories({ accessToken: session?.user.accessToken || '' }).then((res) => res.categories),
  })
}
