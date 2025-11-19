// Mock data initialization for Barclays Intern Portal
// Manager: Bruce Wayne
// Main Intern: Richard Grayson (Dick Grayson)
// Other Interns: Jason Todd, Tim Drake, Damian Wayne, Stephanie Brown

export function initializeMockData(userType = 'intern') {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const twoWeeks = new Date(today)
  twoWeeks.setDate(twoWeeks.getDate() + 14)
  const nextMonth = new Date(today)
  nextMonth.setMonth(nextMonth.getMonth() + 1)

  const formatDate = (date) => date.toISOString().split('T')[0]

  if (userType === 'intern') {
    // Richard Grayson's Intern Data
    initializeInternData(today, formatDate)
  } else if (userType === 'manager') {
    // Bruce Wayne's Manager Data
    initializeManagerData(today, formatDate)
  }
}

function initializeInternData(today, formatDate) {
  // Projects for Richard Grayson
  const projects = [
    {
      id: 1,
      title: 'Portfolio Risk Analysis Dashboard',
      deadline: formatDate(new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      notes: 'Build a comprehensive dashboard for analyzing portfolio risk metrics, VaR calculations, and exposure limits. Working with the Risk Management team to visualize credit risk, market risk, and operational risk data. Critical for regulatory reporting.',
      status: 'in_progress'
    },
    {
      id: 2,
      title: 'Regulatory Compliance Reporting Automation',
      deadline: formatDate(new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      notes: 'Automate MiFID II and GDPR compliance reporting processes. Integrating with trading systems to generate required regulatory submissions. Working closely with Compliance and Legal teams.',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Client Onboarding KYC Workflow Enhancement',
      deadline: formatDate(new Date(today.getTime() + 35 * 24 * 60 * 60 * 1000)),
      priority: 'medium',
      notes: 'Streamline Know Your Customer (KYC) verification process for new wealth management clients. Reducing onboarding time while maintaining regulatory compliance standards.',
      status: 'not_started'
    },
    {
      id: 4,
      title: 'FX Trading Analytics & P&L Reporting Tool',
      deadline: formatDate(new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000)),
      priority: 'medium',
      notes: 'Develop real-time profit & loss reporting tool for foreign exchange trading desk. Tracking positions, exposures, and daily P&L across multiple currency pairs.',
      status: 'in_progress'
    }
  ]

  // Tasks for Richard Grayson
  const tasks = [
    {
      id: 1,
      text: 'Update VaR calculations in risk dashboard for Q2 reporting',
      due: formatDate(today),
      priority: 'high',
      completed: false,
      projectId: 1
    },
    {
      id: 2,
      text: 'Validate MiFID II transaction reporting data accuracy',
      due: formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      completed: false,
      projectId: 2
    },
    {
      id: 3,
      text: 'Attend 1:1 with Bruce Wayne (Manager) - Review portfolio analysis',
      due: formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      completed: false,
      projectId: null
    },
    {
      id: 4,
      text: 'Research KYC regulatory requirements for new jurisdictions',
      due: formatDate(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)),
      priority: 'medium',
      completed: false,
      projectId: 3
    },
    {
      id: 5,
      text: 'Review FX position data from Tim Drake for P&L reconciliation',
      due: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)),
      priority: 'medium',
      completed: false,
      projectId: 4
    },
    {
      id: 6,
      text: 'Complete Financial Conduct Authority (FCA) compliance training',
      due: formatDate(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      completed: false,
      projectId: null
    },
    {
      id: 7,
      text: 'Document risk methodology changes in compliance portal',
      due: formatDate(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)),
      priority: 'low',
      completed: true,
      projectId: 1
    },
    {
      id: 8,
      text: 'Prepare risk dashboard demo for Risk Committee meeting',
      due: formatDate(today),
      priority: 'medium',
      completed: false,
      projectId: null
    },
    {
      id: 9,
      text: 'Collaborate with Jason Todd on regulatory data validation',
      due: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)),
      priority: 'medium',
      completed: false,
      projectId: 2
    },
    {
      id: 10,
      text: 'Attend trading floor shadow session with FX desk',
      due: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)),
      priority: 'high',
      completed: false,
      projectId: null
    }
  ]

  // Events for Richard Grayson
  const events = [
    {
      id: 1,
      title: 'Barclays Finance Intern Welcome Reception',
      date: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)),
      type: 'networking',
      time: '17:00'
    },
    {
      id: 2,
      title: 'Financial Markets & Derivatives Training',
      date: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)),
      type: 'training',
      time: '10:00'
    },
    {
      id: 3,
      title: 'Trading Floor Tour & Shadow Session',
      date: formatDate(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000)),
      type: 'orientation',
      time: '14:00'
    },
    {
      id: 4,
      title: 'Investment Banking Panel: Career Paths in Finance',
      date: formatDate(new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000)),
      type: 'networking',
      time: '16:00'
    },
    {
      id: 5,
      title: 'Risk Management & Regulatory Compliance Workshop',
      date: formatDate(new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000)),
      type: 'training',
      time: '09:00'
    },
    {
      id: 6,
      title: 'Barclays Financial Literacy Volunteer Day',
      date: formatDate(new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)),
      type: 'volunteer',
      time: '10:00'
    },
    {
      id: 7,
      title: 'Mentorship Coffee Chat with Senior Analyst',
      date: formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)),
      type: 'networking',
      time: '15:00'
    }
  ]

  // Onboarding tasks
  const onboardingTasks = [
    { id: 1, label: 'Complete HR paperwork & background check', completed: true },
    { id: 2, label: 'Read Barclays intern handbook', completed: true },
    { id: 3, label: 'FCA compliance training (MiFID II, GDPR, Market Abuse Regulation)', completed: false },
    { id: 4, label: '1:1 with manager (Bruce Wayne)', completed: false },
    { id: 5, label: 'Set up Bloomberg Terminal access & trading systems', completed: true },
    { id: 6, label: 'Attend welcome orientation', completed: true },
    { id: 7, label: 'Complete financial markets security & confidentiality training', completed: false },
    { id: 8, label: 'Join team Slack channels & Microsoft Teams', completed: true },
    { id: 9, label: 'Access Barclays internal systems (Risk Portal, Compliance Dashboard)', completed: true },
    { id: 10, label: 'Shadow senior analyst on portfolio review session', completed: false },
    { id: 11, label: 'Complete financial services regulations training (FCA, PRA)', completed: false },
    { id: 12, label: 'Set up access to market data feeds & risk analytics tools', completed: true }
  ]

  // Training schedule
  const trainingSchedule = [
    { taskId: 3, date: formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)) },
    { taskId: 4, date: formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)) },
    { taskId: 6, date: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)) },
    { taskId: 7, date: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)) },
    { taskId: 10, date: formatDate(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)) },
    { taskId: 11, date: formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) }
  ]

  // Goals for Richard Grayson
  const goals = [
    {
      id: 1,
      text: 'Master financial risk metrics (VaR, stress testing, scenario analysis)',
      deadline: formatDate(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 2,
      text: 'Complete 4 major finance projects during internship',
      deadline: formatDate(new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 3,
      text: 'Network with 15+ professionals across trading, risk, and compliance teams',
      deadline: formatDate(new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 4,
      text: 'Obtain Bloomberg Market Concepts (BMC) certification',
      deadline: formatDate(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 5,
      text: 'Present portfolio risk analysis dashboard at Risk Committee meeting',
      deadline: formatDate(new Date(today.getTime() + 50 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 6,
      text: 'Complete FCA regulatory training and compliance certifications',
      deadline: formatDate(new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000)),
      completed: false
    },
    {
      id: 7,
      text: 'Mentor other interns (Jason, Tim, Damian) on financial analysis techniques',
      deadline: formatDate(new Date(today.getTime() + 75 * 24 * 60 * 60 * 1000)),
      completed: false
    }
  ]

  // Event RSVPs
  const eventRsvps = {
    1: true, // Attending welcome reception
    2: true, // Attending financial markets training
    3: true, // Attending trading floor tour
    7: false // Not yet RSVP'd for coffee chat
  }

  // Rotation/Role information
  const rotationInfo = {
    currentRole: 'Finance Intern - Risk Analytics & Portfolio Management',
    nextRotation: {
      role: 'Trading Desk - FX & Derivatives',
      startDate: formatDate(new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)) // ~2 months
    },
    pastRotation: {
      role: 'Investment Banking - M&A Advisory',
      endDate: formatDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)) // ~1 month ago
    },
    manager: 'Bruce Wayne',
    team: 'Risk Management & Regulatory Compliance'
  }

  // Resources list
  const resources = [
    'Barclays Intern Handbook & Code of Conduct',
    'Intern FAQ & Support Portal',
    'Shadowing & Volunteer Sign-ups',
    'Barclays Learning Platform (Financial Markets Courses)',
    'Bloomberg Terminal Training & Certification',
    'Risk Management Methodology & Best Practices',
    'FCA Regulatory Compliance Training Materials',
    'Career Development Resources - Finance Pathways',
    'Internal Finance Blog & Market Analysis Reports',
    'Trading Floor Shadowing Opportunities'
  ]

  // Feedback entries
  const feedbackEntries = [
    {
      id: 1,
      date: formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)),
      text: "Richard, your portfolio risk analysis dashboard is exceptional. Your understanding of VaR calculations and stress testing scenarios shows real analytical maturity. Your collaboration with Jason on the regulatory compliance reporting has been seamless. The risk metrics you've implemented are accurate and well-documented. Continue taking initiative and mentoring the other interns. Your leadership potential is evident. Let's discuss your career goals in finance in our next 1:1. Outstanding work. - Bruce",
      type: 'regular'
    },
    {
      id: 2,
      date: formatDate(new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000)),
      text: "Your financial analysis skills are solid, and I appreciate how you're pushing yourself to understand complex derivatives and market risk. The MiFID II compliance automation you're building will benefit the entire team. Your communication skills are strong - you ask the right questions about regulatory requirements and aren't afraid to challenge assumptions. Keep up this momentum and continue seeking feedback from senior analysts. You're on track for a successful internship.",
      type: 'regular'
    },
    {
      id: 3,
      date: formatDate(new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000)),
      text: "Richard demonstrates strong analytical skills, excellent problem-solving abilities, and natural leadership. He's taken on complex finance projects and delivered quality results. His ability to work independently while also being a team player makes him a valuable asset. Areas for growth: Continue expanding knowledge of financial markets and take on more cross-functional collaboration with trading and compliance teams.",
      type: 'mid-review',
      rating: 5,
      nextReviewDate: formatDate(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000))
    }
  ]

  // Team members
  const teamMembers = [
    { name: 'Bruce Wayne', role: 'Manager', team: 'Risk Management & Regulatory Compliance', email: 'bruce.wayne@barclays.com' },
    { name: 'Barbara Gordon', role: 'Mentor', team: 'Compliance & Regulatory Affairs', email: 'barbara.gordon@barclays.com' },
    { name: 'Jason Todd', role: 'Peer Intern', team: 'Trading Desk - Fixed Income', email: 'jason.todd@barclays.com' },
    { name: 'Tim Drake', role: 'Peer Intern', team: 'Investment Banking - M&A', email: 'tim.drake@barclays.com' }
  ]

  // Save to localStorage
  localStorage.setItem('projects', JSON.stringify(projects))
  localStorage.setItem('tasks', JSON.stringify(tasks))
  localStorage.setItem('events', JSON.stringify(events))
  localStorage.setItem('onboardingTasks', JSON.stringify(onboardingTasks))
  localStorage.setItem('trainingSchedule', JSON.stringify(trainingSchedule))
  localStorage.setItem('goals', JSON.stringify(goals))
  localStorage.setItem('eventRsvps', JSON.stringify(eventRsvps))
  localStorage.setItem('rotationInfo', JSON.stringify(rotationInfo))
  localStorage.setItem('resources', JSON.stringify(resources))
  localStorage.setItem('feedbackEntries', JSON.stringify(feedbackEntries))
  localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
  localStorage.setItem('internName', 'Richard Grayson')
  localStorage.setItem('mockDataInitialized', 'true')
}

