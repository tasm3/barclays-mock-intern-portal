import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_SKILL_APPROVALS = [
  { intern: 'Tim Drake', skill: 'Full-stack delivery', level: 'Advanced', evidence: 'Merged 4 features last sprint', status: { label: 'Ready for approval', tone: 'ready' } },
  { intern: 'Stephanie Brown', skill: 'Product discovery', level: 'Intermediate', evidence: 'Led 3 user interviews', status: { label: 'Review notes', tone: 'pending' } },
  { intern: 'Jason Todd', skill: 'API performance', level: 'Intermediate', evidence: 'Refactored auth service', status: { label: 'Needs demo', tone: 'needssupport' } }
]

const DEFAULT_MILESTONES = [
  { label: 'Rotation 1', focus: 'Foundational build', completion: 100, notes: 'Portfolio + onboarding complete' },
  { label: 'Rotation 2', focus: 'Team leadership', completion: 65, notes: 'Leading sprint rituals' },
  { label: 'Rotation 3', focus: 'Innovation sprint', completion: 15, notes: 'Scoping prototypes' }
]

const DEFAULT_GOALS = [
  { team: 'Payments', goal: 'Ship fraud dashboard MVP', owners: ['Richard', 'Damian'], status: 'On track', due: 'Dec 6' },
  { team: 'Digital Banking', goal: 'Automate QA triage', owners: ['Tim'], status: 'At risk', due: 'Nov 28' },
  { team: 'Experience', goal: 'Launch customer stories hub', owners: ['Stephanie'], status: 'Ahead', due: 'Dec 15' }
]

const DEFAULT_REFLECTIONS = [
  { intern: 'Richard', highlight: 'Mentoring peers in code reviews', sentiment: 'High momentum' },
  { intern: 'Damian', highlight: 'Security automation pilot', sentiment: 'Focused' },
  { intern: 'Jason', highlight: 'Needs signal on backend scope', sentiment: 'Needs support' }
]

const DEFAULT_DEVELOPMENT_HUB = {
  mentors: [
    { name: 'Selina Kyle', area: 'Product Strategy', status: 'Approved' },
    { name: 'Barbara Gordon', area: 'Security Engineering', status: 'Pending' }
  ],
  resources: [
    'Career Map: Software → Product Pathways',
    'Rotation Milestone Worksheet',
    'Storytelling Toolkit'
  ],
  engagement: {
    surveys: '82% submitted',
    resources: '68% active usage',
    stories: '25 new views'
  }
}

function ManagerDevelopmentPage() {
  const [skillApprovals, setSkillApprovals] = useState([])
  const [milestones, setMilestones] = useState([])
  const [goals, setGoals] = useState([])
  const [reflections, setReflections] = useState([])
  const [developmentHub, setDevelopmentHub] = useState({ mentors: [], resources: [], engagement: {} })

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
      setSkillApprovals([])
      setMilestones([])
      setGoals([])
      setReflections([])
      setDevelopmentHub({ mentors: [], resources: [], engagement: {} })
      return
    }

    // Use default data when mock data is enabled
    setSkillApprovals(DEFAULT_SKILL_APPROVALS)
    setMilestones(DEFAULT_MILESTONES)
    setGoals(DEFAULT_GOALS)
    setReflections(DEFAULT_REFLECTIONS)
    setDevelopmentHub(DEFAULT_DEVELOPMENT_HUB)
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Skill Tracker Management</div>
            <div className="card-body">
              {skillApprovals.length === 0 ? (
                <div className="empty-state">No skill approvals available</div>
              ) : (
                <div className="list-table">
                  {skillApprovals.map((skill) => (
                    <div key={skill.intern} className="list-row">
                      <div>
                        <div className="row-title">{skill.intern} • {skill.skill}</div>
                        <div className="row-subtitle">{skill.evidence}</div>
                      </div>
                      <span className="badge badge-neutral">{skill.level}</span>
                      <span className={`status-pill status-${skill.status.tone}`}>{skill.status.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Milestone Tracking</div>
            <div className="card-body">
              {milestones.length === 0 ? (
                <div className="empty-state">No milestones available</div>
              ) : (
                <div className="milestone-list">
                  {milestones.map((milestone) => (
                    <div key={milestone.label} className="milestone-row">
                      <div>
                        <div className="row-title">{milestone.label}</div>
                        <div className="row-subtitle">{milestone.focus}</div>
                      </div>
                      <div className="milestone-progress">
                        <span>{milestone.completion}%</span>
                        <div className="progress-bar tiny">
                          <div className="progress-fill" style={{ width: `${milestone.completion}%` }} />
                        </div>
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
            <div className="card-title">Goals Across Teams</div>
            <div className="card-body">
              {goals.length === 0 ? (
                <div className="empty-state">No goals available</div>
              ) : (
                <div className="list-table">
                  {goals.map((goal) => (
                    <div key={goal.goal} className="list-row">
                      <div>
                        <div className="row-title">{goal.goal}</div>
                        <div className="row-subtitle">{goal.team} • Owners: {goal.owners.join(', ')}</div>
                      </div>
                      <span className="row-meta">{goal.due}</span>
                      <span className={`status-pill status-${goal.status.toLowerCase().replace(/\s+/g, '')}`}>
                        {goal.status}
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
            <div className="card-title">Weekly Reflection Review</div>
            <div className="card-body">
              {reflections.length === 0 ? (
                <div className="empty-state">No reflections available</div>
              ) : (
                <div className="reflection-list">
                  {reflections.map((entry) => (
                    <div key={entry.intern} className="reflection-card">
                      <div className="row-title">{entry.intern}</div>
                      <p>{entry.highlight}</p>
                      <span className="badge badge-neutral">{entry.sentiment}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Career Development Hub</div>
            <div className="card-body">
              {developmentHub.mentors.length === 0 && developmentHub.resources.length === 0 ? (
                <div className="empty-state">No development hub data available</div>
              ) : (
                <div className="development-grid">
                  <div>
                    <h4>Mentor approvals</h4>
                    {developmentHub.mentors.length === 0 ? (
                      <div className="empty-state">No mentors</div>
                    ) : (
                      <ul className="simple-list">
                        {developmentHub.mentors.map((mentor) => (
                          <li key={mentor.name}>
                            <strong>{mentor.name}</strong> • {mentor.area}
                            <span className={`badge badge-${mentor.status === 'Approved' ? 'success' : 'neutral'}`}>
                              {mentor.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4>Career resources</h4>
                    {developmentHub.resources.length === 0 ? (
                      <div className="empty-state">No resources</div>
                    ) : (
                      <ul className="simple-list">
                        {developmentHub.resources.map((resource) => (
                          <li key={resource}>{resource}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4>Engagement signals</h4>
                    <ul className="simple-list">
                      <li>Interest surveys: {developmentHub.engagement.surveys || 'N/A'}</li>
                      <li>Resource usage: {developmentHub.engagement.resources || 'N/A'}</li>
                      <li>Stories viewed: {developmentHub.engagement.stories || 'N/A'}</li>
                    </ul>
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

export default ManagerDevelopmentPage

