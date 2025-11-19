const taskAssignments = [
  { intern: 'Richard', task: 'Fraud dashboard QA fixes', priority: 'High', due: 'Today', type: 'Feature' },
  { intern: 'Jason', task: 'Payments API latency tests', priority: 'Medium', due: 'Tomorrow', type: 'Infra' },
  { intern: 'Damian', task: 'Security automation pipeline', priority: 'High', due: 'Fri', type: 'R&D' },
  { intern: 'Stephanie', task: 'Customer story synthesis', priority: 'Medium', due: 'Thu', type: 'Product' }
]

const progressOverview = [
  { intern: 'Richard', percent: 82, overdue: 0 },
  { intern: 'Jason', percent: 58, overdue: 2 },
  { intern: 'Stephanie', percent: 76, overdue: 1 },
  { intern: 'Damian', percent: 64, overdue: 0 }
]

const projects = [
  { name: 'Fraud Analytics Dashboard', status: 'On track', deadline: 'Dec 12', deliverables: ['MVP demo', 'Stakeholder readout'] },
  { name: 'Security Automation Pilot', status: 'At risk', deadline: 'Dec 5', deliverables: ['Service runbook', 'Alerting rules'] },
  { name: 'Customer Story Hub', status: 'Ahead', deadline: 'Dec 18', deliverables: ['Story narratives', 'Launch assets'] }
]

const agenda = {
  today: [
    { time: '9:30 AM', title: 'Team stand-up (all interns)', owner: 'Managers' },
    { time: '1:00 PM', title: 'Fraud Dashboard review', owner: 'Richard + Stephanie' },
    { time: '4:30 PM', title: 'Security pilot sync', owner: 'Damian' }
  ],
  week: [
    { day: 'Wednesday', title: 'Mid-week task audit', focus: 'Check blockers' },
    { day: 'Thursday', title: 'Project story review', focus: 'Prep stakeholder doc' },
    { day: 'Friday', title: 'Weekly demo loop', focus: 'Record wins + lessons' }
  ]
}

function ManagerTasksPage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Assign Tasks</h3>
                <p>Send work to individuals or cohorts.</p>
              </div>
              <button className="btn btn-primary btn-small">Create task</button>
            </div>
            <div className="list-table">
              {taskAssignments.map((task) => (
                <div key={task.task} className="list-row">
                  <div>
                    <div className="row-title">{task.task}</div>
                    <div className="row-subtitle">{task.intern} • {task.type}</div>
                  </div>
                  <span className="badge badge-neutral">{task.priority}</span>
                  <span className="row-meta">{task.due}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Task Progress Dashboard</h3>
                <p>Completion %, overdue items.</p>
              </div>
            </div>
            <div className="progress-grid">
              {progressOverview.map((entry) => (
                <div key={entry.intern} className="progress-card">
                  <div className="progress-value">{entry.percent}%</div>
                  <div className="progress-label">{entry.intern}</div>
                  <div className="progress-meta">
                    {entry.overdue === 0 ? 'No overdue tasks' : `${entry.overdue} overdue`}
                  </div>
                  <div className="progress-bar small">
                    <div className="progress-fill" style={{ width: `${entry.percent}%` }} />
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
                <h3>Project Management Console</h3>
                <p>Create projects, attach interns, track deliverables.</p>
              </div>
              <button className="btn btn-secondary btn-small">New project</button>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <div key={project.name} className="project-card">
                  <div className="project-card-header">
                    <h4>{project.name}</h4>
                    <span className={`status-pill status-${project.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="project-meta">
                    Deadline: {project.deadline}
                  </div>
                  <ul className="simple-list">
                    {project.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Daily & Weekly Agenda View</h3>
                <p>Linked directly to each intern’s Today view.</p>
              </div>
            </div>
            <div className="agenda-split">
              <div>
                <h4>Today</h4>
                <ul className="simple-list">
                  {agenda.today.map((item) => (
                    <li key={item.title}>
                      <strong>{item.time}</strong> • {item.title} ({item.owner})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>This week</h4>
                <ul className="simple-list">
                  {agenda.week.map((item) => (
                    <li key={item.day}>
                      <strong>{item.day}</strong> • {item.title} — {item.focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerTasksPage

