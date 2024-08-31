'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateQuizNotification } from '.'

interface Params {
  checked: boolean
}

export function useUpdateQuizNotificationMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ checked }: Params) =>
      updateQuizNotification({
        quizNotificationEnabled: checked,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: async () => await update({}),
  })
}
