// Diaz on Demand video-first browse and watch wireframes.
//
// The markup and the stylesheet beside it are lifted from the reviewed
// standalone artifact rather than redrawn, so what renders here is the drawing
// that was actually signed off. Three edits were made on the way in: the
// artifact's own <script> is gone, so the frames are static and every <button>
// became a <div>; heading tags became <div>s so a wireframe never lands in the
// page's heading outline; and the JS-only data attributes were dropped, keeping
// only data-open, which DiazVideoFirstWireframesPage.css now reads to hold the
// one open course row open.
//
// Every string below is a literal. Nothing interpolated, fetched, or taken from
// a route param may reach them - the page renders them with
// dangerouslySetInnerHTML.

/* The placeholder video stills. Deliberately abstract: none of them is
   fabricated Diaz footage. Rendered once per page; the frames reference the
   symbols by id. */
export const STILL_SYMBOLS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
<linearGradient id="mat" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#2a2f38" /><stop offset="1" stop-color="#0e1014" />
</linearGradient>
<radialGradient id="key" cx="30%" cy="22%" r="72%">
<stop offset="0" stop-color="#c9b79a" stop-opacity=".38" /><stop offset="1" stop-color="#000" stop-opacity="0" />
</radialGradient>
<radialGradient id="key2" cx="70%" cy="30%" r="66%">
<stop offset="0" stop-color="#a8b6c4" stop-opacity=".34" /><stop offset="1" stop-color="#000" stop-opacity="0" />
</radialGradient>
<radialGradient id="key3" cx="50%" cy="15%" r="80%">
<stop offset="0" stop-color="#d3a07c" stop-opacity=".34" /><stop offset="1" stop-color="#000" stop-opacity="0" />
</radialGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#1a1e25" /><stop offset="1" stop-color="#0a0c0f" />
</linearGradient>
</defs>
<symbol id="st1" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key)" />
<rect y="58" width="160" height="32" fill="url(#floor)" />
<ellipse cx="66" cy="62" rx="30" ry="10" fill="#05070a" opacity=".55" />
<path d="M42 62 q10-24 26-24 t28 20 l4 4 H40Z" fill="#14171d" />
<ellipse cx="72" cy="36" rx="9" ry="10" fill="#1c2028" />
<path d="M96 62 q14-10 26-4 l6 6Z" fill="#11141a" />
<rect width="160" height="90" fill="#000" opacity=".16" />
</symbol>
<symbol id="st2" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key2)" />
<rect y="64" width="160" height="26" fill="url(#floor)" />
<ellipse cx="88" cy="68" rx="34" ry="8" fill="#05070a" opacity=".5" />
<path d="M62 68 V38 q0-12 14-12 t14 12 v30Z" fill="#171b22" />
<circle cx="76" cy="20" r="9" fill="#1f242c" />
<path d="M90 44 l24 6 -2 6 -24-6Z" fill="#1a1e26" />
<path d="M62 44 l-22 8 3 6 22-8Z" fill="#1a1e26" />
<rect width="160" height="90" fill="#000" opacity=".18" />
</symbol>
<symbol id="st3" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key3)" />
<rect y="55" width="160" height="35" fill="url(#floor)" />
<ellipse cx="80" cy="60" rx="44" ry="11" fill="#05070a" opacity=".5" />
<path d="M36 60 q18-16 44-16 t44 16Z" fill="#151920" />
<ellipse cx="58" cy="48" rx="10" ry="8" fill="#1e232b" />
<ellipse cx="104" cy="50" rx="11" ry="8" fill="#1a1f27" />
<rect width="160" height="90" fill="#000" opacity=".14" />
</symbol>
<symbol id="st4" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key)" />
<rect y="62" width="160" height="28" fill="url(#floor)" />
<ellipse cx="96" cy="66" rx="30" ry="8" fill="#05070a" opacity=".5" />
<path d="M74 66 V34 q0-11 13-11 t13 11 v32Z" fill="#161a21" />
<circle cx="87" cy="17" r="8.5" fill="#20252d" />
<path d="M100 40 q18 2 24 14 l-6 4 q-6-10-20-12Z" fill="#191d25" />
<path d="M40 78 q16-8 34-8" stroke="#1d222a" stroke-width="5" fill="none" />
<rect width="160" height="90" fill="#000" opacity=".17" />
</symbol>
<symbol id="st5" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key2)" />
<rect y="60" width="160" height="30" fill="url(#floor)" />
<ellipse cx="70" cy="64" rx="36" ry="9" fill="#05070a" opacity=".52" />
<path d="M50 64 q6-20 22-20 t20 20Z" fill="#141820" />
<circle cx="70" cy="34" r="9" fill="#1d222a" />
<path d="M92 52 l26-14 3 6 -26 14Z" fill="#181c24" />
<rect width="160" height="90" fill="#000" opacity=".15" />
</symbol>
<symbol id="st6" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="url(#mat)" /><rect width="160" height="90" fill="url(#key3)" />
<rect y="66" width="160" height="24" fill="url(#floor)" />
<ellipse cx="80" cy="70" rx="40" ry="8" fill="#05070a" opacity=".5" />
<path d="M60 70 V40 q0-13 15-13 t15 13 v30Z" fill="#161a22" />
<circle cx="75" cy="21" r="9" fill="#1f242d" />
<path d="M90 48 l26 10 -3 6 -26-10Z" fill="#1a1e27" />
<path d="M60 48 l-24 4 1 7 24-4Z" fill="#1a1e27" />
<rect width="160" height="90" fill="#000" opacity=".16" />
</symbol>
<symbol id="stw" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<rect width="160" height="90" fill="#0b0d11" />
<rect width="160" height="90" fill="url(#key)" opacity=".55" />
<rect y="52" width="160" height="38" fill="url(#floor)" />
<ellipse cx="80" cy="56" rx="46" ry="12" fill="#05070a" opacity=".45" />
<path d="M34 56 q22-20 46-20 t46 20Z" fill="#121620" />
<rect width="160" height="90" fill="#000" opacity=".3" />
</symbol>
</svg>
`;

export const TILE_STATES = [
  {
    id: 'playable',
    title: 'Playable',
    note:
      'A real Mux or YouTube video. The thumbnail is the video&rsquo;s own frame &mdash; free, automatic, and it exists only because the video does.',
    html: `<div class="thumb" style="aspect-ratio:16/9;border-radius:12px">
<svg><use href="#st1" /></svg><span class="dur">9:12</span>
</div>`,
  },
  {
    id: 'playable-in-progress',
    title: 'Playable, in progress',
    note:
      'The same tile plus one 3px bar. The progress the app already stores finally becomes visible while browsing.',
    html: `<div class="thumb" style="aspect-ratio:16/9;border-radius:12px">
<svg><use href="#st2" /></svg><span class="dur">10:04</span>
<span class="tprog"><i style="width:44%"></i></span>
</div>`,
  },
  {
    id: 'waiting-for-mux',
    title: 'Waiting for Mux',
    note:
      'Asset uploaded, playback not ready yet. Already a derived state in the codebase and already badged in the admin, but members currently see nothing at all. Filmed, not ready, and worth saying so.',
    html: `<div class="thumb wait" style="aspect-ratio:16/9;border-radius:12px">
<span class="tmark"><span class="g">&#9679;</span><span class="t">Processing</span></span>
</div>`,
  },
  {
    id: 'not-filmed',
    title: 'Not filmed',
    note:
      '48 of 67 lessons. A dashed, deliberate placeholder rather than a gradient poster with a big number on it, which reads as artwork and is a lie.',
    html: `<div class="thumb empty" style="aspect-ratio:16/9;border-radius:12px">
<span class="tmark"><span class="g">&#9633;</span><span class="t">Not filmed</span></span>
</div>`,
  },
  {
    id: 'being-replaced',
    title: 'Being replaced',
    note:
      '<code>poster-surface.tsx</code>: the same six gradients on every card. Its monogram makes a lesson with no video look exactly as furnished as one with a video, so it goes.',
    html: `<div class="thumb" style="aspect-ratio:16/9;border-radius:12px;border-style:solid">
<span class="gradpost"><span class="gridlines"></span><span class="mono">GR</span></span>
</div>`,
  },
];

export const WIREFRAME_GROUPS = [
  {
    id: 'library',
    eyebrow: '02 · browse',
    title: 'Library — rows expand in place',
    note:
      'Course rows open in place, so a member can look inside a course without losing the list. The left pane is the target. The right pane is what ships: one discipline part-filmed, one in production, one with nothing in it at all. Two things were redrawn for it rather than left to degrade. An empty library needs three different shapes — planned in this program, filming now, and not started — because rendering all three as the same paragraph of grey text is what makes an early catalogue read as broken instead of early. And &ldquo;Continue watching&rdquo; is the wrong section at three videos, so it becomes &ldquo;Available now&rdquo;, shown unconditionally, and reverts once there is enough to continue.',
    frames: [
      {
        id: 'library-713',
        tone: 'target',
        label: 'Populated — the target',
        sub:
          'What the library looks like once the catalogue is filmed. The stills are abstract placeholders standing in for Mux thumbnails, not Diaz footage.',
        width: 1280,
        html: `<div class="app">
<div class="nav">
<div class="brand"><div class="b1 dsp">Diaz</div><div class="b2">ON DEMAND</div></div>
<div class="navlinks"><span class="navlink on">Library</span><span class="navlink">Favorites</span><span class="navlink">Premium</span><span class="navlink">Account</span></div>
<div class="navright"><span class="chipbtn">Premium active</span><span class="chipbtn solid">Account</span></div>
</div>
<div class="shell" style="padding-top:34px">
<p class="kick acc">Student Library</p>
<div class="h-xl">Train On Demand</div>
<p class="body" style="max-width:560px;margin-top:12px">A guided on-demand library built around disciplined progression, repeatable modules, and quick return-to-training paths.</p>
<div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap">
<span class="badge go" style="padding:8px 14px;font-size:10px">All disciplines</span>
<span class="badge" style="padding:8px 14px;font-size:10px">BJJ</span>
<span class="badge" style="padding:8px 14px;font-size:10px">Muay Thai</span>
<span class="badge" style="padding:8px 14px;font-size:10px">Haganah</span>
</div>
<!-- continue watching -->
<div style="margin-top:44px">
<div class="secthead">
<div><p class="kick">Progress first</p><div class="h-lg">Continue watching</div></div>
<span class="body" style="font-size:12.5px">4 active lessons</span>
</div>
<div class="cwrap" style="margin-top:18px">
<div class="ccard"><div class="thumb"><svg><use href="#st2" /></svg><span class="dur">10:04</span><span class="tprog"><i style="width:44%"></i></span></div>
<div class="ct">Hip Escape Recovery Chain</div><div class="cs">Guard Retention &mdash; Defense &middot; 5:38 left</div></div>
<div class="ccard"><div class="thumb"><svg><use href="#st4" /></svg><span class="dur">9:20</span><span class="tprog"><i style="width:71%"></i></span></div>
<div class="ct">Teeps, Round Kicks &amp; Checks</div><div class="cs">Muay Thai Foundations &middot; 2:42 left</div></div>
<div class="ccard"><div class="thumb"><svg><use href="#st6" /></svg><span class="dur">7:11</span><span class="tprog"><i style="width:18%"></i></span></div>
<div class="ct">Wrist Releases &amp; Clothing Grabs</div><div class="cs">Haganah Foundations &middot; 5:50 left</div></div>
<div class="ccard"><div class="thumb"><svg><use href="#st3" /></svg><span class="dur">19:02</span><span class="tprog"><i style="width:88%"></i></span></div>
<div class="ct">Back Control &mdash; Offense: seat belt to strangle</div><div class="cs">BJJ Fundamentals &middot; 2:16 left</div></div>
</div>
</div>
<!-- discipline -->
<div style="margin-top:48px">
<div class="secthead"><div><p class="kick">Discipline</p><div class="h-lg">BJJ</div></div><span class="body" style="font-size:12.5px">8 courses</span></div>
<div style="margin-top:22px">
<div class="secthead"><div><p class="kick">Program</p><div class="h-md dsp">BJJ Fundamentals</div></div><span class="body" style="font-size:12.5px;max-width:400px;text-align:right">Positional fundamentals organized into clear defensive and offensive tracks.</span></div>
<div style="margin-top:12px">
<!-- expanded row -->
<div class="courserow open">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st1" /></svg></div>
<div class="meta">
<div class="t">Guard Retention &mdash; Defense</div>
<div class="s"><span>BJJ Fundamentals</span><span class="sep">/</span><span>2 lessons</span><span class="sep">/</span><span>19m</span><span class="badge prem">Premium</span></div>
<div class="bar" style="margin-top:8px;width:60%"><i style="width:22%"></i></div>
</div>
<div class="right"><span class="body" style="font-size:12.5px">22%</span><span class="chev">&#9654;</span></div>
</div>
<div class="expand" data-open="1">
<div class="expandbody"><div class="expandinner">
<div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
<div style="flex:1;min-width:260px">
<p class="body" style="margin:0 0 14px">Frames, hip movement, and early recovery habits for preserving guard under pressure.</p>
<div style="display:flex;gap:9px"><span class="btn white sm">Continue &mdash; 5:38 left</span><span class="btn sm">Open course page</span></div>
</div>
<div style="display:flex;gap:22px;flex:none">
<div><p class="kick" style="font-size:9px">Completed</p><div class="dsp" style="font-size:26px;margin-top:4px">0</div></div>
<div><p class="kick" style="font-size:9px">Remaining</p><div class="dsp" style="font-size:26px;margin-top:4px">2</div></div>
<div><p class="kick" style="font-size:9px">Runtime</p><div class="dsp" style="font-size:26px;margin-top:4px">19m</div></div>
</div>
</div>
<div style="height:1px;background:var(--line);margin:16px 0"></div>
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow now">
<span class="n">01</span>
<div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="tprog"><i style="width:100%"></i></span></div>
<div class="lm"><div class="lt">Frame Fundamentals</div><div class="ls"><span class="badge go">Free</span><span>Guard retention &mdash; defense</span></div></div>
<div class="lr"><span>9:12</span><span style="color:var(--progress)">&#10003;</span></div>
</div>
<div class="lessonrow">
<span class="n">02</span>
<div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="tprog"><i style="width:44%"></i></span></div>
<div class="lm"><div class="lt">Hip Escape Recovery Chain</div><div class="ls"><span class="badge prem">Premium</span><span>Guard retention &mdash; defense</span></div></div>
<div class="lr"><span>10:04</span><span>&#9654;</span></div>
</div>
</div>
</div></div>
</div>
<div class="courserow">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="meta"><div class="t">Guard Retention &mdash; Offense</div>
<div class="s"><span>BJJ Fundamentals</span><span class="sep">/</span><span>2 lessons</span><span class="sep">/</span><span>18m</span><span class="badge prem">Premium</span></div></div>
<div class="right"><span class="chev">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody"><div class="expandinner">
<p class="body" style="margin:0 0 14px">Recovering and re-establishing guard when the pass has already started.</p>
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow"><span class="n">01</span><div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="lm"><div class="lt">Re-guard Timing</div><div class="ls"><span class="badge prem">Premium</span><span>Guard retention &mdash; offense</span></div></div><div class="lr"><span>8:44</span><span>&#9654;</span></div></div>
<div class="lessonrow"><span class="n">02</span><div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st5" /></svg></div>
<div class="lm"><div class="lt">Inversion and Granby Basics</div><div class="ls"><span class="badge prem">Premium</span><span>Guard retention &mdash; offense</span></div></div><div class="lr"><span>9:31</span><span>&#9654;</span></div></div>
</div>
</div></div></div>
<div class="courserow">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st5" /></svg></div>
<div class="meta"><div class="t">Guard Passing &mdash; Defense</div>
<div class="s"><span>BJJ Fundamentals</span><span class="sep">/</span><span>2 lessons</span><span class="sep">/</span><span>19m</span><span class="badge prem">Premium</span></div></div>
<div class="right"><span class="chev">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody"><div class="expandinner"><p class="body" style="margin:0">Collapsed rows keep the scan-length you already have. Only one row is open at a time.</p></div></div></div>
<div class="courserow">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st6" /></svg></div>
<div class="meta"><div class="t">Side Control &mdash; Defense</div>
<div class="s"><span>BJJ Fundamentals</span><span class="sep">/</span><span>2 lessons</span><span class="sep">/</span><span>19m</span><span class="badge prem">Premium</span></div></div>
<div class="right"><span class="chev">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody"><div class="expandinner"><p class="body" style="margin:0">&mdash;</p></div></div></div>
</div>
</div>
</div>
</div>
</div>`,
      },
      {
        id: 'library-846',
        tone: 'ship',
        label: 'Sparse — what ships first',
        sub:
          'Three playable videos in the whole catalogue. Every other lesson is counted, named, and dimmed.',
        width: 1280,
        html: `<div class="app">
