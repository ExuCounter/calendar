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
  }, [setYear, setDay, setMonth, setNumberOfMonthDays])

  useEffect(() => {
    const numberOfDays = new Date(year, month, 0).getDate()
    setNumberOfMonthDays(numberOfDays)
  }, [month])

  const setNextYear = () => {
    setYear(year => year + 1)
    setMonth(1)
  }

  const setPreviousYear = () => {
    setYear(year => year - 1)
    setMonth(12)
  }

  const setNextMonth = () => {
    const nextMonth = month + 1
    if (nextMonth <= 12) setMonth(nextMonth)
    if (nextMonth > 12) setNextYear()
  }

  const setPreviousMonth = () => {
    const previousMonth = month - 1
    if (previousMonth >= 1) setMonth(previousMonth)
    if (previousMonth < 1) setPreviousYear()
  }

  return {
    setYear: (number: number) => setYear(number),
    setDay: (number: number) => setDay(number),
    setMonth: (number: number) => setMonth(number),
    setNextMonth,
    setPreviousMonth,
    year,
    day,
    month,
    numberOfMonthDays,
  }
}
