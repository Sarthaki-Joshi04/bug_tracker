const appData = {
  company: {
    name: "TalentForge",
    headline: "Ship faster hiring experiences for engineering teams",
    summary:
      "A frontend-focused command center for reviewing role demand, tracking hiring health, and collecting qualified intern applications."
  },
  metrics: [
    { id: "time-to-screen", label: "Avg. time to screen", value: "36 hrs", change: "+12%" },
    { id: "active-roles", label: "Active engineering roles", value: "08", change: "+3 this week" },
    { id: "offer-rate", label: "Offer acceptance", value: "91%", change: "+7%" },
    { id: "candidate-nps", label: "Candidate satisfaction", value: "4.8/5", change: "Top quartile" }
  ],
  roles: [
    {
      id: "frontend-intern",
      title: "Frontend Developer Intern",
      team: "Product Engineering",
      location: "Bengaluru",
      mode: "Hybrid",
      type: "Internship",
      experience: "0-1 years",
      applicants: 42,
      posted: "2 days ago",
      status: "High priority",
      summary:
        "Build responsive product surfaces with React, Tailwind CSS, and strong attention to interaction details.",
      stack: ["React", "Tailwind", "JavaScript", "REST APIs"],
      outcomes: [
        "Ship reusable UI components across the product",
        "Translate product specs into pixel-accurate responsive layouts",
        "Collaborate with backend developers on API-driven experiences"
      ]
    },
    {
      id: "fullstack-intern",
      title: "Full Stack Developer Intern",
      team: "Platform",
      location: "Remote",
      mode: "Remote",
      type: "Internship",
      experience: "0-1 years",
      applicants: 58,
      posted: "4 days ago",
      status: "Trending",
      summary:
        "Support product delivery across React and Node.js while building internal tools that improve team velocity.",
      stack: ["React", "Node.js", "Express", "PostgreSQL"],
      outcomes: [
        "Own small end-to-end features with mentorship",
        "Build dashboards that connect frontend and API data",
        "Contribute to testing and code review quality"
      ]
    },
    {
      id: "ui-engineer",
      title: "UI Engineer",
      team: "Design Systems",
      location: "Pune",
      mode: "Onsite",
      type: "Full time",
      experience: "1-3 years",
      applicants: 24,
      posted: "1 week ago",
      status: "Open",
      summary:
        "Own the component library, interaction patterns, and motion system used across internal and external products.",
      stack: ["React", "TypeScript", "Accessibility", "Storybook"],
      outcomes: [
        "Standardize component APIs and design tokens",
        "Improve accessibility and consistency across squads",
        "Partner with design on scalable UI primitives"
      ]
    },
    {
      id: "product-analyst",
      title: "Product Data Analyst",
      team: "Operations",
      location: "Mumbai",
      mode: "Hybrid",
      type: "Contract",
      experience: "1-2 years",
      applicants: 19,
      posted: "3 days ago",
      status: "New",
      summary:
        "Turn product and hiring signals into dashboards that influence roadmap, staffing, and pipeline strategy.",
      stack: ["SQL", "Analytics", "Dashboards", "Experimentation"],
      outcomes: [
        "Create weekly reporting for hiring and delivery leads",
        "Track conversion health across the applicant funnel",
        "Surface insights that improve sourcing quality"
      ]
    },
    {
      id: "backend-intern",
      title: "Backend Developer Intern",
      team: "Infrastructure",
      location: "Remote",
      mode: "Remote",
      type: "Internship",
      experience: "0-1 years",
      applicants: 33,
      posted: "5 days ago",
      status: "Open",
      summary:
        "Help build stable APIs, background jobs, and integrations that power customer-facing experiences.",
      stack: ["Node.js", "MongoDB", "Authentication", "Cloud Functions"],
      outcomes: [
        "Contribute API endpoints for internal tools",
        "Improve service performance and observability",
        "Document backend workflows for cross-team usage"
      ]
    },
    {
      id: "qa-automation",
      title: "QA Automation Engineer",
      team: "Quality",
      location: "Chennai",
      mode: "Hybrid",
      type: "Full time",
      experience: "1-2 years",
      applicants: 16,
      posted: "6 days ago",
      status: "Open",
      summary:
        "Design automation coverage for core product workflows and reduce regressions before release.",
      stack: ["Playwright", "API Testing", "CI/CD", "JavaScript"],
      outcomes: [
        "Automate smoke coverage for critical routes",
        "Document release-readiness criteria",
        "Partner with engineers on defect prevention"
      ]
    }
  ],
  activity: [
    { id: "a1", label: "Applications reviewed today", value: 84 },
    { id: "a2", label: "Interviews scheduled", value: 19 },
    { id: "a3", label: "Design handoff completion", value: 96 },
    { id: "a4", label: "Offer pipeline coverage", value: 72 }
  ],
  pipeline: [
    { id: "sourced", label: "Sourced", count: 182, percent: 100 },
    { id: "screened", label: "Screened", count: 124, percent: 68 },
    { id: "interview", label: "Interview", count: 67, percent: 37 },
    { id: "challenge", label: "Challenge", count: 29, percent: 16 },
    { id: "offer", label: "Offer", count: 11, percent: 6 }
  ],
  skills: [
    { id: "react", label: "React", percent: 94 },
    { id: "api", label: "API integration", percent: 88 },
    { id: "tailwind", label: "Tailwind CSS", percent: 83 },
    { id: "node", label: "Node.js", percent: 71 },
    { id: "testing", label: "Testing", percent: 64 }
  ]
};

export default appData;
