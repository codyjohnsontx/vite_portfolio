/* Fullscreen-quad aurora field.
   Domain-warped FBM drives a set of orbiting gaussian blobs; one blob tracks
   the pointer and inflates with pointer speed. Colour is a three-stop ramp
   evaluated three times with radially-shifted inputs, which reads as
   chromatic dispersion toward the edges without tripling the noise cost. */

export const VERT = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

export const FRAG = `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;    // aspect-corrected, roughly -1.8..1.8 in x
uniform float uPointerVel; // 0..1 smoothed speed
uniform vec2  uDrag;       // accumulated drag offset with inertia
uniform vec3  uColorA;     // core
uniform vec3  uColorB;     // base / background
uniform vec3  uColorC;     // hot edge
uniform float uLift;       // 0 = dark art direction, 1 = light
uniform float uIntensity;  // entrance fade, 0..1
uniform float uScroll;     // 0..1 page progress

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = ROT * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// two rounds of domain warping - the field folds into itself and stops
// reading as plain noise
float warped(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, t * 0.10)),
    fbm(p + vec2(5.2, 1.3) - t * 0.08)
  );
  vec2 r = vec2(
    fbm(p + 3.4 * q + vec2(1.7, 9.2) + t * 0.06),
    fbm(p + 3.4 * q + vec2(8.3, 2.8) - t * 0.05)
  );
  return fbm(p + 3.2 * r);
}

float blob(vec2 uv, vec2 c, float r) {
  vec2 d = uv - c;
  return exp(-dot(d, d) / (r * r));
}

vec3 ramp(float k) {
  vec3 col = mix(uColorB, uColorA, smoothstep(0.04, 0.86, k));
  col = mix(col, uColorC, smoothstep(0.60, 1.40, k) * 0.72);
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  vec2 drift = uDrag;
  float t = uTime * 0.12 + uScroll * 1.4;

  float w = warped(uv * 0.82 + drift * 0.6, t);

  float f = 0.0;
  f += blob(uv, vec2(sin(t * 0.90) * 0.78, cos(t * 0.70) * 0.44) + drift, 0.86);
  f += blob(uv, vec2(cos(t * 0.60 + 2.0) * 0.98, sin(t * 1.10 + 1.0) * 0.52) + drift, 0.62) * 0.82;
  f += blob(uv, vec2(sin(t * 0.45 + 4.0) * 0.54, cos(t * 0.50 + 3.0) * 0.62) + drift, 1.10) * 0.60;
  f += blob(uv, uPointer, 0.40 + uPointerVel * 0.45) * (0.70 + uPointerVel * 1.30);

  float k = clamp(f * (0.52 + w * 0.95), 0.0, 1.7);

  // radial chromatic dispersion
  float rad = dot(uv, uv) * 0.035 + uPointerVel * 0.03;
  vec3 col = vec3(
    ramp(k * (1.0 + rad)).r,
    ramp(k).g,
    ramp(k * (1.0 - rad)).b
  );

  // Light art direction is driven entirely by the colour stops, which are
  // already pastel; uLift only softens contrast toward the paper white so
  // the field stays a wash rather than becoming a second dark image.
  col = mix(col, col * 0.45 + 0.55, uLift * 0.5);

  // ordered-ish dither kills 8-bit banding across the large soft gradients
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  fragColor = vec4(col * uIntensity, 1.0);
}`;
