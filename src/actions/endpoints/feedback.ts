import { createEndPoint } from './utils/create-end-point'

export const feedback = {
  postFeedback: () => createEndPoint({ url: '/feedback', method: 'POST', auth: true }),
}
