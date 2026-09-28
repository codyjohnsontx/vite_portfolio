// The Track Tuner atomic save drawing: the phone, then the same save on the
// server before and after the change. Mermaid only supplies the words and the
// links; both layouts below place every element by hand, because Mermaid's
// left-to-right layout of these two chains comes out 3600 units wide.
import { route, gutterPath } from './lib.js';

const TITLE = 'The save that could half-happen';

// Excalidraw wraps an arrow label at about 22 characters a line whatever the
// arrow's length, so the Mermaid source breaks every label line under that.
// Reading order down each column. In Before the failure path is the spine:
// write 1, write 2, then one straight dashed drop to the half-saved session.
// Write 3, the one that never ran, hangs off write 2 to the right of that drop.
const ORDER = { B: ['W1', 'W2', 'H', 'R1', 'A1', 'X'], A: ['T', 'N', 'R2', 'T2', 'OK'] };
const SIDE = { B: { from: 'W2', node: 'W3' } };
// Where the dashed drop runs, relative to the column centre, when a side box
// has to fit beside it.
const DROP_DX = -50;

// One column per group: the group frame, its title, and its nodes centred
// beneath one another. Boxes wider than the column are narrowed and their
// hard line breaks removed so Excalidraw rewraps the same words; measure()
// reports how tall that made them before anything is placed beneath.
function column(skeleton, g, { x, width, top, measure, inset, pad }) {
  const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
  const arrows = skeleton.filter((el) => el.type === 'arrow');
  const link = (a, b) => arrows.find((el) => el.start?.id === a && el.end?.id === b);
  const group = byId[g];
  const cx = x + width / 2;
  const innerRight = x + width - inset - pad;
  const maxW = width - 2 * inset - 2 * pad;
  const nodes = ORDER[g].map((id) => byId[id]);
  const side = SIDE[g] ? byId[SIDE[g].node] : null;
  for (const node of nodes) {
    if (node.width > maxW) {
      node.width = maxW;
      node.label.text = node.label.text.replace(/\n/g, ' ');
    }
  }
  if (side) {
    // Narrow enough to sit flush right with clear air between it and the drop.
    side.width = Math.min(200, innerRight - (cx + DROP_DX) - 40);
    side.label.text = side.label.text.replace(/\n/g, ' ');
  }
  const sizes = measure(skeleton);
  for (const node of nodes) node.height = sizes[node.id].height;
  if (side) side.height = sizes[side.id].height;

  group.x = x + inset; group.width = width - 2 * inset; group.y = top;
  const titleLines = group.label.text.split('\n').length;
  let y = top + 20 + 25 * titleLines + 20;
  nodes.forEach((node, i) => {
    node.x = cx - node.width / 2;
    node.y = y;
    y += node.height;
    const next = nodes[i + 1];
    if (!next) return;
    const arrow = link(node.id, next.id);
    const labelH = arrow.label ? 25 * arrow.label.text.split('\n').length : 0;
    const hangs = side && SIDE[g].from === node.id;
    if (hangs) {
      // The side box sits just below this node, off to the right; the drop
      // runs past it on the left and carries its label below the side box,
      // so five points put the label (drawn at the middle point) down there.
      side.x = innerRight - side.width;
      side.y = y + 30;
      const sx = Math.min(side.x + side.width / 2, node.x + node.width - 24);
      route(link(node.id, side.id), [[sx, y], [sx, side.y]]);
      const dx = cx + DROP_DX;
      const labelMid = side.y + side.height + 30 + labelH / 2;
      const gap = labelMid + labelH / 2 + 30 - y;
      route(arrow, [[dx, y], [dx, labelMid - 8], [dx, labelMid], [dx, labelMid + 8], [dx, y + gap]]);
      arrow.roundness = null;
      y += gap;
    } else {
      // A labelled vertical arrow needs room for its label.
      const gap = arrow.label ? 60 + labelH : 48;
      route(arrow, [[cx, y], [cx, y + gap / 2], [cx, y + gap]]);
      y += gap;
    }
  });
  y += 24;
  group.height = y - group.y;
  return { group, first: nodes[0], bottom: y, cx };
}

// The arrows out of the phone end on the top edge of each panel, not on the
// first box inside it, so no line crosses a panel heading.
const intoPanel = (arrow, col) => {
  arrow.end = { id: col.group.id };
};

export default {
  file: 'atomic-save',
  title: TITLE,
  phoneTitle: TITLE.replace('that ', 'that\n'),
  mmd: 'atomic-save.mmd',

  // Wide: the phone centred on top, Before and After side by side beneath it,
  // their frames drawn to the same height so the pair reads as one exhibit.
  adjustWide(skeleton, { measure }) {
    const COL = 520, GAP = 40;
    const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
    const phone = byId.P;
    const total = 2 * COL + GAP;
    phone.x = (total - phone.width) / 2; phone.y = 0;
    const top = phone.height + 130;
    const opts = { width: COL, top, measure, inset: 20, pad: 30 };
    const before = column(skeleton, 'B', { ...opts, x: 0 });
    const after = column(skeleton, 'A', { ...opts, x: COL + GAP });
    const height = Math.max(before.group.height, after.group.height);
    before.group.height = after.group.height = height;
    // Each arrow drops out of the phone, runs level to its column's centre
    // and drops onto the panel's top edge, label on the level run.
    const level = phone.y + phone.height + 62;
    for (const [id, col, fx] of [['P_W1', before, phone.x + 40], ['P_T', after, phone.x + phone.width - 40]]) {
      route(byId[id], [
        [fx, phone.y + phone.height], [fx, level], [(fx + col.cx) / 2, level], [col.cx, level], [col.cx, col.group.y],
      ]);
      byId[id].roundness = null;
      intoPanel(byId[id], col);
    }
  },

  // Phone: one 430-unit column. The phone, then Before, then After beneath
  // it, with the arrow into After running down the left-hand gutter past
  // Before and turning in above it, like the hook drawing's phone layout.
  stackForPhone(skeleton, { measure }) {
    const W = 430, CX = W / 2;
    const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
    const phone = byId.P;
    const opts = { x: 0, width: W, measure, inset: 32, pad: 40 };
    const maxW = W - 2 * opts.inset - 2 * opts.pad + 40;
    if (phone.width > maxW) {
      phone.width = maxW;
      phone.label.text = phone.label.text.replace(/\n/g, ' ').replace('The phone ', 'The phone\n');
    }
    phone.height = measure(skeleton).P.height;
    phone.x = CX - phone.width / 2; phone.y = 0;
    const before = column(skeleton, 'B', { ...opts, top: phone.y + phone.height + 130 });
    const after = column(skeleton, 'A', { ...opts, top: before.bottom + 110 });
    const gapMid = (phone.height + before.group.y) / 2;
    route(byId.P_W1, [[CX, phone.height], [CX, gapMid], [CX, before.group.y]]);
    intoPanel(byId.P_W1, before);
    route(byId.P_T, gutterPath({
      fromX: phone.x, fromY: phone.y + phone.height / 2,
      gutter: 14, level: before.bottom + 55, enter: CX + 20, toY: after.group.y,
    }));
    byId.P_T.roundness = null;
    intoPanel(byId.P_T, after);
  },
};
