'use client'

import { useMutation } from '@tanstack/react-query'
import { quizCount } from '.'
import { QuizType } from '@/actions/types/dto/quiz.dto'
import { useSession } from 'next-auth/react'

interface Params {
  documentIds: number[]
  type: QuizType
}

export function useQuizCountMutation() {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ documentIds, type }: Params) =>
      quizCount({
        documentIds,
        type,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
