import SkillsTracker from './SkillsTracker'
import Goals from './Goals'
import WeeklyReflections from './WeeklyReflections'

function DevelopmentPage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <SkillsTracker />
        </div>
        <div className="page-list-item">
          <Goals />
        </div>
        <div className="page-list-item">
          <WeeklyReflections />
        </div>
      </div>
    </div>
  )
}

export default DevelopmentPage

