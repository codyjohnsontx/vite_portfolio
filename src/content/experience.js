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
    tags: ['C#/.NET 8', 'TypeScript', 'Next.js', 'PostgreSQL', 'Selenium'],
  },
  {
    company: 'CTX Motoworks',
    role: 'Assistant General Manager, E-commerce & Digital (Part-time)',
    dates: 'Jul 2025 - May 2026',
    summary:
      'Designed and developed Attend, an internal business application connecting customer messaging, service workflows, follow-up tasks, and management reporting: Twilio SMS behind webhook signature verification, duplicate-message prevention, consent tracking, and access controls, plus AI-assisted workflows that summarize customer conversations, recommend next actions, and rank follow-up work. I worked directly with dealership staff to find the operational problems worth fixing and gather the requirements.',
    evidence: [
      'Designed and developed Attend, an internal business application connecting customer messaging, service workflows, follow-up tasks, and management reporting.',
      'Integrated Twilio SMS services with webhook signature verification, duplicate-message prevention, consent tracking, and access controls.',
      'Built AI-assisted workflows that analyze customer conversations, generate summaries, recommend next actions, and prioritize follow-up work.',
      'Worked directly with dealership staff to identify operational problems, gather requirements, and implement process improvements.',
    ],
    tags: ['Next.js', 'PostgreSQL', 'Twilio', 'OpenAI'],
  },
  {
    company: 'Lambda Curry',
    role: 'Product Owner (Contract, Full-time)',
    dates: 'May 2025 - Feb 2026',
    summary:
      'Managed requirements and delivery coordination for healthcare, consumer, e-commerce, and B2B applications, working directly with stakeholders, developers, and QA: requirements and acceptance criteria, defect investigation, regression testing, and release validation, including the requirements behind a checkout redesign that contributed to a 12% first-week sales increase.',
    evidence: [
      'Managed requirements and delivery coordination for healthcare, consumer, e-commerce, and B2B applications, working directly with stakeholders, developers, and QA teams.',
      'Translated business needs into technical requirements, user stories, acceptance criteria, and implementation documentation.',
      'Participated in application design, defect investigation, regression testing, and release validation.',
      'Defined requirements and success measures for a checkout redesign that contributed to a 12% first-week sales increase.',
    ],
    tags: ['Requirements', 'Defect investigation', 'Release validation'],
  },
];
