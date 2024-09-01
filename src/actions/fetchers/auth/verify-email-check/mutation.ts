import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { VerifyEmailCheckParams, verifyEmailCheck } from '.'

export const useVerifyEmailCheckMutation = () => {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: (data: Omit<VerifyEmailCheckParams, 'accessToken' | 'revalidate' | 'tags'>) =>
      verifyEmailCheck({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: async () => await update({}),
  })
}
