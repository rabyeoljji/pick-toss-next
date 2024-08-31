'use client'

import { useQuery } from '@tanstack/react-query'
import { getMonthQuizAnswerRate } from '.'
import { useSession } from 'next-auth/react'

export const GET_MONTH_QUIZ_ANSWER_RATE_KEY = 'month-quiz-answer-rate'

interface Params {
  categoryId: number
  date: {
    year: number
    month: number
  }
}

export const useGetMonthQuizAnswerRateQuery = ({ categoryId, date }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_MONTH_QUIZ_ANSWER_RATE_KEY, categoryId, date.year, date.month],
    queryFn: () =>
      getMonthQuizAnswerRate({
        categoryId,
        date,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
