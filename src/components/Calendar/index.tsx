import { getLocalDayName, getMonthName } from "components/Calendar/utils"
import { useCalendar, CalendarState } from "components/Calendar/useCalendar"
import "components/Calendar/index.scss"

const CONTAINER_WIDTH = 244 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week

const Navigation = ({
  currentYear,
  currentMonth,
  setNextMonth,
  setPreviousMonth,
}: Pick<CalendarState, "currentYear" | "currentMonth" | "setNextMonth" | "setPreviousMonth">) => {
  return (
    <div className="calendar-navigation">
      <div className="flex">
        <span className="calendar-navigation__month">{getMonthName(currentMonth)}</span>
        <span className="calendar-navigation__year">{currentYear}</span>
      </div>
      <div className="flex">
        <button className="calendar-navigation__btn" onClick={setPreviousMonth}>
          {"<"}
        </button>
        <button className="calendar-navigation__btn" onClick={setNextMonth}>
          {">"}
        </button>
      </div>
    </div>
  )
}

const LocalDays = () => {
  const localDays = [0, 1, 2, 3, 4, 5, 6] // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

  return (
    <div className="local-days">
      {localDays.map((day, idx) => (
        <div key={idx} className="local-days__name" style={{ width: COL_WIDTH }}>
          {getLocalDayName(day, true)}
        </div>
      ))}
    </div>
  )
}

const Days = ({
  currentYear,
  currentMonth,
  selectedMonth,
  selectedDay,
  selectedYear,
  numberOfMonthDays,
  setSelectedDate,
  setNextMonth,
  setPreviousMonth,
}: Pick<
  CalendarState,
  | "currentYear"
  | "currentMonth"
  | "selectedMonth"
  | "selectedDay"
  | "selectedYear"
  | "numberOfMonthDays"
  | "setSelectedDate"
  | "setNextMonth"
  | "setPreviousMonth"
>) => {
  const previousMonthStartLocalDay = new Date(currentYear, currentMonth - 1, 1).getDay()
  const previousMonthNumberOfDays = new Date(currentYear, currentMonth - 1, 0).getDate()

  const daysInPreviousMonth = Array.from(Array(previousMonthStartLocalDay)).map(
    (_, idx) => previousMonthNumberOfDays - previousMonthStartLocalDay + idx + 1
  )
  const daysInCurrentMonth = Array.from(Array(numberOfMonthDays)).map((_, idx) => idx + 1)
  const daysInNextMonth = Array.from(
    new Array(
      42 - numberOfMonthDays - previousMonthStartLocalDay > 0 ? 42 - numberOfMonthDays - previousMonthStartLocalDay : 0
    )
  ).map((_, idx) => idx + 1)

  const getClassName = (day: number, month: "previous" | "current" | "next") => {
    switch (month) {
      case "previous":
        return selectedDay === day && currentMonth === selectedMonth + 1 ? "active" : ""
      case "current":
        return currentYear === selectedYear && currentMonth === selectedMonth && selectedDay === day ? "active" : ""
      case "next":
        return selectedDay === day && currentMonth === selectedMonth - 1 ? "active" : ""
    }
  }

  return (
    <div className="days-container">
      {daysInPreviousMonth.map((day, idx) => (
        <div key={idx} className="days-item__container" style={{ minWidth: COL_WIDTH, width: COL_WIDTH }}>
          <button
            className={`days-item previous ${getClassName(day, "previous")}`}
            onClick={() => {
              setSelectedDate({ day, month: currentMonth - 1, year: currentYear })
              setPreviousMonth()
            }}
          >
            {day}
          </button>
        </div>
      ))}
      {daysInCurrentMonth.map((day, idx) => (
        <div key={idx} className="days-item__container" style={{ minWidth: COL_WIDTH, width: COL_WIDTH }}>
          <button
            className={`days-item current ${getClassName(day, "current")}`}
            onClick={() => setSelectedDate({ day, month: currentMonth, year: currentYear })}
          >
            {day}
          </button>
        </div>
      ))}
      {daysInNextMonth.map((day, idx) => (
        <div key={idx} className="days-item__container" style={{ minWidth: COL_WIDTH, width: COL_WIDTH }}>
          <button
            className={`days-item next ${getClassName(day, "next")}`}
            onClick={() => {
              setSelectedDate({ day, month: currentMonth + 1, year: currentYear })
              setNextMonth()
            }}
          >
            {day}
          </button>
        </div>
      ))}
    </div>
  )
}

export const Calendar = () => {
  const {
    currentYear,
    currentMonth,
    numberOfMonthDays,
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDate,
    setNextMonth,
    setPreviousMonth,
  } = useCalendar()

  return (
    <div>
      <div style={{ width: CONTAINER_WIDTH }}>
        <Navigation
          currentYear={currentYear}
          currentMonth={currentMonth}
          setNextMonth={setNextMonth}
          setPreviousMonth={setPreviousMonth}
        />
        <LocalDays />
        <Days
          currentYear={currentYear}
          currentMonth={currentMonth}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedYear={selectedYear}
          setSelectedDate={setSelectedDate}
          numberOfMonthDays={numberOfMonthDays}
          setNextMonth={setNextMonth}
          setPreviousMonth={setPreviousMonth}
        />
      </div>
      <div>
        {selectedDay} {getMonthName(selectedMonth)} {selectedYear}
      </div>
    </div>
  )
}
