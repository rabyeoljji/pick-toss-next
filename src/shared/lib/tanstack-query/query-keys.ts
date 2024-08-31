import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  category: {
    list: () => ({
      queryKey: [''],
    }),
    item: ({ id }: { id: number }) => ({
      queryKey: [id],
    }),
  },
})
