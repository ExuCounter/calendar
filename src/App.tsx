import { useState } from "react"
import { Calendar } from "components/Calendar/Calendar"

const App = () => {
  const [show, setShow] = useState<boolean>(false)
  const [date, setDate] = useState<Date>()

  return <Calendar onChange={date => console.log(date)} onClose={() => setShow(false)} />
}

export default App
