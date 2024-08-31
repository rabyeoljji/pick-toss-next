import { createEndPoint } from './utils/create-end-point'

export const keyPoint = {
  getBookmark: () => createEndPoint({ url: '/key-point/bookmark', method: 'GET', auth: true }),
  getPickPointsById: (documentId: number) =>
    createEndPoint({ url: `/documents/${documentId}/key-point`, method: 'GET', auth: true }),
  patchBookmark: (keypointId: number) =>
    createEndPoint({
      url: `/key-point/${keypointId}/bookmark`,
      method: 'PATCH',
      auth: true,
    }),
  searchKeyPoints: () => createEndPoint({ url: '/key-point/search', method: 'POST', auth: true }),
}
