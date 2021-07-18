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
  const [show, setShow] = useState(true)
  const [date, setDate] = useState(new Date())
  const [sizing, setSizing] = useState<'sm' | 'md' | 'lg'>('md')

  return (
    <div style={{ padding: '15px' }}>
      <input
        value={format(date, 'dd/MM/yyyy')}
        onClick={() => setShow(true)}
        style={{ ...inputStyles }}
      />
      {['sm', 'md', 'lg'].map((text) => (
        <button onClick={() => setSizing(text as any)}>{text}</button>
      ))}
      <Calendar
        show={show}
        sizing={sizing}
        onChange={(value) => {
          setDate(value)
          setShow(false)
        }}
      />
    </div>
  )
}
export default App
