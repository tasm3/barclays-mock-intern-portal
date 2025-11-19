const overviewStats = [
  { label: 'Total interns', value: 18, trend: '+2 new this week' },
  { label: 'Active rotations', value: 6, trend: '3 ending next week' },
  { label: 'Feedback pending', value: 5, trend: '2 due today' },
  { label: 'Agenda coverage', value: '94%', trend: 'Synced with managers' }
]

const assignments = [
  { intern: 'Richard Grayson', role: 'Frontend Lead', team: 'Digital Payments', status: 'On track' },
  { intern: 'Damian Wayne', role: 'Security Automation', team: 'Cyber Ops', status: 'Stretch goal' },
  { intern: 'Tim Drake', role: 'Full-stack Delivery', team: 'Platform Services', status: 'On track' },
  { intern: 'Stephanie Brown', role: 'Product Strategy', team: 'Experience Lab', status: 'Needs support' }
]

const rotationOverview = {
  upcoming: [
    { intern: 'Jason Todd', nextTeam: 'Payments API', start: 'Dec 9' },
    { intern: 'Carrie Kelley', nextTeam: 'AI Ops', start: 'Dec 16' }
  ],
  previous: [
    { intern: 'Harper Row', team: 'DevOps Studio', end: 'Nov 8' },
    { intern: 'Duke Thomas', team: 'Data Insights', end: 'Nov 1' }
  ]
}

const directory = [
  { intern: 'Richard Grayson', manager: 'Bruce Wayne', mentor: 'Barbara Gordon' },
  { intern: 'Stephanie Brown', manager: 'Leslie Thompkins', mentor: 'Selina Kyle' },
  { intern: 'Damian Wayne', manager: 'Lucius Fox', mentor: 'Jason Bard' },
  { intern: 'Tim Drake', manager: 'Bruce Wayne', mentor: 'Kate Kane' }
]

const agendaOverview = [
  { intern: 'Richard', focus: 'Ship Fraud dashboard demo', meetings: 3, tasks: 6 },
  { intern: 'Stephanie', focus: 'Customer story interviews', meetings: 4, tasks: 5 },
  { intern: 'Damian', focus: 'Security automation pilot', meetings: 2, tasks: 7 }
]

function ManagerHomePage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Intern Overview</h3>
                <p>Live snapshot of intern health across cohorts.</p>
              </div>
              <button className="btn btn-outline btn-small">Download report</button>
            </div>
            <div className="stat-grid">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <span className="stat-trend">{stat.trend}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Current Intern Assignments</h3>
                <p>Know who owns what, instantly.</p>
              </div>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Rotation Overview</h3>
                <p>Line of sight into upcoming moves.</p>
              </div>
            </div>
            <div className="rotation-grid">
              <div>
                <h4>Next rotations</h4>
                <ul className="simple-list">
                  {rotationOverview.upcoming.map((item) => (
                    <li key={item.intern}>
                      <strong>{item.intern}</strong> → {item.nextTeam} ({item.start})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Past 2 weeks</h4>
                <ul className="simple-list">
                  {rotationOverview.previous.map((item) => (
                    <li key={item.intern}>
                      <strong>{item.intern}</strong> • {item.team} (ended {item.end})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Team & Manager Directory</h3>
                <p>Intern → manager/mentor pairings.</p>
              </div>
            </div>
            <div className="list-table">
              {directory.map((entry) => (
                <div key={entry.intern} className="list-row">
                  <div className="row-title">{entry.intern}</div>
                  <div className="directory-pair">
                    <span>Manager: {entry.manager}</span>
                    <span>Mentor: {entry.mentor}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Today's Agenda Overview</h3>
                <p>Intern workload visibility.</p>
              </div>
              <button className="btn btn-outline btn-small">View intern calendar</button>
            </div>
            <div className="agenda-grid">
              {agendaOverview.map((entry) => (
                <div key={entry.intern} className="agenda-card">
                  <div className="row-title">{entry.intern}</div>
                  <p>{entry.focus}</p>
                  <div className="agenda-meta">
                    <span>{entry.meetings} meetings</span>
                    <span>{entry.tasks} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerHomePage

