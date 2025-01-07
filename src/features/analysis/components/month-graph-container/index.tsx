'use client'

import DirectorySelectDrawer from '@/features/directory/components/directory-select-drawer'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { monthAnalysisMockData } from '../../config'
import { formatToMD, formatToYYYYMM, formatToYYYYMMDD, isAdjacentDate } from '@/shared/utils/date'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MonthGraphItem from '../month-graph-item'
import { Button } from '@/shared/components/ui/button'

interface Props {
  data: typeof monthAnalysisMockData
  today: Date
}

const MonthGraphContainer = ({ data, today }: Props) => {
  const todayDateString = formatToYYYYMMDD(today)
  const selectedMonth = useSearchParams().get('month')
  const thisMonth = !selectedMonth || selectedMonth === formatToYYYYMM(today)
  const isEmpty = !data.totalQuizCountDuringThePeriod

  const maxTotalCount = useMemo(
    () => Math.max(...data.quizzes.map((data) => data.totalQuizCount)),
    [data.quizzes]
  )

  const firstDateMD = formatToMD(data.quizzes[0]?.date ?? todayDateString)
  const lastDateMD = formatToMD(data.quizzes[data.quizzes.length - 1]?.date ?? todayDateString)

  const [activeTooltip, setActiveTooltip] = useState(false)
  const { selectedDirectory } = useDirectoryContext()

  const directoryName = !selectedDirectory?.name
    ? '전체 노트'
    : selectedDirectory.tag === 'DEFAULT'
    ? '전체 노트'
    : selectedDirectory.name

  const handleBarClick = useCallback(() => {
    setActiveTooltip(true)
  }, [])

  const handleBarMouseEnter = useCallback(() => {
    setActiveTooltip(true)
  }, [])

  const handleBarMouseLeave = useCallback(() => {
    setActiveTooltip(false)
  }, [])

  return (
    <div className="flex h-fit w-full flex-col px-[16px] pb-[48px]">
      <DirectorySelectDrawer
        trigger={
          <button className="flex w-fit items-center">
            <Text as={'span'} typography="subtitle2-medium" color="sub">{`${
              selectedDirectory?.emoji ?? ''
            } ${directoryName}`}</Text>
            <Icon name="chevron-down" className="ml-[8px] size-[16px] text-icon-tertiary" />
          </button>
        }
      />

      {isEmpty ? (
        <Text typography="title3" className="my-[8px]">
          이번 달에 푼 문제가 없어요
        </Text>
      ) : thisMonth ? (
        <Text typography="title3" className="my-[8px]">
          이번 달은{' '}
          <Text as={'span'} color="info">
            {data.totalQuizCountDuringThePeriod}문제
          </Text>{' '}
          풀고 있어요
        </Text>
      ) : (
        <Text typography="title3" className="my-[8px]">
          {selectedMonth?.split('-')[1]}월은{' '}
          <Text as={'span'} color="info">
            {data.totalQuizCountDuringThePeriod}문제
          </Text>{' '}
          풀었어요
        </Text>
      )}

      <div className="flex justify-end gap-[12px]">
        <div className="flex items-center">
          <div className="mr-[4px] size-[12px] rounded-[4px] bg-border-divider"></div>
          <Text as={'span'} typography="caption-medium" color="sub">
            문제 수
          </Text>
        </div>
        <div className="flex items-center">
          <div className="mr-[4px] size-[12px] rounded-[4px] bg-text-info"></div>
          <Text as={'span'} typography="caption-medium" color="sub">
            정답 수
          </Text>
        </div>
      </div>

      <div className="flex-center mt-[78px] w-full">
        <div className="flex w-[305px]">
          <div
            onClick={handleBarClick}
            onMouseEnter={handleBarMouseEnter}
            onMouseLeave={handleBarMouseLeave}
            className="relative flex h-[155px] w-fit gap-[6px]"
          >
            {activeTooltip && (
              <div className="absolute right-1/2 top-[-20px] z-10 mb-2 -translate-y-full translate-x-1/2">
                <div className="flex-center size-fit flex-col rounded-[12px] bg-background-toast px-[10px] py-[6px]">
                  <Text as={'span'} typography="text2-medium" color="primary-inverse">
                    {firstDateMD}~{lastDateMD}
                  </Text>
                  <Text as={'span'} typography="text2-bold" color="primary-inverse">
                    {data.totalCorrectCountDuringThePeriod}/{data.totalQuizCountDuringThePeriod}
                  </Text>
                </div>

                <svg
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-[-7px] right-1/2 translate-x-1/2"
                >
                  <path d="M6.5 10L0.870835 0.249999L12.1292 0.25L6.5 10Z" fill="#393B3D" />
                </svg>
              </div>
            )}

            {Array.isArray(data.quizzes) &&
              data.quizzes.map((data, index) => {
                const notSolved = data.totalQuizCount === 0
                const scaleFactor = data.totalQuizCount / maxTotalCount

                const barHeight = notSolved ? 3 : scaleFactor * 100
                const rightHeight = notSolved
                  ? 0
                  : (data.correctAnswerCount / data.totalQuizCount) * 100

                const renderDateText =
                  data.date === todayDateString
                    ? '오늘'
                    : isAdjacentDate(data.date)
                    ? ''
                    : formatToMD(data.date)

                return (
                  <MonthGraphItem
                    key={index}
                    date={renderDateText}
                    barHeight={barHeight}
                    rightHeight={rightHeight}
                  />
                )
              })}
          </div>
        </div>
      </div>

      <div className="mt-[20px] flex h-fit w-full rounded-[12px] bg-background-base-02 py-[18px]">
        <div className="flex-center w-1/2 flex-col border-r border-border-divider">
          <Text as={'span'} typography="text2-medium" color="sub">
            지난 달 같은 기간보다
          </Text>
          <Text as={'span'} typography="subtitle2-bold" color={isEmpty ? 'sub' : 'primary'}>
            {0 < data.totalQuizCountDuringThePeriod && '+'}
            {0 > data.totalQuizCountDuringThePeriod && '-'}
            {data.differenceFromLastMonth} 문제
          </Text>
        </div>
        <div className="flex-center w-1/2 flex-col">
          <Text as={'span'} typography="text2-medium" color="sub">
            평균 정답률
          </Text>
          <Text as={'span'} typography="subtitle2-bold" color={isEmpty ? 'sub' : 'primary'}>
            {data.averageCorrectRate}%
          </Text>
        </div>
      </div>

      {isEmpty && (
        <Button variant={'mediumRound'} className="mt-[20px] w-full">
          퀴즈노트에서 복습 시작하기
        </Button>
      )}
    </div>
  )
}

export default MonthGraphContainer