import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { CreateCategoryParams, createCategory } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export const useCreateCategoryMutation = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Pick<CreateCategoryParams, 'emoji' | 'name' | 'tag'>) =>
      createCategory({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey })
    },
  })
}
