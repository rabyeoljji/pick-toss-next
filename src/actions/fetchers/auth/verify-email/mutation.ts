import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { VerifyEmailParams, verifyEmail } from '.'

export const useVerifyEmailMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (data: Pick<VerifyEmailParams, 'email'>) =>
      verifyEmail({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
