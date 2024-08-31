import { useSession } from 'next-auth/react'

export const useUser = () => {
  const { data: session } = useSession()
  const user = session?.user.dto
  if (!user) {
    throw new Error('no user')
  }

  return { user }
}
