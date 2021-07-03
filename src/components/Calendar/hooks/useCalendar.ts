import { useState, useEffect } from "react"
import { ActionWithPayload, ActionWithoutPayload } from "components/shared/actions"
import { DateType } from "components/Calendar/types"

type Actions =
  | ActionWithPayload<"setSelectedDate", DateType>
  | ActionWithPayload<"setShowingYear", number>
  | ActionWithPayload<"setShowingMonth", number>
  | ActionWithoutPayload<"setNextShowingMonth">
  | ActionWithoutPayload<"setPreviousShowingMonth">

export type CalendarHookState = {
  handleAction: (action: Actions) => void
  showingYear: number
  showingMonth: number
  selectedDay: number
  selectedMonth: number
  selectedYear: number
}

export const useCalendar = (): CalendarHookState => {
  const [showingYear, setShowingYear] = useState<number>(0)
  const [showingMonth, setShowingMonth] = useState<number>(0)
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [selectedYear, setSelectedYear] = useState<number>(0)

  const setSelectedDate = ({ year, month, day }: DateType) => {
    if (month > 12) {
      setNextSelectedYear()
      setNextShowingMonth()
    } else if (month < 1) {
      setPreviousShowingMonth()
      setPreviousSelectedYear()
    } else {
      setSelectedMonth(month)
      setSelectedYear(year)
      setSelectedDay(day)
    }
  }

  const setNextSelectedYear = () => {
    setSelectedYear(year => year + 1)
    setSelectedMonth(1)
  }

  const setPreviousSelectedYear = () => {
    setSelectedYear(year => year - 1)
    setShowingMonth(12)
  }

  const setNextShowingYear = () => {
    setShowingYear(year => year + 1)
    setShowingMonth(1)
  }

  const setPreviousShowingYear = () => {
    setShowingYear(year => year - 1)
    setShowingMonth(12)
  }

  const setNextShowingMonth = () => {
    const nextMonth = showingMonth + 1
    if (nextMonth <= 12) setShowingMonth(nextMonth)
    if (nextMonth > 12) setNextShowingYear()
  }

  const setPreviousShowingMonth = () => {
    const previousMonth = showingMonth - 1
    if (previousMonth >= 1) setShowingMonth(previousMonth)
    if (previousMonth < 1) setPreviousShowingYear()
  }

  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const showingMonth = currentDate.getMonth() + 1
    const currentDayOfMonth = currentDate.getUTCDate()

    setShowingYear(currentYear)
    setShowingMonth(showingMonth)
    setSelectedDate({
      year: currentYear,
      month: showingMonth,
      day: currentDayOfMonth,
    })
  }, [setShowingYear, setShowingMonth])

  const handleAction = (action: Actions) => {
    switch (action.action) {
      case "setSelectedDate":
        return setSelectedDate(action.payload)
      case "setShowingYear":
        return setShowingYear(action.payload)
      case "setShowingMonth":
        return setShowingMonth(action.payload)
      case "setNextShowingMonth":
        return setNextShowingMonth()
      case "setPreviousShowingMonth":
        return setPreviousShowingMonth()
    }
  }

  return {
    handleAction,
    showingYear,
    showingMonth,
    selectedDay,
    selectedMonth,
    selectedYear,
  }
}
