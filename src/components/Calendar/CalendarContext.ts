import { createContext, useContext } from "react"
import { DateType } from "components/Calendar/types"

const CalendarContext = createContext<{ date: DateType }>({ date: { day: 0, month: 0, year: 0 } })

export const CalendarContextProvider = CalendarContext.Provider
export const useCalendarContext = () => useContext(CalendarContext)
