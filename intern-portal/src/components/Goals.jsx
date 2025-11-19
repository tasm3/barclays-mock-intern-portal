import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function Goals() {
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState({ text: '', deadline: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadGoals()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadGoals()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadGoals = () => {
    if (!shouldUseMockData()) {
      setGoals([])
      return
    }
    const stored = localStorage.getItem('goals')
    if (stored) {
      setGoals(JSON.parse(stored))
    } else {
      setGoals([])
    }
  }

  const saveGoals = (updated) => {
    localStorage.setItem('goals', JSON.stringify(updated))
    setGoals(updated)
  }

  const addGoal = () => {
    if (!newGoal.text.trim()) return

    const goal = {
      id: Date.now(),
      text: newGoal.text,
      deadline: newGoal.deadline || null,
      completed: false
    }

    const updated = [...goals, goal]
    saveGoals(updated)
    setNewGoal({ text: '', deadline: '' })
  }

  const toggleComplete = (id) => {
    const updated = goals.map(g =>
      g.id === id ? { ...g, completed: !g.completed } : g
    )
    saveGoals(updated)
  }

  const updateGoal = (id, field, value) => {
    const updated = goals.map(g =>
      g.id === id ? { ...g, [field]: value } : g
    )
    saveGoals(updated)
  }

  const deleteGoal = (id) => {
    const updated = goals.filter(g => g.id !== id)
    saveGoals(updated)
  }

  const completedGoals = goals.filter(g => g.completed).length
  const totalGoals = goals.length

  return (
    <div className="card">
      <div className="card-title">Goals Across Teams</div>
      <div className="card-body">
        {totalGoals > 0 && (
          <div>
            <div className="progress-text">
              {completedGoals}/{totalGoals} goals completed
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0}%` }}
              >
                {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Goal description..."
            value={newGoal.text}
            onChange={(e) => setNewGoal({ ...newGoal, text: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="date"
              className="form-input"
              placeholder="Deadline (optional)"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            />
          </div>
          <button className="btn btn-primary btn-small" onClick={addGoal} style={{ alignSelf: 'flex-end' }}>
            Add Goal
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {goals.map(goal => (
            <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleComplete(goal.id)}
                style={{ cursor: 'pointer', marginTop: '0.2rem' }}
              />
              <div className="goal-content">
                <div className="goal-text">{goal.text}</div>
                {goal.deadline && (
                  <div className="goal-deadline">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-outline btn-small"
                  onClick={() => {
                    const newText = prompt('Edit goal:', goal.text)
                    if (newText !== null && newText.trim()) {
                      updateGoal(goal.id, 'text', newText.trim())
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => deleteGoal(goal.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {goals.length === 0 && (
          <div className="empty-state">No goals set yet. Add one to get started!</div>
        )}
      </div>
    </div>
  )
}

export default Goals

