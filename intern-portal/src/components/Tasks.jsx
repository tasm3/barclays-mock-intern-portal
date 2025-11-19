import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState({
    text: '',
    due: '',
    priority: 'medium',
    projectId: null
  })

  useEffect(() => {
    loadTasks()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadTasks()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadTasks = () => {
    if (!shouldUseMockData()) {
      setTasks([])
      return
    }
    const stored = localStorage.getItem('tasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      setTasks([])
    }
  }

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  const addTask = () => {
    if (!newTask.text.trim()) return

    const task = {
      id: Date.now(),
      text: newTask.text,
      due: newTask.due || null,
      priority: newTask.priority,
      completed: false,
      projectId: newTask.projectId || null
    }

    const updated = [...tasks, task]
    saveTasks(updated)
    setNewTask({ text: '', due: '', priority: 'medium', projectId: null })
  }

  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    saveTasks(updated)
  }

  const deleteTask = (id) => {
    const updated = tasks.filter(task => task.id !== id)
    saveTasks(updated)
  }

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0]
    const weekFromNow = new Date()
    weekFromNow.setDate(weekFromNow.getDate() + 7)
    const weekEnd = weekFromNow.toISOString().split('T')[0]

    switch (filter) {
      case 'today':
        return tasks.filter(t => t.due === today)
      case 'week':
        return tasks.filter(t => t.due && t.due >= today && t.due <= weekEnd)
      case 'completed':
        return tasks.filter(t => t.completed)
      case 'overdue':
        return tasks.filter(t => !t.completed && t.due && t.due < today)
      default:
        return tasks
    }
  }

  const getProjects = () => {
    if (!shouldUseMockData()) {
      return []
    }
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    return projects
  }

  const filteredTasks = getFilteredTasks()
  const projects = getProjects()

  const isOverdue = (due) => {
    if (!due) return false
    return due < new Date().toISOString().split('T')[0]
  }

  return (
    <div className="card">
      <div className="card-title">Tasks</div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Task description..."
            value={newTask.text}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="date"
              className="form-input"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
            />
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={newTask.projectId || ''}
              onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value ? parseInt(e.target.value) : null })}
            >
              <option value="">No Project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary btn-small" onClick={addTask}>
          Add Task
        </button>

        <div className="filter-buttons" style={{ marginTop: '1.5rem' }}>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map(task => {
            const project = task.projectId ? projects.find(p => p.id === task.projectId) : null
            return (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div className="task-content">
                  <span className="task-text">{task.text}</span>
                  <div className="task-meta">
                    <span className={`tag tag-priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    {project && (
                      <span className="tag tag-project">
                        Proj: {project.title}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  {task.due && (
                    <span className={`task-due ${isOverdue(task.due) && !task.completed ? 'overdue' : ''}`}>
                      {new Date(task.due).toLocaleDateString()}
                    </span>
                  )}
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        {filteredTasks.length === 0 && (
          <div className="empty-state">No tasks found</div>
        )}
      </div>
    </div>
  )
}

export default Tasks

