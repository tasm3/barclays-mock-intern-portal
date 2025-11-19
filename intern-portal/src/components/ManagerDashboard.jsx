import { useState, useEffect, useRef } from 'react'
import DashboardLayout from './DashboardLayout'
import DashboardNavigation from './DashboardNavigation'
import ManagerOverviewPage from './ManagerOverviewPage'
import ManagerOnboardingPage from './ManagerOnboardingPage'
import ManagerTeamPage from './ManagerTeamPage'
import ManagerWorkPage from './ManagerWorkPage'
import ManagerDevelopmentPage from './ManagerDevelopmentPage'
import ManagerFeedbackPage from './ManagerFeedbackPage'
import ManagerEngagementPage from './ManagerEngagementPage'
import CalendarPage from './CalendarPage'
import ManagerResourcesPage from './ManagerResourcesPage'
import { shouldUseMockData } from '../utils/dataMode'

function ManagerDashboard({ onLogout }) {
  const [managerName, setManagerName] = useState('Manager')
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
      const name = localStorage.getItem('managerName') || 'Bruce Wayne'
      setManagerName(name)
    } else {
      setManagerName('Manager')
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
        return <ManagerOverviewPage key={key} />
      case 'onboarding':
        return <ManagerOnboardingPage key={key} />
      case 'team':
        return <ManagerTeamPage key={key} />
      case 'tasks':
        return <ManagerWorkPage key={key} />
      case 'development':
        return <ManagerDevelopmentPage key={key} />
      case 'feedback':
        return <ManagerFeedbackPage key={key} />
      case 'networking':
        return <ManagerEngagementPage key={key} />
      case 'calendar':
        return <CalendarPage key={key} />
      case 'resources':
        return <ManagerResourcesPage key={key} />
      default:
        return <ManagerOverviewPage key={key} />
    }
  }
  
  return (
    <DashboardLayout 
      title="Manager Dashboard" 
      onLogout={onLogout}
      headerText={`Welcome, ${managerName}!`}
    >
      <div className="dashboard-with-nav">
        <DashboardNavigation activeTab={activeTab} onTabChange={handleTabChange} userType="manager" />
        <div className="dashboard-main-content" ref={contentRef}>
          {renderPage()}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManagerDashboard

