import React, { useState } from 'react'
import { Calendar } from 'small-google-calendar'

function App() {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <input value={`${date}`} onClick={() => setShow(true)} />
      <Calendar
        show={show}
        onChange={(value) => {
          setDate(value)
          setShow(false)
        }}
      />
    </div>
  )
}

export default App
