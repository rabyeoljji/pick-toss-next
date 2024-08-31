'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateUserName } from '.'

interface Params {
  name: string
}

export function useUpdateUsernameMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ name }: Params) =>
      updateUserName({
        name,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: async () => await update({}),
  })
}
