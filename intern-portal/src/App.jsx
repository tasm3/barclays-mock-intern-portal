import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import InternDashboard from './components/InternDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import { initializeMockData } from './utils/mockData'
import { setUseMockData } from './utils/dataMode'

const VIEW_STORAGE_KEY = 'appView'

function App() {
  // Restore view from localStorage on mount, default to 'login'
  const [view, setView] = useState(() => {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY)
    return stored || 'login'
  })

  // Save view to localStorage whenever it changes
  useEffect(() => {
    if (view === 'login') {
      localStorage.removeItem(VIEW_STORAGE_KEY)
    } else {
      localStorage.setItem(VIEW_STORAGE_KEY, view)
    }
  }, [view])

  const handleLogin = (userType) => {
    // Initialize mock data when logging in
    initializeMockData(userType)
    // Explicitly enable mock data on login
    setUseMockData(true)
    setView(userType)
  }

  const handleLogout = () => {
    localStorage.removeItem(VIEW_STORAGE_KEY)
    setView('login')
  }

  return (
    <div className="app">
      {view === 'login' && <LoginScreen onLogin={handleLogin} />}
      {view === 'intern' && <InternDashboard onLogout={handleLogout} />}
      {view === 'manager' && <ManagerDashboard onLogout={handleLogout} />}
    </div>
  )
}

export default App

