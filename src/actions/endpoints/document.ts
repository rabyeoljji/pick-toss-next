import { createEndPoint } from './utils/create-end-point'

export const document = {
  getDocument: (documentId: number) =>
    createEndPoint({ url: `/documents/${documentId}`, method: 'GET', auth: true }),
  createDocument: () => createEndPoint({ url: '/documents', method: 'POST', auth: true }),
  getDocumentsForCategory: (categoryId: number, sortOption?: 'createdAt' | 'name' | 'updatedAt') =>
    createEndPoint({
      url: `/categories/${categoryId}/documents${sortOption ? `?sort-option=${sortOption}` : ''}`,
      method: 'GET',
      auth: true,
    }),
  deleteDocument: (documentId: number) =>
    createEndPoint({ url: `/documents/${documentId}`, method: 'DELETE', auth: true }),
  postAiPick: (documentId: number) =>
    createEndPoint({ url: `/documents/${documentId}/ai-pick`, method: 'POST', auth: true }),
  rePostAiPick: (documentId: number) =>
    createEndPoint({ url: `/documents/${documentId}/re-upload`, method: 'POST', auth: true }),
  updateDocumentName: (documentId: number) =>
    createEndPoint({
      url: `/documents/${documentId}/update-name`,
      method: 'PATCH',
      auth: true,
    }),
  updateDocumentContent: (documentId: number) =>
    createEndPoint({
      url: `/documents/${documentId}/update-content`,
      method: 'PATCH',
      auth: true,
    }),
  reorderDocument: () => createEndPoint({ url: '/documents/reorder', method: 'PATCH', auth: true }),
  getTopFive: () => createEndPoint({ url: '/documents/top-five', method: 'GET', auth: true }),
  searchDocument: () => createEndPoint({ url: '/documents/search', method: 'POST', auth: true }),
  quizCount: () => createEndPoint({ url: '/documents/quiz-count', method: 'POST', auth: true }),
}
