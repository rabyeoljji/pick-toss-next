import { createEndPoint } from './utils/create-end-point'

export const star = {
  getStarEvent: () => createEndPoint({ url: '/starEvent', method: 'GET', auth: true }),
}
