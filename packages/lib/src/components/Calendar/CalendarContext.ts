import { createContext, useContext } from "react"
const CalendarContext = createContext<Date>(new Date())

export const CalendarContextProvider = CalendarContext.Provider
export const useCalendarContext = () => useContext(CalendarContext)
