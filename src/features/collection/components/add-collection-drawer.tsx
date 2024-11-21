'use client'

import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from '@/shared/components/ui/drawer'

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

// AddCollectionDrawer 컴포넌트
const AddCollectionDrawer = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-[80dvh] max-w-mobile rounded-t-[16px]"
      >
        <div className="my-[24px] flex h-[calc(100%-150px)] flex-col px-[17px]">
          <DrawerTitle className="mb-[20px] text-title3">원하는 컬렉션에 추가해주세요</DrawerTitle>

          <div className="flex grow flex-col gap-[24px] overflow-y-auto border-t py-[25px]">
            {/* 컬렉션 map */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <Text typography="subtitle2-medium">🔥파이썬OX퀴즈</Text>
                <Button variant={'tinySquare'} colors={'secondary'} className="mr-[2px]">
                  추가하기
                </Button>
                {/* 추가된 상태일 경우 버튼이 텍스트로 변경 - '추가됨' */}
              </div>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <Button variant={'largeRound'} colors={'primary'} className="w-full">
            완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddCollectionDrawer
