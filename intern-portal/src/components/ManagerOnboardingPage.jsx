import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_CHECKLIST_TEMPLATES = [
  {
    name: 'Technical Ramp-Up',
    steps: ['Workstation setup', 'Access requests', 'Dev tooling orientation', 'Security training'],
    owners: ['IT', 'Security']
  },
  {
    name: 'Team Integration',
    steps: ['Team introductions', 'Shadow sprint ceremonies', 'Meet mentor', 'First deliverable'],
    owners: ['Manager', 'Mentor']
  }
]

const DEFAULT_ONBOARDING_ASSIGNMENTS = [
  { intern: 'Richard Grayson', checklist: 'Technical Ramp-Up', due: 'Today', status: 'In progress' },
  { intern: 'Jason Todd', checklist: 'Team Integration', due: 'Tomorrow', status: 'Pending' },
  { intern: 'Stephanie Brown', checklist: 'Product Foundations', due: 'Fri', status: 'In progress' },
  { intern: 'Damian Wayne', checklist: 'Security Bootcamp', due: 'Mon', status: 'Blocked' }
]

const DEFAULT_COMPLETION_PROGRESS = [
  { label: 'Week 1', value: 92, description: 'Checklist coverage' },
  { label: 'Compliance', value: 88, description: 'Mandatory training' },
  { label: 'Team Ready', value: 75, description: 'Mentor + tooling' }
]

const DEFAULT_TRAINING_MATERIALS = [
  { title: 'Program Handbook v2.1', type: 'PDF', size: '4.2 MB', status: 'Published' },
  { title: 'Security Essential Series', type: 'Video', size: '30 mins', status: 'Draft' },
  { title: 'Backend API Starter Kit', type: 'ZIP', size: '18 MB', status: 'Published' },
  { title: 'Mentor Playbook', type: 'Notion', size: '-', status: 'Published' }
]

function ManagerOnboardingPage() {
  const [checklistTemplates, setChecklistTemplates] = useState([])
  const [onboardingAssignments, setOnboardingAssignments] = useState([])
  const [completionProgress, setCompletionProgress] = useState([])
  const [trainingMaterials, setTrainingMaterials] = useState([])

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
      setChecklistTemplates([])
      setOnboardingAssignments([])
      setCompletionProgress([])
      setTrainingMaterials([])
      return
    }

    // Use default data when mock data is enabled
    setChecklistTemplates(DEFAULT_CHECKLIST_TEMPLATES)
    setOnboardingAssignments(DEFAULT_ONBOARDING_ASSIGNMENTS)
    setCompletionProgress(DEFAULT_COMPLETION_PROGRESS)
    setTrainingMaterials(DEFAULT_TRAINING_MATERIALS)
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Create & Manage Onboarding Checklists</div>
            <div className="card-body">
            {checklistTemplates.length === 0 ? (
              <div className="empty-state">No checklist templates available</div>
            ) : (
              <div className="checklist-grid">
                {checklistTemplates.map((checklist) => (
                  <div key={checklist.name} className="checklist-card">
                    <div className="checklist-card-header">
                      <h4>{checklist.name}</h4>
                      <span className="badge badge-neutral">{checklist.steps.length} steps</span>
                    </div>
                    <ol className="checklist-steps">
                      {checklist.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <div className="checklist-owners">
                      Owners: {checklist.owners.join(', ')}
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
            <div className="card-title">Assign Onboarding Tasks</div>
            <div className="card-body">
            {onboardingAssignments.length === 0 ? (
              <div className="empty-state">No onboarding assignments available</div>
            ) : (
              <div className="list-table">
                {onboardingAssignments.map((assignment) => (
                  <div key={assignment.intern} className="list-row">
                    <div>
                      <div className="row-title">{assignment.intern}</div>
                      <div className="row-subtitle">{assignment.checklist}</div>
                    </div>
                    <span className="row-meta">{assignment.due}</span>
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
            <div className="card-title">Track Completion Progress</div>
            <div className="card-body">
            {completionProgress.length === 0 ? (
              <div className="empty-state">No completion progress available</div>
            ) : (
              <div className="progress-grid">
                {completionProgress.map((item) => (
                  <div key={item.label} className="progress-card">
                    <div className="progress-value">{item.value}%</div>
                    <div className="progress-label">{item.label}</div>
                    <p>{item.description}</p>
                    <div className="progress-bar small">
                      <div className="progress-fill" style={{ width: `${item.value}%` }} />
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
            <div className="card-title">Upload Orientation & Training Materials</div>
            <div className="card-body">
            {trainingMaterials.length === 0 ? (
              <div className="empty-state">No training materials available</div>
            ) : (
              <div className="materials-list">
                {trainingMaterials.map((file) => (
                  <div key={file.title} className="materials-row">
                    <div>
                      <div className="row-title">{file.title}</div>
                      <div className="row-subtitle">{file.type} • {file.size}</div>
                    </div>
                    <span className={`badge badge-${file.status === 'Published' ? 'success' : 'neutral'}`}>
                      {file.status}
                    </span>
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

export default ManagerOnboardingPage


