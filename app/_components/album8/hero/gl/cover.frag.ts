export const FRAG = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;
uniform vec2  uRes;     // drawing buffer, device px
uniform vec3  uCam;     // xy = art-space centre (0..1, y down), z = zoom >= 1
uniform vec2  uMouse;   // device px, top-left origin
uniform vec2  uVel;     // smoothed pointer velocity, device px / frame
uniform float uForce;   // 0..1 cursor influence (decays in JS)
uniform float uFx;      // 0..1 global effect intensity (intro ramp, quality tier)
uniform float uAmbient; // 0..1 autonomous drift (touch / no pointer)
uniform float uTime;    // seconds

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a*vnoise(p); p = p*2.03+17.1; a *= 0.5; } return v; }
vec2 flow(vec2 p){ return vec2(fbm(p), fbm(p+vec2(5.2,1.3))) - 0.5; }
vec3 screenBlend(vec3 a, vec3 b){ return 1.0-(1.0-a)*(1.0-b); }

void main(){
  vec2  px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float S  = max(uRes.x, uRes.y) * uCam.z;        // art edge in device px (square art)
  vec2  uv = uCam.xy + (px - 0.5*uRes) / S;       // == object-fit: cover at zoom 1

  vec2 disp = vec2(0.0);
  vec2  d    = px - uMouse;
  float rad  = 0.16*min(uRes.x,uRes.y) + 0.06*max(uRes.x,uRes.y);
  float fall = exp(-dot(d,d)/(rad*rad)) * uForce * uFx;
  if (fall > 0.002) {                               // pay for noise only near the cursor
    mat2 rot = mat2(0.8,-0.6,0.6,0.8);
    vec2 facet = flow(floor(rot*uv*14.0)*0.37 + uTime*0.12);  // cubist shards
    vec2 soft  = flow(uv*5.0 + uTime*0.06);                   // brush flow
    vec2 fl    = mix(soft, facet, 0.65);
    float ring = sin(length(d)/rad*10.0 - uTime*5.0);
    disp = (fl*0.045 + d/(length(d)+1.0)*ring*0.004 - uVel/S*4.0) * fall;
  }
  disp += (vec2(vnoise(uv*3.0+uTime*0.07), vnoise(uv*3.0+9.1-uTime*0.05)) - 0.5) * 0.006 * uAmbient * uFx;

  float amt = clamp(length(disp)*60.0, 0.0, 1.0);
  vec2  ca  = normalize(disp + 1e-6) * 0.003 * amt;  // chromatic split grows with displacement
  vec3 col;
  col.r = texture2D(uTex, uv + disp + ca).r;
  col.g = texture2D(uTex, uv + disp).g;
  col.b = texture2D(uTex, uv + disp - ca).b;

  // moon breathing glow — anchor (0.128, 0.113)
  float dm = distance(uv, vec2(0.128, 0.113));
  col = screenBlend(col, vec3(1.0,0.9,0.7) * smoothstep(0.14, 0.035, dm) * 0.22 * (0.75+0.25*sin(uTime*1.1)) * uFx);

  // doorway filament flicker — rect x .835-.965, y .245-.65
  vec2 lo = smoothstep(vec2(0.825,0.23), vec2(0.85,0.27), uv);
  vec2 hi = 1.0 - smoothstep(vec2(0.95,0.63), vec2(0.975,0.67), uv);
  float tick = floor(uTime*14.0);
  float dip  = step(0.93, hash(vec2(tick,7.0))) * (0.5 + 0.5*hash(vec2(tick,3.0)));
  col *= 1.0 + lo.x*lo.y*hi.x*hi.y * (0.10 - 0.35*dip) * uFx;

  col += (hash(px + fract(uTime*7.0)*311.0) - 0.5) * 0.03 * uFx;   // fine grain
  gl_FragColor = vec4(col, 1.0);
}
`;
