const skillApprovals = [
  { intern: 'Tim Drake', skill: 'Full-stack delivery', level: 'Advanced', evidence: 'Merged 4 features last sprint', status: { label: 'Ready for approval', tone: 'ready' } },
  { intern: 'Stephanie Brown', skill: 'Product discovery', level: 'Intermediate', evidence: 'Led 3 user interviews', status: { label: 'Review notes', tone: 'pending' } },
  { intern: 'Jason Todd', skill: 'API performance', level: 'Intermediate', evidence: 'Refactored auth service', status: { label: 'Needs demo', tone: 'needssupport' } }
]

const milestones = [
  { label: 'Rotation 1', focus: 'Foundational build', completion: 100, notes: 'Portfolio + onboarding complete' },
  { label: 'Rotation 2', focus: 'Team leadership', completion: 65, notes: 'Leading sprint rituals' },
  { label: 'Rotation 3', focus: 'Innovation sprint', completion: 15, notes: 'Scoping prototypes' }
]

const goals = [
  { team: 'Payments', goal: 'Ship fraud dashboard MVP', owners: ['Richard', 'Damian'], status: 'On track', due: 'Dec 6' },
  { team: 'Digital Banking', goal: 'Automate QA triage', owners: ['Tim'], status: 'At risk', due: 'Nov 28' },
  { team: 'Experience', goal: 'Launch customer stories hub', owners: ['Stephanie'], status: 'Ahead', due: 'Dec 15' }
]

const reflections = [
  { intern: 'Richard', highlight: 'Mentoring peers in code reviews', sentiment: 'High momentum' },
  { intern: 'Damian', highlight: 'Security automation pilot', sentiment: 'Focused' },
  { intern: 'Jason', highlight: 'Needs signal on backend scope', sentiment: 'Needs support' }
]

const developmentHub = {
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

function ManagerCareerPage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Skill Tracker Management</h3>
                <p>Approve or assign skill-building work.</p>
              </div>
              <button className="btn btn-primary btn-small">Approve all ready</button>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Milestone Tracking</h3>
                <p>Rotation-by-rotation signal.</p>
              </div>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Goals Across Teams</h3>
                <p>Approve, edit, and monitor progress.</p>
              </div>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Weekly Reflection Review</h3>
                <p>Signal wins and blockers fast.</p>
              </div>
              <button className="btn btn-outline btn-small">Leave notes</button>
            </div>
            <div className="reflection-list">
              {reflections.map((entry) => (
                <div key={entry.intern} className="reflection-card">
                  <div className="row-title">{entry.intern}</div>
                  <p>{entry.highlight}</p>
                  <span className="badge badge-neutral">{entry.sentiment}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Career Development Hub</h3>
                <p>Mentors, resources, surveys, and engagement signals.</p>
              </div>
              <button className="btn btn-secondary btn-small">Share new resource</button>
            </div>
            <div className="development-grid">
              <div>
                <h4>Mentor approvals</h4>
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
              </div>
              <div>
                <h4>Career resources</h4>
                <ul className="simple-list">
                  {developmentHub.resources.map((resource) => (
                    <li key={resource}>{resource}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Engagement signals</h4>
                <ul className="simple-list">
                  <li>Interest surveys: {developmentHub.engagement.surveys}</li>
                  <li>Resource usage: {developmentHub.engagement.resources}</li>
                  <li>Stories viewed: {developmentHub.engagement.stories}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerCareerPage


