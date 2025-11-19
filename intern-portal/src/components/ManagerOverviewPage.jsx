import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_OVERVIEW_STATS = [
  { label: 'Total interns', value: 18, trend: '+2 new this week' },
  { label: 'Active rotations', value: 6, trend: '3 ending next week' },
  { label: 'Feedback pending', value: 5, trend: '2 due today' },
  { label: 'Agenda coverage', value: '94%', trend: 'Synced with managers' }
]

const DEFAULT_ASSIGNMENTS = [
  { intern: 'Richard Grayson', role: 'Frontend Lead', team: 'Digital Payments', status: 'On track' },
  { intern: 'Damian Wayne', role: 'Security Automation', team: 'Cyber Ops', status: 'Stretch goal' },
  { intern: 'Tim Drake', role: 'Full-stack Delivery', team: 'Platform Services', status: 'On track' },
  { intern: 'Stephanie Brown', role: 'Product Strategy', team: 'Experience Lab', status: 'Needs support' }
]

const DEFAULT_ROTATION_OVERVIEW = {
  upcoming: [
    { intern: 'Jason Todd', nextTeam: 'Payments API', start: 'Dec 9' },
    { intern: 'Carrie Kelley', nextTeam: 'AI Ops', start: 'Dec 16' }
  ],
  previous: [
    { intern: 'Harper Row', team: 'DevOps Studio', end: 'Nov 8' },
    { intern: 'Duke Thomas', team: 'Data Insights', end: 'Nov 1' }
  ]
}

function ManagerOverviewPage() {
  const [overviewStats, setOverviewStats] = useState([])
  const [assignments, setAssignments] = useState([])
  const [rotationOverview, setRotationOverview] = useState({ upcoming: [], previous: [] })

  useEffect(() => {
    loadData()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadData()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadData = () => {
    if (!shouldUseMockData()) {
      setOverviewStats([])
      setAssignments([])
      setRotationOverview({ upcoming: [], previous: [] })
      return
    }

    // Load overview stats
    const storedStats = localStorage.getItem('overviewStats')
    if (storedStats) {
      setOverviewStats(JSON.parse(storedStats))
    } else {
      setOverviewStats(DEFAULT_OVERVIEW_STATS)
    }

    // Load assignments
    const storedAssignments = localStorage.getItem('assignments')
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments))
    } else {
      setAssignments(DEFAULT_ASSIGNMENTS)
    }

    // Load rotation overview
    const storedRotation = localStorage.getItem('rotationOverview')
    if (storedRotation) {
      setRotationOverview(JSON.parse(storedRotation))
    } else {
      setRotationOverview(DEFAULT_ROTATION_OVERVIEW)
    }
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Intern Overview</div>
            <div className="card-body">
              {overviewStats.length === 0 ? (
                <div className="empty-state">No overview data available</div>
              ) : (
                <div className="stat-grid">
                  {overviewStats.map((stat) => (
                    <div key={stat.label} className="stat-card">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                      <span className="stat-trend">{stat.trend}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Current Intern Assignments</div>
            <div className="card-body">
              {assignments.length === 0 ? (
                <div className="empty-state">No assignments available</div>
              ) : (
                <div className="list-table">
                  {assignments.map((assignment) => (
                    <div key={assignment.intern} className="list-row">
                      <div>
                        <div className="row-title">{assignment.intern}</div>
                        <div className="row-subtitle">{assignment.role} • {assignment.team}</div>
                      </div>
                      <span className={`status-pill status-${assignment.status.toLowerCase().replace(/\s+/g, '')}`}>
                        {assignment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Rotation Overview</div>
            <div className="card-body">
              {rotationOverview.upcoming.length === 0 && rotationOverview.previous.length === 0 ? (
                <div className="empty-state">No rotation data available</div>
              ) : (
                <div className="rotation-grid">
                  <div>
                    <h4>Next rotations</h4>
                    {rotationOverview.upcoming.length === 0 ? (
                      <div className="empty-state">No upcoming rotations</div>
                    ) : (
                      <ul className="simple-list">
                        {rotationOverview.upcoming.map((item) => (
                          <li key={item.intern}>
                            <strong>{item.intern}</strong> → {item.nextTeam} ({item.start})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4>Past 2 weeks</h4>
                    {rotationOverview.previous.length === 0 ? (
                      <div className="empty-state">No recent rotations</div>
                    ) : (
                      <ul className="simple-list">
                        {rotationOverview.previous.map((item) => (
                          <li key={item.intern}>
                            <strong>{item.intern}</strong> • {item.team} (ended {item.end})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerOverviewPage

