import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ReorderCategoryParams, reorderCategory } from '.'

export const useReorderCategoryMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (
      data: Pick<
        ReorderCategoryParams,
        'categoryId' | 'preDragCategoryOrder' | 'afterDragCategoryOrder'
      >
    ) =>
      reorderCategory({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
  })
}
