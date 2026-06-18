export const blogPosts = [
  {
    slug: 'ai-trust-boundaries-before-ai-features',
    title: 'AI trust boundaries before AI features',
    deck:
      'The hard part of an AI feature is deciding what the product is allowed to know, when it should stop, and how much confidence the user has actually earned from the evidence.',
    date: 'June 2026',
    readingTime: '5 min read',
    intro:
      'I am interested in AI features, but I am more interested in whether the product deserves the confidence it creates. A chat box can make almost anything sound possible. The product work is deciding what the system should know, what it should admit it does not know, and where the answer should become a refusal instead of a guess.',
    sections: [
      {
        heading: 'The feature is not the model',
        body: [
          'When I added AI-shaped workflows to Track Tuner and RideSense, the model was never the whole feature. The real feature was the loop around it: what context gets loaded, what the user is trying to decide, what evidence can support that decision, and what a bad answer could cost.',
          'For Track Tuner, Race Engineer should not behave like a generic motorsports chatbot. The useful version reasons from session history, setup changes, track conditions, and rider or driver feedback. If that evidence is not there, the product should not pretend. It should stay general, ask for more context, or refuse to give a setup recommendation that sounds more personal than the data supports.',
          'That makes the scope less flashy and more important. Session history, recommendation feedback, refusal behavior, repeated-prompt handling, and request observability are part of the feature. Without them, the AI is just language sitting on top of weak product judgment.',
        ],
      },
      {
        heading: 'Trust starts with evidence boundaries',
        body: [
          'I keep coming back to a simple line: the product should not act like it has evidence it does not have. That sounds obvious, but a lot of AI interfaces are built to blur that line. They answer smoothly even when the underlying context is thin.',
          "In Track Tuner, that means Race Engineer should not talk as if it knows a rider's personal setup history unless those sessions are actually loaded. In RideSense, grounded Q&A should stay tied to computed training signals and recover cleanly when model output is malformed. In both products, trust depends on the system being honest about its inputs.",
          'The requirement is not just "answer the question." The requirement is closer to: answer from the right evidence, expose enough of the basis for the answer, and do not create false precision where the product only has a loose signal.',
        ],
      },
      {
        heading: 'Fallback behavior is part of the product',
        body: [
          'Fallbacks are easy to treat as implementation details. I think users experience them as product quality. If an AI response cannot be parsed, the interface should not collapse. If a request is unsafe or off-topic, the refusal should be clear. If the same prompt gets sent over and over, the product should avoid waste and reuse a recent answer when that is the responsible path.',
          'These are not edge cases in the emotional sense. They are the moments where a user decides whether the system is dependable. A vague refusal feels arbitrary. A brittle parsing failure feels cheap. A confident but unsupported answer feels dangerous.',
          'The product question I want answered before launch is: what should the user be able to rely on when the ideal path breaks? If that behavior is undefined, the feature is not ready just because the happy path works.',
        ],
      },
      {
        heading: 'Observability should respect privacy',
        body: [
          'AI features also need a way to learn from usage. If refusals spike, if requests fail, or if users keep asking a question the product cannot answer well, I need to know that. But observability should not become a lazy excuse to store everything.',
          'For Track Tuner, privacy-safe request observability is a product decision. I want enough signal to understand Race Engineer behavior without keeping sensitive prompt text by default. Patterns, failure modes, refusal counts, and safety decisions are useful. Raw user context is often more than the product needs to retain.',
          'This is where engineering fluency helps the product work. The tradeoff is not abstract. You have to know what data helps debugging, what data creates risk, and what a user would reasonably expect the product to keep private.',
        ],
      },
      {
        heading: 'The PM work is deciding where confidence ends',
        body: [
          'A strong AI feature is not one that answers everything. It is one that knows where the product should stop. That stopping point depends on the user, the domain, the evidence, and the cost of being wrong.',
          'In Track Tuner, Race Engineer should become more useful as structured session history compounds. In RideSense, AI should explain computed training signals without pretending to replace a coach or invent missing context. The trust boundary is not a disclaimer at the bottom of the page. It is part of the product.',
          'That is the part of AI product work I care about most. The model can generate language. The product has to earn trust.',
        ],
      },
    ],
    closing:
      'My standard is simple: grounded enough to be useful, constrained enough to be honest, observable enough to improve, and humble enough to refuse when the evidence is not there.',
  },
  {
    slug: 'mvp-sequencing-memory-before-intelligence',
    title: 'MVP sequencing: memory before intelligence',
    deck:
      'Track Tuner gets more interesting when it becomes intelligent, but it gets useful first by becoming a better memory system for what changed and what happened next.',
    date: 'May 2026',
    readingTime: '5 min read',
    intro:
      'The exciting version of Track Tuner is easy to describe: telemetry, comparisons, setup recommendations, and a Race Engineer that helps a rider or driver decide what to change next. The useful first version starts smaller. It helps the user remember the setup, the conditions, the feedback, and the next decision while the day is still moving.',
    sections: [
      {
        heading: 'A sharper wedge beats a bigger promise',
        body: [
          'A big product promise can hide a weak starting point. If Track Tuner launches as a broad motorsports intelligence platform, it asks users to trust the product before the product has earned much context. If it launches as a disciplined trackside logbook, it can solve a real problem immediately and create the foundation for smarter workflows later.',
          'That is why the sequence matters: setup logging first, telemetry workflows second, AI recommendations after the product has useful history to reason from. This is not lowering the ambition. It is putting the ambition in the right order.',
          'The first question is not "how advanced can this become?" It is "what is the smallest useful loop someone will repeat?" For Track Tuner, that loop is capture, compare, decide, and come back with better context next session.',
        ],
      },
      {
        heading: 'The user problem is structured memory',
        body: [
          'Track day riders, HPDE drivers, and club racers already experiment. They change tire pressure, suspension settings, alignment, brake points, line choice, and pace. The missing piece is not motivation. It is structured memory under pressure.',
          'Notes apps capture fragments. Photos capture a moment. Spreadsheets are flexible but slow. Pro telemetry can be powerful, but it often asks for hardware, expertise, and review time that do not fit a short paddock window.',
          'Track Tuner should sit between those worlds. Fast enough to use in the five minutes that matter, structured enough to make the next comparison real. The product wins when logging is easier than guessing and more useful than scattered notes.',
        ],
      },
      {
        heading: 'AI has to compound from real usage',
        body: [
          'Race Engineer is most useful when it can point back to the user history. A recommendation grounded in prior sessions is different from generic setup advice. One helps the user understand their own pattern. The other may be technically plausible and still not especially helpful.',
          "That means the AI layer depends on adoption of the logging layer. Every captured session should make future comparison more useful. Every feedback note should help separate mechanical change from rider perception. Every repeated pattern should give the product a better basis for a recommendation, a follow-up question, or a refusal.",
          'This is product sequencing, not just data collection. If the app leads with intelligence before it has memory, it risks feeling impressive once and thin after that. If it leads with memory, intelligence can become a compounding benefit.',
        ],
      },
      {
        heading: 'The launch segment shapes the roadmap',
        body: [
          'The launch segment I keep coming back to is the committed track-day regular who is trying to turn every session into visible improvement. They ride or drive often enough to feel the pain, care enough to log, and have enough repetition for the product to learn something useful.',
          'That segment keeps the roadmap honest. They need session diff, setup timeline, and Race Engineer support eventually, but the first value is knowing what changed and whether it helped. They do not need a feed first. They do not need a coach workspace first. Those may become valuable later, but they are not the first adoption test.',
          'A clear segment protects the MVP from becoming a list of plausible features. Every idea has to answer the same question: does this help the user close the trackside decision loop better than the next alternative?',
        ],
      },
      {
        heading: 'The right MVP makes later features stronger',
        body: [
          'A good MVP does not just reduce scope. It creates leverage. If Track Tuner captures setup, conditions, feedback, and decisions cleanly, later features become easier to build and easier to trust. Comparisons have better inputs. Charts have real history. Exports have structure. AI recommendations have evidence.',
          'That is the difference between cutting scope and sequencing scope. Cutting scope asks what can be removed. Sequencing scope asks what should come first so the product gets stronger with each release.',
          'For Track Tuner, memory before intelligence is the practical path. It solves the immediate problem, protects trust, and gives the product a stronger base for the advanced workflows that make the idea worth building.',
        ],
      },
    ],
    closing:
      'The MVP is not the least exciting version of the product. Done well, it is the first version that teaches the product what it needs to know.',
  },
  {
    slug: 'operational-friction-is-product-scope',
    title: 'Operational friction is product scope',
    deck:
      'A lot of product work starts as operational drag: repeated manual work, unclear handoffs, weak reporting, and decisions that have to be renegotiated every day.',
    date: 'April 2026',
    readingTime: '5 min read',
    intro:
      'I pay attention when work keeps getting stuck in the same place. A team enters the same data twice. A report takes too long to trust. A queue hides the next best action. A stakeholder request sounds like a feature, but the real problem is that the workflow forces people to keep making the same small decisions over and over.',
    sections: [
      {
        heading: 'Friction is a discovery signal',
        body: [
          'Operational friction is useful because it is specific. People can point to the spreadsheet that breaks, the handoff that loses context, the field that gets entered wrong, or the report that no one fully trusts. Those moments are discovery signals.',
          'At HSNBA, manual data work was not just a technical inconvenience. It affected staff time, reporting quality, and confidence in the information used for operations and grant-supporting analysis. At Lambda Curry, vague task definition and unclear launch success criteria were not just process annoyances. They were delivery risks.',
          'The product move is to treat the friction as evidence. What is repeated? What fails? Who pays the cost? What decision gets delayed or distorted because the workflow is messy?',
        ],
      },
      {
        heading: 'Not every pain point deserves a platform',
        body: [
          'Operational pain can make a broad solution feel justified. That is the trap. A messy workflow does not automatically need a new platform, a full rebuild, or a giant automation layer. Sometimes the right answer is a smaller tool, a clearer intake path, a validation step, or better acceptance criteria.',
          'That matters because teams do not have unlimited attention. A solution that adds process can fail even when it is technically better. A narrow fix that removes repeated manual work can create more value than a broad system people do not adopt.',
          'Scope has to stay tied to the workflow. The question is not "what could I build?" The question is "which intervention removes the most meaningful friction without creating a heavier burden?"',
        ],
      },
      {
        heading: 'Scope should reduce repeated decisions',
        body: [
          'Good operational product work often reduces the number of small decisions people have to remake. It clarifies what data belongs where. It defines what a complete request looks like. It turns ambiguous handoffs into a sequence people can trust.',
          'In client product work, that can mean turning stakeholder requests into requirements, user stories, acceptance criteria, and release validation. In automation work, it can mean using Python and SQL to remove repetitive entry and improve data consistency. In service or inventory operations, it can mean making queue priority visible enough that the team stops renegotiating the same choice every day.',
          'The output changes by environment, but the pattern is similar: find the repeated decision, make the right next action easier, and leave enough structure for the team to keep moving without constant clarification.',
        ],
      },
      {
        heading: 'Measurement keeps the work honest',
        body: [
          'Operational improvements need measurement because they can disappear into the background once they start working. If the team saves time, reduces errors, or makes reporting easier, the outcome should be stated plainly. At HSNBA, the public evidence is concrete: manual data entry dropped by 65 percent, data errors decreased by 95 percent, and more than 19,000 records were analyzed and classified for GIS-enabled work.',
          'Metrics also keep the work from becoming output theater. Shipping a workflow change is not the same as improving the workflow. The question is whether the repeated pain decreased, whether the data became more trustworthy, or whether stakeholders had a clearer basis for action.',
          'In Lambda Curry-style delivery work, that means defining success criteria before release and using behavior, conversion, retention, or stakeholder feedback to guide iteration after launch. Measurement is not a reporting chore at the end. It is part of scoping the work responsibly.',
        ],
      },
      {
        heading: 'Operational work builds product judgment',
        body: [
          'I do not see operational work as separate from product work. It is one of the places where product judgment becomes visible fastest. You have to understand the user, the workflow, the business constraint, the stakeholder pressure, and the cost of adding complexity.',
          'It also forces practical tradeoffs. You learn when targeted automation is better than a systems overhaul. You learn when a process problem needs clearer ownership before software. You learn how much detail is enough for engineering to move without burying the team in documentation.',
          'That is the connection I care about: operational friction becomes product scope when it is framed as a repeatable user or business problem, narrowed into a useful intervention, and measured against the outcome that made the work worth doing.',
        ],
      },
    ],
    closing:
      'The best operational fixes do more than make work faster. They make the system easier to understand, easier to trust, and easier to improve the next time friction appears.',
  },
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
