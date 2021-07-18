import React, { PropsWithChildren } from 'react'
import { CalendarContextProvider } from './CalendarContext'
import { getLocalDayName, getMonthName } from './utils'
import { useCalendar, CalendarHookState } from './hooks/useCalendar'
import { useShowingDays, DayPosition } from './hooks/useShowingDays'
import { isFunction } from '../shared/utils'
import BackNavigationArrow from '../Arrows/LeftArrow'
import ForwardNavigationArrow from '../Arrows/RightArrow'
import './index.css'

const Navigation = ({
  showingYear,
  showingMonth,
  handleAction,
}: Pick<
  CalendarHookState,
  'showingYear' | 'showingMonth' | 'handleAction'
>) => (
  <div className="calendar-navigation">
    <div>
      <span className="calendar-navigation__month">
        {getMonthName(showingMonth)}
      </span>
      <span className="calendar-navigation__year">{showingYear}</span>
    </div>
    <div>
      <button
        className="calendar-navigation__btn"
        onClick={() => handleAction({ action: 'setPreviousShowingMonth' })}
      >
        <BackNavigationArrow />
      </button>
      <button
        className="calendar-navigation__btn"
        onClick={() => handleAction({ action: 'setNextShowingMonth' })}
      >
        <ForwardNavigationArrow />
      </button>
    </div>
  </div>
)

const LocalDays = () => (
  <div className="local-days">
    {/* Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday */}
    {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => (
      <div key={idx} className="local-days__name">
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
  onChange,
  handleAction,
}: Pick<
  CalendarHookState,
  | 'showingYear'
  | 'showingMonth'
  | 'selectedMonth'
  | 'selectedDay'
  | 'selectedYear'
  | 'handleAction'
> &
  Pick<CalendarProps, 'onChange'>) => {
  const showingDays = useShowingDays({ showingYear, showingMonth })

  const getClassName = (position: DayPosition, day: number) => {
    const isActive =
      showingYear === selectedYear &&
      showingMonth === selectedMonth &&
      selectedDay === day
    const isCurrentPosition = position === 'current'

    return `month-days__item ${position} ${
      isActive && isCurrentPosition ? 'active' : ''
    }`
  }

  const getHandler = (position: DayPosition, day: number) => {
    switch (position) {
      case 'previous':
        return () => {
          handleAction({
            action: 'setSelectedDate',
            payload: {
              date: { year: showingYear, month: showingMonth - 1, day },
              onChange,
            },
          })
          handleAction({ action: 'setPreviousShowingMonth' })
        }
      case 'current':
        return () => {
          handleAction({
            action: 'setSelectedDate',
            payload: {
              date: { year: showingYear, month: showingMonth, day },
              onChange,
            },
          })
        }
      case 'next':
        return () => {
          handleAction({
            action: 'setSelectedDate',
            payload: {
              date: { year: showingYear, month: showingMonth + 1, day },
              onChange,
            },
          })
          handleAction({ action: 'setNextShowingMonth' })
        }
    }
  }

  return (
    <div className="month-days">
      {showingDays.map(({ day, position }, idx) => {
        const handler = getHandler(position, day)
        const className = getClassName(position, day)

        return (
          <div key={idx} className="month-days__item-container">
            <button className={className} onClick={() => handler()}>
              {day}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export type Sizing = 'sm' | 'md' | 'lg'

export type CalendarProps = PropsWithChildren<{
  show?: boolean
  onChange?: (date: Date) => void
  children?: ((date: Date) => React.ReactElement) | React.ReactNode
  sizing?: Sizing
}>

export const Calendar = ({
  show = true,
  sizing = 'lg',
  onChange,
  children,
}: CalendarProps) => {
  const {
    showingYear,
    showingMonth,
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedDate,
    handleAction,
  } = useCalendar()

  return (
    <div className={`calendar-container ${sizing}`}>
      <CalendarContextProvider value={selectedDate}>
        <div className="calendar-children">
          {children && isFunction(children) ? children(selectedDate) : children}
        </div>
        {show && (
          <div className="calendar">
            <Navigation
              showingYear={showingYear}
              showingMonth={showingMonth}
              handleAction={handleAction}
            />
            <LocalDays />
            <Days
              showingYear={showingYear}
              showingMonth={showingMonth}
              selectedMonth={selectedMonth}
              selectedDay={selectedDay}
              selectedYear={selectedYear}
              handleAction={handleAction}
              onChange={onChange}
            />
          </div>
        )}
      </CalendarContextProvider>
    </div>
  )
}
