# Excalidraw drawings

One-off tooling, not part of the site build. The site serves static SVGs and
ships nothing of Excalidraw to visitors.

`/case-studies/firstmate-hook-prompt/diagrams` draws one diagram in two layouts,
both in `src/assets/firstmate-hook-prompt/`:

- `how-it-broke.svg`, left to right, served at 1100px and wider
- `how-it-broke-phone.svg`, the same elements stacked top to bottom, served below that

Each has its editable scene beside it, `how-it-broke.excalidraw` and
`how-it-broke-phone.excalidraw`. The page title is part of both drawings.

## Change the words

Both layouts are generated from `how-it-broke.mmd`, so change a label there and
regenerate, and the two cannot drift:

```shell
cd tools/excalidraw && python3 serve.py   # then open http://127.0.0.1:8197/ in a browser
```

`index.html` converts the Mermaid source with Excalidraw's own
`@excalidraw/mermaid-to-excalidraw`, exports with `@excalidraw/excalidraw`'s
`exportToSvg`, both loaded from esm.sh, and POSTs all four files to `serve.py`,
which writes them to `out/`. Copy them over the ones in
`src/assets/firstmate-hook-prompt/`. Then update `DRAWING_ALT`, and the `width`
and `height` attributes if a `viewBox` changed, in
`src/pages/FirstmateHookDiagramsPage.jsx`.

The page makes adjustments the converter does not, all commented in
`index.html`: Mermaid's `<br>` become real line breaks, the wide Launcher moves
left so its arrow labels fit, the phone layout is a hand-built 400-unit column
(`stackForPhone`), the title is added as a text element, and the conversion runs
twice so text is measured with Excalifont loaded.

## Redraw by hand

Open a `.excalidraw` file at https://excalidraw.com, edit, and save it back over
the same file. Export image as SVG with Background off and Embed scene off over
the matching `.svg`; Excalidraw embeds the handwriting font. A hand edit applies
to that one layout only, so make it in both, and regenerating from the Mermaid
source afterwards would overwrite it.
