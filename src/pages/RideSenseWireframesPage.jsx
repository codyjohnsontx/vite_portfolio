import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';
import './RideSenseWireframesPage.css';

const WIREFRAMES_BODY = `
  <header class="page-head">
    <h1 class="page-title">RideSense<small>Lo-fi wireframes · core flows · early exploration</small></h1>
    <div class="page-meta">
      <span class="tape">v0 · pencil pass</span>
    </div>
  </header>

  <div class="board">

    <!-- 01 · DASHBOARD -->
    <section class="sheet" id="sheet-dashboard" data-screen-label="01">
      <div class="sheet-tab">01 · Dashboard</div>
      <div class="flow-arrow">➜</div>

      <div class="frame">
        <div class="browser-bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <span class="url"><span class="url-lbl">ridesense.app / dashboard</span></span>
        </div>

        <div class="wf">
          <div class="wf-side">
            <div class="row" style="align-items:center; gap:6px; margin-bottom:2px;">
              <span class="box" style="width:18px; height:18px; border-radius:5px; background:var(--wf-ink);"></span>
              <span class="lbl" style="font-size:11px;">RideSense</span>
            </div>
            <div class="nav-item on"><span class="ic"></span><span class="lbl sm">Dashboard</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Activities</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Plan</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Compare</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Ask</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Connections</span></div>
            <div style="margin-top:auto;"></div>
            <div class="box soft pad" style="padding:7px 8px;">
              <span class="lbl sm">Last sync</span>
              <div class="ln lt" style="width:80%; margin-top:5px;"></div>
            </div>
          </div>

          <div class="wf-main">
            <div class="row" style="justify-content:space-between; align-items:center;">
              <div class="stack">
                <span class="lbl sm">Last 28 days</span>
                <span class="mono-tag">State of training</span>
              </div>
              <div class="row" style="align-items:center;">
                <span class="chip soft">4w</span><span class="chip">12w</span><span class="chip soft">1y</span>
                <span class="btn">Export</span><span class="btn fill">Sync</span>
              </div>
            </div>

            <div class="grid-3">
              <div class="box pad stack" style="gap:7px;">
                <span class="chip" style="align-self:flex-start;">● Building</span>
                <div class="stack" style="gap:4px;">
                  <div class="ln ink" style="width:95%; height:8px;"></div>
                  <div class="ln ink" style="width:70%; height:8px;"></div>
                </div>
                <div class="row" style="margin-top:4px; border-top:1.4px solid var(--wf-pencil); padding-top:6px;">
                  <div class="stack" style="flex:1; gap:2px;"><span class="lbl sm">CTL</span><span class="big-num" style="font-size:20px;">80</span></div>
                  <div class="stack" style="flex:1; gap:2px;"><span class="lbl sm">ATL</span><span class="big-num" style="font-size:20px;">105</span></div>
                  <div class="stack" style="flex:1; gap:2px;"><span class="lbl sm">TSB</span><span class="big-num" style="font-size:20px; color:var(--wf-pen);">-25</span></div>
                </div>
              </div>

              <div class="box b2 pad stack" style="gap:6px;">
                <div class="row" style="justify-content:space-between;"><span class="lbl">Form / fitness curve</span><span class="lbl sm">CTL · ATL · TSB</span></div>
                <svg class="chart" viewBox="0 0 240 96" preserveAspectRatio="none" style="height:92px;">
                  <line class="grid" x1="0" y1="24" x2="240" y2="24" /><line class="grid" x1="0" y1="48" x2="240" y2="48" /><line class="grid" x1="0" y1="72" x2="240" y2="72" />
                  <path class="fillpaper" d="M0,72 C50,66 100,56 150,40 C190,28 220,22 240,18 L240,96 L0,96 Z" />
                  <path class="ink-line" d="M0,72 C50,66 100,56 150,40 C190,28 220,22 240,18" />
                  <path class="gray-line" d="M0,58 C45,52 95,60 140,44 C185,30 215,40 240,30" />
                  <path class="dash" d="M0,40 C60,52 120,46 175,60 C205,68 225,64 240,70" />
                </svg>
              </div>

              <div class="box b3 pad stack" style="gap:3px;">
                <span class="lbl sm">Week · TSS</span>
                <span class="big-num">720</span>
                <span class="chip" style="align-self:flex-start;">▲ +11%</span>
                <div class="bars" style="margin-top:4px; height:26px;"><i style="height:40%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:90%"></i></div>
              </div>
            </div>

            <div class="grid-3b">
              <div class="box pad stack" style="gap:7px;">
                <span class="lbl">Zone distribution</span>
                <div class="zbar"><i style="width:18%; background:var(--wf-pencil2)"></i><i style="width:41%; background:var(--wf-pencil)"></i><i style="width:16%; background:var(--wf-ink2)"></i><i style="width:15%; background:var(--wf-ink)"></i><i style="width:10%; background:var(--wf-pen)"></i></div>
                <div class="stack" style="gap:4px; margin-top:2px;"><div class="ln lt" style="width:90%"></div><div class="ln lt" style="width:75%"></div></div>
              </div>
              <div class="box b2 pad stack" style="gap:7px;">
                <span class="lbl">Signals <span class="lbl sm">· 3 active</span></span>
                <div class="row" style="gap:6px;"><span class="ic box" style="width:11px;height:11px;border-radius:3px;flex:none;"></span><div class="stack" style="flex:1;gap:3px;"><div class="ln" style="width:80%"></div><div class="ln lt" style="width:95%"></div></div></div>
                <div class="row" style="gap:6px;"><span class="ic box" style="width:11px;height:11px;border-radius:3px;flex:none;"></span><div class="stack" style="flex:1;gap:3px;"><div class="ln" style="width:65%"></div><div class="ln lt" style="width:90%"></div></div></div>
              </div>
              <div class="box b3 pad stack" style="gap:7px;">
                <div class="row" style="justify-content:space-between;"><span class="lbl">Ask your data</span><span class="chip soft">⌘K</span></div>
                <div class="box soft" style="padding:5px 8px;"><span class="lbl sm">Am I building endurance?</span></div>
                <div class="box soft pad" style="background:#f5f2ea; padding:7px 8px;">
                  <span class="chip" style="font-size:9px;">● cites 5 metrics</span>
                  <div class="ln" style="width:95%; margin-top:5px;"></div>
                  <div class="ln lt" style="width:70%; margin-top:4px;"></div>
                  <div class="row" style="margin-top:6px; gap:4px;"><span class="chip soft">+11%</span><span class="chip soft">41%</span><span class="chip soft">0.74</span></div>
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="box pad stack" style="gap:0;">
                <span class="lbl" style="margin-bottom:4px;">Recent activities</span>
                <div class="tbl">
                  <div class="tr head"><span class="lbl sm">Date</span><span class="lbl sm">Workout</span><span class="lbl sm">Cat</span><span class="lbl sm" style="text-align:right;">TSS</span></div>
                  <div class="tr"><div class="ln lt"></div><div class="ln"></div><span class="chip soft" style="font-size:9px;">Out</span><div class="ln" style="justify-self:end; width:50%;"></div></div>
                  <div class="tr"><div class="ln lt"></div><div class="ln" style="width:80%"></div><span class="chip soft" style="font-size:9px;">In</span><div class="ln" style="justify-self:end; width:50%;"></div></div>
                  <div class="tr"><div class="ln lt"></div><div class="ln" style="width:90%"></div><span class="chip soft" style="font-size:9px;">Out</span><div class="ln" style="justify-self:end; width:50%;"></div></div>
                </div>
              </div>
              <div class="box b2 pad stack" style="gap:7px;">
                <span class="lbl">Training heatmap</span>
                <div class="heat">
                  <i class="m"></i><i class="h"></i><i></i><i class="x"></i><i class="m"></i><i></i><i class="h"></i><i class="m"></i><i class="x"></i><i></i><i class="m"></i><i class="h"></i>
                  <i></i><i class="m"></i><i class="x"></i><i class="m"></i><i></i><i class="h"></i><i class="m"></i><i></i><i class="h"></i><i class="x"></i><i></i><i class="m"></i>
                  <i class="h"></i><i></i><i class="m"></i><i class="h"></i><i class="x"></i><i></i><i class="m"></i><i class="h"></i><i></i><i class="m"></i><i class="x"></i><i></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span class="pin" style="left:118px; top:118px;">1</span>
        <span class="pin" style="left:295px; top:108px;">2</span>
        <span class="pin" style="right:108px; top:300px;">3</span>
        <span class="pin" style="left:120px; bottom:54px;">4</span>
      </div>

      <div class="notes">
        <div class="note"><span class="n">1</span><p><b>Verdict first.</b> <span>A plain-language headline backed by the 3 core numbers — deterministic metrics lead, interpretation follows.</span></p></div>
        <div class="note"><span class="n">2</span><p><b>The form curve is the hero.</b> <span>84-day CTL / ATL / TSB rolling window — the one chart that answers "how am I trending?"</span></p></div>
        <div class="note"><span class="n">3</span><p><b>Ask, embedded.</b> <span>An answer lives on the dashboard and cites every metric it used as chips — trust built in.</span></p></div>
        <div class="note"><span class="n">4</span><p><b>Activities by stress.</b> <span>The recent table ranks by training contribution, not just date.</span></p></div>
      </div>
    </section>

    <!-- 02 · ACTIVITY -->
    <section class="sheet" id="sheet-activity" data-screen-label="02">
      <div class="sheet-tab">02 · Activity detail</div>
      <div class="flow-arrow">➜</div>

      <div class="frame">
        <div class="browser-bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <span class="url"><span class="url-lbl">ridesense.app / activities / threshold-4x10</span></span>
        </div>

        <div class="wf">
          <div class="wf-side">
            <div class="row" style="align-items:center; gap:6px; margin-bottom:2px;">
              <span class="box" style="width:18px; height:18px; border-radius:5px; background:var(--wf-ink);"></span>
              <span class="lbl" style="font-size:11px;">RideSense</span>
            </div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Dashboard</span></div>
            <div class="nav-item on"><span class="ic"></span><span class="lbl sm">Activities</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Plan</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Compare</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Ask</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Connections</span></div>
          </div>

          <div class="wf-main">
            <div class="row" style="justify-content:space-between; align-items:center;">
              <div class="stack">
                <span class="lbl sm">Tue · 22 Apr · 06:14</span>
                <span class="mono-tag">Threshold 4 × 10 min</span>
              </div>
              <div class="row"><span class="btn">Export FIT</span><span class="btn">Comments</span><span class="btn fill">Analyze</span></div>
            </div>

            <div class="grid-6">
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">Dur</span><span class="big-num" style="font-size:17px;">1:34</span></div>
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">TSS</span><span class="big-num" style="font-size:17px;">112</span></div>
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">NP</span><span class="big-num" style="font-size:17px;">264</span></div>
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">HR</span><span class="big-num" style="font-size:17px;">162</span></div>
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">kJ</span><span class="big-num" style="font-size:17px;">1420</span></div>
              <div class="box soft pad stack" style="padding:7px 8px; gap:2px;"><span class="lbl sm">VI</span><span class="big-num" style="font-size:17px;">1.05</span></div>
            </div>

            <div class="box pad stack" style="gap:7px;">
              <div class="row" style="justify-content:space-between; align-items:center;">
                <span class="lbl">Power <span class="lbl sm">· 1-sec · interval markers</span></span>
                <div class="row"><span class="chip">Power</span><span class="chip soft">HR</span><span class="chip soft">Cad</span></div>
              </div>
              <svg class="chart" viewBox="0 0 300 130" preserveAspectRatio="none" style="height:120px;">
                <rect x="20" y="0" width="32" height="130" class="fillpaper" />
                <rect x="92" y="0" width="32" height="130" class="fillpaper" />
                <rect x="164" y="0" width="32" height="130" class="fillpaper" />
                <rect x="236" y="0" width="32" height="130" class="fillpaper" />
                <line class="ftp" x1="0" y1="42" x2="300" y2="42" />
                <path class="ink-line" d="M0,96 L12,92 L20,52 L36,44 L52,90 L66,88 L78,84 L92,50 L108,46 L124,86 L138,90 L150,84 L164,48 L180,44 L196,88 L210,86 L222,82 L236,46 L252,42 L268,86 L284,88 L300,90" />
              </svg>
              <span class="lbl sm" style="color:var(--wf-pen);">— FTP 286W reference</span>
            </div>

            <div class="grid-2">
              <div class="box b2 pad stack" style="gap:0;">
                <span class="lbl" style="margin-bottom:4px;">Intervals <span class="lbl sm">· 4×10 @ threshold</span></span>
                <div class="tbl">
                  <div class="tr head" style="grid-template-columns:0.4fr 1.2fr 0.8fr 0.6fr;"><span class="lbl sm">#</span><span class="lbl sm">Type</span><span class="lbl sm" style="text-align:right;">Avg P</span><span class="lbl sm" style="text-align:right;">TSS</span></div>
                  <div class="tr" style="grid-template-columns:0.4fr 1.2fr 0.8fr 0.6fr; background:var(--wf-pencil2);"><span class="lbl sm">1</span><span class="chip" style="font-size:9px; justify-self:start;">Threshold</span><div class="ln" style="justify-self:end;width:60%"></div><div class="ln" style="justify-self:end;width:60%"></div></div>
                  <div class="tr" style="grid-template-columns:0.4fr 1.2fr 0.8fr 0.6fr;"><span class="lbl sm">2</span><span class="chip soft" style="font-size:9px; justify-self:start;">Recover</span><div class="ln lt" style="justify-self:end;width:60%"></div><div class="ln lt" style="justify-self:end;width:60%"></div></div>
                  <div class="tr" style="grid-template-columns:0.4fr 1.2fr 0.8fr 0.6fr; background:var(--wf-pencil2);"><span class="lbl sm">3</span><span class="chip" style="font-size:9px; justify-self:start;">Threshold</span><div class="ln" style="justify-self:end;width:60%"></div><div class="ln" style="justify-self:end;width:60%"></div></div>
                  <div class="tr" style="grid-template-columns:0.4fr 1.2fr 0.8fr 0.6fr;"><span class="lbl sm">4</span><span class="chip soft" style="font-size:9px; justify-self:start;">Recover</span><div class="ln lt" style="justify-self:end;width:60%"></div><div class="ln lt" style="justify-self:end;width:60%"></div></div>
                </div>
              </div>
              <div class="box b3 pad stack" style="gap:8px;">
                <span class="lbl">Time in zone</span>
                <div class="bars" style="height:70px; align-items:flex-end;"><i class="lt" style="height:30%"></i><i style="height:80%; opacity:0.4"></i><i style="height:45%; opacity:0.55"></i><i style="height:95%; opacity:0.8"></i><i style="height:60%"></i></div>
                <div class="row" style="justify-content:space-between;"><span class="lbl sm">Z1</span><span class="lbl sm">Z3</span><span class="lbl sm">Z5</span></div>
              </div>
            </div>
          </div>
        </div>

        <span class="pin" style="left:130px; top:104px;">1</span>
        <span class="pin" style="left:200px; top:200px;">2</span>
        <span class="pin" style="left:130px; bottom:120px;">3</span>
        <span class="pin" style="right:118px; top:78px;">4</span>
      </div>

      <div class="notes">
        <div class="note"><span class="n">1</span><p><b>KPI strip.</b> <span>The whole session at a glance — six numbers before any chart so you can triage fast.</span></p></div>
        <div class="note"><span class="n">2</span><p><b>Power trace with markers.</b> <span>Interval shading + a dashed FTP reference line make the structure of the workout legible.</span></p></div>
        <div class="note"><span class="n">3</span><p><b>Per-interval table.</b> <span>Work intervals highlighted, recovery muted — compare effort rep to rep.</span></p></div>
        <div class="note"><span class="n">4</span><p><b>Channel toggle.</b> <span>Same trace switches between power / HR / cadence instead of stacking charts.</span></p></div>
      </div>
    </section>

    <!-- 03 · PLAN -->
    <section class="sheet" id="sheet-plan" data-screen-label="03">
      <div class="sheet-tab">03 · Plan</div>
      <div class="flow-arrow">➜</div>

      <div class="frame">
        <div class="browser-bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <span class="url"><span class="url-lbl">ridesense.app / plan</span></span>
        </div>

        <div class="wf">
          <div class="wf-side">
            <div class="row" style="align-items:center; gap:6px; margin-bottom:2px;">
              <span class="box" style="width:18px; height:18px; border-radius:5px; background:var(--wf-ink);"></span>
              <span class="lbl" style="font-size:11px;">RideSense</span>
            </div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Dashboard</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Activities</span></div>
            <div class="nav-item on"><span class="ic"></span><span class="lbl sm">Plan</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Compare</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Ask</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Connections</span></div>
          </div>

          <div class="wf-main">
            <div class="row" style="justify-content:space-between; align-items:center;">
              <div class="stack">
                <span class="lbl sm">Next 14 days · Block 3 of 4</span>
                <span class="mono-tag">Plan</span>
              </div>
              <div class="row"><span class="btn">Filter</span><span class="btn fill">+ Add workout</span></div>
            </div>

            <div class="grid-2e">
              <div class="box pad stack" style="gap:8px;">
                <div class="row" style="justify-content:space-between;"><span class="lbl">Week 1 · 27 Apr</span><span class="chip">On track</span></div>
                <div class="row" style="gap:10px;">
                  <div class="stack" style="gap:1px;"><span class="lbl sm">TSS</span><span class="big-num" style="font-size:18px;">498</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Hrs</span><span class="big-num" style="font-size:18px;">8.9</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Qual</span><span class="big-num" style="font-size:18px;">2</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Long</span><span class="big-num" style="font-size:18px;">170</span></div>
                </div>
                <div class="bars"><i style="height:30%"></i><i style="height:70%"></i><i style="height:55%"></i><i class="lt" style="height:8%"></i><i style="height:85%"></i><i style="height:100%"></i><i style="height:38%"></i></div>
              </div>
              <div class="box b2 pad stack" style="gap:8px;">
                <div class="row" style="justify-content:space-between;"><span class="lbl">Week 2 · 4 May</span><span class="chip" style="background:var(--wf-pen-soft); border-color:var(--wf-pen); color:var(--wf-pen);">Peak</span></div>
                <div class="row" style="gap:10px;">
                  <div class="stack" style="gap:1px;"><span class="lbl sm">TSS</span><span class="big-num" style="font-size:18px;">474</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Hrs</span><span class="big-num" style="font-size:18px;">8.5</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Qual</span><span class="big-num" style="font-size:18px;">2</span></div>
                  <div class="stack" style="gap:1px;"><span class="lbl sm">Long</span><span class="big-num" style="font-size:18px;">185</span></div>
                </div>
                <div class="bars"><i style="height:40%"></i><i style="height:90%"></i><i style="height:50%"></i><i class="lt" style="height:8%"></i><i style="height:75%"></i><i style="height:100%"></i><i style="height:30%"></i></div>
              </div>
            </div>

            <div class="box b3 pad stack" style="gap:9px;">
              <span class="lbl">Form projection <span class="lbl sm">· if you finish this plan</span></span>
              <div class="row" style="gap:10px;">
                <div class="box soft pad stack" style="flex:1; padding:8px 10px; gap:3px; background:#f5f2ea;">
                  <span class="lbl sm">CTL · fitness</span>
                  <div class="row" style="align-items:baseline; gap:8px;"><span class="lbl sm">80</span><span class="mono-tag">→</span><span class="big-num" style="font-size:24px;">87</span></div>
                </div>
                <div class="box soft pad stack" style="flex:1; padding:8px 10px; gap:3px; background:#f5f2ea;">
                  <span class="lbl sm">ATL · fatigue</span>
                  <div class="row" style="align-items:baseline; gap:8px;"><span class="lbl sm">105</span><span class="mono-tag">→</span><span class="big-num" style="font-size:24px;">96</span></div>
                </div>
                <div class="box soft pad stack" style="flex:1; padding:8px 10px; gap:3px; background:#f5f2ea;">
                  <span class="lbl sm">TSB · form</span>
                  <div class="row" style="align-items:baseline; gap:8px;"><span class="lbl sm">-25</span><span class="mono-tag">→</span><span class="big-num" style="font-size:24px; color:var(--wf-pen);">-9</span></div>
                </div>
              </div>
              <div class="box soft pad row" style="gap:8px; align-items:center; background:#f5f2ea;">
                <span class="ic box" style="width:14px;height:14px;border-radius:4px;flex:none;"></span>
                <div class="stack" style="flex:1; gap:4px;"><div class="ln" style="width:90%"></div><div class="ln lt" style="width:75%"></div></div>
              </div>
            </div>
          </div>
        </div>

        <span class="pin" style="left:130px; top:108px;">1</span>
        <span class="pin" style="left:200px; top:225px;">2</span>
        <span class="pin" style="right:118px; bottom:135px;">3</span>
        <span class="pin" style="left:130px; bottom:62px;">4</span>
      </div>

      <div class="notes">
        <div class="note"><span class="n">1</span><p><b>Forward, not a log.</b> <span>Plan opens on what's coming — week rollups summarize load before you drill into a day.</span></p></div>
        <div class="note"><span class="n">2</span><p><b>Hard/easy rhythm.</b> <span>Daily intensity as mini-bars shows the week's shape at a glance — rest days included.</span></p></div>
        <div class="note"><span class="n">3</span><p><b>Form projection.</b> <span>"If you complete this as-is" — CTL / ATL / TSB move now → end so the plan's payoff is explicit.</span></p></div>
        <div class="note"><span class="n">4</span><p><b>Coaching note.</b> <span>A plain-language line ties the projection back to the goal race.</span></p></div>
      </div>
    </section>

    <!-- 04 · ASK -->
    <section class="sheet" id="sheet-ask" data-screen-label="04">
      <div class="sheet-tab">04 · Ask</div>

      <div class="frame">
        <div class="browser-bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <span class="url"><span class="url-lbl">ridesense.app / ask</span></span>
        </div>

        <div class="wf">
          <div class="wf-side">
            <div class="row" style="align-items:center; gap:6px; margin-bottom:2px;">
              <span class="box" style="width:18px; height:18px; border-radius:5px; background:var(--wf-ink);"></span>
              <span class="lbl" style="font-size:11px;">RideSense</span>
            </div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Dashboard</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Activities</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Plan</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Compare</span></div>
            <div class="nav-item on"><span class="ic"></span><span class="lbl sm">Ask</span></div>
            <div class="nav-item"><span class="ic"></span><span class="lbl sm">Connections</span></div>
          </div>

          <div class="wf-main" style="gap:12px;">
            <div class="stack"><span class="mono-tag">Ask</span><span class="lbl sm">Every claim cites a metric</span></div>

            <div class="row" style="gap:12px; flex:1;">
              <div class="stack" style="flex:1; gap:10px;">
                <div class="box" style="align-self:flex-end; max-width:72%; background:var(--wf-ink); border-color:var(--wf-ink); padding:7px 11px;">
                  <span class="lbl sm" style="color:var(--wf-sheet);">Am I building endurance fitness?</span>
                </div>
                <div class="box b2 pad stack" style="gap:7px;">
                  <span class="chip" style="align-self:flex-start;">● high confidence · 5 cited</span>
                  <div class="stack" style="gap:4px;"><div class="ln" style="width:96%"></div><div class="ln" style="width:88%"></div><div class="ln lt" style="width:60%"></div></div>
                  <div class="row" style="gap:5px; flex-wrap:wrap;">
                    <span class="box soft" style="padding:4px 7px;"><span class="lbl sm">CTL +11</span></span>
                    <span class="box soft" style="padding:4px 7px;"><span class="lbl sm">Z2 41%</span></span>
                    <span class="box soft" style="padding:4px 7px;"><span class="lbl sm">IF 0.74</span></span>
                  </div>
                  <div class="row" style="gap:5px; flex-wrap:wrap; margin-top:2px;"><span class="chip soft">Show on curve</span><span class="chip soft">Push further?</span></div>
                </div>
                <div class="box" style="align-self:flex-end; max-width:72%; background:var(--wf-ink); border-color:var(--wf-ink); padding:7px 11px;">
                  <span class="lbl sm" style="color:var(--wf-sheet);">Best 20-min power last month?</span>
                </div>
                <div class="box b3 pad stack" style="gap:6px;">
                  <span class="chip" style="align-self:flex-start;">● high confidence</span>
                  <div class="stack" style="gap:4px;"><div class="ln" style="width:90%"></div><div class="ln lt" style="width:55%"></div></div>
                </div>
                <div class="box soft pad row" style="margin-top:auto; align-items:center; gap:8px;">
                  <span class="ic box" style="width:13px;height:13px;border-radius:50%;flex:none;"></span>
                  <span class="lbl sm">Ask anything about your training…</span>
                </div>
              </div>

              <div class="box pad stack" style="width:150px; flex:none; gap:0;">
                <span class="lbl" style="margin-bottom:5px;">Sources</span>
                <div class="row" style="justify-content:space-between; align-items:center; padding:6px 0; border-top:1.4px solid var(--wf-pencil);"><span class="lbl sm">ctl_delta_4w</span><span class="chip soft" style="font-size:8px;">view</span></div>
                <div class="row" style="justify-content:space-between; align-items:center; padding:6px 0; border-top:1.4px solid var(--wf-pencil);"><span class="lbl sm">zones.Z2.pct</span><span class="chip soft" style="font-size:8px;">view</span></div>
                <div class="row" style="justify-content:space-between; align-items:center; padding:6px 0; border-top:1.4px solid var(--wf-pencil);"><span class="lbl sm">mmp.20m</span><span class="chip soft" style="font-size:8px;">view</span></div>
                <div class="row" style="justify-content:space-between; align-items:center; padding:6px 0; border-top:1.4px solid var(--wf-pencil);"><span class="lbl sm">if_avg</span><span class="chip soft" style="font-size:8px;">view</span></div>
              </div>
            </div>
          </div>
        </div>

        <span class="pin" style="left:215px; top:175px;">1</span>
        <span class="pin" style="left:130px; top:128px;">2</span>
        <span class="pin" style="left:200px; top:262px;">3</span>
        <span class="pin" style="right:128px; top:108px;">4</span>
      </div>

      <div class="notes">
        <div class="note"><span class="n">1</span><p><b>Cited, not generated.</b> <span>Every answer pins the exact metrics it used as chips — the AI can't hand-wave.</span></p></div>
        <div class="note"><span class="n">2</span><p><b>Confidence up front.</b> <span>A badge sets the trust level before you read the claim.</span></p></div>
        <div class="note"><span class="n">3</span><p><b>Suggested follow-ups.</b> <span>One-tap next questions keep the user exploring instead of staring at a blank box.</span></p></div>
        <div class="note"><span class="n">4</span><p><b>Sources drawer.</b> <span>Full provenance for the whole thread — click any metric to see the raw value.</span></p></div>
      </div>
    </section>

  </div>

  <div class="legend">
    <span style="font-family:'Caveat'; font-weight:700; font-size:20px; color:var(--wf-ink);">Legend</span>
    <span class="key"><span class="sw"></span> container / card</span>
    <span class="key"><span class="sw" style="border-style:dashed; border-color:var(--wf-pencil);"></span> media / chart placeholder</span>
    <span class="key"><span class="sw line"></span> text block</span>
    <span class="key"><span class="sw pen"></span> numbered decision note</span>
  </div>
`;

export default function RideSenseWireframesPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product || product.slug !== 'ridesense') return <Navigate to="/not-found" replace />;

  return (
    <div className="fade-in">
      <div className="wf-page">
        <div className="wf-backbar">
          <Link to={`/products/${product.slug}`}>← Back to {product.name}</Link>
          <span>RideSense / Wireframes / Lo-fi storyboard</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: WIREFRAMES_BODY }} />
      </div>
    </div>
  );
}
