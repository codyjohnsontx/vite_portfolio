// The Track Tuner atomic save drawing: the phone, then the same save on the
// server before and after the change. Mermaid only supplies the words and the
// links; both layouts below place every element by hand, because Mermaid's
// left-to-right layout of these two chains comes out 3600 units wide.
import { route, gutterPath } from './lib.js';

const TITLE = 'The save that could half-happen';

// Excalidraw wraps an arrow label at about 22 characters a line whatever the
// arrow's length, so the Mermaid source breaks every label line under that.
// Reading order down each column. The failure path branches off the second
// write and rejoins below the third, so W3 keeps its place in the chain and
// the dashed arrow runs down the right-hand gutter past it.
const ORDER = { B: ['W1', 'W2', 'W3', 'H', 'R1', 'A1', 'X'], A: ['T', 'N', 'R2', 'T2', 'OK'] };
const DROP = { B: ['W2', 'H'], A: ['T', 'N'] };

// One column per group: the group frame, its title, and its nodes centred
// beneath one another. Boxes wider than the column are narrowed and their
// hard line breaks removed so Excalidraw rewraps the same words; measure()
// reports how tall that made them before anything is placed beneath.
function column(skeleton, g, { x, width, top, measure, inset, pad, gutterInset }) {
  const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
  const arrows = skeleton.filter((el) => el.type === 'arrow');
  const link = (a, b) => arrows.find((el) => el.start?.id === a && el.end?.id === b);
  const group = byId[g];
  const cx = x + width / 2;
  const maxW = width - 2 * inset - 2 * pad;
  const nodes = ORDER[g].map((id) => byId[id]);
  for (const node of nodes) {
    if (node.width > maxW) {
      node.width = maxW;
      node.label.text = node.label.text.replace(/\n/g, ' ');
    }
  }
  const sizes = measure(skeleton);
  for (const node of nodes) node.height = sizes[node.id].height;

  group.x = x + inset; group.width = width - 2 * inset; group.y = top;
  const titleLines = group.label.text.split('\n').length;
  let y = top + 20 + 25 * titleLines + 20;
  const [dropFrom, dropTo] = DROP[g];
  const levels = {};
  nodes.forEach((node, i) => {
    node.x = cx - node.width / 2;
    node.y = y;
    y += node.height;
    const next = nodes[i + 1];
    if (!next) return;
    const direct = link(node.id, next.id);
    if (direct) {
      // A labelled vertical arrow needs room for its label; the gutter route
      // below needs room for a level run and the label that sits on it.
      const gap = direct.label ? 60 + 25 * direct.label.text.split('\n').length : 48;
      route(direct, [[cx, y], [cx, y + gap / 2], [cx, y + gap]]);
      y += gap;
    } else {
      const gap = 124;
      levels[next.id] = y + gap / 2;
      y += gap;
    }
  });
  y += 24;
  group.height = y - group.y;

  // The dashed failure arrow. When it skips a node (Before), it leaves its
  // source sideways, runs down the gutter and turns in above its target with
  // the label on the level run; the label is set a little left of centre so
  // it clears the group's right edge on the phone.
  const drop = link(dropFrom, dropTo);
  if (levels[dropTo]) {
    const from = byId[dropFrom], to = byId[dropTo];
    route(drop, gutterPath({
      fromX: from.x + from.width, fromY: from.y + from.height / 2,
      gutter: group.x + group.width - gutterInset, level: levels[dropTo],
      enter: cx - 60, toY: to.y,
    }));
    drop.roundness = null;
  }
  return { group, first: nodes[0], bottom: y };
}

export default {
  file: 'atomic-save',
  title: TITLE,
  phoneTitle: TITLE.replace('that ', 'that\n'),
  mmd: 'atomic-save.mmd',

  // Wide: the phone centred on top, Before and After side by side beneath it.
  adjustWide(skeleton, { measure }) {
    const COL = 520, GAP = 40;
    const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
    const phone = byId.P;
    const total = 2 * COL + GAP;
    phone.x = (total - phone.width) / 2; phone.y = 0;
    const top = phone.height + 130;
    const opts = { width: COL, top, measure, inset: 20, pad: 30, gutterInset: 22 };
    const before = column(skeleton, 'B', { ...opts, x: 0 });
    const after = column(skeleton, 'A', { ...opts, x: COL + GAP });
    // Each arrow drops out of the phone, runs level to its column's centre
    // and drops into the first box, label on the level run.
    const level = phone.y + phone.height + 62;
    for (const [id, col, fx] of [['P_W1', before, phone.x + 40], ['P_T', after, phone.x + phone.width - 40]]) {
      const cx = col.first.x + col.first.width / 2;
      route(byId[id], [
        [fx, phone.y + phone.height], [fx, level], [(fx + cx) / 2, level], [cx, level], [cx, col.first.y],
      ]);
      byId[id].roundness = null;
    }
  },

  // Phone: one 430-unit column. The phone, then Before, then After beneath
  // it, with the arrow into After running down the left-hand gutter past
  // Before and turning in above it, like the hook drawing's phone layout.
  stackForPhone(skeleton, { measure }) {
    const W = 430, CX = W / 2;
    const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
    const phone = byId.P;
    const opts = { x: 0, width: W, measure, inset: 32, pad: 40, gutterInset: 22 };
    const maxW = W - 2 * opts.inset - 2 * opts.pad + 40;
    if (phone.width > maxW) {
      phone.width = maxW;
      phone.label.text = phone.label.text.replace(/\n/g, ' ').replace('The phone ', 'The phone\n');
    }
    phone.height = measure(skeleton).P.height;
    phone.x = CX - phone.width / 2; phone.y = 0;
    const before = column(skeleton, 'B', { ...opts, top: phone.y + phone.height + 130 });
    const after = column(skeleton, 'A', { ...opts, top: before.bottom + 110 });
    // Straight down into Before. The arrow ends on the first box, inside the
    // group frame, so five points keep the label (drawn at the middle point)
    // in the gap above the frame rather than on it.
    const gapMid = (phone.height + before.group.y) / 2;
    route(byId.P_W1, [[CX, phone.height], [CX, gapMid - 10], [CX, gapMid], [CX, gapMid + 10], [CX, before.first.y]]);
    route(byId.P_T, gutterPath({
      fromX: phone.x, fromY: phone.y + phone.height / 2,
      gutter: 14, level: before.bottom + 55, enter: CX + 20, toY: after.first.y,
    }));
    byId.P_T.roundness = null;
  },
};
