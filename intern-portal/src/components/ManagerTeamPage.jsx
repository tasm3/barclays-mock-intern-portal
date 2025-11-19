import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'
import InternProfilePage from './InternProfilePage'

const DEFAULT_DIRECTORY = [
  { intern: 'Richard Grayson', manager: 'Bruce Wayne', mentor: 'Barbara Gordon' },
  { intern: 'Stephanie Brown', manager: 'Leslie Thompkins', mentor: 'Selina Kyle' },
  { intern: 'Damian Wayne', manager: 'Lucius Fox', mentor: 'Jason Bard' },
  { intern: 'Tim Drake', manager: 'Bruce Wayne', mentor: 'Kate Kane' }
]

const DEFAULT_AGENDA_OVERVIEW = [
  { intern: 'Richard', focus: 'Ship Fraud dashboard demo', meetings: 3, tasks: 6 },
  { intern: 'Stephanie', focus: 'Customer story interviews', meetings: 4, tasks: 5 },
  { intern: 'Damian', focus: 'Security automation pilot', meetings: 2, tasks: 7 }
]

function ManagerTeamPage() {
  const [directory, setDirectory] = useState([])
  const [agendaOverview, setAgendaOverview] = useState([])
  const [selectedIntern, setSelectedIntern] = useState(null)

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
      setDirectory([])
      setAgendaOverview([])
      return
    }

    // Load directory
    const storedDirectory = localStorage.getItem('directory')
    if (storedDirectory) {
      setDirectory(JSON.parse(storedDirectory))
    } else {
      setDirectory(DEFAULT_DIRECTORY)
    }

    // Load agenda overview
    const storedAgenda = localStorage.getItem('agendaOverview')
    if (storedAgenda) {
      setAgendaOverview(JSON.parse(storedAgenda))
    } else {
      setAgendaOverview(DEFAULT_AGENDA_OVERVIEW)
    }
  }

  // If an intern is selected, show their profile
  if (selectedIntern) {
    return (
      <InternProfilePage 
        internName={selectedIntern} 
        onBack={() => setSelectedIntern(null)}
      />
    )
  }

  // Helper function to get full intern name from partial name
  const getFullInternName = (partialName) => {
    const fullName = directory.find(entry => 
      entry.intern.toLowerCase().includes(partialName.toLowerCase()) ||
      partialName.toLowerCase().includes(entry.intern.toLowerCase())
    )
    return fullName ? fullName.intern : partialName
  }

  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Team & Manager Directory</div>
            <div className="card-body">
              {directory.length === 0 ? (
                <div className="empty-state">No directory data available</div>
              ) : (
                <div className="list-table">
                  {directory.map((entry) => (
                    <div 
                      key={entry.intern} 
                      className="list-row"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedIntern(entry.intern)}
                    >
                      <div className="row-title">{entry.intern}</div>
                      <div className="directory-pair">
                        <span>Manager: {entry.manager}</span>
                        <span>Mentor: {entry.mentor}</span>
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
            <div className="card-title">Today's Agenda Overview</div>
            <div className="card-body">
              {agendaOverview.length === 0 ? (
                <div className="empty-state">No agenda data available</div>
              ) : (
                <div className="agenda-grid">
                  {agendaOverview.map((entry) => {
                    const fullName = getFullInternName(entry.intern)
                    return (
                      <div 
                        key={entry.intern} 
                        className="agenda-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedIntern(fullName)}
                      >
                        <div className="row-title">{entry.intern}</div>
                        <p>{entry.focus}</p>
                        <div className="agenda-meta">
                          <span>{entry.meetings} meetings</span>
                          <span>{entry.tasks} tasks</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerTeamPage

