// Helpers shared by the per-drawing modules. Skeleton elements are the
// ExcalidrawElementSkeleton shapes mermaid-to-excalidraw emits, before
// convertToExcalidrawElements gives them their real sizes and bindings.

export const bounds = (els) => ({
  left: Math.min(...els.map((el) => el.x)),
  top: Math.min(...els.map((el) => el.y)),
  right: Math.max(...els.map((el) => el.x + (el.width ?? 0))),
});

// Rewrites an arrow to pass through the given absolute points, in order.
export const route = (arrow, pts) => {
  arrow.x = pts[0][0]; arrow.y = pts[0][1];
  arrow.points = pts.map(([px, py]) => [px - pts[0][0], py - pts[0][1]]);
};

// Excalidraw draws a labelled arrow's text at the arrow's middle point, so
// a path built with this puts the label on the level stretch between the
// gutter and the entry column: seven points, label on the fourth.
export const gutterPath = ({ fromX, fromY, gutter, level, enter, toY }) => [
  [fromX, fromY], [gutter, fromY], [gutter, level], [(gutter + enter) / 2, level],
  [enter, level], [enter, (level + toY) / 2], [enter, toY],
];
