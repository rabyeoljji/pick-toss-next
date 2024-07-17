'use client'
import { useEffect, createContext, PropsWithChildren, useMemo } from 'react'
import { init, track } from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''

export interface Values {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackAmplitudeEvent: (eventName: string, eventProperties?: Record<string, any>) => void
  clickedEvent: (props: {
    buttonName: string
    buttonType:
      | 'todayQuiz'
      | 'pro'
      | 'makeQuiz'
      | 'continuousQuizDates'
      | 'myStar'
      | 'addNote'
      | 'quizPractice'
      | 'quizAnalysis'
      | 'topFive'
      | 'aiPickTooltip'
      | 'bookmark'
    pathname: string
    failed?: boolean
  }) => void
  documentCreatedEvent: (props: { ableCount: number; length: number }) => void
  documentEditedEvent: (props: { length: number }) => void
  aiPickEvent: (props: { ableCount: number; buttonName: string; isPickedAgain: boolean }) => void
  quizCompletedEvent: (props: {
    continuousQuizDates: number
    date: string
    quizType: 'practice' | 'today' | 'ox' | 'multiple'
  }) => void
  quizMadeEvent: (props: { quizType: 'ox' | 'multiple'; count: number }) => void
}

export const AmplitudeContext = createContext<Values | null>(null)

const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    // if (process.env.NODE_ENV === 'production') {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
    })
    // }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackAmplitudeEvent = (eventName: string, eventProperties?: Record<string, any>) => {
    track(eventName, eventProperties)
  }

  const value = useMemo(
    () => ({
      trackAmplitudeEvent,

      clickedEvent: (props: {
        buttonName: string
        buttonType:
          | 'todayQuiz'
          | 'pro'
          | 'makeQuiz'
          | 'continuousQuizDates'
          | 'myStar'
          | 'addNote'
          | 'quizPractice'
          | 'quizAnalysis'
          | 'topFive'
          | 'aiPickTooltip'
          | 'bookmark'
        pathname: string
        failed?: boolean
      }) => trackAmplitudeEvent('Clicked', props),

      documentCreatedEvent: (props: { ableCount: number; length: number }) =>
        trackAmplitudeEvent('Document_Created', props),

      documentEditedEvent: (props: { length: number }) =>
        trackAmplitudeEvent('Document_Edited', props),

      aiPickEvent: (props: { ableCount: number; buttonName: string; isPickedAgain: boolean }) =>
        trackAmplitudeEvent('AI_Pick', props),

      quizCompletedEvent: (props: {
        continuousQuizDates: number
        date: string
        quizType: 'practice' | 'today' | 'ox' | 'multiple'
      }) => trackAmplitudeEvent('Quiz_Completed', props),

      quizMadeEvent: (props: { quizType: 'ox' | 'multiple'; count: number }) =>
        trackAmplitudeEvent('Quiz_Made', props),
    }),
    []
  )

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>
}

export default AmplitudeContextProvider
