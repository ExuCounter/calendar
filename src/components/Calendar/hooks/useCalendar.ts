import { useState } from "react"
import { isFunction } from "components/shared/utils"
import { ActionWithPayload, ActionWithoutPayload } from "components/shared/actions"
import { getYear, getMonth, getDay, getDateFromNumbers } from "components/Calendar/utils"
import { DateNumberType } from "components/Calendar/types"

type Actions =
  | ActionWithPayload<"setSelectedDate", { date: DateNumberType; onChange?: (date: Date) => void }>
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
  selectedDate: Date
}

export const useCalendar = (): CalendarHookState => {
  const date = new Date()
  const [showingYear, setShowingYear] = useState<number>(getYear(date))
  const [showingMonth, setShowingMonth] = useState<number>(getMonth(date))
  const [selectedDay, setSelectedDay] = useState<number>(getDay(date))
  const [selectedMonth, setSelectedMonth] = useState<number>(getMonth(date))
  const [selectedYear, setSelectedYear] = useState<number>(getYear(date))

  const setSelectedDate = ({ date, onChange }: { date: DateNumberType; onChange?: (date: Date) => void }) => {
    if (date.month > 12) {
      setNextSelectedYear()
      setNextShowingMonth()
    } else if (date.month < 1) {
      setPreviousShowingMonth()
      setPreviousSelectedYear()
    } else {
      setSelectedMonth(date.month)
      setSelectedYear(date.year)
      setSelectedDay(date.day)
    }
    isFunction(onChange) && onChange(getDateFromNumbers(date.year, date.month, date.day))
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
    selectedDate: getDateFromNumbers(selectedYear, selectedMonth - 1, selectedDay),
  }
}
