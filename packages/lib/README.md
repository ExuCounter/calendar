# Small calendar for selecting the date in a convenient way

## `Import`

```js
import { Calendar } from 'small-google-calendar'
```

## `Simple usage with statefulness`

```js
import React, { useState } from 'react'
import { Calendar } from 'small-google-calendar'

function App() {
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <Calendar onChange={(value) => setDate(value)} />
      <input value={`${date}`} />
    </div>
  )
}
```

## `Simple usage without state`

```js
import React from 'react'
import { Calendar } from 'small-google-calendar'

function App() {
  return (
    <Calendar>
      {(date) => {
        return <input value={`${date}`} />
      }}
    </Calendar>
  )
}
```

![Simple usage GIF](https://raw.githubusercontent.com/ExuCounter/calendar/master/packages/dev/example1.gif)

## `Open calendar only when you need it`

```js
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
```

![Open calendar only when you need it GIF](https://raw.githubusercontent.com/ExuCounter/calendar/master/packages/dev/example2.gif)

## `Typescript support`

You can also import props by calendar

```js
import { Calendar, CalendarProps } from 'small-google-calendar'
```

```js
CalendarProps = PropsWithChildren<{
  show?: boolean;
  onChange?: (date: Date) => void;
  children?: ((date: Date) => React.ReactElement) | React.ReactNode;
}>;
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
