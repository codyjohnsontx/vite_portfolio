# Excalidraw drawings

One-off tooling, not part of the site build. The site serves static SVGs and
ships nothing of Excalidraw to visitors.

Two case study pages each draw one diagram in two layouts, a wide one served
at 1100px and wider and a stacked one served below that:

- `/case-studies/firstmate-hook-prompt/diagrams`: `how-it-broke.svg` and
  `how-it-broke-phone.svg` in `src/assets/firstmate-hook-prompt/`
- `/case-studies/track-tuner-atomic-save/diagrams`: `atomic-save.svg` and
  `atomic-save-phone.svg` in `src/assets/track-tuner-atomic-save/`

Each has its editable scene beside it as a `.excalidraw` file. The page title is
part of every drawing.

## Change the words

Each drawing's two layouts are generated from one Mermaid file here,
`how-it-broke.mmd` or `atomic-save.mmd`, so change a label there and
regenerate, and the two cannot drift:

```shell
cd tools/excalidraw && python3 serve.py
# then open http://127.0.0.1:8197/?drawing=how-it-broke
#        or http://127.0.0.1:8197/?drawing=atomic-save
```

`index.html` converts the Mermaid source with Excalidraw's own
`@excalidraw/mermaid-to-excalidraw`, exports with `@excalidraw/excalidraw`'s
`exportToSvg`, both loaded from esm.sh, and POSTs all four files to `serve.py`,
which writes them to `out/`. Copy them over the ones in the drawing's assets
folder. Then update the alt text, and the `width` and `height` attributes if a
`viewBox` changed, in the page that serves them.

The layout of each drawing lives in its own module, `how-it-broke.js` or
`atomic-save.js`, which `index.html` loads by the `?drawing=` name. A module
names its Mermaid file and title and owns two hooks: `adjustWide` touches up
Mermaid's left-to-right layout, and `stackForPhone` places the same elements
in one column. The hook drawing keeps Mermaid's wide layout and only moves the
Launcher; the atomic save drawing places everything by hand in both layouts,
because Mermaid's layout of its two long chains came out 3600 units wide.
Things the converter does not do, all commented in `index.html` and the
modules: Mermaid's `<br>` become real line breaks, the title is added as a text
element, boxes narrowed for a column have their words rewrapped by Excalidraw
and are measured before anything is placed beneath them, and the conversion
runs twice so text is measured with Excalifont loaded. Excalidraw wraps an
arrow label at about 22 characters a line whatever the arrow's length, so keep
every label line in a `.mmd` under that.

## Redraw by hand

Open a `.excalidraw` file at https://excalidraw.com, edit, and save it back over
the same file. Export image as SVG with Background off and Embed scene off over
the matching `.svg`; Excalidraw embeds the handwriting font. A hand edit applies
to that one layout only, so make it in both, and regenerating from the Mermaid
source afterwards would overwrite it.
