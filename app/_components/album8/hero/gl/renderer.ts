// gl/renderer.ts — zero-dependency WebGL1 cover renderer
import { FRAG } from './cover.frag';

const VERT = 'attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}';
const UNIFORMS = ['uTex', 'uRes', 'uCam', 'uMouse', 'uVel', 'uForce', 'uFx', 'uAmbient', 'uTime'] as const;
type UName = (typeof UNIFORMS)[number];

export type Frame = {
  time: number; camX: number; camY: number; zoom: number;
  mouseX: number; mouseY: number; velX: number; velY: number; // CSS px, canvas-relative
  force: number; fx: number; ambient: number;
};
export type CoverRenderer = { ready: Promise<void>; isLost(): boolean; render(f: Frame): void; setSize(w: number, h: number): void; dispose(): void };

export function createCoverRenderer(
  canvas: HTMLCanvasElement,
  src: string,
  opts: { maxDpr: number; maxPixels?: number; onLost?: () => void; onRestored?: () => void },
): CoverRenderer | null {
  const attrs: WebGLContextAttributes = {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false,
    powerPreference: 'default', failIfMajorPerformanceCaveat: true, // null on software GL -> <img>
  };
  let gl: WebGLRenderingContext | null = null;
  let loc = {} as Record<UName, WebGLUniformLocation | null>;
  let image: HTMLImageElement | null = null;
  let lost = false, disposed = false;
  let cssW = canvas.clientWidth || 1, cssH = canvas.clientHeight || 1, dpr = 1;

  const compile = (g: WebGLRenderingContext, type: number, source: string) => {
    const s = g.createShader(type)!;
    g.shaderSource(s, source); g.compileShader(s);
    if (!g.getShaderParameter(s, g.COMPILE_STATUS) && !g.isContextLost()) throw new Error(g.getShaderInfoLog(s) ?? 'shader');
    return s;
  };

  const upload = () => {
    if (!gl || !image) return;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); // row 0 = top of image = art v=0 (y down)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  };

  const init = (): boolean => {
    gl = canvas.getContext('webgl', attrs) as WebGLRenderingContext | null;
    if (!gl) return false;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(prog, 0, 'aPos');
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS) && !gl.isContextLost()) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // one oversized triangle
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    loc = {} as typeof loc;
    for (const n of UNIFORMS) loc[n] = gl.getUniformLocation(prog, n);
    gl.uniform1i(loc.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    // NPOT-safe: clamp + linear, no mipmaps
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    upload();
    applySize();
    return true;
  };

  const applySize = () => {
    if (!gl) return;
    let d = Math.min(window.devicePixelRatio || 1, opts.maxDpr);
    const maxPx = opts.maxPixels ?? 2_400_000;
    if (cssW * cssH * d * d > maxPx) d = Math.sqrt(maxPx / (cssW * cssH));
    dpr = d;
    const w = Math.max(1, Math.round(cssW * d)), h = Math.max(1, Math.round(cssH * d));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
  };

  const onLost = (e: Event) => { e.preventDefault(); lost = true; opts.onLost?.(); };
  const onRestored = () => {
    if (disposed) return;
    try { if (init()) { lost = false; opts.onRestored?.(); } } catch { /* stay on <img> */ }
  };
  canvas.addEventListener('webglcontextlost', onLost, false);
  canvas.addEventListener('webglcontextrestored', onRestored, false);

  try { if (!init()) return null; } catch { return null; }

  const ready = (async () => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src; // same-origin; add img.crossOrigin = 'anonymous' if served from a CDN domain
    await img.decode();
    if (disposed) return;
    image = img;
    upload();
  })();

  return {
    ready,
    isLost: () => lost,
    setSize(w, h) { cssW = Math.max(1, w); cssH = Math.max(1, h); applySize(); },
    render(f) {
      if (!gl || lost || !image || disposed) return;
      const W = canvas.width, H = canvas.height;
      gl.uniform2f(loc.uRes, W, H);
      gl.uniform3f(loc.uCam, f.camX, f.camY, f.zoom);
      gl.uniform2f(loc.uMouse, f.mouseX * dpr, f.mouseY * dpr);
      gl.uniform2f(loc.uVel, f.velX * dpr, f.velY * dpr);
      gl.uniform1f(loc.uForce, f.force);
      gl.uniform1f(loc.uFx, f.fx);
      gl.uniform1f(loc.uAmbient, f.ambient);
      gl.uniform1f(loc.uTime, f.time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      disposed = true;
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl?.getExtension('WEBGL_lose_context')?.loseContext(); // free GPU memory on unmount / HMR
      gl = null;
    },
  };
}