<div class="nav">
<div class="brand"><div class="b1 dsp">Diaz</div><div class="b2">ON DEMAND</div></div>
<div class="navlinks"><span class="navlink on">Library</span><span class="navlink">Favorites</span><span class="navlink">Premium</span><span class="navlink">Account</span></div>
<div class="navright"><span class="chipbtn">Premium active</span><span class="chipbtn solid">Account</span></div>
</div>
<div class="shell" style="padding-top:34px">
<p class="kick acc">Student Library</p>
<div class="h-xl">Train On Demand</div>
<p class="body" style="max-width:560px;margin-top:12px">The library is being filmed discipline by discipline. Everything below that has a thumbnail plays today.</p>
<div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap;align-items:center">
<span class="badge go" style="padding:8px 14px;font-size:10px">All disciplines</span>
<span class="badge" style="padding:8px 14px;font-size:10px">BJJ &middot; 3</span>
<span class="badge" style="padding:8px 14px;font-size:10px;opacity:.5">Muay Thai &middot; 0</span>
<span class="badge" style="padding:8px 14px;font-size:10px;opacity:.5">Haganah &middot; 0</span>
</div>
<!-- available now -->
<div style="margin-top:44px">
<div class="secthead">
<div><p class="kick">Available now</p><div class="h-lg">Everything that plays</div></div>
<span class="body" style="font-size:12.5px">3 playing &middot; 1 processing</span>
</div>
<div class="cwrap" style="margin-top:18px;grid-template-columns:repeat(4,minmax(0,1fr))">
<div class="ccard"><div class="thumb"><svg><use href="#st1" /></svg><span class="dur">9:12</span><span class="tprog"><i style="width:100%"></i></span></div>
<div class="ct">Frame Fundamentals</div><div class="cs">Guard Retention &mdash; Defense &middot; Watched</div></div>
<div class="ccard"><div class="thumb"><svg><use href="#st2" /></svg><span class="dur">10:04</span><span class="tprog"><i style="width:44%"></i></span></div>
<div class="ct">Hip Escape Recovery Chain</div><div class="cs">Guard Retention &mdash; Defense &middot; 5:38 left</div></div>
<div class="ccard"><div class="thumb"><svg><use href="#st3" /></svg><span class="dur">7:44</span></div>
<div class="ct">Re-guard Timing</div><div class="cs">Guard Retention &mdash; Offense &middot; Not started</div></div>
<div class="ccard" style="opacity:.9"><div class="thumb wait"><span class="tmark"><span class="g">&#9679;</span><span class="t">Processing</span></span></div>
<div class="ct" style="color:var(--text-muted)">Inversion and Granby Basics</div><div class="cs" style="color:var(--premium)">Uploaded &mdash; ready shortly</div></div>
</div>
<p class="body" style="font-size:12.5px;margin-top:14px">A row of four that is genuinely four. It is the whole catalogue and it does not pretend otherwise.</p>
</div>
<div style="margin-top:48px">
<div class="secthead"><div><p class="kick">Discipline</p><div class="h-lg">BJJ</div></div><span class="body" style="font-size:12.5px">3 of 16 lessons filmed</span></div>
<div style="margin-top:22px">
<div class="secthead"><div><p class="kick">Program</p><div class="h-md dsp">BJJ Fundamentals</div></div><span class="body" style="font-size:12.5px;max-width:400px;text-align:right">Positional fundamentals organized into clear defensive and offensive tracks.</span></div>
<div style="margin-top:12px">
<div class="courserow open">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st1" /></svg></div>
<div class="meta"><div class="t">Guard Retention &mdash; Defense</div>
<div class="s"><span style="color:var(--progress)">2 of 2 filmed</span><span class="sep">/</span><span>19m</span><span class="badge prem">Premium</span></div>
<div class="bar" style="margin-top:8px;width:60%"><i style="width:72%"></i></div></div>
<div class="right"><span class="body" style="font-size:12.5px">72%</span><span class="chev">&#9654;</span></div>
</div>
<div class="expand" data-open="1"><div class="expandbody"><div class="expandinner">
<p class="body" style="margin:0 0 14px">Frames, hip movement, and early recovery habits for preserving guard under pressure.</p>
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow"><span class="n">01</span><div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="tprog"><i style="width:100%"></i></span></div>
<div class="lm"><div class="lt">Frame Fundamentals</div><div class="ls"><span class="badge go">Free</span><span>Guard retention &mdash; defense</span></div></div><div class="lr"><span>9:12</span><span style="color:var(--progress)">&#10003;</span></div></div>
<div class="lessonrow now"><span class="n">02</span><div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="tprog"><i style="width:44%"></i></span></div>
<div class="lm"><div class="lt">Hip Escape Recovery Chain</div><div class="ls"><span class="badge prem">Premium</span><span>Guard retention &mdash; defense</span></div></div><div class="lr"><span>10:04</span><span>&#9654;</span></div></div>
</div>
</div></div></div>
<div class="courserow">
<div class="thumb" style="width:132px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="meta"><div class="t">Guard Retention &mdash; Offense</div>
<div class="s"><span style="color:var(--premium)">1 of 2 filmed</span><span class="sep">/</span><span>1 processing</span><span class="badge prem">Premium</span></div></div>
<div class="right"><span class="chev">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody"><div class="expandinner">
<p class="body" style="margin:0 0 14px">Recovering and re-establishing guard when the pass has already started.</p>
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow"><span class="n">01</span><div class="thumb" style="width:88px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="lm"><div class="lt">Re-guard Timing</div><div class="ls"><span class="badge prem">Premium</span><span>Guard retention &mdash; offense</span></div></div><div class="lr"><span>7:44</span><span>&#9654;</span></div></div>
<div class="lessonrow"><span class="n">02</span><div class="thumb wait" style="width:88px;aspect-ratio:16/9"><span class="tmark"><span class="t" style="font-size:7px">Processing</span></span></div>
<div class="lm"><div class="lt" style="color:var(--text-muted)">Inversion and Granby Basics</div><div class="ls"><span class="badge" style="border-color:rgba(242,193,78,.3);color:var(--premium)">Uploaded</span><span>Ready shortly</span></div></div><div class="lr"><span style="opacity:.4">&mdash;</span></div></div>
</div>
</div></div></div>
<div style="border:1px dashed rgba(255,255,255,.13);border-radius:18px;padding:16px 18px;margin-top:10px;display:flex;gap:16px;align-items:center">
<div class="thumb empty" style="width:88px;aspect-ratio:16/9"><span class="tmark"><span class="g">&#9633;</span></span></div>
<div style="flex:1;min-width:0">
<p class="kick" style="font-size:9px">Planned in this program</p>
<p style="margin:6px 0 0;font-size:14px;line-height:1.5;color:var(--text-muted)">Guard Passing, Side Control and Back Control &mdash; <strong style="color:var(--text)">6 courses, 12 lessons</strong> scripted and scheduled, not yet filmed.</p>
</div>
<span class="btn sm" style="flex:none">See the plan</span>
</div>
</div>
</div>
</div>
<!-- discipline in production -->
<div style="margin-top:44px">
<div class="secthead"><div><p class="kick">Discipline</p><div class="h-lg" style="color:var(--text-muted)">Muay Thai</div></div><span class="badge prem">Filming now</span></div>
<div class="panel mut" style="margin-top:16px;padding:22px 24px;display:flex;gap:20px;align-items:center">
<div style="display:flex;gap:8px;flex:none">
<div class="thumb empty" style="width:96px;aspect-ratio:16/9"><span class="tmark"><span class="g">&#9633;</span></span></div>
<div class="thumb empty" style="width:96px;aspect-ratio:16/9;opacity:.6"><span class="tmark"><span class="g">&#9633;</span></span></div>
<div class="thumb empty" style="width:96px;aspect-ratio:16/9;opacity:.3"><span class="tmark"><span class="g">&#9633;</span></span></div>
</div>
<div style="flex:1;min-width:0">
<div class="h-md dsp" style="font-size:20px">Muay Thai Foundations</div>
<p class="body" style="margin-top:6px">6 courses of stance, striking, defense and combination work. The syllabus is written; the footage is being shot.</p>
</div>
<span class="btn sm" style="flex:none">Notify me</span>
</div>
</div>
<!-- discipline with nothing -->
<div style="margin-top:32px">
<div class="secthead"><div><p class="kick">Discipline</p><div class="h-lg" style="color:var(--text-muted)">Haganah</div></div><span class="badge">Not started</span></div>
<div style="margin-top:16px;border:1px dashed rgba(255,255,255,.12);border-radius:22px;padding:26px;display:flex;gap:18px;align-items:center">
<div style="flex:1;min-width:0">
<p style="margin:0;font-size:15px;line-height:1.6;color:var(--text-muted)">Nothing here yet, and no date on it. Haganah lands after Muay Thai.</p>
</div>
<span class="btn sm" style="flex:none">Notify me</span>
</div>
</div>
</div>
</div>`,
      },
    ],
  },
  {
    id: 'watch',
    eyebrow: '03 · watch',
    title: 'Watch — the rail carries the course',
    note:
      'The lesson rail puts the rest of the course beside the player, which is the format the owner asked for. In the sparse pane the member has opened a lesson that was never filmed: the player says so instead of failing, and its primary action points at the one lesson in that course that does play. With three playable videos, the most useful thing any dead end can do is name a live one.',
    frames: [
      {
        id: 'watch-1012',
        tone: 'target',
        label: 'Populated — the target',
        sub:
          'Four filmed lessons: one watched, one in progress, two ahead.',
        width: 1280,
        html: `<div class="app">
