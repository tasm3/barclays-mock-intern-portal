import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function Projects() {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    title: '',
    deadline: '',
    priority: 'medium',
    notes: '',
    status: 'not_started'
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadProjects()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadProjects()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadProjects = () => {
    if (!shouldUseMockData()) {
      setProjects([])
      return
    }
    const stored = localStorage.getItem('projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    } else {
      setProjects([])
    }
  }

  const saveProjects = (updated) => {
    localStorage.setItem('projects', JSON.stringify(updated))
    setProjects(updated)
  }

  const addProject = () => {
    if (!newProject.title.trim()) return

    if (editingId) {
      // Update existing project
      const updated = projects.map(p =>
        p.id === editingId
          ? {
              ...p,
              title: newProject.title,
              deadline: newProject.deadline || null,
              priority: newProject.priority,
              notes: newProject.notes,
              status: newProject.status
            }
          : p
      )
      saveProjects(updated)
      setEditingId(null)
    } else {
      // Create new project
      const project = {
        id: Date.now(),
        title: newProject.title,
        deadline: newProject.deadline || null,
        priority: newProject.priority,
        notes: newProject.notes,
        status: newProject.status
      }
      const updated = [...projects, project]
      saveProjects(updated)
    }
    setNewProject({ title: '', deadline: '', priority: 'medium', notes: '', status: 'not_started' })
  }

  const updateProject = (id, field, value) => {
    const updated = projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    )
    saveProjects(updated)
  }

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id)
    saveProjects(updated)
  }

  const getProjectTasks = (projectId) => {
    if (!shouldUseMockData()) {
      return []
    }
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    return tasks.filter(t => t.projectId === projectId)
  }

  const getProjectProgress = (projectId) => {
    const tasks = getProjectTasks(projectId)
    if (tasks.length === 0) return { completed: 0, total: 0 }
    const completed = tasks.filter(t => t.completed).length
    return { completed, total: tasks.length }
  }

  const completedProjects = projects.filter(p => p.status === 'done').length
  const totalProjects = projects.length

  return (
    <div className="card">
      <div className="card-title">Projects</div>
      <div className="card-body">
        {totalProjects > 0 && (
          <div>
            <div className="progress-text">
              {completedProjects}/{totalProjects} projects completed
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0}%` }}
              >
                {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Project title..."
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addProject()}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="date"
              className="form-input"
              placeholder="Deadline"
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
            />
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={newProject.priority}
              onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Notes (optional)..."
            value={newProject.notes}
            onChange={(e) => setNewProject({ ...newProject, notes: e.target.value })}
          />
        </div>
        <button className="btn btn-primary btn-small" onClick={addProject}>
          {editingId ? 'Update Project' : 'Add Project'}
        </button>
        {editingId && (
          <button
            className="btn btn-secondary btn-small"
            onClick={() => {
              setEditingId(null)
              setNewProject({ title: '', deadline: '', priority: 'medium', notes: '', status: 'not_started' })
            }}
            style={{ marginLeft: '0.5rem' }}
          >
            Cancel
          </button>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          {projects.map(project => {
            const taskProgress = getProjectProgress(project.id)
            return (
              <div key={project.id} className="project-item">
                <div className="project-header">
                  <div className="project-title">{project.title}</div>
                  <select
                    className="project-status-select"
                    value={project.status}
                    onChange={(e) => updateProject(project.id, 'status', e.target.value)}
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="project-meta">
                  <span className={`tag tag-priority-${project.priority}`}>
                    {project.priority}
                  </span>
                  {project.deadline && (
                    <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                  )}
                </div>
                {taskProgress.total > 0 && (
                  <div className="project-task-progress">
                    {taskProgress.completed}/{taskProgress.total} linked tasks complete
                    <div className="progress-bar" style={{ marginTop: '0.25rem', height: '16px' }}>
                      <div
                        className="progress-fill"
                        style={{ width: `${(taskProgress.completed / taskProgress.total) * 100}%`, fontSize: '0.7rem' }}
                      >
                        {Math.round((taskProgress.completed / taskProgress.total) * 100)}%
                      </div>
                    </div>
                  </div>
                )}
                {project.notes && (
                  <div className="project-notes">{project.notes}</div>
                )}
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => {
                      setEditingId(project.id)
                      setNewProject({
                        title: project.title,
                        deadline: project.deadline || '',
                        priority: project.priority,
                        notes: project.notes,
                        status: project.status
                      })
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        {projects.length === 0 && (
          <div className="empty-state">No projects yet. Add one to get started!</div>
        )}
      </div>
    </div>
  )
}

export default Projects

