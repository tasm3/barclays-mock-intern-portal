function CareerDevelopment() {
  const mentors = [
    { name: 'Sarah Johnson', role: 'Senior Software Engineer (Tech)' },
    { name: 'Michael Chen', role: 'Product Manager (Product)' },
    { name: 'Emily Rodriguez', role: 'Data Analyst (Analytics)' },
    { name: 'David Thompson', role: 'Engineering Manager (Leadership)' }
  ]

  return (
    <div className="card">
      <div className="card-title">Career Development</div>
      <div className="card-body">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Suggested Mentors
          </h3>
          <ul className="simple-list mentor-list">
            {mentors.map(mentor => (
              <li key={mentor.name} className="mentor-item">
                <div>
                  <strong>{mentor.name}</strong> - {mentor.role}
                </div>
                <button type="button" className="btn btn-outline btn-small mentor-email-btn">
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
            <li>LinkedIn Learning - Access via company portal</li>
            <li>Internal Career Path Navigator</li>
            <li>Skills Assessment Platform</li>
            <li>Resume Builder & Review Service</li>
            <li>Mock Interview Practice Sessions</li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Success Stories
          </h3>
          <ul className="simple-list">
            <li>
              <strong>Alex Martinez</strong> - Started as intern in 2020, now Senior Developer. 
              "The mentorship program was key to my growth."
            </li>
            <li>
              <strong>Jordan Kim</strong> - Intern to Product Manager in 3 years. 
              "Taking on cross-functional projects opened doors."
            </li>
            <li>
              <strong>Taylor Brown</strong> - From intern to team lead. 
              "Networking events helped me find my passion in fintech."
            </li>
          </ul>
        </div>

        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)', 
          marginTop: '1.5rem', 
          padding: '1rem',
          background: 'var(--bg-light)',
          borderRadius: '6px',
          fontStyle: 'italic'
        }}>
          Note: This section will eventually connect to real mentor matching data, 
          personalized career recommendations, and dynamic success stories from the company database.
        </p>
      </div>
    </div>
  )
}

export default CareerDevelopment

