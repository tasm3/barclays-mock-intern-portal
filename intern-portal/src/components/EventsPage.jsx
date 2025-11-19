import { useState, useEffect } from 'react'
import NetworkingEvents from './NetworkingEvents'
import { shouldUseMockData } from '../utils/dataMode'

const suggestedConnections = [
  { name: 'Sarah Johnson', role: 'Senior Software Engineer (Tech)', email: 'sarah.johnson@barclays.com' },
  { name: 'Michael Chen', role: 'Product Manager (Product)', email: 'michael.chen@barclays.com' },
  { name: 'Emily Rodriguez', role: 'Data Analyst (Analytics)', email: 'emily.rodriguez@barclays.com' },
  { name: 'David Thompson', role: 'Engineering Manager (Leadership)', email: 'david.thompson@barclays.com' }
]

const careerTools = [
  'LinkedIn Learning - Access via company portal',
  'Internal Career Path Navigator',
  'Skills Assessment Platform',
  'Resume Builder & Review Service',
  'Mock Interview Practice Sessions'
]

const successStories = [
  { 
    name: 'Alex Martinez', 
    title: 'Started as intern in 2020, now Senior Developer',
    quote: '"The mentorship program was key to my growth."'
  },
  { 
    name: 'Jordan Kim', 
    title: 'Intern to Product Manager in 3 years',
    quote: '"Taking on cross-functional projects opened doors."'
  },
  { 
    name: 'Taylor Brown', 
    title: 'From intern to team lead',
    quote: '"Networking events helped me find my passion in fintech."'
  }
]

function EventsPage() {
  const [useMockData, setUseMockData] = useState(shouldUseMockData())

  useEffect(() => {
    // Listen for data mode changes
    const handleDataModeChange = () => {
      setUseMockData(shouldUseMockData())
    }
    window.addEventListener('dataModeChanged', handleDataModeChange)
    return () => window.removeEventListener('dataModeChanged', handleDataModeChange)
  }, [])

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <NetworkingEvents />
        </div>

        {useMockData && (
          <div className="page-list-item">
            <section className="card">
              <div className="card-title">Career Development</div>
            <div className="card-body">
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  Suggested Mentors
                </h3>
                <ul className="simple-list mentor-list">
                  {suggestedConnections.map((mentor) => (
                    <li key={mentor.name} className="mentor-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <strong>{mentor.name}</strong> - {mentor.role}
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-outline btn-small"
                        onClick={() => handleEmail(mentor.email)}
                      >
                        Email
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  Career Tools to Try
                </h3>
                <ul className="simple-list">
                  {careerTools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  Success Stories
                </h3>
                {successStories.map((story) => (
                  <div key={story.name} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{story.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{story.title}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontStyle: 'italic' }}>{story.quote}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage

