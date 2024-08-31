'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategory } from '.'
import { useSession } from 'next-auth/react'

export const GET_CATEGORY_KEY = 'category'

interface Params {
  categoryId: number
}

export const useGetCategoryQuery = ({ categoryId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_CATEGORY_KEY, categoryId],
    queryFn: () =>
      getCategory({
        categoryId,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
