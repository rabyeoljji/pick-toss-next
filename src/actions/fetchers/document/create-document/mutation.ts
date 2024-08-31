'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from '.'

interface Params {
  file: File
  documentName: string
  categoryId: number
}

export function useCreateDocumentMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ file, documentName, categoryId }: Params) =>
      createDocument({
        file,
        documentName,
        categoryId,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: () => update({}),
  })
}
