import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'
import InternProfilePage from './InternProfilePage'

const DEFAULT_INTERNS = [
  { name: 'Richard Grayson', team: 'Risk Management', rotation: 'Current', manager: 'Bruce Wayne' },
  { name: 'Jason Todd', team: 'Trading Desk', rotation: 'Upcoming', manager: 'Bruce Wayne' },
  { name: 'Tim Drake', team: 'Investment Banking', rotation: 'Current', manager: 'Bruce Wayne' },
  { name: 'Damian Wayne', team: 'Regulatory Affairs', rotation: 'Current', manager: 'Lucius Fox' },
  { name: 'Stephanie Brown', team: 'Wealth Management', rotation: 'Upcoming', manager: 'Leslie Thompkins' }
]

function ManagerInternProfilesPage() {
  const [interns, setInterns] = useState([])
  const [selectedIntern, setSelectedIntern] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadInterns()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadInterns()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadInterns = () => {
    if (!shouldUseMockData()) {
      setInterns([])
      return
    }

    // Load from directory or use defaults
    const stored = localStorage.getItem('directory')
    if (stored) {
      const directory = JSON.parse(stored)
      const internList = directory.map(entry => ({
        name: entry.intern,
        manager: entry.manager,
        mentor: entry.mentor,
        rotation: 'Current' // Default, could be enhanced with actual rotation data
      }))
      setInterns(internList)
    } else {
      setInterns(DEFAULT_INTERNS)
    }
  }

  const getFilteredInterns = () => {
    if (filter === 'all') return interns
    if (filter === 'current') return interns.filter(i => i.rotation === 'Current')
    if (filter === 'upcoming') return interns.filter(i => i.rotation === 'Upcoming')
    return interns
  }

  const filteredInterns = getFilteredInterns()

  if (selectedIntern) {
    return (
      <InternProfilePage 
        internName={selectedIntern} 
        onBack={() => setSelectedIntern(null)}
      />
    )
  }

  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Intern Profiles</div>
            <div className="card-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                View detailed profiles of interns including their past rotations, current teams, skills progression, projects, and feedback history.
              </p>

              <div className="filter-buttons" style={{ marginBottom: '1rem' }}>
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filter === 'current' ? 'active' : ''}`}
                  onClick={() => setFilter('current')}
                >
                  Current Rotation
                </button>
                <button
                  className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming Rotation
                </button>
              </div>

              {filteredInterns.length === 0 ? (
                <div className="empty-state">No interns found</div>
              ) : (
                <div className="list-table">
                  {filteredInterns.map((intern, index) => (
                    <div 
                      key={index} 
                      className="list-row"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedIntern(intern.name)}
                    >
                      <div>
                        <div className="row-title">{intern.name}</div>
                        <div className="row-subtitle">
                          {intern.team || intern.manager ? `${intern.team || ''} ${intern.manager ? `• Manager: ${intern.manager}` : ''}` : 'No team assigned'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className={`badge ${intern.rotation === 'Current' ? 'badge-success' : 'badge-neutral'}`}>
                          {intern.rotation}
                        </span>
                        <button
                          className="btn btn-primary btn-small"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedIntern(intern.name)
                          }}
                        >
                          View Profile
                        </button>
                      </div>
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

export default ManagerInternProfilesPage

