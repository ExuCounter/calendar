import { LocalDay } from "./types"

export const getLocalDayOfWeek = (number: number, short?: boolean) => {
  switch (number) {
    case LocalDay.Sunday:
      return short ? "Su" : "Sunday"
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
  }
}
