import { useState, useEffect } from 'react'
import { shouldUseMockData } from '../utils/dataMode'

const DEFAULT_RESOURCE_LIBRARY = [
  { title: 'Intern Handbook v2.1', category: 'Orientation', views: 128, status: 'Published' },
  { title: 'Security Playbook', category: 'Training', views: 84, status: 'Draft' },
  { title: 'Project Pitch Template', category: 'Tools', views: 210, status: 'Published' },
  { title: 'Career Story Cards', category: 'Development', views: 55, status: 'Unpublished' }
]

const DEFAULT_CATEGORIES = ['Orientation', 'Engineering', 'Product', 'Design', 'Leadership', 'Wellness']

const DEFAULT_USAGE_METRICS = [
  { label: 'Total downloads', value: '642', trend: '+18% vs last week' },
  { label: 'Top resource', value: 'Pitch Template', trend: '210 opens' },
  { label: 'Active interns', value: '94%', trend: 'Used at least 1 resource' }
]

function ManagerResourcesPage() {
  const [resourceLibrary, setResourceLibrary] = useState([])
  const [categories, setCategories] = useState([])
  const [usageMetrics, setUsageMetrics] = useState([])

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
      setResourceLibrary([])
      setCategories([])
      setUsageMetrics([])
      return
    }

    // Load resource library
    const storedLibrary = localStorage.getItem('resourceLibrary')
    if (storedLibrary) {
      setResourceLibrary(JSON.parse(storedLibrary))
    } else {
      setResourceLibrary(DEFAULT_RESOURCE_LIBRARY)
    }

    // Load categories
    const storedCategories = localStorage.getItem('categories')
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      setCategories(DEFAULT_CATEGORIES)
    }

    // Load usage metrics
    const storedMetrics = localStorage.getItem('usageMetrics')
    if (storedMetrics) {
      setUsageMetrics(JSON.parse(storedMetrics))
    } else {
      setUsageMetrics(DEFAULT_USAGE_METRICS)
    }
  }
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Upload Resources</h3>
                <p>PDFs, guides, training docs.</p>
              </div>
              <button className="btn btn-primary btn-small">Upload</button>
            </div>
            <div className="upload-dropzone">
              <p>Drag & drop files or click to browse</p>
              <span>Supported: PDF, PPT, DOCX, ZIP, MP4</span>
            </div>
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Organize Resource Library</h3>
                <p>Tag assets by theme.</p>
              </div>
            </div>
            {categories.length === 0 ? (
              <div className="empty-state">No categories available</div>
            ) : (
              <div className="tag-grid">
                {categories.map((category) => (
                  <span key={category} className="tag-pill">{category}</span>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Publish / Unpublish Content</h3>
                <p>Control visibility per resource.</p>
              </div>
            </div>
            {resourceLibrary.length === 0 ? (
              <div className="empty-state">No resources available</div>
            ) : (
              <div className="list-table">
                {resourceLibrary.map((resource) => (
                  <div key={resource.title} className="list-row">
                    <div>
                      <div className="row-title">{resource.title}</div>
                      <div className="row-subtitle">{resource.category} • {resource.views} views</div>
                    </div>
                    <span className={`badge badge-${resource.status === 'Published' ? 'success' : resource.status === 'Draft' ? 'neutral' : 'warning'}`}>
                      {resource.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="page-list-item">
          <section className="card manager-card">
            <div className="manager-card-header">
              <div>
                <h3>Track Intern Resource Usage</h3>
                <p>Signals for what’s resonating.</p>
              </div>
              <button className="btn btn-outline btn-small">Export stats</button>
            </div>
            {usageMetrics.length === 0 ? (
              <div className="empty-state">No usage metrics available</div>
            ) : (
              <div className="stat-grid">
                {usageMetrics.map((metric) => (
                  <div key={metric.label} className="stat-card">
                    <div className="stat-value">{metric.value}</div>
                    <div className="stat-label">{metric.label}</div>
                    <span className="stat-trend">{metric.trend}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagerResourcesPage

