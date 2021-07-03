import { useState, useEffect } from "react"

const getMonthCountOfDays = (month: number, year: number) => new Date(year, month, 0).getDate()

export const useMonth = (month: number, year: number) => {
  const [previousMonthCountOfDays, setPreviousMonthCountOfDays] = useState<number>(0)
  const [currentMonthCountOfDays, setShowingMonthCountOfDays] = useState<number>(0)
  const [nextMonthCountOfDays, setNextMonthCountOfDays] = useState<number>(0)

  useEffect(() => {
    setPreviousMonthCountOfDays(getMonthCountOfDays(month - 1, year))
    setShowingMonthCountOfDays(getMonthCountOfDays(month, year))
    setNextMonthCountOfDays(getMonthCountOfDays(month + 1, year))
  }, [currentMonthCountOfDays, setShowingMonthCountOfDays, setNextMonthCountOfDays, setPreviousMonthCountOfDays])

  return {
    previousMonthCountOfDays,
    currentMonthCountOfDays,
    nextMonthCountOfDays,
  }
}
