# Barclays Intern Portal

A fully polished React application for managing intern activities, tasks, projects, and career development.

## Features

### Intern Dashboard
- **Today's Agenda**: Quick view of today's tasks
- **To-Do / Tasks**: Full task management with filtering, priorities, and project linking
- **Projects & Deadlines**: Project tracking with task progress integration
- **Skills Tracker**: Track skill levels (0-5) with completion milestones
- **Weekly Reflections**: Journal entries with date-based history
- **Goals**: Personal and team goals with progress tracking
- **Networking & Events**: Event listings with RSVP functionality
- **Career Development**: Mentors, tools, and success stories
- **Onboarding Progress**: Checklist of onboarding tasks
- **Rotation Role Tracker**: Current and upcoming rotations
- **Resources & Opportunities**: Access to company resources
- **Feedback from Manager**: View manager feedback

### Manager Dashboard
- **Intern Overview**: Summary of intern statistics
- **Tasks & Project Tracking**: Monitor intern project progress
- **Rotation Planning**: Plan and manage rotations
- **Feedback & Reviews**: Submit and track feedback
- **Events, Trainings & Orientation**: Manage events
- **Resources Library**: Upload and manage resources

## Tech Stack

- **Vite** - Build tool and dev server
- **React 18** - UI library
- **JavaScript** - Programming language
- **localStorage** - Data persistence

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Usage

### Login
- Click "Log in as Intern" to access the intern dashboard
- Click "Log in as Manager" to access the manager dashboard
- Note: This is a mock login system for demonstration

### Data Persistence
All data (tasks, projects, skills, reflections, goals, onboarding, events) is stored in your browser's localStorage. Data persists between sessions but is specific to your browser.

## Project Structure

```
intern-portal/
├── src/
│   ├── components/
│   │   ├── LoginScreen.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── TasksPreview.jsx
│   │   ├── Tasks.jsx
│   │   ├── Projects.jsx
│   │   ├── SkillsTracker.jsx
│   │   ├── WeeklyReflections.jsx
│   │   ├── Goals.jsx
│   │   ├── NetworkingEvents.jsx
│   │   ├── CareerDevelopment.jsx
│   │   ├── OnboardingProgress.jsx
│   │   ├── InternDashboard.jsx
│   │   └── ManagerDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Design System

The app uses a Barclays-inspired design system:
- **Primary Blue**: #00b8f4
- **Deep Blue**: #028bc2
- **Text**: Dark navy (#0f172a)
- **Muted Text**: Gray-blue (#64748b)
- **Borders**: Light blue/gray (#dbeafe)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This is a demonstration project.

