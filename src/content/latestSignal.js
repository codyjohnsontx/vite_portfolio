/* The "Latest" block on the home page. Kept here with the rest of the
   content so the copy and its date can be updated without touching layout. */
export const latestSignal = {
  date: 'July 2026',
  title: 'OncoPath faithfulness eval built and calibrated',
  body:
    'OncoPath, an AI-assisted cancer trial explainer, now has an accuracy-evaluation harness: a frozen test set of real trials, a validator fix that took usable output from 0 to 100 percent, and a second-model faithfulness judge. Human calibration showed the judge is too lenient, so its 81 percent score is not trusted yet.',
  links: [
    { label: 'Read the build', to: '/products/oncopath' },
    { label: 'PM analysis', to: '/products/oncopath/analysis' },
  ],
};
