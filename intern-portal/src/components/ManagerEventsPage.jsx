const rsvps = [
  { event: 'Networking Mixer', confirmed: 16, pending: 3, waitlist: 2 },
  { event: 'Security Lab', confirmed: 12, pending: 1, waitlist: 0 },
  { event: 'Volunteer Day', confirmed: 20, pending: 5, waitlist: 4 }
]

const attendance = [
  { event: 'React Deep Dive', attendance: '92%', notes: 'Recording shared' },
  { event: 'Manager AMA', attendance: '86%', notes: 'Follow-up Q&A' },
  { event: 'Product Stories', attendance: '74%', notes: 'Need reminders' }
]

const opportunities = [
  { title: 'Shadow: Risk Review Board', type: 'Shadowing', seats: 3, due: 'Nov 20' },
  { title: 'Volunteer: Tech for Good', type: 'Volunteer', seats: 10, due: 'Nov 25' },
  { title: 'Mentor: Customer Advisory Council', type: 'Shadowing', seats: 2, due: 'Dec 2' }
]

function ManagerEventsPage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Create & Manage Events</h3>
                <p>Networking, training, orientation, volunteer.</p>
              </div>
              <button className="btn btn-primary btn-small">Publish event</button>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>RSVPs & Attendance</h3>
                <p>Track confirmations per event.</p>
              </div>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Event Analytics</h3>
                <p>Who joined? What resonated?</p>
              </div>
            </div>
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
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Shadowing & Volunteer Opportunities</h3>
                <p>Publish stretch experiences for interns.</p>
              </div>
              <button className="btn btn-secondary btn-small">Add opportunity</button>
            </div>
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerEventsPage

