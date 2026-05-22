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
    headings: {
      problem: 'The opportunity sits between memory and telemetry.',
      dimensions: 'A compact atlas for reading trackside behavior.',
      archetypes: 'The launch segment is selected by frequency and pain.',
      priority: 'A roadmap heatmap by persona value.',
      insights: 'The personas clarify roadmap order and trust boundaries.',
      system: 'What the next interviews should validate.',
    },
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
      caption:
        'Feature prioritization matrix across Beginner, Amateur, Engineer, Social, Coach, and Organizer segments.',
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
  {
    slug: 'ridesense',
    title: 'RideSense research system',
    tagline:
      'A persona and prioritization framework for cyclists who need clearer interpretation across fragmented training data.',
    summary:
      'The research frames RideSense as an interpretation layer, not a coach replacement or social tracker. It helps riders understand what their own ride history says about load, consistency, fatigue, workout mix, and goal alignment while making data confidence visible.',
    strategicProblem:
      'Cyclists already collect data across Strava, TrainerRoad, Garmin, Wahoo, smart trainers, and uploaded files, but the meaning is fragmented. The product opportunity is to unify the activity timeline, deduplicate repeated rides, compute deterministic training signals, and answer questions with evidence instead of generic coaching advice.',
    designPhilosophy:
      'RideSense should feel summary-first, plain-spoken, and evidence-bound. Serious riders need enough metric depth to trust the analysis, while less structured riders need jargon translated into practical training direction without shame, prescription, or overconfidence.',
    proofPoints: ['12 classification lenses', '3 personas', '1 MVP focus'],
    headings: {
      problem: 'The opportunity is interpretation, not another activity log.',
      dimensions: 'The framework classifies riders by behavior and decision need.',
      archetypes: 'The launch segment is selected by data maturity and recurring pain.',
      priority: 'A roadmap heatmap by persona value.',
      insights: 'The personas clarify trust, clarity, and MVP order.',
      system: 'What the next interviews should validate.',
    },
    dimensions: [
      {
        label: 'Training behavior',
        detail: 'Structured plans, consistent recreational riding, or event-driven preparation.',
      },
      {
        label: 'Tooling',
        detail: 'Strava, TrainerRoad, Garmin, Wahoo, smart trainers, head units, and uploaded files.',
      },
      {
        label: 'Decision need',
        detail: 'Progressing safely, understanding fatigue, staying consistent, or preparing for an event.',
      },
      {
        label: 'Data quality',
        detail: 'Power, heart rate, duration, load proxies, duplicate detection, and recent activity depth.',
      },
      {
        label: 'Trust model',
        detail: 'Insights are accepted when they cite metrics, caveat missing data, and separate facts from interpretation.',
      },
      {
        label: 'Language fit',
        detail: 'Advanced riders tolerate CTL, ATL, TSB, and ramp rate; recreational riders need plain-language explanations.',
      },
      {
        label: 'Goal context',
        detail: 'General fitness, FTP targets, season goals, target events, availability, and athlete context.',
      },
      {
        label: 'Confidence risk',
        detail: 'Missing power data, incomplete sync, vague event details, stale FTP values, or sparse recent rides.',
      },
      {
        label: 'Feature need',
        detail: 'Reliable ingestion, deduped feed, weekly load trend, training-state summary, grounded Ask, and confidence indicators.',
      },
      {
        label: 'Success signal',
        detail: 'Connection completion, repeat weekly usage, Ask helpfulness, clarity ratings, and fewer low-confidence answers.',
      },
    ],
    archetypes: [
      {
        name: 'Structured Amateur',
        segment: 'Primary',
        summary:
          'A serious recreational cyclist following structured workouts and trying to understand whether training is progressing safely and effectively.',
        goals: [
          'Build fitness for an event, race, FTP target, or season goal',
          'See whether load, consistency, and workout mix support the goal',
        ],
        painPoints: [
          'Training data is split across multiple platforms',
          'Duplicate activities can distort weekly load and trends',
          'Charts show what happened without explaining what changed or why it matters',
        ],
        opportunities: [
          'Deduped canonical feed as the trust foundation',
          'Weekly load, ramp rate, CTL, ATL, and TSB with cited explanations',
          'Grounded Ask answers that show confidence and caveats',
        ],
        featurePriorities: [
          'Reliable ingestion',
          'Deduped activity feed',
          'Training-state verdicts',
          'Evidence-based Ask',
        ],
        jtbd:
          'When I finish a training week, I want to know whether my load is increasing at a reasonable rate so I can keep progressing without overdoing it.',
        productMeaning: 'RideSense becomes the trusted interpretation layer above fragmented training tools.',
      },
      {
        name: 'Data-Aware Recreational Rider',
        segment: 'Secondary',
        summary:
          'A consistent rider who uses Strava and device data but wants progress, fatigue, and consistency explained without becoming a training-metrics expert.',
        goals: [
          'Improve general fitness and stay consistent',
          'Understand whether riding is improving, maintaining, or falling off',
        ],
        painPoints: [
          'Training metrics can feel too technical',
          'Strava logs activity but does not clearly explain training direction',
          'Missing power or heart-rate data can make conclusions feel uncertain',
        ],
        opportunities: [
          'Summary-first dashboard with low jargon',
          'Plain-language metric explanations',
          'Useful lower-confidence analysis when power data is missing',
        ],
        featurePriorities: [
          'Strava sync',
          'Clean activity timeline',
          'Weekly consistency view',
          'Metric explanations',
        ],
        jtbd:
          'When I look at my recent rides, I want a simple explanation of my training trend so I can understand if I am improving.',
        productMeaning: 'RideSense teaches the rider what the data means without overwhelming them.',
      },
      {
        name: 'Event-Driven Rider',
        segment: 'Secondary',
        summary:
          'A goal-oriented cyclist preparing for a century, gravel race, fondo, charity ride, criterium, mountain bike race, or major personal challenge.',
        goals: [
          'Arrive prepared for a specific event',
          'Understand whether load, consistency, workout mix, and recent trends match the event demand',
        ],
        painPoints: [
          'The event date creates pressure without clear readiness feedback',
          'Missed workouts create uncertainty',
          'Late volume increases can feel necessary but risky',
        ],
        opportunities: [
          'Lightweight event context in athlete setup',
          'Readiness explanations tied to recent training history',
          'Time-to-event view with confidence and caveats',
        ],
        featurePriorities: [
          'Event context',
          'Workout mix analysis',
          'Longest ride summary',
          'Goal-aware Ask',
        ],
        jtbd:
          'When I set a target event, I want my training analyzed against that goal so I can understand whether I am on track.',
        productMeaning: 'RideSense becomes decision support for event preparation without pretending to guarantee performance.',
      },
    ],
    matrix: {
      caption:
        'Feature prioritization matrix across Structured, Recreational, and Event-driven rider segments.',
      personas: ['Structured', 'Recreational', 'Event-driven'],
      features: [
        {
          label: 'Reliable activity ingestion',
          values: ['High', 'High', 'High'],
        },
        {
          label: 'Deduped canonical feed',
          values: ['High', 'Medium', 'High'],
        },
        {
          label: 'Weekly load and ramp rate',
          values: ['High', 'Medium', 'High'],
        },
        {
          label: 'Training-state summary',
          values: ['High', 'High', 'High'],
        },
        {
          label: 'Athlete and event context',
          values: ['Medium', 'Medium', 'High'],
        },
        {
          label: 'Grounded Ask with citations',
          values: ['High', 'Medium', 'High'],
        },
        {
          label: 'Data confidence indicator',
          values: ['High', 'High', 'High'],
        },
      ],
    },
    strategicInsights: [
      {
        title: 'Interpretation is the product wedge',
        detail:
          'RideSense should not compete with activity trackers on logging or social proof; it wins by explaining what fragmented training data means.',
      },
      {
        title: 'Trust starts with ingestion and deduplication',
        detail:
          'Reliable sync, uploads, and duplicate handling need to precede advanced AI because inflated load breaks confidence immediately.',
      },
      {
        title: 'Structured Amateur is the launch persona',
        detail:
          'This rider already has data, understands the value of training metrics, and feels the sharpest pain from fragmented interpretation.',
      },
      {
        title: 'Plain language expands the market',
        detail:
          'The Data-Aware Recreational Rider keeps the product from becoming an acronym-heavy dashboard for only advanced cyclists.',
      },
      {
        title: 'Event context creates urgency',
        detail:
          'Event-driven preparation gives users a reason to return as the target date approaches, but readiness language must include confidence and caveats.',
      },
    ],
    researchSystem: {
      interviewAreas: [
        'How cyclists currently combine Strava, TrainerRoad, Garmin, Wahoo, and uploaded files.',
        'Which duplicated or missing activity issues users notice and how they correct them today.',
        'What makes training-state language feel useful versus too prescriptive.',
        'How riders interpret fatigue, readiness, and ramp rate with incomplete power or heart-rate data.',
        'Which goal or event fields change the usefulness of analysis without making setup feel heavy.',
      ],
      validationQuestions: [
        'Can users connect or upload enough data to trust a first weekly summary?',
        'Does the deduped activity feed match the rider’s known training history?',
        'Do cited metrics make Ask answers feel more trustworthy than generic advice?',
        'Can recreational riders understand training-state language without knowing CTL, ATL, or TSB?',
        'Does event context increase repeat visits in the weeks before a target date?',
      ],
    },
  },
];

export function getProductResearchBySlug(slug) {
  return productResearch.find((research) => research.slug === slug);
}
