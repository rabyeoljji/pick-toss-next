import Collections from '@/views/collections/collections'

interface Props {
  searchParams: {
    tab: 'exploration' | 'my-collection'
  }
}

const CollectionsPage = ({ searchParams }: Props) => {
  return (
    <>
      <Collections tab={searchParams.tab} />
    </>
  )
}

export default CollectionsPage
