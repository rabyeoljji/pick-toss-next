import { createEndPoint } from './utils/create-end-point'

export const test = {
  changePoint: () => createEndPoint({ url: '/test/change-point', method: 'PATCH', auth: true }),
  changeAiPick: () => createEndPoint({ url: '/test/change-ai-pick', method: 'PATCH', auth: true }),
  createTodayQuiz: () =>
    createEndPoint({ url: '/test/create-today-quiz', method: 'POST', auth: true }),
}