<div class="nav">
<div class="brand"><div class="b1 dsp">Diaz</div><div class="b2">ON DEMAND</div></div>
<div class="navlinks"><span class="navlink on">Library</span><span class="navlink">Favorites</span><span class="navlink">Premium</span><span class="navlink">Account</span></div>
<div class="navright"><span class="chipbtn">Premium active</span><span class="chipbtn solid">Account</span></div>
</div>
<div class="shell" style="padding-top:24px">
<p class="kick" style="margin-bottom:14px"><span style="color:var(--accent-strong)">BJJ</span> &nbsp;/&nbsp; BJJ Fundamentals &nbsp;/&nbsp; Guard Retention &mdash; Defense</p>
<div class="watch">
<div>
<div class="player">
<svg><use href="#st2" /></svg>
<span class="vig"></span>
<span class="bigplay"><span>&#9654;</span></span>
<div class="pctl">
<div class="pscrub"><i style="width:44%"></i><b style="left:44%"></b></div>
<div class="pctlrow"><span class="g">&#10074;&#10074;</span><span class="g">&#128266;</span><span style="font-variant-numeric:tabular-nums">4:26 / 10:04</span><span class="sp"></span><span class="g">1x</span><span class="g">CC</span><span class="g">&#9974;</span><span class="g">&#9974;</span></div>
</div>
</div>
<div style="display:flex;gap:22px;align-items:flex-start;margin-top:20px">
<div style="flex:1;min-width:0">
<div class="dsp" style="font-size:33px;line-height:1.02;margin:0">Hip Escape Recovery Chain</div>
<p class="body" style="margin-top:9px;max-width:600px">Chain the hip escape into a frame reset so the pass never finishes, and recover a workable guard from underneath.</p>
</div>
<div style="display:flex;gap:8px;flex:none;padding-top:6px">
<span class="btn sm">&#9734;&nbsp; Save</span>
<span class="btn sm">Share</span>
</div>
</div>
<div class="panel mut" style="margin-top:18px;padding:16px 18px;display:flex;gap:26px;align-items:center">
<div style="flex:1"><p class="kick" style="font-size:9px">Lesson progress</p><div class="bar" style="margin-top:7px"><i style="width:44%"></i></div></div>
<div style="flex:1"><p class="kick" style="font-size:9px">Course progress</p><div class="bar" style="margin-top:7px"><i style="width:22%"></i></div></div>
<span class="body" style="font-size:11.5px;flex:none">Saved at 4:26</span>
</div>
<div style="margin-top:26px">
<p class="kick" style="margin-bottom:12px">Up next in this course</p>
<div style="display:flex;gap:14px;align-items:center;border:1px solid var(--line);border-radius:18px;padding:12px 16px 12px 12px;background:rgba(255,255,255,.02)">
<div class="thumb" style="width:150px;aspect-ratio:16/9"><svg><use href="#st3" /></svg><span class="dur">7:44</span></div>
<div style="flex:1;min-width:0"><div style="font-size:17px;font-weight:500">Re-guard Timing</div>
<p class="body" style="margin-top:5px;font-size:13px">Lesson 03 &middot; Guard retention &mdash; offense</p></div>
<span class="btn white sm" style="flex:none">Play next</span>
</div>
</div>
</div>
<!-- rail -->
<div class="rail">
<div class="railhead">
<p class="kick" style="font-size:9px">Course</p>
<div class="dsp" style="font-size:20px;line-height:1.1;margin:6px 0 0">Guard Retention &mdash; Defense</div>
<p class="body" style="font-size:12px;margin-top:5px">BJJ Fundamentals &middot; 4 lessons &middot; 38m</p>
<div class="bar" style="margin-top:11px"><i style="width:22%"></i></div>
</div>
<div class="raillist">
<div class="railrow">
<div class="thumb"><svg><use href="#st1" /></svg><span class="dur">9:12</span><span class="tprog"><i style="width:100%"></i></span></div>
<div class="rm"><div class="rt">1. Frame Fundamentals</div><div class="rs"><span style="color:var(--progress)">&#10003; Watched</span><span class="dot"></span><span>Free</span></div></div>
</div>
<div class="railrow now">
<div class="thumb"><svg><use href="#st2" /></svg><span class="dur">10:04</span><span class="tprog"><i style="width:44%"></i></span><span class="play"><span>&#9654;</span></span></div>
<div class="rm"><div class="rt">2. Hip Escape Recovery Chain</div><div class="rs"><span style="color:var(--progress)">Now playing</span><span class="dot"></span><span>Premium</span></div></div>
</div>
<div class="railrow">
<div class="thumb"><svg><use href="#st3" /></svg><span class="dur">7:44</span></div>
<div class="rm"><div class="rt">3. Re-guard Timing</div><div class="rs"><span>Premium</span><span class="dot"></span><span>Guard retention</span></div></div>
</div>
<div class="railrow">
<div class="thumb"><svg><use href="#st5" /></svg><span class="dur">11:18</span></div>
<div class="rm"><div class="rt">4. Inversion and Granby Basics, and When Not To Use Them</div><div class="rs"><span>Premium</span><span class="dot"></span><span>Guard retention</span></div></div>
</div>
</div>
</div>
</div>
</div>
</div>`,
      },
      {
        id: 'watch-1104',
        tone: 'ship',
        label: 'Sparse — what ships first',
        sub:
          'The opened lesson is not filmed. One lesson in the course plays, one is still processing, two were never shot.',
        width: 1280,
        html: `<div class="app">
<div class="nav">
<div class="brand"><div class="b1 dsp">Diaz</div><div class="b2">ON DEMAND</div></div>
<div class="navlinks"><span class="navlink on">Library</span><span class="navlink">Favorites</span><span class="navlink">Premium</span><span class="navlink">Account</span></div>
<div class="navright"><span class="chipbtn">Premium active</span><span class="chipbtn solid">Account</span></div>
</div>
<div class="shell" style="padding-top:24px">
<p class="kick" style="margin-bottom:14px"><span style="color:var(--accent-strong)">BJJ</span> &nbsp;/&nbsp; BJJ Fundamentals &nbsp;/&nbsp; Guard Retention &mdash; Offense</p>
<div class="watch">
<div>
<div class="player blank">
<div class="blankmsg">
<div class="g">&#9633;</div>
<p class="kick" style="margin-top:14px">Not filmed yet</p>
<div class="dsp" style="font-size:26px;margin:10px 0 0">This one has not been shot</div>
<p class="body" style="margin-top:10px;font-size:13.5px">It is written and scheduled. Nothing is broken and there is nothing to wait for on this page.</p>
<div style="display:flex;gap:9px;justify-content:center;margin-top:18px">
<span class="btn white sm">Play what does work</span>
<span class="btn sm">Notify me</span>
</div>
</div>
</div>
<div style="display:flex;gap:22px;align-items:flex-start;margin-top:20px">
<div style="flex:1;min-width:0">
<div class="dsp" style="font-size:33px;line-height:1.02;margin:0">Inversion and Granby Basics</div>
<p class="body" style="margin-top:9px;max-width:600px">The two recoveries most often taught badly, drilled slowly, with the failure modes shown first.</p>
</div>
<div style="display:flex;gap:8px;flex:none;padding-top:6px">
<span class="btn sm" style="opacity:.45">&#9734;&nbsp; Save</span>
<span class="btn sm" style="opacity:.45">Share</span>
</div>
</div>
<div class="panel mut" style="margin-top:18px;padding:16px 18px;display:flex;gap:26px;align-items:center;opacity:.55">
<div style="flex:1"><p class="kick" style="font-size:9px">Lesson progress</p><div class="bar" style="margin-top:7px"><i style="width:0%"></i></div></div>
<div style="flex:1"><p class="kick" style="font-size:9px">Course progress</p><div class="bar" style="margin-top:7px"><i style="width:50%"></i></div></div>
<span class="body" style="font-size:11.5px;flex:none">No runtime yet</span>
</div>
<div style="margin-top:26px">
<p class="kick" style="margin-bottom:12px">While you are here</p>
<div style="display:flex;gap:14px;align-items:center;border:1px solid var(--line);border-radius:18px;padding:12px 16px 12px 12px;background:rgba(255,255,255,.02)">
<div class="thumb" style="width:150px;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="dur">9:12</span></div>
<div style="flex:1;min-width:0"><div style="font-size:17px;font-weight:500">Frame Fundamentals</div>
<p class="body" style="margin-top:5px;font-size:13px">The prerequisite for this lesson, and it plays today</p></div>
<span class="btn white sm" style="flex:none">Play</span>
</div>
</div>
</div>
<!-- rail -->
<div class="rail">
<div class="railhead">
<p class="kick" style="font-size:9px">Course</p>
<div class="dsp" style="font-size:20px;line-height:1.1;margin:6px 0 0">Guard Retention &mdash; Offense</div>
<p class="body" style="font-size:12px;margin-top:5px">BJJ Fundamentals &middot; <span style="color:var(--progress)">1 of 4 filmed</span> &middot; 7m available</p>
<div class="bar" style="margin-top:11px"><i style="width:25%;background:rgba(53,224,161,.5)"></i></div>
</div>
<div class="raillist">
<div class="railrow">
<div class="thumb"><svg><use href="#st3" /></svg><span class="dur">7:44</span></div>
<div class="rm"><div class="rt">1. Re-guard Timing</div><div class="rs"><span style="color:var(--progress)">Plays now</span><span class="dot"></span><span>Premium</span></div></div>
</div>
<div class="railrow">
<div class="thumb wait"><span class="tmark"><span class="t" style="font-size:7.5px">Processing</span></span></div>
<div class="rm"><div class="rt">2. Hip Switch Under Pressure</div><div class="rs"><span style="color:var(--premium)">Uploaded</span><span class="dot"></span><span>Ready shortly</span></div></div>
</div>
<div class="railrow now off">
<div class="thumb empty"><span class="tmark"><span class="g">&#9633;</span></span></div>
<div class="rm"><div class="rt">3. Inversion and Granby Basics</div><div class="rs"><span>Not filmed</span><span class="dot"></span><span>Premium</span></div></div>
</div>
<div class="railrow off">
<div class="thumb empty"><span class="tmark"><span class="g">&#9633;</span></span></div>
<div class="rm"><div class="rt">4. Leg Entanglement Escapes</div><div class="rs"><span>Not filmed</span><span class="dot"></span><span>Premium</span></div></div>
</div>
</div>
</div>
</div>
</div>
</div>`,
      },
    ],
  },
  {
    id: 'locked',
    eyebrow: '03b · the paywall',
    title: 'The same lesson, seen by a free member',
    note:
      'A paid lesson keeps its title, its course, and its runtime; only the video is withheld. Whether the blurred frame behind the lock is served to a signed-out visitor at all is the one question this work deliberately left open.',
    frames: [
      {
        id: 'locked-1210',
        tone: 'neutral',
        label: 'Locked — free member, paid lesson',
        sub: null,
        width: 1280,
        html: `<div class="app">
