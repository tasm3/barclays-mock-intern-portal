import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_TASK_ASSIGNMENTS = [
  { intern: 'Richard', task: 'Fraud dashboard QA fixes', priority: 'High', due: 'Today', type: 'Feature' },
  { intern: 'Jason', task: 'Payments API latency tests', priority: 'Medium', due: 'Tomorrow', type: 'Infra' },
  { intern: 'Damian', task: 'Security automation pipeline', priority: 'High', due: 'Fri', type: 'R&D' },
  { intern: 'Stephanie', task: 'Customer story synthesis', priority: 'Medium', due: 'Thu', type: 'Product' }
]

const DEFAULT_PROGRESS_OVERVIEW = [
  { intern: 'Richard', percent: 82, overdue: 0 },
  { intern: 'Jason', percent: 58, overdue: 2 },
  { intern: 'Stephanie', percent: 76, overdue: 1 },
  { intern: 'Damian', percent: 64, overdue: 0 }
]

const DEFAULT_PROJECTS = [
  { name: 'Fraud Analytics Dashboard', status: 'On track', deadline: 'Dec 12', deliverables: ['MVP demo', 'Stakeholder readout'] },
  { name: 'Security Automation Pilot', status: 'At risk', deadline: 'Dec 5', deliverables: ['Service runbook', 'Alerting rules'] },
  { name: 'Customer Story Hub', status: 'Ahead', deadline: 'Dec 18', deliverables: ['Story narratives', 'Launch assets'] }
]

const DEFAULT_AGENDA = {
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

function ManagerWorkPage() {
  const [taskAssignments, setTaskAssignments] = useState([])
  const [progressOverview, setProgressOverview] = useState([])
  const [projects, setProjects] = useState([])
  const [agenda, setAgenda] = useState({ today: [], week: [] })

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
      setTaskAssignments([])
      setProgressOverview([])
      setProjects([])
      setAgenda({ today: [], week: [] })
      return
    }

    // Use default data when mock data is enabled
    setTaskAssignments(DEFAULT_TASK_ASSIGNMENTS)
    setProgressOverview(DEFAULT_PROGRESS_OVERVIEW)
    setProjects(DEFAULT_PROJECTS)
    setAgenda(DEFAULT_AGENDA)
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Assign Tasks</div>
            <div className="card-body">
              {taskAssignments.length === 0 ? (
                <div className="empty-state">No task assignments available</div>
              ) : (
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
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Task Progress Dashboard</div>
            <div className="card-body">
              {progressOverview.length === 0 ? (
                <div className="empty-state">No progress data available</div>
              ) : (
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
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Project Management Console</div>
            <div className="card-body">
              {projects.length === 0 ? (
                <div className="empty-state">No projects available</div>
              ) : (
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
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Daily & Weekly Agenda View</div>
            <div className="card-body">
              {agenda.today.length === 0 && agenda.week.length === 0 ? (
                <div className="empty-state">No agenda data available</div>
              ) : (
                <div className="agenda-split">
                  <div>
                    <h4>Today</h4>
                    {agenda.today.length === 0 ? (
                      <div className="empty-state">No items today</div>
                    ) : (
                      <ul className="simple-list">
                        {agenda.today.map((item) => (
                          <li key={item.title}>
                            <strong>{item.time}</strong> • {item.title} ({item.owner})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4>This week</h4>
                    {agenda.week.length === 0 ? (
                      <div className="empty-state">No items this week</div>
                    ) : (
                      <ul className="simple-list">
                        {agenda.week.map((item) => (
                          <li key={item.day}>
                            <strong>{item.day}</strong> • {item.title} — {item.focus}
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

export default ManagerWorkPage

