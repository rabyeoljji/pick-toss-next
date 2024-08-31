'use client'

import { useQuery } from '@tanstack/react-query'
import { getDocument } from '.'
import { useSession } from 'next-auth/react'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Params {
  documentId: number
}

export const useGetDocumentQuery = ({ documentId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    ...queries.document.item(documentId),
    queryFn: () =>
      getDocument({
        documentId,
        accessToken: session?.user.accessToken || '',
      }),
    retry: false,
  })
}
