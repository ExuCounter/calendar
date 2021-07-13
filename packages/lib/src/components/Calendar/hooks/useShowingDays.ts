import { useMonth } from './useMonth'

export type DayPosition = 'previous' | 'current' | 'next'

const TOTAL_OF_DAYS_PER_SCREEN = 42 // 42 days per screen

const getPreviousMonthDays = ({
  showingYear,
  showingMonth,
}: {
  showingYear: number
  showingMonth: number
}) => {
  const { countOfDays, startLocalDay } = useMonth(showingMonth - 1, showingYear)

  return new Array(startLocalDay).fill(null).map((_, idx) => {
    return {
      day: countOfDays - startLocalDay + idx + 1,
      position: 'previous' as DayPosition,
    }
  })
}

const getCurrentMonthDays = ({
  showingYear,
  showingMonth,
}: {
  showingYear: number
  showingMonth: number
}) => {
  const { countOfDays } = useMonth(showingMonth, showingYear)

  return new Array(countOfDays).fill(null).map((_, idx) => {
    return { day: idx + 1, position: 'current' as DayPosition }
  })
}

const getNextMonthDays = ({
  currentMonthCountOfDays,
  previousMonthCountOfDays,
}: {
  currentMonthCountOfDays: number
  previousMonthCountOfDays: number
}) => {
  const totalDays =
    TOTAL_OF_DAYS_PER_SCREEN -
    currentMonthCountOfDays -
    previousMonthCountOfDays

  return new Array(totalDays > 0 ? totalDays : 0).fill(null).map((_, idx) => {
    return { day: idx + 1, position: 'next' as DayPosition }
  })
}

export const useShowingDays = ({
  showingYear,
  showingMonth,
}: {
  showingYear: number
  showingMonth: number
}) => {
  const previousMonthDays = getPreviousMonthDays({ showingYear, showingMonth })
  const currentMonthDays = getCurrentMonthDays({ showingYear, showingMonth })
  const nextMonthDays = getNextMonthDays({
    currentMonthCountOfDays: currentMonthDays.length,
    previousMonthCountOfDays: previousMonthDays.length,
  })

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
}
