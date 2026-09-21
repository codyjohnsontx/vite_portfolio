/* The "Latest" block on the home page. Kept here with the rest of the
   content so the copy and its date can be updated without touching layout. */
export const latestSignal = {
  date: 'September 2026',
  title: 'A prompt nobody could answer',
  body:
    "For about two weeks, half my code review wasn't happening and I didn't notice. I review everything twice. First an automated pipeline, then a second pass from a different vendor's model. The second reviewer had stopped starting. Not crashed, not erroring. Sitting there. Reviewers now launch with the hook layer off. They never meet the prompt, because there's nothing left to trust. Nothing is bypassed and nothing is pre-approved. 234 lines, merged upstream. Every second review since has started clean.",
  links: [{ label: 'Read the case study', to: '/case-studies/firstmate-hook-prompt' }],
};
