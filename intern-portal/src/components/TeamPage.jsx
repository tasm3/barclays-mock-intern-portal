import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    loadTeamMembers()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadTeamMembers()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadTeamMembers = () => {
    if (!shouldUseMockData()) {
      setTeamMembers([])
      return
    }
    const stored = localStorage.getItem('teamMembers')
    if (stored) {
      setTeamMembers(JSON.parse(stored))
    } else {
      setTeamMembers([])
    }
  }

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Team Directory</div>
            <div className="card-body">
              {teamMembers.length === 0 ? (
                <div className="empty-state">No team members available</div>
              ) : (
                <div className="list-table">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="list-row">
                      <div>
                        <div className="row-title">{member.name}</div>
                        <div className="row-subtitle">{member.role} • {member.team}</div>
                      </div>
                      <button 
                        className="btn btn-outline btn-small"
                        onClick={() => handleEmail(member.email)}
                      >
                        Email
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TeamPage

