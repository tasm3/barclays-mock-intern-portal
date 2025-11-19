import TodaysAgenda from './TodaysAgenda'
import { RotationTracker } from './InternDashboard'

function HomePage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <RotationTracker />
        </div>
        <div className="page-list-item">
          <TodaysAgenda />
        </div>
      </div>
    </div>
  )
}

export default HomePage

