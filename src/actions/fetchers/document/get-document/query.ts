'use client'

import { useQuery } from '@tanstack/react-query'
import { getDocument } from '.'
import { useSession } from 'next-auth/react'

export const GET_DOCUMENT_KEY = 'document'

interface Params {
  documentId: number
}

export const useGetDocumentQuery = ({ documentId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_DOCUMENT_KEY, documentId],
    queryFn: () =>
      getDocument({
        documentId,
        accessToken: session?.user.accessToken || '',
      }),
    retry: false,
  })
}
