import { LocalDay, Month } from "components/Calendar/types"

export const getLocalDayName = (number: number, short?: boolean) => {
  switch (number) {
    case LocalDay.Monday:
      return short ? "Mo" : "Monday"
    case LocalDay.Tuesday:
      return short ? "Tu" : "Tuesday"
    case LocalDay.Wednesday:
      return short ? "We" : "Wednesday"
    case LocalDay.Thursday:
      return short ? "Th" : "Thursday"
    case LocalDay.Friday:
      return short ? "Fr" : "Friday"
    case LocalDay.Saturday:
      return short ? "Sa" : "Saturday"
    case LocalDay.Sunday:
      return short ? "Su" : "Sunday"
  }
}

export const getMonthName = (number: number) => {
  switch (number) {
    case Month.January:
      return "January"
    case Month.February:
      return "February"
    case Month.March:
      return "March"
    case Month.April:
      return "April"
    case Month.May:
      return "May"
    case Month.June:
      return "June"
    case Month.July:
      return "July"
    case Month.August:
      return "August"
    case Month.September:
      return "September"
    case Month.October:
      return "October"
    case Month.November:
      return "November"
    case Month.December:
      return "December"
  }
}
