'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleBookmark } from '.'
import { GET_KEY_POINTS_BY_ID_KEY } from '../get-key-points-by-id/query'
import { useSession } from 'next-auth/react'

interface Props {
  documentId?: number
}

interface Params {
  keyPointId: number
  bookmark: boolean
}

export function useToggleBookmarkMutation(props?: Props) {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ keyPointId, bookmark }: Params) =>
      toggleBookmark({
        keypointId: keyPointId,
        bookmark,
        accessToken: session?.user.accessToken || '',
      }),
    onSettled: async () => {
      if (props?.documentId != null) {
        await queryClient.refetchQueries({
          queryKey: [GET_KEY_POINTS_BY_ID_KEY, props.documentId],
          exact: true,
        })
      } else {
        await queryClient.refetchQueries({
          queryKey: [GET_KEY_POINTS_BY_ID_KEY],
        })
      }
    },
  })
}
