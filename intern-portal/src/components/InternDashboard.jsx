import { useState, useEffect, useRef } from 'react'
import DashboardLayout from './DashboardLayout'
import DashboardNavigation from './DashboardNavigation'
import HomePage from './HomePage'
import OnboardingPage from './OnboardingPage'
import TeamPage from './TeamPage'
import TasksPage from './TasksPage'
import DevelopmentPage from './DevelopmentPage'
import FeedbackPage from './FeedbackPage'
import EventsPage from './EventsPage'
import CalendarPage from './CalendarPage'
import ResourcesPage from './ResourcesPage'
import { shouldUseMockData } from '../utils/dataMode'

function InternDashboard({ onLogout }) {
  const [internName, setInternName] = useState('Participant')
  const [activeTab, setActiveTab] = useState('overview')
  const [dataModeKey, setDataModeKey] = useState(0) // Force re-render when data mode changes
  const contentRef = useRef(null)

  const scrollTabContentToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollTabContentToTop()
  }, [activeTab])

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) {
      scrollTabContentToTop()
      return
    }
    setActiveTab(tabId)
  }
  
  const updateName = () => {
    if (shouldUseMockData()) {
      const name = localStorage.getItem('internName') || 'Richard Grayson'
      setInternName(name)
    } else {
      setInternName('Participant')
    }
  }

  useEffect(() => {
    updateName()
  }, [])

  useEffect(() => {
    // Listen for data mode changes to trigger component updates
    const handleDataModeChange = () => {
      setDataModeKey(prev => prev + 1)
      updateName()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])
  
  const renderPage = () => {
    // Use dataModeKey to force re-render when data mode changes
    const key = `page-${activeTab}-${dataModeKey}`
    switch (activeTab) {
      case 'overview':
        return <HomePage key={key} />
      case 'onboarding':
        return <OnboardingPage key={key} />
      case 'team':
        return <TeamPage key={key} />
      case 'tasks':
        return <TasksPage key={key} />
      case 'development':
        return <DevelopmentPage key={key} />
      case 'feedback':
        return <FeedbackPage key={key} />
      case 'networking':
        return <EventsPage key={key} />
      case 'calendar':
        return <CalendarPage key={key} />
      case 'resources':
        return <ResourcesPage key={key} />
      default:
        return <HomePage key={key} />
    }
  }
  
  return (
    <DashboardLayout 
      title="Participant Dashboard" 
      onLogout={onLogout}
      headerText={`Welcome, ${internName}!`}
    >
      <div className="dashboard-with-nav">
        <DashboardNavigation activeTab={activeTab} onTabChange={handleTabChange} userType="intern" />
        <div className="dashboard-main-content" ref={contentRef}>
          {renderPage()}
        </div>
      </div>
    </DashboardLayout>
  )
}

export function RotationTracker() {
  const [rotationInfo, setRotationInfo] = useState(null)

  useEffect(() => {
    loadRotationInfo()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadRotationInfo()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadRotationInfo = () => {
    if (!shouldUseMockData()) {
      setRotationInfo(null)
      return
    }
    const stored = localStorage.getItem('rotationInfo')
    if (stored) {
      setRotationInfo(JSON.parse(stored))
    } else {
      setRotationInfo(null)
    }
  }

  if (!rotationInfo) {
    return (
      <div className="card">
        <div className="card-title">Role</div>
        <div className="card-body">
          <div className="empty-state">No rotation information available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-title">Role</div>
      <div className="card-body">
        <ul className="simple-list">
          <li><strong>Current Role:</strong> {rotationInfo.currentRole}</li>
          <li><strong>Next Rotation:</strong> {rotationInfo.nextRotation.role} (Starting {new Date(rotationInfo.nextRotation.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})</li>
          <li><strong>Past Rotation:</strong> {rotationInfo.pastRotation.role} (Completed {new Date(rotationInfo.pastRotation.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})</li>
          <li><strong>Manager:</strong> {rotationInfo.manager}</li>
          <li><strong>Team:</strong> {rotationInfo.team}</li>
        </ul>
      </div>
    </div>
  )
}

export function ResourcesOpportunities() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    loadResources()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadResources()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadResources = () => {
    if (!shouldUseMockData()) {
      setResources([])
      return
    }
    const stored = localStorage.getItem('resources')
    if (stored) {
      setResources(JSON.parse(stored))
    } else {
      setResources([])
    }
  }

  return (
    <div className="card">
      <div className="card-title">Resources</div>
      <div className="card-body">
        {resources.length === 0 ? (
          <div className="empty-state">No resources available</div>
        ) : (
          <ul className="simple-list">
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function FeedbackFromManager() {
  const [feedbackEntries, setFeedbackEntries] = useState([])

  useEffect(() => {
    loadFeedback()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      loadFeedback()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadFeedback = () => {
    if (!shouldUseMockData()) {
      setFeedbackEntries([])
      return
    }
    const stored = localStorage.getItem('feedbackEntries')
    if (stored) {
      setFeedbackEntries(JSON.parse(stored))
    } else {
      setFeedbackEntries([])
    }
  }

  if (feedbackEntries.length === 0) {
    return (
      <div className="card">
        <div className="card-title">Feedback</div>
        <div className="card-body">
          <div className="empty-state">No feedback available</div>
        </div>
      </div>
    )
  }

  const regularFeedback = feedbackEntries.filter(f => f.type === 'regular').sort((a, b) => new Date(b.date) - new Date(a.date))
  const midReview = feedbackEntries.find(f => f.type === 'mid-review')

  return (
    <div className="card">
      <div className="card-title">Feedback</div>
      <div className="card-body">
        {regularFeedback.map((feedback, index) => (
          <div key={feedback.id} style={{ marginBottom: '1rem' }}>
            <strong>Last Feedback ({new Date(feedback.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}):</strong>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              "{feedback.text}"
            </p>
          </div>
        ))}
        {midReview && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Mid-Program Review:</strong>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                "{midReview.text}"
              </p>
            </div>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)', 
              fontStyle: 'italic',
              padding: '0.75rem',
              background: 'var(--bg-light)',
              borderRadius: '6px'
            }}>
              Performance rating: {midReview.rating}/5 | Next review scheduled: {new Date(midReview.nextReviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default InternDashboard

