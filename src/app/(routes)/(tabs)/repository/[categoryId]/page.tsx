import CategoryTag from '../components/category-tag'
import DocumentList from './components/document-list'
import { CommonLayout } from '@/shared/components/common-layout'
import { getCategory } from '@/actions/fetchers/category/get-category'
import AddNoteFloatingButton from '@/shared/components/add-note-floating-button'
import { auth } from '@/app/api/auth/[...nextauth]/auth'

interface Props {
  params: {
    categoryId: string
  }
}

export default async function Category({ params: { categoryId } }: Props) {
  const session = await auth()
  const category = await getCategory({
    categoryId: Number(categoryId),
    accessToken: session?.user.accessToken || '',
  })

  const { emoji, name, tag } = category

  return (
    <CommonLayout
      mobileOptions={{
        hasSearch: true,
        hasBackButton: true,
      }}
    >
      <div className="mb-[34px] flex items-center gap-[8px] px-[20px]">
        <h2 className="text-h3-bold text-gray-08">
          {emoji || '📁'} {name}
        </h2>
        <CategoryTag tag={tag} />
      </div>
      <DocumentList className="px-[20px] pb-[80px]" categoryId={Number(categoryId)} />
      <AddNoteFloatingButton categoryId={Number(categoryId)} />
    </CommonLayout>
  )
}
