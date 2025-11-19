import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_TASKS = [
  { id: 1, label: 'Complete HR paperwork', completed: false },
  { id: 2, label: 'Read intern handbook', completed: false },
  { id: 3, label: 'Security & compliance training', completed: false },
  { id: 4, label: '1:1 with manager', completed: false },
  { id: 5, label: 'Set up development environment', completed: false },
  { id: 6, label: 'Attend welcome orientation', completed: false },
  { id: 7, label: 'Complete IT security quiz', completed: false },
  { id: 8, label: 'Join team communication channels', completed: false }
]

function OnboardingProgress() {
  const [tasks, setTasks] = useState([])
  const [trainingSchedule, setTrainingSchedule] = useState({})
  const [editingSchedule, setEditingSchedule] = useState(null)

  useEffect(() => {
    loadTasks()
    loadTrainingSchedule()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadTasks()
      loadTrainingSchedule()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadTasks = () => {
    if (!shouldUseMockData()) {
      setTasks([])
      return
    }
    const stored = localStorage.getItem('onboardingTasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      setTasks(DEFAULT_TASKS)
      localStorage.setItem('onboardingTasks', JSON.stringify(DEFAULT_TASKS))
    }
  }

  const loadTrainingSchedule = () => {
    if (!shouldUseMockData()) {
      setTrainingSchedule([])
      return
    }
    const stored = localStorage.getItem('trainingSchedule')
    if (stored) {
      setTrainingSchedule(JSON.parse(stored))
    } else {
      // Initialize with some default training dates
      const defaultSchedule = [
        { taskId: 3, date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { taskId: 6, date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { taskId: 7, date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
      ]
      setTrainingSchedule(defaultSchedule)
      localStorage.setItem('trainingSchedule', JSON.stringify(defaultSchedule))
    }
  }

  const saveTasks = (updated) => {
    localStorage.setItem('onboardingTasks', JSON.stringify(updated))
    setTasks(updated)
  }

  const saveTrainingSchedule = (updated) => {
    localStorage.setItem('trainingSchedule', JSON.stringify(updated))
    setTrainingSchedule(updated)
  }

  const toggleTask = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    saveTasks(updated)
  }

  const getTaskDate = (taskId) => {
    const schedule = Array.isArray(trainingSchedule) 
      ? trainingSchedule.find(s => s.taskId === taskId)
      : null
    return schedule ? schedule.date : null
  }

  const updateTaskDate = (taskId, date) => {
    const schedule = Array.isArray(trainingSchedule) ? [...trainingSchedule] : []
    const existingIndex = schedule.findIndex(s => s.taskId === taskId)
    
    if (date) {
      if (existingIndex >= 0) {
        schedule[existingIndex] = { taskId, date }
      } else {
        schedule.push({ taskId, date })
      }
    } else {
      if (existingIndex >= 0) {
        schedule.splice(existingIndex, 1)
      }
    }
    
    saveTrainingSchedule(schedule)
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length

  return (
    <div className="card">
      <div className="card-title">Onboarding</div>
      <div className="card-body">
        {totalTasks > 0 && (
          <div>
            <div className="progress-text">
              {completedTasks}/{totalTasks} tasks completed
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              >
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="empty-state">No onboarding tasks available</div>
        ) : (
          <div style={{ marginTop: '1.5rem' }}>
            {tasks.map(task => {
            const taskDate = getTaskDate(task.id)
            const isEditing = editingSchedule === task.id
            
            return (
              <div
                key={task.id}
                className={`onboarding-item ${task.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="onboarding-label">{task.label}</span>
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                      <input
                        type="date"
                        className="form-input"
                        style={{ fontSize: '0.8rem', padding: '0.4rem', width: 'auto' }}
                        value={taskDate || ''}
                        onChange={(e) => updateTaskDate(task.id, e.target.value)}
                        onBlur={() => setEditingSchedule(null)}
                      />
                      <button
                        className="btn btn-outline btn-small"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                        onClick={() => {
                          updateTaskDate(task.id, null)
                          setEditingSchedule(null)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                      {taskDate && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {new Date(taskDate).toLocaleDateString()}
                        </span>
                      )}
                      <button
                        className="btn btn-outline btn-small"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                        onClick={() => setEditingSchedule(task.id)}
                      >
                        {taskDate ? 'Change Date' : 'Add Date'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingProgress

