# Excalidraw drawings

One-off tooling, not part of the site build. The site serves a static SVG and
ships nothing of Excalidraw to visitors.

`src/assets/firstmate-hook-prompt/how-it-broke.svg` is drawn on
`/case-studies/firstmate-hook-prompt/diagrams`. The editable scene is
`how-it-broke.excalidraw` beside it.

## Change the drawing

1. Open https://excalidraw.com, then Open and pick `how-it-broke.excalidraw`.
2. Edit it, then Save to disk over the same `.excalidraw` file.
3. Export image, SVG, with Background off and Embed scene off, over
   `how-it-broke.svg`. Excalidraw embeds the handwriting font in the file.
4. If the drawing's size changed, update the `width` and `height` on the `<img>`
   in `src/pages/FirstmateHookDiagramsPage.jsx` to the new `viewBox`, and update
   `DRAWING_ALT` there if any words changed.

## How the first version was made

`how-it-broke.mmd` is the Mermaid flowchart the owner approved. `index.html`
converts it with Excalidraw's own `@excalidraw/mermaid-to-excalidraw`, exports it
with `@excalidraw/excalidraw`'s `exportToSvg`, both loaded from esm.sh, and
POSTs the two files to `serve.py`, which writes them to `out/`.

```shell
cd tools/excalidraw && python3 serve.py   # then open http://127.0.0.1:8197/ in a browser
```

The page makes three adjustments the converter does not, all commented in
`index.html`: Mermaid's `<br>` become real line breaks, the Launcher moves left
so the three arrow labels fit, and the conversion runs twice so text is measured
with Excalifont loaded.
