"use client";

import React, { useCallback, useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_uv;
  varying vec2 vUv;
  
  void main() {
    vUv = a_uv;
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer;
  uniform float u_scroll;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_chroma;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.0);
    vec2 res = vec2(0.0);
    float scale = 8.0;
    
    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.0);
      sine_acc = rotate(sine_acc, 1.0);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (0.5 + 0.5 * cos(layer)) / scale;
      scale *= 1.2;
    }
    return res.x + res.y;
  }

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    vec2 uv = 0.5 * vUv;
    uv.x *= u_ratio;
    
    vec2 pointer = vUv - u_pointer;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0.0, 1.0);
    p = 0.5 * pow(1.0 - p, 2.0);
    
    float t = 0.001 * u_time;
    float noise = neuro_shape(uv, t, p);
    
    noise = 1.2 * pow(noise, 3.0);
    noise += pow(noise, 10.0);
    noise = max(0.0, noise - 0.5);
    noise *= (1.0 - length(vUv - 0.5));
    
    float normalizedHue = u_hue / 360.0;
    vec3 hsl = vec3(
      normalizedHue + 0.1 * sin(3.0 * u_scroll + 1.5),
      u_saturation,
      u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll)
    );
    
    vec3 color = hsl2rgb(hsl) * noise;
    gl_FragColor = vec4(color, noise);
  }
`;

interface NeuroCanvasProps {
  baseColor?: string;
  hue?: number;
  saturation?: number;
  chroma?: number;
  quality?: "low" | "medium" | "high";
  followScroll?: boolean;
  className?: string;
}

interface Pointer {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

interface Buffers {
  posBuffer: WebGLBuffer;
  uvBuffer: WebGLBuffer;
}

interface Uniforms {
  u_time: WebGLUniformLocation | null;
  u_ratio: WebGLUniformLocation | null;
  u_pointer: WebGLUniformLocation | null;
  u_scroll: WebGLUniformLocation | null;
  u_hue: WebGLUniformLocation | null;
  u_saturation: WebGLUniformLocation | null;
  u_chroma: WebGLUniformLocation | null;
}

interface WebGLState {
  gl: WebGLRenderingContext | null;
  program: WebGLProgram | null;
  uniforms: Uniforms;
  buffers: Buffers | null;
  raf: number | null;
  pointer: Pointer;
}

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compilation failed: ${info}`);
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    throw new Error(`Program linking failed: ${info}`);
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

const createQuad = (gl: WebGLRenderingContext): Buffers => {
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

  const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

  const posBuffer = gl.createBuffer();
  if (!posBuffer) throw new Error("Failed to create position buffer");
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const uvBuffer = gl.createBuffer();
  if (!uvBuffer) throw new Error("Failed to create UV buffer");
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

  return { posBuffer, uvBuffer };
};

const QUALITY_PRESETS = { low: 1, medium: 1.25, high: 1.75 };

