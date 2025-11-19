import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function TodaysAgenda() {
  const [todayEvents, setTodayEvents] = useState([])

  useEffect(() => {
    loadTodayEvents()
    // Refresh events when localStorage changes
    const interval = setInterval(loadTodayEvents, 1000)
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadTodayEvents()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => {
      clearInterval(interval)
      window.removeEventListener('dataModeChanged', handleDataModeChange)
    }
  }, [])

  const loadTodayEvents = () => {
    if (!shouldUseMockData()) {
      setTodayEvents([])
      return
    }
    const today = new Date().toISOString().split('T')[0]
    const events = []
    
    // Load networking events
    const networkingEvents = JSON.parse(localStorage.getItem('events') || '[]')
    networkingEvents.forEach(event => {
      if (event.date === today) {
        events.push({
          id: `event-${event.id}`,
          title: event.title,
          time: event.time || 'All Day',
          type: 'event',
          category: event.type || 'networking',
          color: getEventColor(event.type)
        })
      }
    })

    // Load project deadlines
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    projects.forEach(project => {
      if (project.deadline === today && project.status !== 'done') {
        events.push({
          id: `project-${project.id}`,
          title: `Project Deadline: ${project.title}`,
          time: 'End of Day',
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
      if (task.due === today && !task.completed) {
        events.push({
          id: `task-${task.id}`,
          title: task.text,
          time: 'Due Today',
          type: 'deadline',
          category: 'task',
          priority: task.priority,
          color: getPriorityColor(task.priority)
        })
      }
    })

    // Load onboarding training
    const onboardingTasks = JSON.parse(localStorage.getItem('onboardingTasks') || '[]')
    const trainingScheduleData = localStorage.getItem('trainingSchedule')
    const trainingSchedule = trainingScheduleData ? JSON.parse(trainingScheduleData) : []
    
    if (Array.isArray(trainingSchedule)) {
      onboardingTasks.forEach(task => {
        const schedule = trainingSchedule.find(s => s.taskId === task.id)
        if (schedule && schedule.date === today && !task.completed) {
          events.push({
            id: `training-${task.id}`,
            title: `Training: ${task.label}`,
            time: 'Scheduled',
            type: 'training',
            category: 'onboarding',
            color: '#8b5cf6'
          })
        }
      })
    }

    // Sort by priority (high priority first, then by time)
    events.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (a.priority !== 'high' && b.priority === 'high') return 1
      return 0
    })

    setTodayEvents(events)
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

  const getEventIcon = (type) => {
    return '•'
  }

  const today = new Date()
  const todayFormatted = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="card">
      <div className="card-title">Today's Agenda</div>
      <div className="card-body">
        <div style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-muted)', 
          marginBottom: '1rem',
          fontWeight: 500
        }}>
          {todayFormatted}
        </div>
        
        {todayEvents.length > 0 ? (
          <ul className="agenda-list">
            {todayEvents.map(event => (
              <li key={event.id} className="agenda-item">
                <div 
                  className="agenda-indicator"
                  style={{ backgroundColor: event.color }}
                >
                  <span style={{ fontSize: '1rem' }}>{getEventIcon(event.type)}</span>
                </div>
                <div className="agenda-content">
                  <div className="agenda-title">{event.title}</div>
                  <div className="agenda-meta">
                    <span>{event.time}</span>
                    {event.priority && (
                      <span className={`tag tag-priority-${event.priority}`}>
                        {event.priority}
                      </span>
                    )}
                    {event.category && event.type === 'event' && (
                      <span className="tag tag-type">{event.category}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
            <div>No events scheduled for today</div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              You're all caught up!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodaysAgenda

