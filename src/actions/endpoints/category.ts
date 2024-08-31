import { createEndPoint } from './utils/create-end-point'

export const category = {
  getCategory: (categoryId: number) =>
    createEndPoint({ url: `/categories/${categoryId}`, method: 'GET', auth: true }),
  getCategories: () => createEndPoint({ url: '/categories', method: 'GET', auth: true }),
  createCategory: () => createEndPoint({ url: '/categories', method: 'POST', auth: true }),
  deleteCategory: (categoryId: number) =>
    createEndPoint({ url: `/categories/${categoryId}`, method: 'DELETE', auth: true }),
  updateCategory: (categoryId: number) =>
    createEndPoint({ url: `/categories/info/${categoryId}`, method: 'PATCH', auth: true }),
  reorderCategory: () =>
    createEndPoint({ url: '/categories/reorder', method: 'PATCH', auth: true }),
}
