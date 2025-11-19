import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import InternDashboard from './components/InternDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import { initializeMockData } from './utils/mockData'

function App() {
  const [view, setView] = useState('login') // 'login' | 'intern' | 'manager'

  const handleLogin = (userType) => {
    // Initialize mock data when logging in
    initializeMockData(userType)
    setView(userType)
  }

  const handleLogout = () => {
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

