'use client'

import { useQuery } from '@tanstack/react-query'
import { searchKeyPoints } from '.'
import { QueryOptions } from '@/actions/types/query'
import { useSession } from 'next-auth/react'

export const SEARCH_KEY_POINTS_KEY = 'search-key-points'

interface Params {
  term: string
}

export const useSearchKeyPointsQuery = ({ term }: Params, options?: QueryOptions) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [SEARCH_KEY_POINTS_KEY, term],
    queryFn: () =>
      searchKeyPoints({
        term,
        accessToken: session?.user.accessToken || '',
      }),
    enabled: options?.enabled != null && options?.enabled,
  })
}
