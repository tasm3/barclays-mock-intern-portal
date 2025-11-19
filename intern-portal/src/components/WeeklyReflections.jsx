import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function WeeklyReflections() {
  const [reflections, setReflections] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [currentText, setCurrentText] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadReflections()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadReflections()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  useEffect(() => {
    // Load existing reflection for selected date
    const existing = reflections.find(r => r.date === currentDate)
    if (existing) {
      setCurrentText(existing.text)
      setEditingId(existing.id)
    } else {
      setCurrentText('')
      setEditingId(null)
    }
  }, [currentDate, reflections])

  const loadReflections = () => {
    if (!shouldUseMockData()) {
      setReflections([])
      return
    }
    const stored = localStorage.getItem('reflections')
    if (stored) {
      const parsed = JSON.parse(stored)
      setReflections(parsed)
    } else {
      setReflections([])
    }
  }

  const saveReflections = (updated) => {
    localStorage.setItem('reflections', JSON.stringify(updated))
    setReflections(updated)
  }

  const saveReflection = () => {
    if (!currentText.trim()) return

    if (editingId) {
      // Update existing
      const updated = reflections.map(r =>
        r.id === editingId ? { ...r, text: currentText } : r
      )
      saveReflections(updated)
    } else {
      // Create new
      const reflection = {
        id: Date.now(),
        date: currentDate,
        text: currentText
      }
      const updated = [...reflections, reflection]
      saveReflections(updated)
    }
  }

  const loadReflection = (id) => {
    const reflection = reflections.find(r => r.id === id)
    if (reflection) {
      setCurrentDate(reflection.date)
      setCurrentText(reflection.text)
      setEditingId(reflection.id)
    }
  }

  const deleteReflection = (id) => {
    const updated = reflections.filter(r => r.id !== id)
    saveReflections(updated)
    if (editingId === id) {
      setCurrentText('')
      setEditingId(null)
    }
  }

  const sortedReflections = [...reflections].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="card">
      <div className="card-title">Weekly Reflection</div>
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Reflection</label>
          <textarea
            className="form-textarea"
            placeholder="What went well, challenges, learnings..."
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            rows="6"
          />
        </div>
        <button className="btn btn-primary btn-small" onClick={saveReflection}>
          {editingId ? 'Update Reflection' : 'Save Reflection'}
        </button>

        {sortedReflections.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Reflection History
            </h3>
            <ul className="reflection-list">
              {sortedReflections.map(reflection => (
                <li
                  key={reflection.id}
                  className="reflection-item"
                  onClick={() => loadReflection(reflection.id)}
                >
                  <div className="reflection-date">
                    {new Date(reflection.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="reflection-snippet">
                    {reflection.text.length > 100
                      ? reflection.text.substring(0, 100) + '...'
                      : reflection.text}
                  </div>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteReflection(reflection.id)
                    }}
                    style={{ marginTop: '0.5rem' }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeeklyReflections

