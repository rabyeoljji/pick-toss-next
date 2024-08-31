import { GetQuizSetsResponse } from '@/actions/fetchers/quiz/get-quiz-sets'

export type QuizDTO = GetQuizSetsResponse['quizzes'][number]

export type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'
