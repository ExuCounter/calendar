import { useState } from "react"
import { getLocalDayOfWeek } from "components/Calendar/utils"
import { useCalendar } from "components/Calendar/hook"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

const CONTAINER_WIDTH = 300 //px
const COL_WIDTH = CONTAINER_WIDTH / 7 // 7 days in week

export const LocalDays = () => {
  const localDays = [0, 1, 2, 3, 4, 5, 6] // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

  return (
    <Row style={{ flexWrap: "wrap" }}>
      {localDays.map(day => (
        <div style={{ width: COL_WIDTH, padding: "5px", textAlign: "center" }} key={day}>
          {getLocalDayOfWeek(day, true)}
        </div>
      ))}
    </Row>
  )
}

export const Days = ({
  setDay,
  numberOfMonthDays,
}: {
  setDay: React.Dispatch<React.SetStateAction<number>>
  numberOfMonthDays: number
}) => {
  const [activeDay, setActiveDay] = useState<number>(0)
  const days = new Array(numberOfMonthDays).fill(null).map((_, idx) => idx + 1)

  const handleClick = (day: number) => {
    setActiveDay(day)
    setDay(day)
  }

  return (
    <Row style={{ flexWrap: "wrap" }}>
      {days.map(day => (
        <Button
          style={{ width: COL_WIDTH }}
          variant={activeDay === day ? "primary" : "info"}
          key={day}
          onClick={() => handleClick(day)}
        >
          {day}
        </Button>
      ))}
    </Row>
  )
}

export const Calendar = () => {
  const { year, day, month, numberOfMonthDays, setDay } = useCalendar()

  return (
    <Container style={{ width: CONTAINER_WIDTH }}>
      <LocalDays />
      <Days setDay={setDay} numberOfMonthDays={numberOfMonthDays} />
      <div>year {year}</div>
      <div>month {month}</div>
      <div>current day number {day}</div>
    </Container>
  )
}
