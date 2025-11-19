function DashboardNavigation({ activeTab, onTabChange, userType = 'intern' }) {
  const internTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'team', label: 'Team' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'development', label: 'Development' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'networking', label: 'Networking' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'resources', label: 'Resources' }
  ]
  
  const managerTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'team', label: 'Team' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'development', label: 'Development' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'networking', label: 'Networking' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'resources', label: 'Resources' }
  ]
  
  const tabs = userType === 'manager' ? managerTabs : internTabs

  return (
    <nav className="dashboard-nav">
      <ul className="nav-list">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="nav-label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DashboardNavigation

