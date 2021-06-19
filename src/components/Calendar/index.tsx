import { Navigation } from "./Navigation"

export const Calendar = () => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const numberOfDays = new Date(currentYear, currentMonth, 0).getDate()
  const currentDayOfMonth = new Date().getUTCDate()
  const currentLocalDay = new Date().getDay()

  return (
    <>
      <Navigation />
      <div>year {currentYear}</div>
      <div>month {currentMonth}</div>
      <div>number of days in the current month {numberOfDays}</div>
      <div>current day number {currentDayOfMonth}</div>
      <div>current local day {currentLocalDay}</div>
    </>
  )
}
