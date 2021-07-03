import { getLocalDayName, getMonthName } from "components/Calendar/utils"
import { useCalendar, CalendarState } from "components/Calendar/useCalendar"
import "components/Calendar/index.scss"
import LeftArrowIcon from "misc/icons/left-arrow.svg"
import RightArrowIcon from "misc/icons/right-arrow.svg"

const CONTAINER_WIDTH = 244 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week
const TOTAL_OF_DAYS_PER_SCREEN = 42 // 42 days per screen

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
          <LeftArrowIcon />
        </button>
        <button className="calendar-navigation__btn" onClick={setNextMonth}>
          <RightArrowIcon />
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

type DayPosition = "previous" | "current" | "next"

type DaysType = {
  number: number
  position: DayPosition
}[]

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

  const getDays = () => {
    const daysInPreviousMonth = Array.from(Array(previousMonthStartLocalDay)).map((_, idx) => {
      return { number: previousMonthNumberOfDays - previousMonthStartLocalDay + idx + 1, position: "previous" }
    })
    const daysInCurrentMonth = Array.from(Array(numberOfMonthDays)).map((_, idx) => {
      return { number: idx + 1, position: "current" }
    })
    const daysInNextMonth = Array.from(
      new Array(
        TOTAL_OF_DAYS_PER_SCREEN - numberOfMonthDays - previousMonthStartLocalDay > 0
          ? TOTAL_OF_DAYS_PER_SCREEN - numberOfMonthDays - previousMonthStartLocalDay
          : 0
      )
    ).map((_, idx) => {
      return { number: idx + 1, position: "next" }
    })

    return [...daysInPreviousMonth, ...daysInCurrentMonth, ...daysInNextMonth] as DaysType
  }

  const getClassName = (day: number, position: DayPosition) => {
    let className = `days-item ${position} `

    if (position === "current") {
      if (currentYear === selectedYear && currentMonth === selectedMonth && selectedDay === day) {
        return (className += "active")
      }
    }

    return className
  }

  const getHandler = ({ position, day }: { position: DayPosition; day: number }) => {
    switch (position) {
      case "previous":
        return () => {
          setSelectedDate({ day, month: currentMonth - 1, year: currentYear })
          setPreviousMonth()
        }
      case "current":
        return () => {
          setSelectedDate({ day, month: currentMonth, year: currentYear })
        }
      case "next":
        return () => {
          setSelectedDate({ day, month: currentMonth + 1, year: currentYear })
          setNextMonth()
        }
    }
  }

  const daysArray = getDays()

  return (
    <div className="days-container">
      {daysArray.map((day, idx) => {
        return (
          <div key={idx} className="days-item__container" style={{ minWidth: COL_WIDTH, width: COL_WIDTH }}>
            <button
              className={getClassName(day.number, day.position)}
              onClick={getHandler({ position: day.position, day: day.number })}
            >
              {day.number}
            </button>
          </div>
        )
      })}
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
    <div className="calendar">
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
