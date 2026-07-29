import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { FRAG, VERT } from './auroraShaders';

/* Reads the aurora colour stops off CSS custom properties so the theme
   toggle drives the shader too - one source of truth for the palette. */
function readStops() {
  const cs = getComputedStyle(document.documentElement);
  const triple = (name, fallback) => {
    const raw = cs.getPropertyValue(name).trim();
    const parts = raw.split(/\s+/).map(Number);
    return parts.length === 3 && parts.every((n) => Number.isFinite(n)) ? parts : fallback;
  };
  return {
    a: triple('--aurora-a', [0.36, 0.26, 0.72]),
    b: triple('--aurora-b', [0.12, 0.1, 0.3]),
    c: triple('--aurora-c', [0.86, 0.52, 0.34]),
    lift: Number(cs.getPropertyValue('--aurora-lift')) || 0,
  };
}

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log || 'shader compile failed');
  }
  return sh;
}

const lerp = (a, b, t) => a + (b - a) * t;

export default function AuroraField({ intensity = 1 }) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);
  // set by the render loop below so prop changes can wake a stopped loop
  const wakeRef = useRef(null);

  /* Writing a ref during render is a side effect that can run for renders
     that never commit, so the sync happens here instead. */
  useEffect(() => {
    intensityRef.current = intensity;
    wakeRef.current?.();
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });

    // No WebGL2, or a context the GPU dropped? The CSS gradient underneath
    // the canvas is the fallback.
    if (!gl || gl.isContextLost()) {
      canvas.style.display = 'none';
      return undefined;
    }
    canvas.style.display = '';

    let program;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'link failed');
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    } catch (err) {
      if (import.meta.env.DEV) console.warn('[aurora]', err);
      canvas.style.display = 'none';
      return undefined;
    }

    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    [
      'uRes', 'uTime', 'uPointer', 'uPointerVel', 'uDrag',
      'uColorA', 'uColorB', 'uColorC', 'uLift', 'uIntensity', 'uScroll',
    ].forEach((n) => {
      u[n] = gl.getUniformLocation(program, n);
    });

    // ---- interaction state ----
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const drag = { x: 0, y: 0 };
    const dragVel = { x: 0, y: 0 };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let vel = 0;
    let velTarget = 0;
    let stops = readStops();
    let fade = 0;
    let scroll = 0;
    let heroFalloff = 1;
    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.6);

    /* Under reduced motion the loop stops once the field has settled, so
       anything that changes what should be on screen has to ask for a
       single repaint. A no-op while the loop is already running. */
    const requestFrame = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const r = dpr();
      const w = Math.round(canvas.clientWidth * r);
      const h = Math.round(canvas.clientHeight * r);
      if (w === width && h === height) return;
      width = w;
      height = h;
      // resizing the backing store clears it, so it must be redrawn
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      requestFrame();
    };

    const toField = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.height) return { x: 0, y: 0 };
      return {
        x: ((clientX - rect.left) * 2 - rect.width) / rect.height,
        y: -(((clientY - rect.top) * 2 - rect.height) / rect.height),
      };
    };

    const onPointerMove = (e) => {
      const p = toField(e.clientX, e.clientY);
      const dx = p.x - target.x;
      const dy = p.y - target.y;
      velTarget = Math.min(Math.hypot(dx, dy) * 5, 1);
      target.x = p.x;
      target.y = p.y;
      if (dragging) {
        dragVel.x += (e.clientX - last.x) * 0.0011;
        dragVel.y -= (e.clientY - last.y) * 0.0011;
        last = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      dragging = false;
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      // The field is a hero device. Once the reader is into the content it
      // recedes to a dim wash so type stays legible on top of it.
      const past = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      heroFalloff = 1 - 0.8 * (past * past * (3 - 2 * past));
      requestFrame();
    };

    const onVisibility = () => {
      visible = !document.hidden;
      requestFrame();
    };

    // theme flips rewrite the CSS custom properties; re-read them
    const themeObserver = new MutationObserver(() => {
      stops = readStops();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    onScroll();

    const start = performance.now();

    function frame(now) {
      raf = 0;
      if (!visible) return;

      const t = (now - start) / 1000;

      smooth.x = lerp(smooth.x, target.x, 0.055);
      smooth.y = lerp(smooth.y, target.y, 0.055);
      velTarget *= 0.94;
      vel = lerp(vel, velTarget, 0.1);

      // drag inertia: velocity decays, offset springs back to centre
      drag.x += dragVel.x;
      drag.y += dragVel.y;
      dragVel.x *= 0.92;
      dragVel.y *= 0.92;
      drag.x *= 0.975;
      drag.y *= 0.975;

      // reduced motion gets no easing, so a single woken frame lands exactly
      // where it should instead of creeping toward it
      const targetFade = intensityRef.current * heroFalloff;
      fade = reduce ? targetFade : lerp(fade, targetFade, 0.06);

      gl.uniform2f(u.uRes, width, height);
      gl.uniform1f(u.uTime, reduce ? 0 : t);
      gl.uniform2f(u.uPointer, smooth.x, smooth.y);
      gl.uniform1f(u.uPointerVel, reduce ? 0 : vel);
      gl.uniform2f(u.uDrag, drag.x, drag.y);
      gl.uniform3fv(u.uColorA, stops.a);
      gl.uniform3fv(u.uColorB, stops.b);
      gl.uniform3fv(u.uColorC, stops.c);
      gl.uniform1f(u.uLift, stops.lift);
      gl.uniform1f(u.uIntensity, fade);
      gl.uniform1f(u.uScroll, scroll);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // reduced motion: draw once, then idle until something wakes us
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    }

    wakeRef.current = requestFrame;
    /* Start through requestFrame, not a bare requestAnimationFrame: the
       resize()/onScroll() calls above may already have queued one, and
       overwriting `raf` here would orphan it. An orphan survives cleanup and
       then runs against the *next* mount's program, which WebGL rejects as
       "location is not from the associated program". */
    requestFrame();

    return () => {
      wakeRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
      // Deliberately no loseContext() here: getContext() on the same canvas
      // returns the *same* context object, so losing it on unmount leaves a
      // dead context for the next mount (React StrictMode remounts in dev).
    };
  }, []);

  return (
    <div className="aurora" aria-hidden="true">
      <canvas ref={canvasRef} className="aurora__canvas" />
    </div>
  );
}

AuroraField.propTypes = {
  intensity: PropTypes.number,
};
