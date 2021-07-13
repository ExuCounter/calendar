import { useState, useEffect } from "react"

const getMonthCountOfDays = (month: number, year: number) => new Date(year, month, 0).getDate()
const getMonthStartLocalDay = (month: number, year: number) => new Date(year, month - 1, 1).getDay()

export const useMonth = (month: number, year: number) => {
  const [countOfDays, setCountOfDays] = useState<number>(0)
  const [startLocalDay, setStartLocalDay] = useState<number>(0)

  useEffect(() => {
    setCountOfDays(getMonthCountOfDays(month, year))
    setStartLocalDay(getMonthStartLocalDay(month, year))
  }, [setCountOfDays, getMonthCountOfDays, month, year])

  return {
    countOfDays,
    startLocalDay,
  }
}
