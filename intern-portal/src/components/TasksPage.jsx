import TasksPreview from './TasksPreview'
import Tasks from './Tasks'
import Projects from './Projects'

function TasksPage() {
  return (
    <div className="page-content">
      <div className="page-list">
        <div className="page-list-item">
          <TasksPreview />
        </div>
        <div className="page-list-item">
          <Tasks />
        </div>
        <div className="page-list-item">
          <Projects />
        </div>
      </div>
    </div>
  )
}

export default TasksPage

