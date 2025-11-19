import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_FEEDBACK_TEMPLATES = [
  { type: 'Task', label: 'Task performance', description: 'Quick pulse on delivery quality', scope: 'Single deliverable' },
  { type: 'Project', label: 'Project milestone', description: 'Capture outcomes vs goals', scope: 'Multi-week' },
  { type: 'Skill', label: 'Skill growth', description: 'Track readiness for promotion', scope: 'Rotation-long' }
]

const DEFAULT_FEEDBACK_LOG = [
  { intern: 'Richard', focus: 'Fraud dashboard', rating: '🔥 Exceeds', notes: 'Leading async reviews' },
  { intern: 'Jason', focus: 'API resilience', rating: '⚠ Needs support', notes: 'Pair with Damian' },
  { intern: 'Stephanie', focus: 'Customer stories', rating: '✅ Strong', notes: 'Ready to present to execs' }
]

const DEFAULT_COHORT_TRENDS = [
  { label: 'Avg score', value: '4.6 / 5', detail: '+0.2 WoW' },
  { label: 'Engagement', value: '91%', detail: 'Submitted reflections' },
  { label: 'Feedback SLAs', value: '88%', detail: 'Completed on time' }
]

const DEFAULT_ONE_ON_ONES = [
  { intern: 'Richard', date: 'Tomorrow • 2:00 PM', agenda: 'Demo prep, mentorship' },
  { intern: 'Jason', date: 'Fri • 11:00 AM', agenda: 'Backend scope, blockers' },
  { intern: 'Damian', date: 'Mon • 10:00 AM', agenda: 'Security pilot handoff' }
]

function ManagerFeedbackPage() {
  const [feedbackTemplates, setFeedbackTemplates] = useState([])
  const [feedbackLog, setFeedbackLog] = useState([])
  const [cohortTrends, setCohortTrends] = useState([])
  const [oneOnOnes, setOneOnOnes] = useState([])

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
      setFeedbackTemplates([])
      setFeedbackLog([])
      setCohortTrends([])
      setOneOnOnes([])
      return
    }

    // Load feedback templates
    const storedTemplates = localStorage.getItem('feedbackTemplates')
    if (storedTemplates) {
      setFeedbackTemplates(JSON.parse(storedTemplates))
    } else {
      setFeedbackTemplates(DEFAULT_FEEDBACK_TEMPLATES)
    }

    // Load feedback log
    const storedLog = localStorage.getItem('feedbackLog')
    if (storedLog) {
      setFeedbackLog(JSON.parse(storedLog))
    } else {
      setFeedbackLog(DEFAULT_FEEDBACK_LOG)
    }

    // Load cohort trends
    const storedTrends = localStorage.getItem('cohortTrends')
    if (storedTrends) {
      setCohortTrends(JSON.parse(storedTrends))
    } else {
      setCohortTrends(DEFAULT_COHORT_TRENDS)
    }

    // Load one-on-ones
    const storedOneOnOnes = localStorage.getItem('oneOnOnes')
    if (storedOneOnOnes) {
      setOneOnOnes(JSON.parse(storedOneOnOnes))
    } else {
      setOneOnOnes(DEFAULT_ONE_ON_ONES)
    }
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Give Feedback</div>
            <div className="card-body">
            {feedbackTemplates.length === 0 ? (
              <div className="empty-state">No feedback templates available</div>
            ) : (
              <div className="template-grid">
                {feedbackTemplates.map((template) => (
                  <div key={template.label} className="template-card">
                    <div className="badge badge-neutral">{template.type}</div>
                    <h4>{template.label}</h4>
                    <p>{template.description}</p>
                    <span>{template.scope}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Feedback Log</div>
            <div className="card-body">
            {feedbackLog.length === 0 ? (
              <div className="empty-state">No feedback log available</div>
            ) : (
              <div className="list-table">
                {feedbackLog.map((entry) => (
                  <div key={entry.intern} className="list-row">
                    <div>
                      <div className="row-title">{entry.intern}</div>
                      <div className="row-subtitle">{entry.focus}</div>
                    </div>
                    <span className="badge badge-neutral">{entry.rating}</span>
                    <span className="row-meta">{entry.notes}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Cohort Feedback Overview</div>
            <div className="card-body">
            {cohortTrends.length === 0 ? (
              <div className="empty-state">No cohort trends available</div>
            ) : (
              <div className="stat-grid duo">
                {cohortTrends.map((trend) => (
                  <div key={trend.label} className="stat-card">
                    <div className="stat-value">{trend.value}</div>
                    <div className="stat-label">{trend.label}</div>
                    <span className="stat-trend">{trend.detail}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">1:1 Notes & Meeting Records</div>
            <div className="card-body">
            {oneOnOnes.length === 0 ? (
              <div className="empty-state">No 1:1 meetings scheduled</div>
            ) : (
              <div className="oneonone-grid">
                {oneOnOnes.map((meeting) => (
                  <div key={meeting.intern} className="oneonone-card">
                    <div className="row-title">{meeting.intern}</div>
                    <div className="row-subtitle">{meeting.date}</div>
                    <p>{meeting.agenda}</p>
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

export default ManagerFeedbackPage

