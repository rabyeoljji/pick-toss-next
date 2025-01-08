'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'
import CreateQuizError from '@/features/quiz/screen/create-quiz-error'
import ExitDialog from '@/features/quiz/screen/quiz-view/components/exit-dialog'
import Loading from '@/shared/components/custom/loading'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
import { QuizListProvider } from '../contexts/quiz-list-context'
import DocumentDetailController from '../components/document-detail-controller'
import DocumentContent from './document-content'
import Quiz from './quiz'
import DocumentFloatingButton from '../components/document-floating-button'
import { useAddQuizzes } from '@/requests/document/hooks'
import { useCreateQuiz } from '@/features/quiz/hooks/use-create-quiz'

interface Props {
  documentId: number
  activeTab: 'document-content' | 'quiz'
}

const DocumentDetailView = ({ documentId, activeTab }: Props) => {
  const { data: documentDetail, isPending } = useQuery(queries.document.item(documentId))
  const { mutate: addQuizzesMutate } = useAddQuizzes()
  const formattedContent = documentDetail?.content.replace(/\n/g, '\n\n')

  const { selectedDirectory } = useDirectoryContext()
  const {
    showCreatePopup,
    setShowCreatePopup,
    createError,
    setCreateError,
    openExitDialog,
    setOpenExitDialog,
    handleCreateError,
  } = useCreateQuiz(documentId)

  // const [showCreatePopup, setShowCreatePopup] = useState(false)
  // const [createError, setCreateError] = useState<string | null>(null)
  // const [openExitDialog, setOpenExitDialog] = useState(false)

  const startAddQuizzes = (quizCount: number, quizType: Quiz.Type) => {
    const requestBody = {
      star: quizCount,
      quizType,
    }

    // 문서에서 추가 퀴즈 생성하는 api 요청
    addQuizzesMutate(
      { documentId, requestBody },
      {
        onSuccess: () => {
          setShowCreatePopup(true)
        },
      }
    )
  }

  // const handleCreateError = (response: string) => {
  //   setShowCreatePopup(false)
  //   setCreateError(response)
  // }

  // useEffect(() => {
  //   const handlePopState = (event: PopStateEvent) => {
  //     // ai 퀴즈 생성 팝업이 열려 있는 상태에서는 뒤로 가기 이벤트를 확인
  //     if (showCreatePopup) {
  //       event.preventDefault()
  //       window.history.pushState(null, '', window.location.href)

  //       setOpenExitDialog(true)
  //     }
  //   }

  //   if (showCreatePopup) {
  //     window.history.pushState(null, '', window.location.href)
  //     window.addEventListener('popstate', handlePopState)
  //   }

  //   return () => {
  //     window.removeEventListener('popstate', handlePopState)
  //   }
  // }, [showCreatePopup, router, documentId])

  if (isPending) {
    return <Loading center />
  }

  if (documentId !== null && showCreatePopup) {
    return (
      <div className="h-dvh w-full max-w-mobile">
        <div className="fixed top-0 right-1/2 z-50 h-dvh w-dvw max-w-mobile translate-x-1/2 bg-background-base-01">
          <AiCreatingQuiz
            documentId={documentId}
            documentName={documentDetail?.documentName ?? ''}
            directoryEmoji={selectedDirectory?.emoji ?? '📁'}
            onError={handleCreateError}
          />
        </div>

        <ExitDialog
          open={openExitDialog}
          onOpenChange={setOpenExitDialog}
          index={0}
          isFirst={true}
        />
      </div>
    )
  }

  if (createError !== null) {
    return <CreateQuizError setCreateError={setCreateError} />
  }

  return (
    <main className="min-h-screen">
      <QuizListProvider>
        <DocumentDetailController documentId={documentId} />

        {activeTab === 'document-content' && (
          <DocumentContent formattedContent={formattedContent} />
        )}
        {activeTab === 'quiz' && <Quiz />}
      </QuizListProvider>

      <DocumentFloatingButton
        documentId={documentId}
        documentName={documentDetail?.documentName ?? ''}
        directoryEmoji={documentDetail?.directory.emoji ?? ''}
        savedQuizCount={documentDetail?.totalQuizCount ?? 0}
        startAddQuizzes={startAddQuizzes}
      />
    </main>
  )
}

export default DocumentDetailView
