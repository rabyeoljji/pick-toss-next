'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Header from '@/views/note/note-detail/components/header'
import PickDrawer from '@/features/quiz/components/pick-drawer'
import { QuizListProvider } from '@/features/note/contexts/quiz-list-context'
import NewQuizDrawer from '@/features/quiz/components/new-quiz-drawer'
import ReplayQuizDrawer from '@/features/quiz/components/replay-quiz-drawer'
import { useState } from 'react'
import NoteContent from '@/features/note/screens/note-content'
import Quiz from '@/features/note/screens/quiz'

const tabs = [
  { key: 'note-content', label: '노트', component: <NoteContent /> },
  {
    key: 'quiz',
    label: '퀴즈',
    component: <Quiz />,
  },
] as const

const NoteDetailPage = () => {
  const [activeTab, setActiveTab] = useState<'note-content' | 'quiz'>('note-content')

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <QuizListProvider>
          {/* tab */}
          <div className="sticky top-[54px]">
            <div className="flex items-center justify-between bg-background-base-01 text-text-disabled">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'grow px-[16px] pb-[12px] mt-[12px] border-b border-border-divider',
                    activeTab === tab.key && 'border-b-2 border-button-fill-selected'
                  )}
                >
                  <Text
                    typography="subtitle2-medium"
                    className={cn(
                      'transition-colors',
                      activeTab === tab.key && 'text-text-primary font-bold'
                    )}
                  >
                    {tab.label}
                  </Text>
                </button>
              ))}
            </div>

            <PickDrawer />
          </div>

          {tabs.find((tab) => tab.key === activeTab)?.component}
        </QuizListProvider>

        {/* bottom button */}
        <div className="flex-center fixed bottom-[130px] right-1/2 w-[266px] translate-x-1/2 rounded-full border border-border-default bg-background-toast px-[28px] py-[10px] text-button2 text-button-label-primary shadow-custom-shadow">
          <ReplayQuizDrawer
            triggerComponent={
              <button className="flex-center border-r border-icon-secondary py-[5.5px] pr-[20px]">
                <Icon name="past-record" className="mr-[4px] size-[16px]" />
                <Text className="text-button-label-primary">다시풀기</Text>
              </button>
            }
          />

          <NewQuizDrawer
            triggerComponent={
              <button className="flex-center py-[5.5px] pl-[20px]">
                <Icon
                  name="picktoss"
                  fill="var(--color-orange-500)"
                  className="mr-[4px] size-[16px]"
                />
                <Text className="bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">
                  퀴즈 만들기
                </Text>
              </button>
            }
          />
        </div>
      </main>
    </>
  )
}

export default NoteDetailPage
