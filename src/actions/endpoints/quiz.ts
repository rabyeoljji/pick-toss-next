import { createEndPoint } from './utils/create-end-point'

export const quiz = {
  getTodayQuizSetId: () => createEndPoint({ url: '/quiz-sets/today', method: 'GET', auth: true }),
  getQuizSets: (quizSetId: string) =>
    createEndPoint({ url: `/quiz-sets/${quizSetId}`, method: 'GET', auth: true }),
  getExampleQuizSets: () => createEndPoint({ url: '/example-quizzes', method: 'GET' }),
  patchQuizResult: () => createEndPoint({ url: '/quiz/result', method: 'PATCH', auth: true }),
  getBookmarks: () => createEndPoint({ url: '/bookmark', method: 'GET', auth: true }),
  postBookmark: (quizId: number) =>
    createEndPoint({ url: `/bookmark/${quizId}`, method: 'POST', auth: true }),
  deleteBookmark: (quizId: number) =>
    createEndPoint({ url: `/bookmark/${quizId}`, method: 'DELETE', auth: true }),
  postQuizzes: () => createEndPoint({ url: '/quizzes', method: 'POST', auth: true }),
  deleteQuiz: (documentId: number, quizSetId: string, quizId: number) =>
    createEndPoint({
      url: `/incorrect-quiz/${documentId}/${quizSetId}/${quizId}`,
      method: 'DELETE',
      auth: true,
    }),
  getWeekQuizAnswerRate: (categoryId: number | 'all') =>
    createEndPoint({
      url: `/categories/${categoryId}/quiz-answer-rate-week`,
      method: 'GET',
      auth: true,
    }),
  getMonthQuizAnswerRate: (categoryId: number | 'all', year: number, month: number) =>
    createEndPoint({
      url: `/categories/${categoryId}/quiz-answer-rate-month/${year}/${month}`,
      method: 'GET',
      auth: true,
    }),
}
