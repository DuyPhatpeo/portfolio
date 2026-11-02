'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useId, type CSSProperties, type ReactNode, type RefObject } from 'react';

export type GlassSurfaceChannel = 'R' | 'G' | 'B';

export type GlassSurfaceRenderer = 'auto' | 'svg' | 'webgl';

export type GlassSurfaceBackdrop = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;

interface GlassSettings {
  backdrop?: RefObject<GlassSurfaceBackdrop | null> | GlassSurfaceBackdrop | null;
  displace: number;
  saturation: number;
  distortionScale: number;
  redOffset: number;
  greenOffset: number;
  blueOffset: number;
  xChannel: GlassSurfaceChannel;
  yChannel: GlassSurfaceChannel;
}

interface ShapeBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ShapeTrace {
  box: ShapeBox;
  depth: Float32Array;
  w: number;
  h: number;
  ratio: number;
  line: string;
  glow: string;
}

interface CachedTrace extends ShapeTrace {
  image: HTMLImageElement;
  width: number;
  height: number;
}

type ShapeArt =
  | { src: string; box: ShapeBox; line: string; glow: string; failed?: false }
  | { src: string; failed: true };

export interface GlassSurfaceProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: GlassSurfaceChannel;
  yChannel?: GlassSurfaceChannel;
  mixBlendMode?: CSSProperties['mixBlendMode'];
  refraction?: boolean;
  renderer?: GlassSurfaceRenderer;
  backdrop?: RefObject<GlassSurfaceBackdrop | null> | GlassSurfaceBackdrop | null;
  shape?: string;
  className?: string;
  style?: CSSProperties;
}

const FAR = 1e20;

const GLASS_VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const GLASS_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uBackdrop;
uniform sampler2D uMap;
uniform vec2 uCanvas;
uniform vec2 uSize;
uniform vec2 uOrigin;
uniform vec2 uStep;
uniform vec3 uScale;
uniform ivec2 uChannel;
uniform float uSpread;
uniform float uLod;
uniform float uSaturation;
out vec4 outColor;

vec3 adjustSaturation(vec3 color, float value) {
  const vec3 weights = vec3(0.2126, 0.7152, 0.0722);
  float luminance = dot(color, weights);
  return mix(vec3(luminance), color, value);
}

void main() {
  vec2 screenCoord = (gl_FragCoord.xy - uOrigin) / uCanvas;
  screenCoord.y = 1.0 - screenCoord.y;
  vec2 localCoord = (gl_FragCoord.xy - uOrigin) / uSize;
  localCoord.y = 1.0 - localCoord.y;

  vec4 map = texture(uMap, localCoord);
  float rawR = map[uChannel.x];
  float rawG = map[uChannel.y];
  float rawB = map.b;

  vec2 offset = vec2(rawR - 0.5, rawG - 0.5) * 2.0;
  float mag = length(offset);
  if (mag > 0.0001) {
    offset = (offset / mag) * min(mag, 1.0);
  }

  offset *= uSpread;

  vec2 uvR = screenCoord - offset * uScale.r;
  vec2 uvG = screenCoord - offset * uScale.g;
  vec2 uvB = screenCoord - offset * uScale.b;

  float r = textureLod(uBackdrop, uvR, uLod).r;
  float g = textureLod(uBackdrop, uvG, uLod).g;
  float b = textureLod(uBackdrop, uvB, uLod).b;

  vec3 rgb = adjustSaturation(vec3(r, g, b), uSaturation);
  outColor = vec4(rgb, 1.0);
}`;

const CHANNELS: Record<GlassSurfaceChannel, number> = {
  R: 0,
  G: 1,
  B: 2
};

const TRACE_CACHE = new Map<string, CachedTrace>();
const ART_CACHE = new Map<string, ShapeArt>();

const COLOR = {
  clear: 'rgba(0, 0, 0, 0)',
  black: 'rgba(0, 0, 0, 1)',
  white: 'rgba(255, 255, 255, 1)'
};

const FRAME_SHADOW =
  '0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 15px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';

const SHEEN =
  'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.06) 100%)';

const RIM =
  'radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0) 60%), radial-gradient(120% 100% at 50% 100%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0) 60%)';

const RING =
  'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';

const GLOW = {
  svg: 'radial-gradient(120% 120% at 50% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 70%)',
  fallback:
    'radial-gradient(120% 120% at 50% 20%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0) 70%)'
};

const LINE = {
  svg: 'radial-gradient(100% 80% at 50% 10%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
  fallback:
    'radial-gradient(100% 80% at 50% 10%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)'
};

function resolveElement<T extends Element>(target?: RefObject<T | null> | T | null): T | null {
  if (!target) return null;
  return 'current' in target ? target.current : target;
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertSource: string, fragSource: string) {
  const vert = createShader(gl, gl.VERTEX_SHADER, vertSource);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSource);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

export const GlassSurface = ({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 75,
  opacity = 0.95,
  blur = 16,
  displace = 0.5,
  backgroundOpacity = 0.08,
  saturation = 1.1,
  distortionScale = -1,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'normal',
  refraction = true,
  renderer = 'auto',
  backdrop = null,
  shape,
  className = '',
  style = {}
}: GlassSurfaceProps) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const [useWebGL, setUseWebGL] = useState(false);
  const [outline, setOutline] = useState<{ glow: string; line: string } | null>(null);

  // Simplified and resilient glass style combining frosted glass, backdrop blur and smooth borders
  const glassStyles: CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    backdropFilter: blur > 0 ? `blur(${blur}px) saturate(${saturation * 100}%)` : undefined,
    WebkitBackdropFilter: blur > 0 ? `blur(${blur}px) saturate(${saturation * 100}%)` : undefined,
    mixBlendMode,
    ...style
  };

  const hasBackdrop = Boolean(backdrop);
  const isWebGLEnabled = (renderer === 'webgl' || (renderer === 'auto' && hasBackdrop)) && refraction;

  useEffect(() => {
    setUseWebGL(isWebGLEnabled);
  }, [isWebGLEnabled]);

  return (
    <div
      ref={containerRef}
      className={`relative isolate overflow-hidden ${className}`}
      style={glassStyles}
    >
      {/* Frosted sheen overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: SHEEN,
          opacity: opacity
        }}
      />

      {/* Glass rim lighting gradient */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] p-[1px]"
        style={{
          background: RIM,
          WebkitMask: RING,
          WebkitMaskComposite: 'xor',
          mask: RING,
          maskComposite: 'exclude'
        }}
      />

      {/* Content container */}
      <div className="relative z-[1] w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
