import { useState, useEffect } from 'react'
import barclaysLogo from '../assets/barclays-logo.png'
import { getUseMockData, setUseMockData } from '../utils/dataMode'

function DashboardLayout({ title, children, onLogout, headerText }) {
  const [useMockData, setUseMockDataState] = useState(getUseMockData())

  useEffect(() => {
    // Listen for data mode changes
    const handleDataModeChange = () => {
      setUseMockDataState(getUseMockData())
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const handleToggle = () => {
    const newValue = !useMockData
    setUseMockData(newValue)
    setUseMockDataState(newValue)
  }

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <div
            className="logo-placeholder"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '6px'
            }}
          >
            <img src={barclaysLogo} alt="Barclays logo" className="logo-image" />
          </div>
          <span className="top-bar-title">{headerText || 'Participant Portal'}</span>
        </div>
        <div className="top-bar-right">
          <button className="btn btn-outline btn-small" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-container">
        {children}
      </div>
      <div className="data-mode-toggle">
        <label className="toggle-label">
          <span>Mock Data</span>
          <input
            type="checkbox"
            className="toggle-switch"
            checked={useMockData}
            onChange={handleToggle}
          />
        </label>
      </div>
    </div>
  )
}

export default DashboardLayout

