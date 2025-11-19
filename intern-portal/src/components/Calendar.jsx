import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarEvents, setCalendarEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    loadCalendarEvents()
    // Refresh events when localStorage changes
    const interval = setInterval(loadCalendarEvents, 1000)
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadCalendarEvents()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => {
      clearInterval(interval)
      window.removeEventListener('dataModeChanged', handleDataModeChange)
    }
  }, [])

  const loadCalendarEvents = () => {
    if (!shouldUseMockData()) {
      setCalendarEvents([])
      return
    }
    const events = []
    
    // Load networking events
    const networkingEvents = JSON.parse(localStorage.getItem('events') || '[]')
    networkingEvents.forEach(event => {
      if (event.date) {
        events.push({
          id: `event-${event.id}`,
          title: event.title,
          date: event.date,
          type: 'event',
          category: event.type || 'networking',
          color: getEventColor(event.type)
        })
      }
    })

    // Load project deadlines
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    projects.forEach(project => {
      if (project.deadline && project.status !== 'done') {
        events.push({
          id: `project-${project.id}`,
          title: `Project: ${project.title}`,
          date: project.deadline,
          type: 'deadline',
          category: 'project',
          priority: project.priority,
          color: getPriorityColor(project.priority)
        })
      }
    })

    // Load task deadlines
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach(task => {
      if (task.due && !task.completed) {
        events.push({
          id: `task-${task.id}`,
          title: task.text,
          date: task.due,
          type: 'deadline',
          category: 'task',
          priority: task.priority,
          color: getPriorityColor(task.priority)
        })
      }
    })

    // Load onboarding training (with dates if available)
    const onboardingTasks = JSON.parse(localStorage.getItem('onboardingTasks') || '[]')
    const trainingScheduleData = localStorage.getItem('trainingSchedule')
    const trainingSchedule = trainingScheduleData ? JSON.parse(trainingScheduleData) : []
    
    // Match onboarding tasks with training schedule dates
    if (Array.isArray(trainingSchedule)) {
      onboardingTasks.forEach(task => {
        const schedule = trainingSchedule.find(s => s.taskId === task.id)
        if (schedule && schedule.date && !task.completed) {
          events.push({
            id: `training-${task.id}`,
            title: `Training: ${task.label}`,
            date: schedule.date,
            type: 'training',
            category: 'onboarding',
            color: '#8b5cf6'
          })
        }
      })
    }

    setCalendarEvents(events)
  }

  const getEventColor = (type) => {
    const colors = {
      networking: '#00b8f4',
      training: '#8b5cf6',
      orientation: '#10b981',
      volunteer: '#f59e0b'
    }
    return colors[type] || '#64748b'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#3b82f6'
    }
    return colors[priority] || '#64748b'
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return calendarEvents.filter(event => event.date === dateStr)
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPast = (date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const days = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="card calendar-card">
      <div className="card-title">Calendar</div>
      <div className="card-body">
        <div className="calendar-header">
          <button className="btn btn-outline btn-small" onClick={() => navigateMonth(-1)}>
            ← Prev
          </button>
          <h3 className="calendar-month-title">{monthName}</h3>
          <button className="btn btn-outline btn-small" onClick={() => navigateMonth(1)}>
            Next →
          </button>
          <button className="btn btn-primary btn-small" onClick={goToToday} style={{ marginLeft: 'auto' }}>
            Today
          </button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="calendar-day empty"></div>
            }

            const dayEvents = getEventsForDate(date)
            const today = isToday(date)
            const past = isPast(date)
            const selected = selectedDate && date.toDateString() === selectedDate.toDateString()

            return (
              <div
                key={date.toISOString()}
                className={`calendar-day ${today ? 'today' : ''} ${past ? 'past' : ''} ${selected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="calendar-day-number">{date.getDate()}</div>
                <div className="calendar-day-events">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="calendar-event-dot"
                      style={{ backgroundColor: event.color }}
                      title={event.title}
                    ></div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="calendar-event-more">+{dayEvents.length - 3}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {selectedDate && (
          <div className="calendar-events-list">
            <h4 className="calendar-events-title">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            {selectedDateEvents.length > 0 ? (
              <ul className="calendar-events-items">
                {selectedDateEvents.map(event => (
                  <li key={event.id} className="calendar-event-item">
                    <div 
                      className="calendar-event-indicator"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="calendar-event-content">
                      <div className="calendar-event-name">{event.title}</div>
                      <div className="calendar-event-type">
                        {event.type === 'event' && `Event • ${event.category}`}
                        {event.type === 'deadline' && `${event.category} deadline • ${event.priority} priority`}
                        {event.type === 'training' && 'Onboarding Training'}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="calendar-no-events">No events scheduled for this day</div>
            )}
            <button 
              className="btn btn-outline btn-small" 
              onClick={() => setSelectedDate(null)}
              style={{ marginTop: '1rem' }}
            >
              Close
            </button>
          </div>
        )}

        {!selectedDate && (
          <div className="calendar-legend">
            <div className="calendar-legend-item">
              <div className="calendar-legend-dot" style={{ backgroundColor: '#00b8f4' }}></div>
              <span>Networking Events</span>
            </div>
            <div className="calendar-legend-item">
              <div className="calendar-legend-dot" style={{ backgroundColor: '#8b5cf6' }}></div>
              <span>Training</span>
            </div>
            <div className="calendar-legend-item">
              <div className="calendar-legend-dot" style={{ backgroundColor: '#ef4444' }}></div>
              <span>High Priority</span>
            </div>
            <div className="calendar-legend-item">
              <div className="calendar-legend-dot" style={{ backgroundColor: '#f59e0b' }}></div>
              <span>Medium Priority</span>
            </div>
            <div className="calendar-legend-item">
              <div className="calendar-legend-dot" style={{ backgroundColor: '#3b82f6' }}></div>
              <span>Low Priority</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar

