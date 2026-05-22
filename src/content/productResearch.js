export const productResearch = [
  {
    slug: 'track-tuner',
    title: 'Track Tuner research system',
    tagline:
      'A persona and prioritization framework for turning trackside setup behavior into a clearer product strategy.',
    summary:
      'The research frames Track Tuner as a product between lightweight lap timers and pro telemetry suites: fast enough for a five-minute paddock window, structured enough to support better setup decisions over time, and trustworthy enough for AI guidance only when the user history can support it.',
    strategicProblem:
      'Track day riders and club drivers are already experimenting with tire pressure, suspension, alignment, and riding or driving line. The gap is not motivation; it is structured memory. Notes apps capture fragments, while pro telemetry tools demand hardware, expertise, and time that many users do not have between sessions.',
    designPhilosophy:
      'The product should feel like a disciplined trackside logbook first and an AI assistant second. Every recommendation needs an evidence trail, every workflow needs to survive sun glare and short turnarounds, and every persona should see a path from simple capture to deeper analysis.',
    proofPoints: ['10 dimensions', '6 archetypes', '1 prioritization model'],
    dimensions: [
      {
        label: 'Experience',
        detail: 'Beginner, developing rider, club racer, coach, engineer, or organizer.',
      },
      {
        label: 'Data maturity',
        detail: 'From memory and photos to structured setup history and telemetry-backed review.',
      },
      {
        label: 'Trust model',
        detail: 'Advice is accepted when it cites personal sessions, known patterns, or coach validation.',
      },
      {
        label: 'Decision window',
        detail: 'Some users decide in the paddock, others during post-event review or coaching debrief.',
      },
      {
        label: 'Primary object',
        detail: 'Bike, car, rider, driver, session, setup change, lap behavior, or team event.',
      },
      {
        label: 'Motivation',
        detail: 'Confidence, progression, competitive edge, client outcomes, or event consistency.',
      },
      {
        label: 'Friction',
        detail: 'Gloves, heat, noise, low signal, cognitive load, and fear of entering data wrong.',
      },
      {
        label: 'Sharing',
        detail: 'Private logs, coach handoff, peer comparison, garage collaboration, or organizer review.',
      },
      {
        label: 'Monetization fit',
        detail: 'Free logging, Pro analysis, coach tools, team workspace, or event operations layer.',
      },
      {
        label: 'Retention loop',
        detail: 'Return value increases when each new session makes the next recommendation sharper.',
      },
    ],
    archetypes: [
      {
        name: 'Progression Addict',
        segment: 'Amateur',
        summary:
          'A committed track-day regular trying to turn every session into visible skill and setup progress.',
        goals: ['Find what changed lap behavior', 'Avoid repeating bad setup choices'],
        painPoints: ['Notes are scattered across apps and photos', 'Hard to know if a change actually helped'],
        opportunities: ['Compare-with-previous as the daily wedge', 'AI that explains setup deltas in plain language'],
        featurePriorities: ['Session diff', 'Setup timeline', 'Race Engineer'],
        jtbd:
          'When I come off track, I want to understand what changed and choose the next adjustment before the next session starts.',
        productMeaning: 'Track Tuner becomes the memory system for steady improvement.',
      },
      {
        name: 'First-Track Learner',
        segment: 'Beginner',
        summary:
          'A newer rider or driver who needs confidence, simple defaults, and guardrails more than deep analysis.',
        goals: ['Capture the basics correctly', 'Avoid unsafe or overconfident recommendations'],
        painPoints: ['Does not know which settings matter yet', 'Setup language can feel intimidating'],
        opportunities: ['Guided logging templates', 'Safety-first explanations and refusal behavior'],
        featurePriorities: ['Guided setup capture', 'Trackside checklist', 'Plain-language AI'],
        jtbd:
          'When I am learning the rhythm of a track day, I need the app to tell me what is worth writing down.',
        productMeaning: 'Track Tuner is a confidence layer that reduces overwhelm.',
      },
      {
        name: 'Data-Driven Amateur',
        segment: 'Amateur',
        summary:
          'A technically curious user who wants structured evidence without buying into a pro telemetry stack.',
        goals: ['Correlate setup, conditions, and session outcome', 'Build a personal data history'],
        painPoints: ['Spreadsheets are flexible but slow', 'Telemetry tools are too heavy for the use case'],
        opportunities: ['CSV export', 'Structured tags', 'Multi-session compare'],
        featurePriorities: ['Advanced comparison', 'Charts', 'Export'],
        jtbd:
          'When I review a weekend, I want to see the pattern instead of rereading disconnected notes.',
        productMeaning: 'Track Tuner is a lightweight analytics layer.',
      },
      {
        name: 'Garage Engineer',
        segment: 'Engineer',
        summary:
          'A setup-minded tuner helping one or more riders make disciplined changes across a weekend.',
        goals: ['Keep setup changes consistent', 'Separate rider feedback from mechanical changes'],
        painPoints: ['Context gets lost between sessions', 'Multiple vehicles create messy handoffs'],
        opportunities: ['Vehicle profiles', 'Change history', 'Mechanic-friendly notes'],
        featurePriorities: ['Setup modules', 'Garage history', 'Team notes'],
        jtbd:
          'When a rider reports a symptom, I need to see the exact setup state before recommending a change.',
        productMeaning: 'Track Tuner is a shared source of setup truth.',
      },
      {
        name: 'Social Competitor',
        segment: 'Social',
        summary:
          'A rider or driver who learns from peers but still wants privacy and control over what gets shared.',
        goals: ['Compare progress with trusted friends', 'Share wins without exposing every setup detail'],
        painPoints: ['Forums are noisy', 'Public advice lacks context'],
        opportunities: ['Selective session sharing', 'Private groups', 'Progress snapshots'],
        featurePriorities: ['Shareable summaries', 'Private groups', 'Leader context'],
        jtbd:
          'When I talk with paddock friends, I want to share the useful lesson without dumping my whole logbook.',
        productMeaning: 'Track Tuner is a controlled collaboration surface.',
      },
      {
        name: 'Coach Operator',
        segment: 'Coach',
        summary:
          'A coach or organizer who needs consistent evidence across many students, vehicles, and sessions.',
        goals: ['Spot patterns across clients', 'Validate coaching interventions'],
        painPoints: ['Students bring inconsistent notes', 'Event feedback disappears after the day ends'],
        opportunities: ['Coach view', 'Student handoff', 'Event-level templates'],
        featurePriorities: ['Coach dashboard', 'Student reports', 'Organizer templates'],
        jtbd:
          'When I review a student, I need enough context to connect feedback, setup, and next drill.',
        productMeaning: 'Track Tuner becomes an operating layer for instruction.',
      },
    ],
    matrix: {
      personas: ['Beginner', 'Amateur', 'Engineer', 'Social', 'Coach', 'Organizer'],
      features: [
        {
          label: 'Guided session logging',
          values: ['High', 'High', 'Medium', 'Medium', 'High', 'Medium'],
        },
        {
          label: 'Compare with previous',
          values: ['Medium', 'High', 'High', 'Medium', 'High', 'Low'],
        },
        {
          label: 'Race Engineer AI',
          values: ['Medium', 'High', 'High', 'Medium', 'High', 'Low'],
        },
        {
          label: 'CSV export and charts',
          values: ['Low', 'Medium', 'High', 'Low', 'Medium', 'Medium'],
        },
        {
          label: 'Selective sharing',
          values: ['Low', 'Medium', 'Medium', 'High', 'High', 'Medium'],
        },
        {
          label: 'Coach or event workspace',
          values: ['Low', 'Low', 'Medium', 'Medium', 'High', 'High'],
        },
      ],
    },
    strategicInsights: [
      {
        title: 'The wedge is memory before intelligence',
        detail:
          'The app earns trust by making structured logging easier than Notes before asking users to believe advanced recommendations.',
      },
      {
        title: 'AI trust depends on visible grounding',
        detail:
          'Race Engineer should cite loaded sessions, ask follow-up questions, or refuse when personal evidence is missing.',
      },
      {
        title: 'Progression Addict is the default launch segment',
        detail:
          'This user has enough frequency, motivation, and frustration to validate retention before heavier coach or team tooling.',
      },
      {
        title: 'Setup intelligence should compound',
        detail:
          'Every logged session should make future comparisons and recommendations more useful, creating a retention loop.',
      },
      {
        title: 'Social features are a later layer',
        detail:
          'Sharing can amplify learning, but premature feeds would distract from the core setup decision loop.',
      },
    ],
    researchSystem: {
      interviewAreas: [
        'How riders and drivers currently record setup changes between sessions.',
        'What evidence makes a recommendation feel trustworthy or unsafe.',
        'Which settings users understand today versus which ones need guided capture.',
        'How coaches, mechanics, and peers participate in the decision loop.',
        'Where users would pay: logging, AI analysis, export, coaching, or team workflow.',
      ],
      validationQuestions: [
        'Can users create a useful first session in under one minute?',
        'Does compare-with-previous answer the most common trackside question?',
        'Do users trust AI more when it shows the session evidence behind an answer?',
        'Which persona segments return after the second track day?',
      ],
    },
  },
];

export function getProductResearchBySlug(slug) {
  return productResearch.find((research) => research.slug === slug);
}
