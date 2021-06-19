import { getLocalDayOfWeek } from "./utils"

export const Navigation = () => {
  const localDays = [0, 1, 2, 3, 4, 5, 6] // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

  return (
    <div style={{ display: "flex" }}>
      {localDays.map((dayNumber, idx) => (
        <div>{getLocalDayOfWeek(dayNumber, true)}</div>
      ))}
    </div>
  )
}
