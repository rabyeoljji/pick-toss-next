'use client'

import { useSession } from 'next-auth/react'
import React, { isValidElement } from 'react'
import { LimitDocumentDialog } from './limit-document-dialog'
import useAmplitudeContext from '@/hooks/use-amplitude-context'
import { usePathname } from 'next/navigation'

interface Props {
  skeleton: React.ReactElement
  children: React.ReactElement
}

export function CreateDocumentProtector({ skeleton, children }: Props) {
  if (!isValidElement(children) || React.Children.count(children) !== 1) {
    throw new Error('Children should have only one top-level element.')
  }

  const { clickedEvent } = useAmplitudeContext()
  const pathname = usePathname()

  const { data: session } = useSession()
  const user = session?.user.dto
  if (!user) {
    return skeleton
  }

  const isLimited =
    user.documentUsage.freePlanMaxPossessDocumentCount - user.documentUsage.possessDocumentCount ===
    0

  if (isLimited) {
    return (
      <LimitDocumentDialog
        trigger={
          <div
            onClick={() =>
              clickedEvent({
                buttonType: 'addNote',
                pathname,
                buttonName: 'add_document_button',
                failed: true,
              })
            }
          >
            {skeleton}
          </div>
        }
      />
    )
  }

  return children
}
