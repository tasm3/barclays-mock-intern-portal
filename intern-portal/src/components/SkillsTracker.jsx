import { useState, useEffect } from 'react'

function SkillsTracker() {
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = () => {
    const stored = localStorage.getItem('skills')
    if (stored) {
      setSkills(JSON.parse(stored))
    }
  }

  const saveSkills = (updated) => {
    localStorage.setItem('skills', JSON.stringify(updated))
    setSkills(updated)
  }

  const addSkill = () => {
    if (!newSkill.trim()) return

    const skill = {
      id: Date.now(),
      name: newSkill,
      level: 0,
      completed: false
    }

    const updated = [...skills, skill]
    saveSkills(updated)
    setNewSkill('')
  }

  const updateSkill = (id, field, value) => {
    const updated = skills.map(skill => {
      if (skill.id === id) {
        const updatedSkill = { ...skill, [field]: value }
        // Auto-complete logic
        if (field === 'level' && value === 5) {
          updatedSkill.completed = true
        } else if (field === 'completed' && value === true) {
          updatedSkill.level = 5
        } else if (field === 'completed' && value === false && updatedSkill.level === 5) {
          updatedSkill.level = 4
        }
        return updatedSkill
      }
      return skill
    })
    saveSkills(updated)
  }

  const deleteSkill = (id) => {
    const updated = skills.filter(s => s.id !== id)
    saveSkills(updated)
  }

  const completedSkills = skills.filter(s => s.completed).length
  const totalSkills = skills.length

  return (
    <div className="card">
      <div className="card-title">Skills Tracker & Milestones</div>
      <div className="card-body">
        {totalSkills > 0 && (
          <div>
            <div className="progress-text">
              {completedSkills}/{totalSkills} skills completed
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0}%` }}
              >
                {totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <div className="form-row">
            <input
              type="text"
              className="form-input"
              placeholder="Skill name..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <button className="btn btn-primary btn-small" onClick={addSkill}>
              Add Skill
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {skills.map(skill => (
            <div key={skill.id} className="skill-item">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-level">
                {[0, 1, 2, 3, 4, 5].map(level => (
                  <div
                    key={level}
                    className={`level-dot ${skill.level > level ? 'filled' : ''}`}
                    onClick={() => updateSkill(skill.id, 'level', level + 1)}
                    style={{ cursor: 'pointer' }}
                    title={`Level ${level + 1}`}
                  />
                ))}
              </div>
              <input
                type="checkbox"
                checked={skill.completed}
                onChange={(e) => updateSkill(skill.id, 'completed', e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <button
                className="btn btn-danger btn-small"
                onClick={() => deleteSkill(skill.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <div className="empty-state">No skills tracked yet. Add one to get started!</div>
        )}
      </div>
    </div>
  )
}

export default SkillsTracker

