import React, { useState } from 'react'
import { Calendar } from 'small-google-calendar'
import { format } from 'date-fns'

const inputStyles = {
  padding: '5px',
  border: '1px solid #e2e2e2',
  width: '225px',
  borderRadius: '5px',
  marginLeft: '10px',
}

function App() {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <div style={{ padding: '15px' }}>
      <input
        value={format(date, 'dd/MM/yyyy')}
        onClick={() => setShow(true)}
        style={{ ...inputStyles }}
      />
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
