'use client'

import icons from '@/constants/icons'
import { formatDateKorean } from '@/utils/date'
import Image from 'next/image'
import { ClassAttributes, HTMLAttributes } from 'react'
import Markdown, { ExtraProps } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { StatusTag } from '../ui/status-tag'
import { DocumentStatus } from '@/apis/types/dto/document.dto'

interface Props {
  documentName: string
  createdAt: string
  content: string
  status: DocumentStatus
}

export function Viewer({ documentName, createdAt, content, status }: Props) {
  const { isPickOpen } = useDocumentDetailContext()
  const { documentId } = useParams()

  return (
    <div
      className={cn(
        'lg:max-w-[896px] flex-1 overflow-scroll px-[20px] w-full pt-[10px] lg:pt-[28px] pb-[80px]',
        isPickOpen && 'pr-[24px]'
      )}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="line-clamp-1 text-h3-bold text-gray-08 hover:text-clip">
              {documentName}
            </h3>
            <div className="mt-[8px] flex items-center gap-[8px]">
              <p className="text-body2-regular text-gray-06">{formatDateKorean(createdAt)}</p>
              <StatusTag status={status} />
            </div>
          </div>

          <DocumentDropdown documentId={documentId as string} />
        </div>

        <div className="prose max-w-none pb-[80px] lg:pb-0">
          <Markdown remarkPlugins={[remarkGfm]} components={{ code: handleMarkDownCodeBlock }}>
            {content}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

const handleMarkDownCodeBlock = (
  props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps
) => {
  // style, node, ref는 사용하지 않음
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, style, node, ref, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter {...rest} style={dracula} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  )
}

function DocumentDropdown({ documentId }: { documentId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="ml-[10px] flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
          <Image src={icons.kebab} alt="" width={15} height={3} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/modify/${documentId}`} className="flex gap-4">
            <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
            <span className="text-gray-09">문서 수정하기</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
