/* The resume as a data module. Nothing routes ResumePage, so this renders
   nowhere, and the site publishes no resume file; this is kept in step with
   the master resume by hand. Education follows the resume exactly. */
export const resumeContent = {
  headline: 'Full Stack Software Engineer | C#/.NET | TypeScript | React | SQL',
  summary: [
    'Full-stack software engineer with experience developing business applications, integrating third-party services, and building reliable operational systems using C#/.NET, TypeScript, React, and SQL. Experienced in gathering requirements, designing solutions, implementing APIs, and supporting applications through testing and deployment. Combines hands-on engineering with product ownership and business operations experience, including practical AI integration and workflow automation.',
  ],
  strengths: [
    {
      label: 'Languages & frameworks',
      items: ['C#', '.NET', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'React', 'Next.js', 'Node.js'],
    },
    {
      label: 'Databases & integrations',
      items: ['PostgreSQL', 'SQLite', 'REST APIs', 'Webhooks', 'Stripe', 'Twilio'],
    },
    {
      label: 'AI & automation',
      items: ['LLM APIs', 'RAG', 'AI Workflow Automation'],
    },
    {
      label: 'Testing & development',
      items: ['Vitest', 'Playwright', 'Git', 'CI/CD', 'Docker'],
    },
    {
      label: 'Delivery & collaboration',
      items: [
        'Git',
        'CI/CD',
        'Code Review',
        'Defect Investigation',
        'Regression Testing',
        'Technical Documentation',
        'Requirements and Acceptance Criteria',
        'Jira',
        'Linear',
      ],
    },
  ],
  experience: [
    {
      company: 'Oasis Sim Racing, Diaz Martial Arts, HSNBA',
      role: 'Software Engineer (Freelance)',
      dates: 'April 2024 - Present',
      bullets: [
        'Oasis Sim Racing | Oasis Race Control. TypeScript, Next.js, C#/.NET 8, PostgreSQL, SQLite, REST APIs.',
        'Sole engineer responsible for developing a full-stack racing venue platform integrating C#/.NET Windows applications, backend APIs, relational databases, and live leaderboards.',
        'Built a lightweight C# application that reads simulator telemetry directly from shared memory and transmits lap data to a Next.js application, with minimal impact on simulator performance.',
        'Implemented local SQLite storage, automatic retries, and idempotent event processing to prevent data loss during network outages and application restarts.',
        'Developed a monitoring system with approximately 20 alert rules, Discord notifications, AI-assisted diagnostics, and GitHub issue integration to support remote troubleshooting.',
        'Deployed and supported the system at a two-day event for Cavender Cadillac of San Antonio, where more than 100 guests participated in the racing experience.',
        'Verified application functionality with 373 passing C# xUnit tests and 1,082 TypeScript tests, including database integration and failure-recovery scenarios.',
        'Diaz Martial Arts | Marketing Website. TypeScript, React, Next.js, NestJS, PostgreSQL, Stripe, Mux, Clerk, Expo.',
        "Worked directly with the business owner to gather requirements, design solutions, and develop web and mobile applications supporting the school's operations.",
        'Developed a subscription video platform spanning a React frontend, NestJS backend, and mobile application, integrating authentication, billing, and video delivery through third-party APIs.',
        'Implemented webhook signature verification, duplicate-event prevention, and automated tests covering subscriptions, payment events, account permissions, and video access.',
        "Developed and maintained the school's live website, including responsive interfaces, lead capture, and calendar integration.",
        'Humane Society of New Braunfels Area (HSNBA) | Data Engineering & Automation. Python, SQL, Selenium.',
        "Developed automation tools to streamline administrative workflows, maintain animal records, and correct historical data within the organization's existing management platform.",
        'Implemented data validation, application logging, and error handling to improve reliability and support troubleshooting of automated processes.',
      ],
    },
    {
      company: 'CTX Motoworks',
      role: 'Assistant General Manager, E-commerce & Digital (Part-time)',
      dates: 'July 2025 - May 2026',
      bullets: [
        'Attend | Dealership Operations & Messaging Platform. TypeScript, React, Next.js, PostgreSQL, Prisma, Twilio, OpenAI.',
        'Designed and developed Attend, an internal business application connecting customer messaging, service workflows, follow-up tasks, and management reporting.',
        'Integrated Twilio SMS services with webhook signature verification, duplicate-message prevention, consent tracking, and access controls.',
        'Built AI-assisted workflows that analyze customer conversations, generate summaries, recommend next actions, and prioritize follow-up work.',
        'Worked directly with dealership staff to identify operational problems, gather requirements, and implement process improvements.',
      ],
    },
    {
      company: 'Lambda Curry',
      role: 'Product Owner (Contract, Full-time)',
      dates: 'May 2025 - February 2026',
      bullets: [
        'Managed requirements and delivery coordination for healthcare, consumer, e-commerce, and B2B applications, working directly with stakeholders, developers, and QA teams.',
        'Translated business needs into technical requirements, user stories, acceptance criteria, and implementation documentation.',
        'Participated in application design, defect investigation, regression testing, and release validation.',
        'Defined requirements and success measures for a checkout redesign that contributed to a 12% first-week sales increase.',
      ],
    },
  ],
  selectedProjects: ['Trackday Tuner', 'DragonGlass AI'],
  activeBuilds: [
    'Trackday Tuner: AI-assisted race setup and session platform. TypeScript, React, Next.js, PostgreSQL, Supabase, OpenAI, Stripe. Developed and deployed a full-stack application combining rider session data, relational databases, and AI-generated recommendations; built a retrieval-augmented generation pipeline with input validation, output guardrails, and a 33-case evaluation suite integrated into CI; implemented authentication, database access controls, billing integrations, automated testing, and application health monitoring.',
    'DragonGlass AI: AI-powered Obsidian plugin. TypeScript, Obsidian API, OpenAI, Anthropic, Gemini, Ollama. Developing an open-source AI assistant for Obsidian that searches, reads, and manages notes using local or cloud-based models; built four streaming AI provider integrations with tool calling, shared conversation history, and a cancellable agent loop with input validation and execution limits; implemented approval-based editing with diff reviews, change rejection, and stale-file detection; developed unit tests and validated functionality against a local Ollama model.',
  ],
  credentials: [
    'B.S. Advertising | Texas State University',
    'Coursework: Harvard CS50; Full Stack Open; 100 Devs',
  ],
};
