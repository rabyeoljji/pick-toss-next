'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useTodayQuizSetting } from '../../context/today-quiz-setting-context'

const SetNote = () => {
  // todo: useCheckList로 노트 선택 로직 구현
  const { selectedFolderId, setSelectedFolderId } = useTodayQuizSetting()

  return (
    <div className="mt-[2px] h-[calc(100%-111px-100px)] w-full py-[15px]">
      <Text typography="subtitle1-bold" className="mb-[13px]">
        문제를 가져올 노트
      </Text>

      <div className="flex h-[calc(100%-40px)] w-full rounded-[12px] border border-border-default">
        {/* 폴더 선택 영역 */}
        <div
          onClick={(e) => {
            const eventTarget = e.target as HTMLElement
            if (!eventTarget.id) return
            else setSelectedFolderId(Number(eventTarget.id.split('_')[1]))
          }}
          className="flex h-full w-2/5 flex-col gap-[6px] overflow-y-auto border-r border-border-default px-[4px] py-[8px]"
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <Text
              key={'folderId_' + idx}
              id={'folderId_' + idx}
              as="button"
              typography={idx === selectedFolderId ? 'text1-bold' : 'text1-medium'}
              className={cn(
                'flex h-fit w-full items-center gap-[8px] rounded-[8px] px-[8px] py-[11px]',
                idx === selectedFolderId && 'bg-background-base-02'
              )}
            >
              전체 노트
              <span className="text-text-accent">28</span>
            </Text>
          ))}
        </div>

        {/* 노트 선택 영역 */}
        <div className="flex h-full w-3/5 flex-col overflow-y-auto">
          {/* todo: 전체 체크박스 클릭 시 모든 노트 선택되어야 함 */}
          <div className="mb-[4px] flex items-center gap-[8px] px-[10px] py-[16px]">
            <Checkbox id="all" />
            <Text
              as="label"
              htmlFor="all"
              typography="text1-medium"
              className="w-full cursor-pointer"
            >
              전체
            </Text>
          </div>

          {/* 폴더에 속한 노트 수만큼 노출 */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={'noteId_' + idx} className="flex items-center gap-[8px] px-[10px] py-[12px]">
              <Checkbox id={'noteId_' + idx} />
              <Text
                as="label"
                htmlFor={'noteId_' + idx}
                typography="text1-medium"
                className="w-full cursor-pointer"
              >
                최근 이슈
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetNote
