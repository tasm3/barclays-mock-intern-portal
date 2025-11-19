import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function InternProfilePage({ internName, onBack }) {
  const [profile, setProfile] = useState(null)
  const [rotationInfo, setRotationInfo] = useState(null)
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [goals, setGoals] = useState([])
  const [feedbackEntries, setFeedbackEntries] = useState([])

  useEffect(() => {
    if (internName) {
      loadInternProfile(internName)
    }
    // Listen for data mode changes
    const handleDataModeChange = () => {
      if (internName) {
        loadInternProfile(internName)
      }
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [internName])

  const loadInternProfile = (name) => {
    if (!shouldUseMockData()) {
      setProfile(null)
      return
    }

    // For now, we'll use Richard Grayson's data as an example
    // In a real app, this would fetch data specific to the intern
    if (name === 'Richard Grayson') {
      // Load rotation info
      const storedRotation = localStorage.getItem('rotationInfo')
      if (storedRotation) {
        setRotationInfo(JSON.parse(storedRotation))
      }

      // Load skills
      const storedSkills = localStorage.getItem('skills')
      if (storedSkills) {
        setSkills(JSON.parse(storedSkills))
      }

      // Load projects
      const storedProjects = localStorage.getItem('projects')
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects))
      }

      // Load goals
      const storedGoals = localStorage.getItem('goals')
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals))
      }

      // Load feedback
      const storedFeedback = localStorage.getItem('feedbackEntries')
      if (storedFeedback) {
        setFeedbackEntries(JSON.parse(storedFeedback))
      }
    }

    // Create profile object
    setProfile({
      name: name,
      email: `${name.toLowerCase().replace(' ', '.')}@barclays.com`,
      startDate: '2024-01-15',
      status: 'Active',
      program: 'Finance Internship Program'
    })
  }

  if (!profile && !internName) {
    return (
      <div className="page-content">
        <div className="page-list">
          <div className="page-list-item">
            <div className="card">
              <div className="card-title">Intern Profile</div>
              <div className="card-body">
                <div className="empty-state">Select an intern to view their profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="page-content">
        <div className="page-list">
          <div className="page-list-item">
            <div className="card">
              <div className="card-title">Intern Profile</div>
              <div className="card-body">
                <div className="empty-state">Loading profile...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content">
      {onBack && (
        <div style={{ marginBottom: '1rem' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to Intern List
          </button>
        </div>
      )}

      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Profile Information</div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500' }}>{profile.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</div>
                  <div style={{ fontSize: '1rem' }}>{profile.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Program</div>
                  <div style={{ fontSize: '1rem' }}>{profile.program}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Start Date</div>
                  <div style={{ fontSize: '1rem' }}>{new Date(profile.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Status</div>
                  <div style={{ fontSize: '1rem' }}>
                    <span className="badge badge-success">{profile.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {rotationInfo && (
          <>
            <div className="page-list-item">
              <section className="card">
                <div className="card-title">Current Rotation</div>
                <div className="card-body">
                  <ul className="simple-list">
                    <li><strong>Role:</strong> {rotationInfo.currentRole}</li>
                    <li><strong>Team:</strong> {rotationInfo.team}</li>
                    <li><strong>Manager:</strong> {rotationInfo.manager}</li>
                  </ul>
                </div>
              </section>
            </div>

            {rotationInfo.nextRotation && (
              <div className="page-list-item">
                <section className="card">
                  <div className="card-title">Upcoming Rotation</div>
                  <div className="card-body">
                    <ul className="simple-list">
                      <li><strong>Role:</strong> {rotationInfo.nextRotation.role}</li>
                      <li><strong>Start Date:</strong> {new Date(rotationInfo.nextRotation.startDate).toLocaleDateString()}</li>
                    </ul>
                  </div>
                </section>
              </div>
            )}

            {rotationInfo.pastRotation && (
              <div className="page-list-item">
                <section className="card">
                  <div className="card-title">Past Rotations</div>
                  <div className="card-body">
                    <ul className="simple-list">
                      <li><strong>Role:</strong> {rotationInfo.pastRotation.role}</li>
                      <li><strong>End Date:</strong> {new Date(rotationInfo.pastRotation.endDate).toLocaleDateString()}</li>
                    </ul>
                  </div>
                </section>
              </div>
            )}
          </>
        )}

        {skills.length > 0 && (
          <div className="page-list-item">
            <section className="card">
              <div className="card-title">Skills & Progression</div>
              <div className="card-body">
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {skills.map(skill => (
                    <div key={skill.id} style={{ 
                      padding: '0.75rem', 
                      background: 'var(--bg-light)', 
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{skill.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Level: {skill.level}/5 {skill.completed && '✓ Completed'}
                        </div>
                      </div>
                      <div className="progress-bar" style={{ width: '150px', height: '8px' }}>
                        <div
                          className="progress-fill"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {projects.length > 0 && (
          <div className="page-list-item">
            <section className="card">
              <div className="card-title">Current Projects</div>
              <div className="card-body">
                {projects.filter(p => p.status !== 'done').map(project => (
                  <div key={project.id} style={{ 
                    marginBottom: '1rem', 
                    padding: '0.75rem', 
                    background: 'var(--bg-light)', 
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{project.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Status: {project.status} | Priority: {project.priority}
                      {project.deadline && ` | Deadline: ${new Date(project.deadline).toLocaleDateString()}`}
                    </div>
                    {project.notes && (
                      <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-main)' }}>
                        {project.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {goals.length > 0 && (
          <div className="page-list-item">
            <section className="card">
              <div className="card-title">Goals</div>
              <div className="card-body">
                {goals.filter(g => !g.completed).map(goal => (
                  <div key={goal.id} style={{ 
                    marginBottom: '0.75rem', 
                    padding: '0.75rem', 
                    background: 'var(--bg-light)', 
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{goal.text}</div>
                      {goal.deadline && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <span className="badge badge-neutral">In Progress</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {feedbackEntries.length > 0 && (
          <div className="page-list-item">
            <section className="card">
              <div className="card-title">Recent Feedback</div>
              <div className="card-body">
                {feedbackEntries.slice(0, 3).map(feedback => (
                  <div key={feedback.id} style={{ 
                    marginBottom: '1rem', 
                    padding: '0.75rem', 
                    background: 'var(--bg-light)', 
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {new Date(feedback.date).toLocaleDateString()} {feedback.type === 'mid-review' && '• Mid-Review'}
                    </div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{feedback.text}</div>
                    {feedback.rating && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                        <strong>Rating:</strong> {feedback.rating}/5
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default InternProfilePage

