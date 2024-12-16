'use client'

import Icon from '@/shared/components/custom/icon'
import EmptyBombList from '../components/empty-bomb-list'
import { useQuizNavigation } from './quiz-view/hooks/use-quiz-navigation'
import { useQuizState } from './quiz-view/hooks/use-quiz-state'
import BombQuiz from '../components/bomb-quiz'
import BombAnimation from '../components/bomb-animation'
import { useState } from 'react'
import Loading from '@/shared/components/custom/loading'
import WrongAnswerDialog from '../components/wrong-answer-dialog'
import { getAnswerText } from '../utils'
import { cn } from '@/shared/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useUpdateWrongQuizResult } from '@/requests/quiz/hooks'
import { useRouter } from 'next/navigation'

const BombQuizView = () => {
  // TODO: 남은 퀴즈 수가 3개정도일 때, 미리 서버에서 오답 리스트 불러와서 현재 리스트에 추가하기
  const router = useRouter()
  const { data, isPending } = useQuery(queries.quiz.bomb())
  const { mutate: updateWrongQuizResultMutate } = useUpdateWrongQuizResult()

  const bombQuizList = data?.quizzes ?? []

  const [openExplanation, setOpenExplanation] = useState(false)

  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { handleNext, quizResults, setQuizResults, leftQuizCount } = useQuizState({
    quizCount: bombQuizList.length,
    currentIndex: currentIndex,
  })

  const currentQuizInfo = bombQuizList[currentIndex]
  const currentAnswerState = quizResults[currentIndex]?.answer

  const onAnswer = ({
    id,
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      const newResults = [...prev]
      newResults[currentIndex] = {
        id,
        answer: isRight,
        choseAnswer,
        elapsedTime: 1,
      }
      return newResults
    })
  }

  const onNext = () => {
    if (openExplanation) {
      setOpenExplanation(false)
    }

    if (quizResults[currentIndex]) {
      const currentResult = {
        id: quizResults[currentIndex].id,
        answer: quizResults[currentIndex].answer,
      }
      const requestBody = { quizzes: [currentResult] }
      const hasNextQuiz = handleNext(currentIndex, bombQuizList.length)
      if (hasNextQuiz) {
        updateWrongQuizResultMutate(requestBody, {
          onSuccess: () => navigateToNext(currentIndex),
        })
      } else {
        updateWrongQuizResultMutate(requestBody)
      }
    }
  }

  const handleExit = () => {
    router.replace('/')
    // 추후 결과 업데이트를 list로 확장 시:
    // 현재까지 퀴즈 결과 서버에 전송
    // onSuccess: 메인 화면으로 이동
  }

  if (isPending) return <Loading center />

  if (!bombQuizList || bombQuizList.length === 0) {
    return (
      <div>
        <div className="fixed h-dvh w-screen max-w-mobile bg-gray-700"></div>

        <div className="fixed z-10 flex h-dvh w-screen max-w-mobile flex-col">
          <div className="h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
            <EmptyBombList />
          </div>

          <div className="flex-center size-full grow"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* dimmed background */}
      <div className="fixed h-dvh w-screen max-w-mobile bg-gray-700"></div>

      <div className="fixed z-10 flex h-dvh w-screen max-w-mobile flex-col">
        {/* 문제 영역 */}
        <div className="h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
          <BombQuiz
            quizzes={bombQuizList}
            currentIndex={currentIndex}
            onAnswer={onAnswer}
            quizResults={quizResults}
            leftQuizCount={leftQuizCount}
            handleExit={handleExit}
          />
        </div>

        {/* bomb 영역 */}
        <div className="flex-center size-full grow">
          <div className="flex-center relative mb-[10px] size-full">
            <Icon
              name="focus-box"
              className={cn(
                'center z-40 size-[100px] transition-transform',
                currentAnswerState === false && 'scale-[0.82]'
              )}
              fill={currentAnswerState === false ? '#f4502c' : '#EFC364'}
            />

            <BombAnimation
              leftQuizCount={leftQuizCount}
              currentIndex={currentIndex}
              quizResults={quizResults}
              onNext={onNext}
              setOpenExplanation={setOpenExplanation}
            />
          </div>
        </div>
      </div>

      <WrongAnswerDialog
        isOpen={openExplanation}
        setIsOpen={setOpenExplanation}
        answer={getAnswerText(currentQuizInfo?.answer ?? '')}
        explanation={currentQuizInfo?.explanation ?? ''}
        directoryName={currentQuizInfo?.directory?.name ?? ''}
        documentName={currentQuizInfo?.document.name ?? ''}
        onNext={onNext}
      />
    </div>
  )
}

export default BombQuizView
