import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ReorderCategoryParams, reorderCategory } from '.'

export const useReorderCategoryMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (data: Omit<ReorderCategoryParams, 'accessToken' | 'revalidate' | 'tags'>) =>
      reorderCategory({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
