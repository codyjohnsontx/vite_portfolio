/* Order follows the resume: the freelance engineering work first, then the two
   roles that ran alongside it. Only company, role, dates, summary and tags
   render (HomePage.jsx); `evidence` is kept as the resume's own bullets. */
export const experience = [
  {
    company: 'Oasis Sim Racing · Diaz Martial Arts · HSNBA',
    role: 'Software Engineer (Freelance)',
    dates: 'Apr 2024 - Present',
    summary:
      'Sole engineer on Oasis Race Control, a racing venue platform that joins a C#/.NET 8 Windows agent reading simulator telemetry from shared memory to a Next.js app, PostgreSQL, and live leaderboards, deployed at a two-day event for Cavender Cadillac of San Antonio where more than 100 guests drove. For Diaz Martial Arts, a subscription video platform across a React web app, a NestJS API, and a mobile app, plus the school’s live website. For HSNBA, Selenium automation that corrects records inside the shelter’s management platform.',
    evidence: [
      'Sole engineer responsible for developing a full-stack racing venue platform integrating C#/.NET Windows applications, backend APIs, relational databases, and live leaderboards.',
      'Built a lightweight C# application that reads simulator telemetry directly from shared memory and transmits lap data to a Next.js application, with minimal impact on simulator performance.',
      'Implemented local SQLite storage, automatic retries, and idempotent event processing to prevent data loss during network outages and application restarts.',
      'Developed a monitoring system with approximately 20 alert rules, Discord notifications, AI-assisted diagnostics, and GitHub issue integration to support remote troubleshooting.',
      'Deployed and supported the system at a two-day event for Cavender Cadillac of San Antonio, where more than 100 guests participated in the racing experience.',
      'Verified application functionality with 373 passing C# xUnit tests and 1,082 TypeScript tests, including database integration and failure-recovery scenarios.',
      'Worked directly with the Diaz Martial Arts owner to gather requirements, design solutions, and develop web and mobile applications supporting the school’s operations.',
      'Developed a subscription video platform spanning a React frontend, NestJS backend, and mobile application, integrating authentication, billing, and video delivery through third-party APIs.',
      'Implemented webhook signature verification, duplicate-event prevention, and automated tests covering subscriptions, payment events, account permissions, and video access.',
      'Developed and maintained the school’s live website, including responsive interfaces, lead capture, and calendar integration.',
      'Developed automation tools for the Humane Society of New Braunfels Area to streamline administrative workflows, maintain animal records, and correct historical data within the organization’s existing management platform.',
      'Implemented data validation, application logging, and error handling to improve reliability and support troubleshooting of automated processes.',
    ],
    tags: ['C#/.NET 8', 'Next.js', 'PostgreSQL', 'Selenium'],
  },
  {
    company: 'CTX Motoworks',
    role: 'Assistant General Manager (Part-time, Operations & E-commerce)',
    dates: 'Jul 2025 - May 2026',
    summary:
      'Owned service, inventory, customer communication, repair tracking, and billing workflows in a high-volume motorcycle dealership, watching repair status, queue age, and service capacity to find the problems worth investigating. I also defined the internal dealership platform that became Attend.',
    evidence: [
      'Monitored repair status, vehicle readiness, queue age, service capacity, and operational bottlenecks to identify issues requiring investigation or corrective action.',
      'Analyzed service capacity, aging work, revenue trends, and throughput to prioritize workflow and staffing changes, contributing to a $90,000 service revenue increase in one month.',
      'Investigated recurring service and workflow problems, documented findings, and coordinated resolution across technicians, service advisors, parts staff, and management.',
      'Gathered feedback across sales, service, parts, customers, and leadership to identify workflow failures, clarify ownership, and define process improvements.',
      'Defined product direction and requirements for an internal dealership platform connecting customer messaging, service workflows, payments, inventory, task ownership, and management reporting.',
    ],
    tags: ['Operations', 'Issue investigation', 'Throughput data'],
  },
  {
    company: 'Lambda Curry',
    role: 'Product Owner (Contract, Full-time)',
    dates: 'May 2025 - Feb 2026',
    summary:
      'Guided multiple software products across consumer, e-commerce, B2B, and healthcare domains through requirements definition, development, testing, release, and iteration.',
    evidence: [
      'Partnered with engineering and QA to reproduce issues, compare expected and actual behavior, identify edge cases, assess impact, and validate completed changes.',
      'Triaged defects by confirming reproduction conditions, documenting observed behavior, assessing severity and business impact, and coordinating resolution.',
      'Translated business goals, user behavior, product data, and stakeholder feedback into technical requirements, user stories, acceptance criteria, and prioritized work.',
      'Wrote PRDs for higher-risk features documenting workflows, dependencies, failure conditions, edge cases, validation criteria, and success metrics.',
      'Defined requirements and success criteria for a checkout redesign that contributed to a 12 percent first-week sales lift.',
      'Used behavioral data, conversion trends, and retention patterns to prioritize fixes and product improvements, driving 10-25 percent retention improvement across a multi-product platform.',
    ],
    tags: ['Requirements', 'Defect triage', 'Release validation'],
  },
];
