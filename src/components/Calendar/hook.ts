import { useState, useEffect } from "react"

// const currentLocalDay = currentDate.getDay()

export const useCalendar = () => {
  const [year, setYear] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [month, setMonth] = useState<number>(0)
  const [numberOfMonthDays, setNumberOfMonthDays] = useState<number>(0)

  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const numberOfDays = new Date(currentYear, currentMonth, 0).getDate()
    const currentDayOfMonth = currentDate.getUTCDate()

    setYear(currentYear)
    setDay(currentDayOfMonth)
    setMonth(currentMonth)
    setNumberOfMonthDays(numberOfDays)
  }, [setYear, setDay, setMonth])

  return {
    setYear,
    setDay,
    setMonth,
    year,
    day,
    month,
    numberOfMonthDays,
  }
}