function initializeManagerData(today, formatDate) {
  // For manager view, we'll populate data about interns they manage
  // Bruce Wayne manages all the Robins
  
  // Manager can see all events
  const events = [
    {
      id: 1,
      title: 'Barclays Finance Intern Welcome Reception',
      date: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)),
      type: 'networking',
      time: '17:00'
    },
    {
      id: 2,
      title: 'Financial Markets & Derivatives Training',
      date: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)),
      type: 'training',
      time: '10:00'
    },
    {
      id: 3,
      title: 'Manager 1:1 Training Session - Risk Management',
      date: formatDate(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)),
      type: 'training',
      time: '14:00'
    },
    {
      id: 4,
      title: 'Intern Performance Review Meeting',
      date: formatDate(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
      type: 'orientation',
      time: '11:00'
    },
    {
      id: 5,
      title: 'Risk Management & Regulatory Compliance Workshop',
      date: formatDate(new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000)),
      type: 'training',
      time: '09:00'
    },
    {
      id: 6,
      title: 'Barclays Financial Literacy Volunteer Day',
      date: formatDate(new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)),
      type: 'volunteer',
      time: '10:00'
    }
  ]

  // Manager engagement data
  const managerRsvps = [
    { event: 'Finance Welcome Reception', confirmed: 16, pending: 3, waitlist: 2 },
    { event: 'Trading Floor Shadow Session', confirmed: 12, pending: 1, waitlist: 0 },
    { event: 'Financial Literacy Volunteer Day', confirmed: 20, pending: 5, waitlist: 4 }
  ]

  const attendance = [
    { event: 'Financial Markets Training', attendance: '92%', notes: 'Recording shared' },
    { event: 'Manager AMA - Finance Careers', attendance: '86%', notes: 'Follow-up Q&A' },
    { event: 'Risk Management Workshop', attendance: '74%', notes: 'Need reminders' }
  ]

  const opportunities = [
    { title: 'Shadow: Risk Review Board Meeting', type: 'Shadowing', seats: 3, due: formatDate(new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)) },
    { title: 'Volunteer: Financial Literacy Program', type: 'Volunteer', seats: 10, due: formatDate(new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000)) },
    { title: 'Shadow: Trading Desk - FX Operations', type: 'Shadowing', seats: 2, due: formatDate(new Date(today.getTime() + 32 * 24 * 60 * 60 * 1000)) }
  ]

  const resourceLibrary = [
    { title: 'Intern Handbook v2.1', category: 'Orientation', views: 128, status: 'Published' },
    { title: 'FCA Compliance Guide', category: 'Training', views: 84, status: 'Draft' },
    { title: 'Risk Analysis Template', category: 'Tools', views: 210, status: 'Published' },
    { title: 'Finance Career Pathways', category: 'Development', views: 55, status: 'Unpublished' }
  ]

  const categories = ['Orientation', 'Risk Management', 'Trading', 'Compliance', 'Leadership', 'Wellness']

  const usageMetrics = [
    { label: 'Total downloads', value: '642', trend: '+18% vs last week' },
    { label: 'Top resource', value: 'Risk Analysis Template', trend: '210 opens' },
    { label: 'Active interns', value: '94%', trend: 'Used at least 1 resource' }
  ]

  // Manager feedback data
  const feedbackTemplates = [
    { type: 'Task', label: 'Task performance', description: 'Quick pulse on delivery quality', scope: 'Single deliverable' },
    { type: 'Project', label: 'Project milestone', description: 'Capture outcomes vs goals', scope: 'Multi-week' },
    { type: 'Skill', label: 'Skill growth', description: 'Track readiness for promotion', scope: 'Rotation-long' }
  ]

  const feedbackLog = [
    { intern: 'Richard', focus: 'Risk dashboard', rating: '🔥 Exceeds', notes: 'Leading portfolio analysis' },
    { intern: 'Jason', focus: 'FX trading analytics', rating: '⚠ Needs support', notes: 'Pair with Tim on P&L' },
    { intern: 'Stephanie', focus: 'Client onboarding KYC', rating: '✅ Strong', notes: 'Ready to present to Risk Committee' }
  ]

  const cohortTrends = [
    { label: 'Avg score', value: '4.6 / 5', detail: '+0.2 WoW' },
    { label: 'Engagement', value: '91%', detail: 'Submitted reflections' },
    { label: 'Feedback SLAs', value: '88%', detail: 'Completed on time' }
  ]

  const oneOnOnes = [
    { intern: 'Richard', date: formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)), time: '14:00', agenda: 'Risk dashboard demo prep, portfolio analysis review' },
    { intern: 'Jason', date: formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)), time: '11:00', agenda: 'FX trading analytics scope, regulatory requirements' },
    { intern: 'Damian', date: formatDate(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)), time: '10:00', agenda: 'Compliance reporting handoff, FCA training' }
  ]

  // Manager overview data
  const overviewStats = [
    { label: 'Total interns', value: 18, trend: '+2 new this week' },
    { label: 'Active rotations', value: 6, trend: '3 ending next week' },
    { label: 'Feedback pending', value: 5, trend: '2 due today' },
    { label: 'Agenda coverage', value: '94%', trend: 'Synced with managers' }
  ]

  const assignments = [
    { intern: 'Richard Grayson', role: 'Risk Analytics Lead', team: 'Risk Management', status: 'On track' },
    { intern: 'Damian Wayne', role: 'Compliance Reporting', team: 'Regulatory Affairs', status: 'Stretch goal' },
    { intern: 'Tim Drake', role: 'FX Trading Analytics', team: 'Trading Desk', status: 'On track' },
    { intern: 'Stephanie Brown', role: 'Client Onboarding KYC', team: 'Wealth Management', status: 'Needs support' }
  ]

  const rotationOverview = {
    upcoming: [
      { intern: 'Jason Todd', nextTeam: 'Trading Desk - Fixed Income', start: formatDate(new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000)) },
      { intern: 'Carrie Kelley', nextTeam: 'Investment Banking - M&A', start: formatDate(new Date(today.getTime() + 16 * 24 * 60 * 60 * 1000)) }
    ],
    previous: [
      { intern: 'Harper Row', team: 'Wealth Management', end: formatDate(new Date(today.getTime() - 22 * 24 * 60 * 60 * 1000)) },
      { intern: 'Duke Thomas', team: 'Market Risk Analytics', end: formatDate(new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000)) }
    ]
  }

  // Manager team data
  const directory = [
    { intern: 'Richard Grayson', manager: 'Bruce Wayne', mentor: 'Barbara Gordon' },
    { intern: 'Stephanie Brown', manager: 'Leslie Thompkins', mentor: 'Selina Kyle' },
    { intern: 'Damian Wayne', manager: 'Lucius Fox', mentor: 'Jason Bard' },
    { intern: 'Tim Drake', manager: 'Bruce Wayne', mentor: 'Kate Kane' }
  ]

  const agendaOverview = [
    { intern: 'Richard', focus: 'Ship Risk dashboard demo for Risk Committee', meetings: 3, tasks: 6 },
    { intern: 'Stephanie', focus: 'KYC workflow client interviews', meetings: 4, tasks: 5 },
    { intern: 'Damian', focus: 'MiFID II compliance reporting pilot', meetings: 2, tasks: 7 }
  ]

  // Save to localStorage
  localStorage.setItem('managerRsvps', JSON.stringify(managerRsvps))
  localStorage.setItem('attendance', JSON.stringify(attendance))
  localStorage.setItem('opportunities', JSON.stringify(opportunities))
  localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibrary))
  localStorage.setItem('categories', JSON.stringify(categories))
  localStorage.setItem('usageMetrics', JSON.stringify(usageMetrics))
  localStorage.setItem('feedbackTemplates', JSON.stringify(feedbackTemplates))
  localStorage.setItem('feedbackLog', JSON.stringify(feedbackLog))
  localStorage.setItem('cohortTrends', JSON.stringify(cohortTrends))
  localStorage.setItem('oneOnOnes', JSON.stringify(oneOnOnes))
  localStorage.setItem('overviewStats', JSON.stringify(overviewStats))
  localStorage.setItem('assignments', JSON.stringify(assignments))
  localStorage.setItem('rotationOverview', JSON.stringify(rotationOverview))
  localStorage.setItem('directory', JSON.stringify(directory))
  localStorage.setItem('agendaOverview', JSON.stringify(agendaOverview))
  
  localStorage.setItem('events', JSON.stringify(events))
  localStorage.setItem('managerName', 'Bruce Wayne')
  localStorage.setItem('mockDataInitialized', 'true')
}

