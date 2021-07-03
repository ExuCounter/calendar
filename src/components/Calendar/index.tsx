import { getLocalDayName, getMonthName } from "components/Calendar/utils"
import { useCalendar, CalendarState } from "components/Calendar/useCalendar"
import LeftArrowIcon from "misc/icons/left-arrow.svg"
import RightArrowIcon from "misc/icons/right-arrow.svg"
import "components/Calendar/index.scss"

const CONTAINER_WIDTH = 244 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week
const TOTAL_OF_DAYS_PER_SCREEN = 42 // 42 days per screen

const Navigation = ({
  showingYear,
  showingMonth,
  handleAction,
}: Pick<CalendarState, "showingYear" | "showingMonth" | "handleAction">) => (
  <div className="calendar-navigation">
    <div className="flex">
      <span className="calendar-navigation__month">{getMonthName(showingMonth)}</span>
      <span className="calendar-navigation__year">{showingYear}</span>
    </div>
    <div className="flex">
      <button className="calendar-navigation__btn" onClick={() => handleAction({ action: "setPreviousShowingMonth" })}>
        <LeftArrowIcon />
      </button>
      <button className="calendar-navigation__btn" onClick={() => handleAction({ action: "setNextShowingMonth" })}>
        <RightArrowIcon />
      </button>
    </div>
  </div>
)

const LocalDays = () => (
  <div className="local-days">
    {/* Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday */}
    {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => (
      <div key={idx} className="local-days__name" style={{ width: COL_WIDTH }}>
        {getLocalDayName(day, true)}
      </div>
    ))}
  </div>
)

type DayPosition = "previous" | "current" | "next"

type DaysType = {
  number: number
  position: DayPosition
}[]

const Days = ({
  showingYear,
  showingMonth,
  selectedMonth,
  selectedDay,
  selectedYear,
  numberOfMonthDays,
  handleAction,
}: Pick<
  CalendarState,
  | "showingYear"
  | "showingMonth"
  | "selectedMonth"
  | "selectedDay"
  | "selectedYear"
  | "numberOfMonthDays"
  | "handleAction"
>) => {
  const previousMonthStartLocalDay = new Date(showingYear, showingMonth - 1, 1).getDay()
  const previousMonthNumberOfDays = new Date(showingYear, showingMonth - 1, 0).getDate()

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
      if (showingYear === selectedYear && showingMonth === selectedMonth && selectedDay === day) {
        return (className += "active")
      }
    }

    return className
  }

  const getHandler = ({ position, day }: { position: DayPosition; day: number }) => {
    switch (position) {
      case "previous":
        return () => {
          handleAction({ action: "setSelectedDate", payload: { day, month: showingMonth - 1, year: showingYear } })
          handleAction({ action: "setPreviousShowingMonth" })
        }
      case "current":
        return () => {
          handleAction({ action: "setSelectedDate", payload: { day, month: showingMonth, year: showingYear } })
        }
      case "next":
        return () => {
          handleAction({ action: "setSelectedDate", payload: { day, month: showingMonth + 1, year: showingYear } })
          handleAction({ action: "setNextShowingMonth" })
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
  const { showingYear, showingMonth, numberOfMonthDays, selectedDay, selectedMonth, selectedYear, handleAction } =
    useCalendar()

  return (
    <div className="calendar">
      <div style={{ width: CONTAINER_WIDTH }}>
        <Navigation showingYear={showingYear} showingMonth={showingMonth} handleAction={handleAction} />
        <LocalDays />
        <Days
          showingYear={showingYear}
          showingMonth={showingMonth}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedYear={selectedYear}
          numberOfMonthDays={numberOfMonthDays}
          handleAction={handleAction}
        />
      </div>
      <div>
        {selectedDay} {getMonthName(selectedMonth)} {selectedYear}
      </div>
    </div>
  )
}