<div class="nav">
<div class="brand"><div class="b1 dsp">Diaz</div><div class="b2">ON DEMAND</div></div>
<div class="navlinks"><span class="navlink on">Library</span><span class="navlink">Favorites</span><span class="navlink">Premium</span><span class="navlink">Account</span></div>
<div class="navright"><span class="chipbtn">Member access</span><span class="chipbtn solid">Account</span></div>
</div>
<div class="shell" style="padding-top:24px;padding-bottom:34px">
<p class="kick" style="margin-bottom:14px"><span style="color:var(--accent-strong)">BJJ</span> &nbsp;/&nbsp; BJJ Fundamentals &nbsp;/&nbsp; Guard Retention &mdash; Defense</p>
<div class="watch">
<div>
<div class="player locked">
<div class="thumb blurred" style="position:absolute;inset:0;border-radius:0;border:0"><svg><use href="#st2" /></svg></div>
<div class="lockover">
<div style="text-align:center;max-width:460px;padding:20px">
<span class="badge prem">Premium lesson</span>
<div class="dsp" style="font-size:30px;margin:14px 0 0;line-height:1.05">Hip Escape Recovery Chain</div>
<p class="body" style="margin-top:9px;font-size:13.5px">10:04 &middot; Guard Retention &mdash; Defense. Lesson 1 of this course is free and plays right now.</p>
<div style="display:flex;gap:9px;justify-content:center;margin-top:18px">
<span class="btn white sm">See premium access</span>
<span class="btn sm">Watch lesson 1 free</span>
</div>
</div>
</div>
</div>
<div style="margin-top:18px">
<div class="dsp" style="font-size:31px;line-height:1.02;margin:0">Hip Escape Recovery Chain</div>
<p class="body" style="margin-top:9px;max-width:600px">Chain the hip escape into a frame reset so the pass never finishes, and recover a workable guard from underneath.</p>
</div>
</div>
<div class="rail">
<div class="railhead">
<p class="kick" style="font-size:9px">Course</p>
<div class="dsp" style="font-size:20px;line-height:1.1;margin:6px 0 0">Guard Retention &mdash; Defense</div>
<p class="body" style="font-size:12px;margin-top:5px">4 lessons &middot; 38m &middot; <span style="color:var(--progress)">1 free</span></p>
</div>
<div class="raillist">
<div class="railrow"><div class="thumb"><svg><use href="#st1" /></svg><span class="dur">9:12</span></div>
<div class="rm"><div class="rt">1. Frame Fundamentals</div><div class="rs"><span style="color:var(--progress)">Free &mdash; plays now</span></div></div></div>
<div class="railrow now"><div class="thumb blurred"><svg><use href="#st2" /></svg><span class="lockwrap"><span style="font-size:12px">&#128274;</span></span></div>
<div class="rm"><div class="rt">2. Hip Escape Recovery Chain</div><div class="rs"><span class="badge prem" style="font-size:8px;padding:2px 7px">Premium</span><span class="dot"></span><span>10:04</span></div></div></div>
<div class="railrow"><div class="thumb blurred"><svg><use href="#st3" /></svg><span class="lockwrap"><span style="font-size:12px">&#128274;</span></span></div>
<div class="rm"><div class="rt">3. Re-guard Timing</div><div class="rs"><span class="badge prem" style="font-size:8px;padding:2px 7px">Premium</span><span class="dot"></span><span>7:44</span></div></div></div>
<div class="railrow"><div class="thumb blurred"><svg><use href="#st5" /></svg><span class="lockwrap"><span style="font-size:12px">&#128274;</span></span></div>
<div class="rm"><div class="rt">4. Inversion and Granby Basics</div><div class="rs"><span class="badge prem" style="font-size:8px;padding:2px 7px">Premium</span><span class="dot"></span><span>11:18</span></div></div></div>
</div>
</div>
</div>
</div>
</div>`,
      },
    ],
  },
  {
    id: 'phone',
    eyebrow: '04 · phone',
    title: 'Both screens at 390px',
    note:
      'The rail becomes a list under the player and the library keeps expand-in-place. The sparse panes are the same decision at phone width: nothing is hidden to make the catalogue look fuller than it is.',
    frames: [
      {
        id: 'phone-1289',
        tone: 'target',
        label: 'Watch · populated',
        sub: null,
        width: 390,
        html: `<div class="app phone">
<div class="nav"><div class="brand"><div class="b1 dsp" style="font-size:17px">Diaz</div><div class="b2" style="font-size:8px">ON DEMAND</div></div><span class="chipbtn" style="padding:6px 11px;font-size:9px">Account</span></div>
<div class="player" style="border-radius:0;border-left:0;border-right:0;border-top:0">
<svg><use href="#st2" /></svg><span class="vig"></span>
<span class="bigplay"><span style="width:46px;height:46px;font-size:14px">&#9654;</span></span>
<div class="pctl" style="padding:9px 12px 10px"><div class="pscrub"><i style="width:44%"></i><b style="left:44%"></b></div>
<div class="pctlrow" style="font-size:10px;gap:10px;margin-top:8px"><span class="g">&#10074;&#10074;</span><span style="font-variant-numeric:tabular-nums">4:26 / 10:04</span><span class="sp"></span><span class="g">1x</span><span class="g">&#9974;</span></div></div>
</div>
<div class="shell" style="padding-top:16px">
<p class="kick" style="font-size:9px">Guard Retention &mdash; Defense &middot; 02</p>
<div class="dsp" style="font-size:24px;line-height:1.06;margin:8px 0 0">Hip Escape Recovery Chain</div>
<p class="body" style="font-size:13px;margin-top:8px">Chain the hip escape into a frame reset so the pass never finishes.</p>
<div style="display:flex;gap:7px;margin-top:14px"><span class="btn sm" style="font-size:9.5px;padding:8px 13px">&#9734; Save</span><span class="btn sm" style="font-size:9.5px;padding:8px 13px">Share</span></div>
<div class="panel mut" style="margin-top:14px;padding:12px 14px"><p class="kick" style="font-size:8.5px">Lesson progress</p><div class="bar" style="margin-top:6px"><i style="width:44%"></i></div></div>
<div style="margin-top:24px">
<div class="secthead"><div><p class="kick" style="font-size:9px">In this course</p><div class="dsp" style="font-size:19px;margin:5px 0 0">4 lessons &middot; 38m</div></div></div>
<div style="display:flex;flex-direction:column;gap:2px;margin-top:12px">
<div class="railrow"><div class="thumb" style="width:88px"><svg><use href="#st1" /></svg><span class="dur" style="font-size:8.5px">9:12</span><span class="tprog"><i style="width:100%"></i></span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">1. Frame Fundamentals</div><div class="rs" style="font-size:8.5px"><span style="color:var(--progress)">&#10003; Watched</span></div></div></div>
<div class="railrow now"><div class="thumb" style="width:88px"><svg><use href="#st2" /></svg><span class="dur" style="font-size:8.5px">10:04</span><span class="tprog"><i style="width:44%"></i></span><span class="play"><span style="width:20px;height:20px;font-size:6px">&#9654;</span></span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">2. Hip Escape Recovery Chain</div><div class="rs" style="font-size:8.5px"><span style="color:var(--progress)">Now playing</span></div></div></div>
<div class="railrow"><div class="thumb" style="width:88px"><svg><use href="#st3" /></svg><span class="dur" style="font-size:8.5px">7:44</span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">3. Re-guard Timing</div><div class="rs" style="font-size:8.5px"><span>Premium</span></div></div></div>
<div class="railrow"><div class="thumb" style="width:88px"><svg><use href="#st5" /></svg><span class="dur" style="font-size:8.5px">11:18</span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">4. Inversion and Granby Basics, and When Not To Use Them</div><div class="rs" style="font-size:8.5px"><span>Premium</span></div></div></div>
</div>
</div>
<div style="height:70px"></div>
</div>
<div style="margin:0 16px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(18,21,26,.94);display:flex;padding:5px">
<span class="navlink on" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Library</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Saved</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Premium</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Account</span>
</div>
</div>`,
      },
      {
        id: 'phone-1331',
        tone: 'ship',
        label: 'Watch · sparse',
        sub: null,
        width: 390,
        html: `<div class="app phone">
