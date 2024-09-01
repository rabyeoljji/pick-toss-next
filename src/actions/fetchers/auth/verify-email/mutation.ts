import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { VerifyEmailParams, verifyEmail } from '.'

export const useVerifyEmailMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (data: Omit<VerifyEmailParams, 'accessToken' | 'revalidate' | 'tags'>) =>
      verifyEmail({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
