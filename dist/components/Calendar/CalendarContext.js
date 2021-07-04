import { createContext, useContext } from "react";
var CalendarContext = createContext(new Date());
export var CalendarContextProvider = CalendarContext.Provider;
export var useCalendarContext = function () { return useContext(CalendarContext); };
