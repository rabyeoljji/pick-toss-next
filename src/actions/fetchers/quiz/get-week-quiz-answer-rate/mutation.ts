import { useMutation } from '@tanstack/react-query'
import { getWeekQuizAnswerRate } from '.'
import { useSession } from 'next-auth/react'

interface Params {
  categoryId: number
}

export const useGetWeekQuizAnswerRateMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ categoryId }: Params) =>
      getWeekQuizAnswerRate({
        categoryId,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
