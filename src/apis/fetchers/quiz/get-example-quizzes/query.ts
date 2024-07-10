'use client'

import { useQuery } from '@tanstack/react-query'
import { getExampleQuizSets } from './fetcher'

export const GET_EXAMPLE_QUIZ_SETS_KEY = 'example-quiz-sets'

export const useGetExampleQuizSetsQuery = () => {
  return useQuery({
    queryKey: [GET_EXAMPLE_QUIZ_SETS_KEY],
    queryFn: () => getExampleQuizSets(),
  })
}
