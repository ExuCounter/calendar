import { useState, useEffect } from "react"

const getMonthCountOfDays = (month: number, year: number) => new Date(year, month, 0).getDate()

export const useMonth = (month: number, year: number) => {
  const [previousMonthCountOfDays, setPreviousMonthCountOfDays] = useState<number>(0)
  const [currentMonthCountOfDays, setCurrentMonthCountOfDays] = useState<number>(0)
  const [nextMonthCountOfDays, setNextMonthCountOfDays] = useState<number>(0)

  useEffect(() => {
    setPreviousMonthCountOfDays(getMonthCountOfDays(month - 1, year))
    setCurrentMonthCountOfDays(getMonthCountOfDays(month, year))
    setNextMonthCountOfDays(getMonthCountOfDays(month + 1, year))
  }, [currentMonthCountOfDays, setCurrentMonthCountOfDays, setNextMonthCountOfDays, setPreviousMonthCountOfDays])

  return {
    previousMonthCountOfDays,
    currentMonthCountOfDays,
    nextMonthCountOfDays,
  }
}
