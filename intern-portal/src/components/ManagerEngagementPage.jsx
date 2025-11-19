import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_RSVPS = [
  { event: 'Networking Mixer', confirmed: 16, pending: 3, waitlist: 2 },
  { event: 'Security Lab', confirmed: 12, pending: 1, waitlist: 0 },
  { event: 'Volunteer Day', confirmed: 20, pending: 5, waitlist: 4 }
]

const DEFAULT_ATTENDANCE = [
  { event: 'React Deep Dive', attendance: '92%', notes: 'Recording shared' },
  { event: 'Manager AMA', attendance: '86%', notes: 'Follow-up Q&A' },
  { event: 'Product Stories', attendance: '74%', notes: 'Need reminders' }
]

const DEFAULT_OPPORTUNITIES = [
  { title: 'Shadow: Risk Review Board', type: 'Shadowing', seats: 3, due: 'Nov 20' },
  { title: 'Volunteer: Tech for Good', type: 'Volunteer', seats: 10, due: 'Nov 25' },
  { title: 'Mentor: Customer Advisory Council', type: 'Shadowing', seats: 2, due: 'Dec 2' }
]

const DEFAULT_CATEGORIES = ['Orientation', 'Engineering', 'Product', 'Design', 'Leadership', 'Wellness']

function ManagerEngagementPage() {
  const [rsvps, setRsvps] = useState([])
  const [attendance, setAttendance] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [categories, setCategories] = useState([])

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
      setRsvps([])
      setAttendance([])
      setOpportunities([])
      setCategories([])
      return
    }

    // Load RSVPs
    const storedRsvps = localStorage.getItem('managerRsvps')
    if (storedRsvps) {
      setRsvps(JSON.parse(storedRsvps))
    } else {
      setRsvps(DEFAULT_RSVPS)
    }

    // Load attendance
    const storedAttendance = localStorage.getItem('attendance')
    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance))
    } else {
      setAttendance(DEFAULT_ATTENDANCE)
    }

    // Load opportunities
    const storedOpportunities = localStorage.getItem('opportunities')
    if (storedOpportunities) {
      setOpportunities(JSON.parse(storedOpportunities))
    } else {
      setOpportunities(DEFAULT_OPPORTUNITIES)
    }

    // Load categories
    const storedCategories = localStorage.getItem('categories')
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      setCategories(DEFAULT_CATEGORIES)
    }
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Create & Manage Events</div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Event name</label>
                  <input className="form-input" placeholder="e.g. Manager Lunch + Learn" />
                </div>
                <div className="form-group">
                  <label className="form-label">Date & time</label>
                  <input className="form-input" placeholder="Dec 12, 2:00 PM" />
                </div>
                <div className="form-group">
                  <label className="form-label">Audience</label>
                  <select className="form-select">
                    <option>Interns</option>
                    <option>Managers</option>
                    <option>All company</option>
                  </select>
                </div>
                <div className="form-group span-2">
                  <label className="form-label">Details</label>
                  <textarea className="form-textarea" placeholder="Share agenda, speakers, goals." />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">RSVPs & Attendance</div>
            <div className="card-body">
              {rsvps.length === 0 ? (
                <div className="empty-state">No RSVP data available</div>
              ) : (
                <div className="list-table">
                  {rsvps.map((event) => (
                    <div key={event.event} className="list-row">
                      <div>
                        <div className="row-title">{event.event}</div>
                        <div className="row-subtitle">
                          Confirmed: {event.confirmed} • Pending: {event.pending}
                        </div>
                      </div>
                      <span className="badge badge-neutral">Waitlist {event.waitlist}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Event Analytics</div>
            <div className="card-body">
              {attendance.length === 0 ? (
                <div className="empty-state">No attendance data available</div>
              ) : (
                <div className="list-table">
                  {attendance.map((item) => (
                    <div key={item.event} className="list-row">
                      <div>
                        <div className="row-title">{item.event}</div>
                        <div className="row-subtitle">{item.notes}</div>
                      </div>
                      <span className="status-pill status-ontrack">{item.attendance}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Shadowing & Volunteer Opportunities</div>
            <div className="card-body">
              {opportunities.length === 0 ? (
                <div className="empty-state">No opportunities available</div>
              ) : (
                <div className="opportunity-grid">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity.title} className="opportunity-card">
                      <div className="opportunity-header">
                        <h4>{opportunity.title}</h4>
                        <span className="badge badge-neutral">{opportunity.type}</span>
                      </div>
                      <div className="opportunity-meta">
                        <span>Seats: {opportunity.seats}</span>
                        <span>Apply by {opportunity.due}</span>
                      </div>
                      <button className="btn btn-outline btn-small">Share with interns</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Upload Resources</div>
            <div className="card-body">
              <div className="upload-dropzone">
                <p>Drag & drop files or click to browse</p>
                <span>Supported: PDF, PPT, DOCX, ZIP, MP4</span>
              </div>
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card">
            <div className="card-title">Organize Resource Library</div>
            <div className="card-body">
              {categories.length === 0 ? (
                <div className="empty-state">No categories available</div>
              ) : (
                <div className="tag-grid">
                  {categories.map((category) => (
                    <span key={category} className="tag-pill">{category}</span>
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

export default ManagerEngagementPage

