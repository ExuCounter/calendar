import { useState, useEffect } from "react"

// const currentLocalDay = currentDate.getDay()

export type SelectedDate = {
  day: number
  month: number
  year: number
}

export type CalendarState = {
  setNextMonth: () => void
  setPreviousMonth: () => void
  setCurrentYear: (year: number) => void
  setCurrentMonth: (year: number) => void
  setSelectedDate: (date: SelectedDate) => void
  currentYear: number
  currentMonth: number
  selectedDay: number
  selectedMonth: number
  selectedYear: number
  numberOfMonthDays: number
}

export const useCalendar = (): CalendarState => {
  const [currentYear, setCurrentYear] = useState<number>(0)
  const [currentMonth, setCurrentMonth] = useState<number>(0)
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [selectedYear, setSelectedYear] = useState<number>(0)
  const [numberOfMonthDays, setNumberOfMonthDays] = useState<number>(0)

  const setSelectedDate = ({ year, month, day }: SelectedDate) => {
    setSelectedMonth(month)
    setSelectedYear(year)
    setSelectedDay(day)
  }

  const setNextYear = () => {
    setCurrentYear(year => year + 1)
    setCurrentMonth(1)
  }

  const setPreviousYear = () => {
    setCurrentYear(year => year - 1)
    setCurrentMonth(12)
  }

  const setNextMonth = () => {
    const nextMonth = currentMonth + 1
    if (nextMonth <= 12) setCurrentMonth(nextMonth)
    if (nextMonth > 12) setNextYear()
  }

  const setPreviousMonth = () => {
    const previousMonth = currentMonth - 1
    if (previousMonth >= 1) setCurrentMonth(previousMonth)
    if (previousMonth < 1) setPreviousYear()
  }

  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const numberOfDays = new Date(currentYear, currentMonth, 0).getDate()
    const currentDayOfMonth = currentDate.getUTCDate()

    setCurrentYear(currentYear)
    setCurrentMonth(currentMonth)
    setNumberOfMonthDays(numberOfDays)
    setSelectedDate({
      year: currentYear,
      month: currentMonth,
      day: currentDayOfMonth,
    })
  }, [setCurrentYear, setCurrentMonth, setNumberOfMonthDays])

  useEffect(() => {
    const numberOfDays = new Date(currentYear, currentMonth, 0).getDate()
    setNumberOfMonthDays(numberOfDays)
  }, [currentMonth, currentYear, setNumberOfMonthDays])

  return {
    setNextMonth,
    setPreviousMonth,
    setCurrentYear: (year: number) => setCurrentYear(year),
    setCurrentMonth: (month: number) => setCurrentMonth(month),
    setSelectedDate: (date: SelectedDate) => setSelectedDate(date),
    currentYear,
    currentMonth,
    selectedDay,
    selectedMonth,
    selectedYear,
    numberOfMonthDays,
  }
}