<div class="nav"><div class="brand"><div class="b1 dsp" style="font-size:17px">Diaz</div><div class="b2" style="font-size:8px">ON DEMAND</div></div><span class="chipbtn" style="padding:6px 11px;font-size:9px">Account</span></div>
<div class="player blank" style="border-radius:0;border-left:0;border-right:0;border-top:0;padding:18px">
<div class="blankmsg"><div class="g" style="font-size:24px">&#9633;</div>
<p class="kick" style="margin-top:10px;font-size:9px">Not filmed yet</p>
<div class="dsp" style="font-size:20px;margin:8px 0 0">This one has not been shot</div>
<p class="body" style="margin-top:7px;font-size:12px">It is written and scheduled. Nothing is broken.</p>
<div style="display:flex;gap:7px;justify-content:center;margin-top:13px"><span class="btn white sm" style="font-size:9px;padding:8px 12px">Play what works</span><span class="btn sm" style="font-size:9px;padding:8px 12px">Notify me</span></div></div>
</div>
<div class="shell" style="padding-top:16px">
<p class="kick" style="font-size:9px">Guard Retention &mdash; Offense &middot; 03</p>
<div class="dsp" style="font-size:24px;line-height:1.06;margin:8px 0 0">Inversion and Granby Basics</div>
<p class="body" style="font-size:13px;margin-top:8px">The two recoveries most often taught badly, drilled slowly.</p>
<div style="margin-top:22px">
<div class="secthead"><div><p class="kick" style="font-size:9px">In this course</p><div class="dsp" style="font-size:19px;margin:5px 0 0"><span style="color:var(--progress)">1 of 4</span> filmed</div></div></div>
<div style="display:flex;flex-direction:column;gap:2px;margin-top:12px">
<div class="railrow"><div class="thumb" style="width:88px"><svg><use href="#st3" /></svg><span class="dur" style="font-size:8.5px">7:44</span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">1. Re-guard Timing</div><div class="rs" style="font-size:8.5px"><span style="color:var(--progress)">Plays now</span></div></div></div>
<div class="railrow"><div class="thumb wait" style="width:88px"><span class="tmark"><span class="t" style="font-size:6.5px">Processing</span></span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">2. Hip Switch Under Pressure</div><div class="rs" style="font-size:8.5px"><span style="color:var(--premium)">Uploaded</span></div></div></div>
<div class="railrow now off"><div class="thumb empty" style="width:88px"><span class="tmark"><span class="g" style="font-size:11px">&#9633;</span></span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">3. Inversion and Granby Basics</div><div class="rs" style="font-size:8.5px"><span>Not filmed</span></div></div></div>
<div class="railrow off"><div class="thumb empty" style="width:88px"><span class="tmark"><span class="g" style="font-size:11px">&#9633;</span></span></div>
<div class="rm"><div class="rt" style="font-size:12.5px">4. Leg Entanglement Escapes</div><div class="rs" style="font-size:8.5px"><span>Not filmed</span></div></div></div>
</div>
</div>
<div style="height:70px"></div>
</div>
<div style="margin:0 16px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(18,21,26,.94);display:flex;padding:5px">
<span class="navlink on" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Library</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Saved</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Premium</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Account</span>
</div>
</div>`,
      },
      {
        id: 'phone-1372',
        tone: 'target',
        label: 'Library · populated',
        sub: null,
        width: 390,
        html: `<div class="app phone">
<div class="nav"><div class="brand"><div class="b1 dsp" style="font-size:17px">Diaz</div><div class="b2" style="font-size:8px">ON DEMAND</div></div><span class="chipbtn" style="padding:6px 11px;font-size:9px">Account</span></div>
<div class="shell" style="padding-top:22px">
<p class="kick acc" style="font-size:9px">Student Library</p>
<div class="dsp" style="font-size:34px;line-height:.96;margin:8px 0 0">Train On<br>Demand</div>
<div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap"><span class="badge go">All</span><span class="badge">BJJ</span><span class="badge">Muay Thai</span><span class="badge">Haganah</span></div>
<div style="margin-top:26px">
<p class="kick" style="font-size:9px">Progress first</p><div class="dsp" style="font-size:20px;margin:5px 0 0">Continue watching</div>
<div style="display:flex;gap:10px;margin-top:12px;overflow:hidden">
<div style="width:180px;flex:none"><div class="thumb" style="width:100%;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="dur" style="font-size:8.5px">10:04</span><span class="tprog"><i style="width:44%"></i></span></div>
<div style="font-size:12.5px;font-weight:500;margin-top:7px;line-height:1.3">Hip Escape Recovery Chain</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">5:38 left</div></div>
<div style="width:180px;flex:none"><div class="thumb" style="width:100%;aspect-ratio:16/9"><svg><use href="#st4" /></svg><span class="dur" style="font-size:8.5px">9:20</span><span class="tprog"><i style="width:71%"></i></span></div>
<div style="font-size:12.5px;font-weight:500;margin-top:7px;line-height:1.3">Teeps, Round Kicks &amp; Checks</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">2:42 left</div></div>
</div>
</div>
<div style="margin-top:28px">
<p class="kick" style="font-size:9px">Discipline</p><div class="dsp" style="font-size:20px;margin:5px 0 0">BJJ</div>
<div style="margin-top:12px">
<div class="courserow open" style="padding:9px 8px;gap:11px">
<div class="thumb" style="width:96px;aspect-ratio:16/9"><svg><use href="#st1" /></svg></div>
<div class="meta"><div class="t" style="font-size:13.5px">Guard Retention &mdash; Defense</div>
<div class="s" style="font-size:10.5px;gap:5px"><span>2 lessons</span><span class="sep">/</span><span>19m</span></div>
<div class="bar" style="margin-top:6px;height:4px"><i style="width:22%"></i></div></div>
<div class="right"><span class="chev" style="font-size:11px">&#9654;</span></div>
</div>
<div class="expand" data-open="1"><div class="expandbody" style="padding:2px 8px 12px"><div class="expandinner" style="padding:12px;border-radius:16px">
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb" style="width:76px;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="tprog"><i style="width:100%"></i></span></div>
<div class="lm"><div class="lt" style="font-size:12.5px">01 &nbsp;Frame Fundamentals</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span style="color:var(--progress)">&#10003; 9:12</span></div></div></div>
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb" style="width:76px;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="tprog"><i style="width:44%"></i></span></div>
<div class="lm"><div class="lt" style="font-size:12.5px">02 &nbsp;Hip Escape Recovery Chain</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span>10:04</span></div></div></div>
</div>
<div style="margin-top:11px"><span class="btn white sm" style="font-size:9px;padding:8px 13px">Continue &mdash; 5:38 left</span></div>
</div></div></div>
<div class="courserow" style="padding:9px 8px;gap:11px">
<div class="thumb" style="width:96px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="meta"><div class="t" style="font-size:13.5px">Guard Retention &mdash; Offense</div><div class="s" style="font-size:10.5px;gap:5px"><span>2 lessons</span><span class="sep">/</span><span>18m</span></div></div>
<div class="right"><span class="chev" style="font-size:11px">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody" style="padding:2px 8px 12px"><div class="expandinner" style="padding:12px;border-radius:16px"><p class="body" style="margin:0;font-size:12px">One open at a time on phone too &mdash; two open panels is longer than the viewport.</p></div></div></div>
<div class="courserow" style="padding:9px 8px;gap:11px">
<div class="thumb" style="width:96px;aspect-ratio:16/9"><svg><use href="#st5" /></svg></div>
<div class="meta"><div class="t" style="font-size:13.5px">Guard Passing &mdash; Defense</div><div class="s" style="font-size:10.5px;gap:5px"><span>2 lessons</span><span class="sep">/</span><span>19m</span></div></div>
<div class="right"><span class="chev" style="font-size:11px">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody" style="padding:2px 8px 12px"><div class="expandinner" style="padding:12px;border-radius:16px"><p class="body" style="margin:0;font-size:12px">&mdash;</p></div></div></div>
</div>
</div>
<div style="height:70px"></div>
</div>
<div style="margin:0 16px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(18,21,26,.94);display:flex;padding:5px">
<span class="navlink on" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Library</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Saved</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Premium</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Account</span>
</div>
</div>`,
      },
      {
        id: 'phone-1438',
        tone: 'ship',
        label: 'Library · sparse',
        sub: null,
        width: 390,
        html: `<div class="app phone">
