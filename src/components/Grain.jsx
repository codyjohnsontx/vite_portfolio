/* Film grain + vignette over the whole canvas.

   The noise is a 160x160 feTurbulence tile baked into a data URI and
   background-repeated, NOT a full-viewport <svg filter>. Filtering an
   element the size of the viewport forces the compositor to re-rasterise
   millions of pixels whenever the layer moves, which is enough to hang the
   renderer once it is also blending over a WebGL canvas. Rasterising one
   small tile and repeating it costs nothing. */
export default function Grain() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
