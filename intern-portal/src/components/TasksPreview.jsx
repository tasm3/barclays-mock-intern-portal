import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function TasksPreview() {
  const [todayTasks, setTodayTasks] = useState([])

  useEffect(() => {
    const loadTodayTasks = () => {
      if (!shouldUseMockData()) {
        setTodayTasks([])
        return
      }
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
      const today = new Date().toISOString().split('T')[0]
      const filtered = tasks
        .filter(task => task.due === today && !task.completed)
        .slice(0, 5)
      setTodayTasks(filtered)
    }

    loadTodayTasks()
    // Refresh every minute
    const interval = setInterval(loadTodayTasks, 60000)
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadTodayTasks()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => {
      clearInterval(interval)
      window.removeEventListener('dataModeChanged', handleDataModeChange)
    }
  }, [])

  return (
    <div className="card">
      <div className="card-title">Today's Agenda</div>
      <div className="card-body">
        {todayTasks.length === 0 ? (
          <div className="empty-state">No tasks for today 🎉</div>
        ) : (
          <ul className="simple-list">
            {todayTasks.map(task => (
              <li key={task.id}>
                <span className="task-text">{task.text}</span>
                {task.priority && (
                  <span className={`tag tag-priority-${task.priority}`}>
                    {task.priority}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TasksPreview

