const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

export const formatDateKorean = (
  dateString: string,
  option?: {
    year?: boolean
    month?: boolean
    day?: boolean
    dayOfWeek?: boolean
  }
): string => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = days[date.getDay()]

  if (option) {
    return [
      option?.year && `${year}년`,
      option?.month && `${Number(month)}월`,
      option?.day && `${Number(day)}일`,
      option?.dayOfWeek && dayOfWeek,
    ]
      .filter((value) => value)
      .join(' ')
  } else {
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`
  }
}

export const getCurrentDate = (option?: {
  year?: boolean
  month?: boolean
  day?: boolean
  dayOfWeek?: boolean
}): string => {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]

  if (option) {
    return [
      option?.year && `${year}년`,
      option?.month && `${month}월`,
      option?.day && `${day}일`,
      option?.dayOfWeek && dayOfWeek,
    ]
      .filter((value) => value)
      .join(' ')
  }

  const formattedDate = `${year}년 ${month}월 ${day}일 ${dayOfWeek}`

  return formattedDate
}

export const getRelativeTime = (time: string) => {
  const inputTime = new Date(time)
  const currentTime = new Date()

  const relativeTime = currentTime.getTime() - inputTime.getTime()
  const relativeMinutes = Math.floor(relativeTime / (1000 * 60))
  const relativeHours = Math.floor(relativeMinutes / 60)
  const relativeDays = Math.floor(relativeHours / 24)

  if (relativeMinutes < 10) {
    return '방금 전'
  }
  if (relativeMinutes < 60) {
    return `${relativeMinutes}분 전`
  }
  if (relativeHours < 24) {
    return `${relativeHours}시간 전`
  }
  if (relativeDays === 1) {
    return `하루 전`
  }
  if (relativeDays === 2) {
    return `이틀 전`
  }
  if (relativeDays < 4) {
    return `${relativeDays}일 전`
  }

  const months = inputTime.getMonth() + 1
  const days = inputTime.getDate()

  return `${months}월 ${days}일`
}

export const currentMonth = () => {
  const date = new Date()
  return date.getMonth() + 1
}

export function calculateTimeUntilTomorrowMidnight() {
  const now = new Date()
  const tomorrowMidnight = new Date(now)

  tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1)
  tomorrowMidnight.setHours(0, 0, 0, 0)

  const timeDifference = tomorrowMidnight.getTime() - now.getTime()

  if (timeDifference <= 0) {
    return { hours: 0, minutes: 0 }
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

  return { hours, minutes }
}

export function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

// YYYY-MM-DD 형식으로 반환
export const getFormattedDate = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`

  return formattedDate
}