const NeuroCanvas: React.FC<NeuroCanvasProps> = ({
  baseColor,
  hue = 0,
  saturation = 0.5,
  chroma = 0.5,
  quality = "low",
  followScroll = false,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<WebGLState>({
    gl: null,
    program: null,
    uniforms: {
      u_time: null,
      u_ratio: null,
      u_pointer: null,
      u_scroll: null,
      u_hue: null,
      u_saturation: null,
      u_chroma: null,
    },
    buffers: null,
    raf: null,
    pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });
  const isVisibleRef = useRef(true);
  if (baseColor) {
    const rgb = baseColor.match(/.{1,2}/g)?.map((x) => parseInt(x, 16) / 255);
    if (rgb && rgb.length === 3) {
      const [r, g, b] = rgb;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (delta !== 0) {
        s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);

        switch (max) {
          case r:
            h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
            break;
          case g:
            h = ((b - r) / delta + 2) * 60;
            break;
          case b:
            h = ((r - g) / delta + 4) * 60;
            break;
        }
      }
      hue = h;
      saturation = s;
      chroma = l;
    }
  }

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const { gl, uniforms } = stateRef.current;
    if (!canvas || !gl) return;
    const dpr = Math.min(window.devicePixelRatio, QUALITY_PRESETS[quality]);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uniforms.u_ratio) {
      gl.uniform1f(uniforms.u_ratio, rect.width / rect.height);
    }
  }, [quality]);

  const animate = useCallback(() => {
    const { gl, program, uniforms, pointer } = stateRef.current;
    if (!gl || !program) return;

    // Pause if not visible
    if (!isVisibleRef.current) {
      stateRef.current.raf = null;
      return;
    }

    pointer.x += (pointer.targetX - pointer.x) * 0.2;
    pointer.y += (pointer.targetY - pointer.y) * 0.2;

    gl.useProgram(program);

    if (uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, performance.now());
    }
    if (uniforms.u_pointer) {
      gl.uniform2f(uniforms.u_pointer, pointer.x, 1 - pointer.y);
    }
    if (uniforms.u_scroll && followScroll) {
      gl.uniform1f(
        uniforms.u_scroll,
        window.scrollY / (2 * window.innerHeight),
      );
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    stateRef.current.raf = requestAnimationFrame(animate);
  }, [followScroll]);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    stateRef.current.pointer.targetX = clientX / rect.width;
    stateRef.current.pointer.targetY = clientY / rect.height;
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    },
    [updatePointer],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updatePointer],
  );

  useEffect(() => {
    const { gl, program, uniforms } = stateRef.current;
    if (gl && program && uniforms.u_hue) {
      gl.useProgram(program);
      gl.uniform1f(uniforms.u_hue, hue);
    }
  }, [hue]);

  useEffect(() => {
    const { gl, program, uniforms } = stateRef.current;
    if (gl && program && uniforms.u_saturation) {
      gl.useProgram(program);
      gl.uniform1f(uniforms.u_saturation, saturation);
    }
  }, [saturation]);

  useEffect(() => {
    const { gl, program, uniforms } = stateRef.current;
    if (gl && program && uniforms.u_chroma) {
      gl.useProgram(program);
      gl.uniform1f(uniforms.u_chroma, chroma);
    }
  }, [chroma]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
      if (!gl) throw new Error("WebGL not supported");

      const program = createProgram(
        gl,
        vertexShaderSource,
        fragmentShaderSource,
      );
      const buffers = createQuad(gl);

      gl.useProgram(program);

      const posLoc = gl.getAttribLocation(program, "a_position");
      const uvLoc = gl.getAttribLocation(program, "a_uv");

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.posBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uvBuffer);
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

      const uniforms: Uniforms = {
        u_time: gl.getUniformLocation(program, "u_time"),
        u_ratio: gl.getUniformLocation(program, "u_ratio"),
        u_pointer: gl.getUniformLocation(program, "u_pointer"),
        u_scroll: gl.getUniformLocation(program, "u_scroll"),
        u_hue: gl.getUniformLocation(program, "u_hue"),
        u_saturation: gl.getUniformLocation(program, "u_saturation"),
        u_chroma: gl.getUniformLocation(program, "u_chroma"),
      };

      if (uniforms.u_hue) gl.uniform1f(uniforms.u_hue, hue);
      if (uniforms.u_saturation)
        gl.uniform1f(uniforms.u_saturation, saturation);
      if (uniforms.u_chroma) gl.uniform1f(uniforms.u_chroma, chroma);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      stateRef.current = {
        ...stateRef.current,
        gl,
        program,
        uniforms,
        buffers,
      };

      resize();
      animate();

      // Setup intersection observer to pause when off-screen
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          const isVisible = entries[0].isIntersecting;
          isVisibleRef.current = isVisible;

          // Resume animation if visible and not currently running
          if (isVisible && !stateRef.current.raf && stateRef.current.gl) {
            stateRef.current.raf = requestAnimationFrame(animate);
          }
        },
        { threshold: 0.1 },
      );
      visibilityObserver.observe(canvas);

      window.addEventListener("resize", resize);
      window.addEventListener(
        "pointermove",
        handlePointerMove as EventListener,
      );
      window.addEventListener("touchmove", handleTouchMove as EventListener);

      return () => {
        visibilityObserver.disconnect();
        if (stateRef.current.raf) {
          cancelAnimationFrame(stateRef.current.raf);
        }
        window.removeEventListener("resize", resize);
        window.removeEventListener(
          "pointermove",
          handlePointerMove as EventListener,
        );
        window.removeEventListener(
          "touchmove",
          handleTouchMove as EventListener,
        );

        if (gl) {
          gl.deleteProgram(program);
          gl.deleteBuffer(buffers.posBuffer);
          gl.deleteBuffer(buffers.uvBuffer);
        }
      };
    } catch (error) {
      console.error("WebGL initialization failed:", error);
    }
  }, [
    animate,
    resize,
    handlePointerMove,
    handleTouchMove,
    hue,
    saturation,
    chroma,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default NeuroCanvas;
