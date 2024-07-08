'use client'

import { useSession } from 'next-auth/react'
import React, { isValidElement } from 'react'
import { LimitDocumentDialog } from './limit-document-dialog'

interface Props {
  skeleton: React.ReactElement
  children: React.ReactElement
}

export function CreateDocumentProtector({ skeleton, children }: Props) {
  if (!isValidElement(children) || React.Children.count(children) !== 1) {
    throw new Error('Children should have only one top-level element.')
  }

  const { data: session } = useSession()
  const user = session?.user.dto
  if (!user) {
    return skeleton
  }

  const isLimited =
    user.documentUsage.freePlanMaxPossessDocumentCount - user.documentUsage.possessDocumentCount ===
    0

  if (isLimited) {
    return <LimitDocumentDialog trigger={skeleton} />
  }

  return children
}