/* The "Latest" block on the home page. Kept here with the rest of the
   content so the copy and its date can be updated without touching layout. */
export const latestSignal = {
  date: 'November 2026',
  title: 'Dragonglass AI: vault search a small local model can answer from',
  body:
    'Vault search used to need every word of the query to match, so the multi-word questions a local model writes often came back with one note or none. It now runs on a BM25 index the plugin builds in memory when Obsidian starts and keeps current as notes change, matches any word and ranks the notes holding rarer words and more of them first, and hands the model the full text of its best matches within a token budget instead of short excerpts. A search narrowed to a folder with no match falls back to the whole vault and says so, and when a question names a note but asks about something it only links to, the search reads those linked notes too. Nothing is written to disk, and every edit is still a diff the user approves.',
  links: [{ label: 'Read the build', to: '/products/dragonglass' }],
};
