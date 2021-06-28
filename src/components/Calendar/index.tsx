import { getLocalDayName, getMonthName } from "components/Calendar/utils"
import { useCalendar, CalendarState } from "components/Calendar/hook"
import Button from "react-bootstrap/Button"
import { ButtonVariant } from "react-bootstrap/types"
import Row from "react-bootstrap/Row"
import Column from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

const CONTAINER_WIDTH = 300 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week

const Navigation = ({
  currentYear,
  currentMonth,
  setNextMonth,
  setPreviousMonth,
}: Pick<CalendarState, "currentYear" | "currentMonth" | "setNextMonth" | "setPreviousMonth">) => {
  return (
    <Row className="d-flex justify-content-between align-items-center wrap">
      <Column>
        {currentYear}
        {getMonthName(currentMonth)}
      </Column>
      <Column>
        <Button onClick={setPreviousMonth}>{"<"}</Button>
        <Button onClick={setNextMonth}>{">"}</Button>
      </Column>
    </Row>
  )
}

const LocalDay = ({ day }: { day: number }) => {
  return <div style={{ width: COL_WIDTH, padding: "5px", textAlign: "center" }}>{getLocalDayName(day, true)}</div>
}

const LocalDays = () => {
  const localDays = [1, 2, 3, 4, 5, 6, 7] // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

  return (
    <Row className="wrap">
      {localDays.map((day, idx) => (
        <LocalDay day={day} key={idx} />
      ))}
    </Row>
  )
}

const Day = ({ day, onClick, variant }: { day: number; variant: ButtonVariant; onClick: () => void }) => {
  return (
    <Button style={{ width: COL_WIDTH }} variant={variant} onClick={onClick}>
      {day}
    </Button>
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
}: Pick<
  CalendarState,
  | "currentYear"
  | "currentMonth"
  | "selectedMonth"
  | "selectedDay"
  | "selectedYear"
  | "numberOfMonthDays"
  | "setSelectedDate"
>) => {
  const days = Array.from(Array(numberOfMonthDays)).map((_, idx) => idx + 1)

  const getVariant = (day: number) =>
    selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === day ? "primary" : "info"

  return (
    <Row className="wrap">
      {days.map((day, idx) => (
        <Day
          key={idx}
          day={day}
          variant={getVariant(day)}
          onClick={() => setSelectedDate({ day, month: currentMonth, year: currentYear })}
        />
      ))}
    </Row>
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
    <Container>
      <Container style={{ width: CONTAINER_WIDTH }}>
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
        />
      </Container>
    </Container>
  )
}
