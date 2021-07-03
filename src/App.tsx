import { useState } from "react"
import { Calendar } from "components/Calendar"

const App = () => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <Calendar show={show} onClose={() => setShow(false)}>
      {calendarDate => {
        return (
          <input
            type="text"
            value={`${calendarDate.day}/${calendarDate.month}/${calendarDate.year}`}
            onClick={() => {
              setShow(true)
            }}
          />
        )
      }}
    </Calendar>
  )
}

export default App
