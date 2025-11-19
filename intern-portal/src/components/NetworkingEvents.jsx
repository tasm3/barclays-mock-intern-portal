import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: 'Welcome Orientation',
    date: '2024-01-15',
    type: 'orientation'
  },
  {
    id: 2,
    title: 'Tech Team Networking Mixer',
    date: '2024-01-20',
    type: 'networking'
  },
  {
    id: 3,
    title: 'React & Modern JavaScript Training',
    date: '2024-01-25',
    type: 'training'
  },
  {
    id: 4,
    title: 'Community Volunteer Day',
    date: '2024-02-01',
    type: 'volunteer'
  },
  {
    id: 5,
    title: 'Leadership Panel Discussion',
    date: '2024-02-10',
    type: 'networking'
  },
  {
    id: 6,
    title: 'Agile Methodology Workshop',
    date: '2024-02-15',
    type: 'training'
  }
]

function NetworkingEvents() {
  const [events, setEvents] = useState([])
  const [rsvps, setRsvps] = useState({})
  const [filter, setFilter] = useState('all')
  const [useMockData, setUseMockData] = useState(shouldUseMockData())

  useEffect(() => {
    loadEvents()
    // Listen for data mode changes
    const handleDataModeChange = () => {
      setUseMockData(shouldUseMockData())
      loadEvents()
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const loadEvents = () => {
    if (!shouldUseMockData()) {
      setEvents([])
      setRsvps({})
      return
    }
    // Initialize events
    const stored = localStorage.getItem('events')
    if (stored) {
      setEvents(JSON.parse(stored))
    } else {
      setEvents(DEFAULT_EVENTS)
      localStorage.setItem('events', JSON.stringify(DEFAULT_EVENTS))
    }

    // Load RSVPs
    const storedRsvps = localStorage.getItem('eventRsvps')
    if (storedRsvps) {
      setRsvps(JSON.parse(storedRsvps))
    } else {
      setRsvps({})
    }
  }

  const toggleRsvp = (eventId) => {
    const updated = { ...rsvps, [eventId]: !rsvps[eventId] }
    setRsvps(updated)
    localStorage.setItem('eventRsvps', JSON.stringify(updated))
  }

  const getFilteredEvents = () => {
    if (filter === 'all') return events
    return events.filter(e => e.type === filter)
  }

  const filteredEvents = getFilteredEvents()

  return (
    <div className="card">
      <div className="card-title">Events</div>
      <div className="card-body">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'networking' ? 'active' : ''}`}
            onClick={() => setFilter('networking')}
          >
            Networking
          </button>
          <button
            className={`filter-btn ${filter === 'training' ? 'active' : ''}`}
            onClick={() => setFilter('training')}
          >
            Training
          </button>
          <button
            className={`filter-btn ${filter === 'orientation' ? 'active' : ''}`}
            onClick={() => setFilter('orientation')}
          >
            Orientation
          </button>
          <button
            className={`filter-btn ${filter === 'volunteer' ? 'active' : ''}`}
            onClick={() => setFilter('volunteer')}
          >
            Volunteer
          </button>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="empty-state">No events available</div>
        ) : (
          <ul className="event-list">
            {filteredEvents.map(event => (
              <li key={event.id} className="event-item">
                <div className="event-header">
                  <div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-meta">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span className={`tag tag-type`}>{event.type}</span>
                    </div>
                  </div>
                  <button
                    className={`btn ${rsvps[event.id] ? 'btn-secondary' : 'btn-primary'} btn-small`}
                    onClick={() => toggleRsvp(event.id)}
                  >
                    {rsvps[event.id] ? 'Going' : 'RSVP'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {useMockData && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Networking Goals
            </h3>
            <ul className="simple-list">
              <li>Attend at least 2 networking events per month</li>
              <li>Connect with 5+ professionals from different teams</li>
              <li>Follow up with new contacts within 48 hours</li>
              <li>Share learnings from events in weekly reflections</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NetworkingEvents

