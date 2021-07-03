import { getLocalDayName, getMonthName } from "components/Calendar/utils"
import { useCalendar, CalendarState } from "components/Calendar/hooks/useCalendar"
import { useShowingDays, DayPosition } from "components/Calendar/hooks/useShowingDays"
import LeftArrowIcon from "misc/icons/left-arrow.svg"
import RightArrowIcon from "misc/icons/right-arrow.svg"
import "components/Calendar/index.scss"

const CONTAINER_WIDTH = 244 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week

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

const Days = ({
  showingYear,
  showingMonth,
  selectedMonth,
  selectedDay,
  selectedYear,
  handleAction,
}: Pick<
  CalendarState,
  "showingYear" | "showingMonth" | "selectedMonth" | "selectedDay" | "selectedYear" | "handleAction"
>) => {
  const showingDays = useShowingDays({ showingYear, showingMonth })

  const getClassName = ({ position, day }: { position: DayPosition; day: number }) => {
    const isActive = showingYear === selectedYear && showingMonth === selectedMonth && selectedDay === day
    const isCurrentPosition = position === "current"

    return `days-item ${position} ${isActive && isCurrentPosition ? "active" : ""}`
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

  return (
    <div className="days-container">
      {showingDays.map(({ day, position }, idx) => {
        return (
          <div key={idx} className="days-item__container" style={{ minWidth: COL_WIDTH, width: COL_WIDTH }}>
            <button className={getClassName({ position, day })} onClick={getHandler({ position, day })}>
              {day}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export const Calendar = () => {
  const { showingYear, showingMonth, selectedDay, selectedMonth, selectedYear, handleAction } = useCalendar()

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
          handleAction={handleAction}
        />
      </div>
      <div>
        {selectedDay} {getMonthName(selectedMonth)} {selectedYear}
      </div>
    </div>
  )
}