<div class="nav"><div class="brand"><div class="b1 dsp" style="font-size:17px">Diaz</div><div class="b2" style="font-size:8px">ON DEMAND</div></div><span class="chipbtn" style="padding:6px 11px;font-size:9px">Account</span></div>
<div class="shell" style="padding-top:22px">
<p class="kick acc" style="font-size:9px">Student Library</p>
<div class="dsp" style="font-size:34px;line-height:.96;margin:8px 0 0">Train On<br>Demand</div>
<p class="body" style="font-size:12.5px;margin-top:9px">Everything with a thumbnail plays today.</p>
<div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap"><span class="badge go">All</span><span class="badge">BJJ &middot; 3</span><span class="badge" style="opacity:.5">Muay Thai &middot; 0</span><span class="badge" style="opacity:.5">Haganah &middot; 0</span></div>
<div style="margin-top:26px">
<p class="kick" style="font-size:9px">Available now</p><div class="dsp" style="font-size:20px;margin:5px 0 0">Everything that plays</div>
<div style="display:flex;gap:10px;margin-top:12px;overflow:hidden">
<div style="width:180px;flex:none"><div class="thumb" style="width:100%;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="dur" style="font-size:8.5px">9:12</span><span class="tprog"><i style="width:100%"></i></span></div>
<div style="font-size:12.5px;font-weight:500;margin-top:7px;line-height:1.3">Frame Fundamentals</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">Watched</div></div>
<div style="width:180px;flex:none"><div class="thumb" style="width:100%;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="dur" style="font-size:8.5px">10:04</span><span class="tprog"><i style="width:44%"></i></span></div>
<div style="font-size:12.5px;font-weight:500;margin-top:7px;line-height:1.3">Hip Escape Recovery Chain</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">5:38 left</div></div>
</div>
</div>
<div style="margin-top:28px">
<p class="kick" style="font-size:9px">Discipline</p><div class="dsp" style="font-size:20px;margin:5px 0 0">BJJ &nbsp;<span class="body" style="font-size:11px">3 of 16 filmed</span></div>
<div style="margin-top:12px">
<div class="courserow open" style="padding:9px 8px;gap:11px">
<div class="thumb" style="width:96px;aspect-ratio:16/9"><svg><use href="#st1" /></svg></div>
<div class="meta"><div class="t" style="font-size:13.5px">Guard Retention &mdash; Defense</div>
<div class="s" style="font-size:10.5px;gap:5px"><span style="color:var(--progress)">2 of 2 filmed</span><span class="sep">/</span><span>19m</span></div></div>
<div class="right"><span class="chev" style="font-size:11px">&#9654;</span></div>
</div>
<div class="expand" data-open="1"><div class="expandbody" style="padding:2px 8px 12px"><div class="expandinner" style="padding:12px;border-radius:16px">
<div style="display:flex;flex-direction:column;gap:2px">
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb" style="width:76px;aspect-ratio:16/9"><svg><use href="#st1" /></svg><span class="tprog"><i style="width:100%"></i></span></div>
<div class="lm"><div class="lt" style="font-size:12.5px">01 &nbsp;Frame Fundamentals</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span style="color:var(--progress)">&#10003; 9:12</span></div></div></div>
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb" style="width:76px;aspect-ratio:16/9"><svg><use href="#st2" /></svg><span class="tprog"><i style="width:44%"></i></span></div>
<div class="lm"><div class="lt" style="font-size:12.5px">02 &nbsp;Hip Escape Recovery Chain</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span>10:04</span></div></div></div>
</div>
</div></div></div>
<div class="courserow" style="padding:9px 8px;gap:11px">
<div class="thumb" style="width:96px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="meta"><div class="t" style="font-size:13.5px">Guard Retention &mdash; Offense</div><div class="s" style="font-size:10.5px;gap:5px"><span style="color:var(--premium)">1 of 2 filmed</span></div></div>
<div class="right"><span class="chev" style="font-size:11px">&#9654;</span></div>
</div>
<div class="expand"><div class="expandbody" style="padding:2px 8px 12px"><div class="expandinner" style="padding:12px;border-radius:16px">
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb" style="width:76px;aspect-ratio:16/9"><svg><use href="#st3" /></svg></div>
<div class="lm"><div class="lt" style="font-size:12.5px">01 &nbsp;Re-guard Timing</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span>7:44</span></div></div></div>
<div class="lessonrow" style="padding:6px;gap:9px"><div class="thumb wait" style="width:76px;aspect-ratio:16/9"><span class="tmark"><span class="t" style="font-size:6px">Processing</span></span></div>
<div class="lm"><div class="lt" style="font-size:12.5px;color:var(--text-muted)">02 &nbsp;Inversion and Granby Basics</div><div class="ls" style="font-size:8.5px;margin-top:3px"><span style="color:var(--premium)">Ready shortly</span></div></div></div>
</div></div></div>
<div style="border:1px dashed rgba(255,255,255,.13);border-radius:16px;padding:12px;margin-top:9px;display:flex;gap:11px;align-items:center">
<div class="thumb empty" style="width:66px;aspect-ratio:16/9"><span class="tmark"><span class="g" style="font-size:10px">&#9633;</span></span></div>
<p style="margin:0;font-size:11.5px;line-height:1.45;color:var(--text-muted)"><strong style="color:var(--text)">6 courses, 12 lessons</strong> scripted, not yet filmed</p>
</div>
</div>
</div>
<div style="margin-top:24px">
<p class="kick" style="font-size:9px">Discipline</p>
<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:5px"><div class="dsp" style="font-size:20px;margin:0;color:var(--text-muted)">Muay Thai</div><span class="badge prem">Filming now</span></div>
<div class="panel mut" style="margin-top:10px;padding:14px">
<div style="display:flex;gap:6px"><div class="thumb empty" style="width:64px;aspect-ratio:16/9"></div><div class="thumb empty" style="width:64px;aspect-ratio:16/9;opacity:.6"></div><div class="thumb empty" style="width:64px;aspect-ratio:16/9;opacity:.3"></div></div>
<p class="body" style="font-size:12px;margin-top:10px">6 courses written, footage being shot.</p>
<span class="btn sm" style="font-size:9px;padding:7px 12px;margin-top:9px;display:inline-flex">Notify me</span>
</div>
</div>
<div style="margin-top:20px">
<p class="kick" style="font-size:9px">Discipline</p>
<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:5px"><div class="dsp" style="font-size:20px;margin:0;color:var(--text-muted)">Haganah</div><span class="badge">Not started</span></div>
<div style="margin-top:10px;border:1px dashed rgba(255,255,255,.12);border-radius:16px;padding:14px"><p class="body" style="font-size:12px;margin:0">Nothing here yet, and no date on it.</p></div>
</div>
<div style="height:70px"></div>
</div>
<div style="margin:0 16px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(18,21,26,.94);display:flex;padding:5px">
<span class="navlink on" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Library</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Saved</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Premium</span>
<span class="navlink" style="flex:1;text-align:center;font-size:9px;padding:8px 0">Account</span>
</div>
</div>`,
      },
    ],
  },
];
