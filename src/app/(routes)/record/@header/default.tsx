'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import { useParams, usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const params = useParams()

  const isDetailPage = params.id ? true : false
  const isAllPage = pathname === '/record/all'

  const headerText = isDetailPage ? '퀴즈 상세' : isAllPage ? '퀴즈 기록 전체' : '퀴즈 기록'

  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton />
      <Text typography="subtitle2-medium" className="center">
        {headerText}
      </Text>
    </header>
  )
}

export default Header
