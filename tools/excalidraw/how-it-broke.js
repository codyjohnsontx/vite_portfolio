// The firstmate hook prompt drawing: a Launcher and three paths out of it.
import { route } from './lib.js';

const TITLE = 'How it broke, how it was fixed';

export default {
  file: 'how-it-broke',
  title: TITLE,
  // On the phone the title breaks at its comma so it fits the column.
  phoneTitle: TITLE.replace(', ', ',\n'),
  // Where the drawing's own source lives.
  mmd: 'how-it-broke.mmd',

  // Excalifont sets wider than the font Mermaid measured with, so in the wide
  // drawing the labels on the three arrows leaving the Launcher do not fit the
  // gap Mermaid left for them. Move the Launcher left and stretch those arrows
  // by the same amount, keeping each label over the middle of its arrow.
  adjustWide(skeleton) {
    const dx = -110;
    const launcher = skeleton.find((el) => el.label?.text?.startsWith('Launcher'));
    launcher.x += dx;
    for (const el of skeleton) {
      if (el.type === 'arrow' && el.start?.id === launcher.id) {
        const last = el.points.length - 1;
        el.x += dx;
        el.points = el.points.map(([x, y], i) => [i === 0 ? x : i === last ? x - dx : x - dx / 2, y]);
        if (typeof el.width === 'number') el.width -= dx;
      }
    }
  },

  // Mermaid's own top-to-bottom layout staggers the groups sideways and comes
  // out 700 units wide, which on a 390px screen halves the handwriting. This
  // lays the same elements out in one 400-unit column instead: title, Launcher,
  // then Before, After and Not taken under one another, each flowing downward.
  // The two labelled arrows leave the Launcher sideways, run down a gutter, and
  // turn in above their group, so each label sits on a level stretch of line.
  stackForPhone(skeleton) {
    const W = 400, CX = W / 2, GROUP_X = 44, GROUP_W = W - 2 * GROUP_X;
    const LEFT_GUTTER = 20, RIGHT_GUTTER = W - 20, ENTER_LEFT = 130, ENTER_RIGHT = 270;
    const byId = Object.fromEntries(skeleton.map((el) => [el.id, el]));
    const nodesOf = (g) => skeleton.filter((el) => el.type === 'rectangle' && el.id !== g && el.groupIds?.includes(`subgraph_group_${g}`));
    const arrows = skeleton.filter((el) => el.type === 'arrow');

    const launcher = byId.L;
    launcher.x = CX - launcher.width / 2;
    launcher.y = 0;
    let y = launcher.height;
    const gapY = {};
    for (const g of ['B', 'A', 'N']) {
      gapY[g] = y + 45;
      y += 90;
      const group = byId[g];
      group.x = GROUP_X; group.y = y; group.width = GROUP_W;
      y += 44;
      const nodes = nodesOf(g);
      nodes.forEach((node, i) => {
        node.x = CX - node.width / 2;
        node.y = y;
        y += node.height;
        const next = nodes[i + 1];
        if (!next) return;
        const link = arrows.find((el) => el.start.id === node.id && el.end.id === next.id);
        const gap = link.label ? 96 : 48;
        link.x = CX; link.y = y;
        link.points = [[0, 0], [0, gap]];
        y += gap;
      });
      y += 28;
      group.height = y - group.y;
    }

    const midY = launcher.y + launcher.height / 2;
    const into = (id) => byId[id].y;
    route(byId.L_R1, [[ENTER_LEFT, launcher.height], [ENTER_LEFT, into('R1')]]);
    // Seven points, so the label lands on the fourth: the middle of the level run.
    for (const [id, target, gutter, enter, side] of [
      ['L_R2', 'R2', LEFT_GUTTER, ENTER_LEFT, launcher.x],
      ['L_C', 'C', RIGHT_GUTTER, ENTER_RIGHT, launcher.x + launcher.width],
    ]) {
      const level = gapY[byId[target].groupIds[0].replace('subgraph_group_', '')];
      route(byId[id], [
        [side, midY], [gutter, midY], [gutter, level], [(gutter + enter) / 2, level],
        [enter, level], [enter, (level + into(target)) / 2], [enter, into(target)],
      ]);
      byId[id].roundness = null;
    }
  },
};
