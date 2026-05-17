"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const ARMS = 8;
const DISK_STARS = 30_000;
const HALO_STARS = 2_800;
const CORE_STARS = 500;

function hash01(i: number, s: number) {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Soft circular point — avoids square GL_POINTS and harsh additive smear over hero text */
function useStarSpriteMap() {
  const map = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const cx = size / 2;
    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.995);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.22, "rgba(255,255,255,0.9)");
    g.addColorStop(0.5, "rgba(255,255,255,0.28)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  useEffect(() => () => map?.dispose(), [map]);
  return map;
}

/** Spiral disk + bulge: positions and colors in buffer attributes */
function useGalaxyDisk() {
  return useMemo(() => {
    const pos = new Float32Array(DISK_STARS * 3);
    const col = new Float32Array(DISK_STARS * 3);

    const cCore = new THREE.Color("#fde68a");
    const cArmHot = new THREE.Color("#f0abfc");
    const cArmCool = new THREE.Color("#a5b4fc");
    const cDust = new THREE.Color("#7dd3fc");
    const tmp = new THREE.Color();

    for (let i = 0; i < DISK_STARS; i++) {
      const r1 = hash01(i, 1);
      const r2 = hash01(i, 2);
      const r3 = hash01(i, 3);

      const arm = i % ARMS;
      const armAngle = (arm / ARMS) * Math.PI * 2;
      const radius = Math.pow(r1, 0.55) * 5.2;
      const spiral = radius * 2.15 + r2 * 0.85;
      const jitter = (r3 - 0.5) * 0.55 * (1 - radius * 0.08);
      const theta = armAngle + spiral + jitter;

      const thickness = (hash01(i, 4) - 0.5) * 0.22 * (0.35 + radius * 0.12);

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = thickness;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const inCore = radius < 0.55;
      const armMix = hash01(i, 5);
      if (inCore) {
        tmp.copy(cCore).lerp(cArmHot, radius * 1.2 + armMix * 0.35);
      } else if (armMix < 0.22) {
        tmp.copy(cDust).lerp(cArmCool, hash01(i, 6));
      } else if (armMix < 0.55) {
        tmp.copy(cArmCool).lerp(cArmHot, hash01(i, 7));
      } else {
        tmp.copy(cArmHot).lerp(cDust, hash01(i, 8) * 0.6);
      }
      const brighten = 0.55 + hash01(i, 9) * 0.75;
      col[i * 3] = tmp.r * brighten;
      col[i * 3 + 1] = tmp.g * brighten;
      col[i * 3 + 2] = tmp.b * brighten;
    }

    return { pos, col };
  }, []);
}

function useHaloStars() {
  return useMemo(() => {
    const pos = new Float32Array(HALO_STARS * 3);
    const col = new Float32Array(HALO_STARS * 3);
    const c1 = new THREE.Color("#c4b5fd");
    const c2 = new THREE.Color("#93c5fd");
    const tmp = new THREE.Color();

    for (let i = 0; i < HALO_STARS; i++) {
      const u = hash01(i, 10) * 2 - 1;
      const v = hash01(i, 11) * 2 - 1;
      const w = hash01(i, 12) * 2 - 1;
      const len = Math.sqrt(u * u + v * v + w * w) || 1;
      const R = 4.2 + hash01(i, 13) * 9.5;
      pos[i * 3] = (u / len) * R;
      pos[i * 3 + 1] = (v / len) * R * 0.85;
      pos[i * 3 + 2] = (w / len) * R;

      tmp.copy(c1).lerp(c2, hash01(i, 14));
      const dim = 0.25 + hash01(i, 15) * 0.35;
      col[i * 3] = tmp.r * dim;
      col[i * 3 + 1] = tmp.g * dim;
      col[i * 3 + 2] = tmp.b * dim;
    }
    return { pos, col };
  }, []);
}

function useCoreStars() {
  return useMemo(() => {
    const pos = new Float32Array(CORE_STARS * 3);
    const col = new Float32Array(CORE_STARS * 3);
    const cHot = new THREE.Color("#fff7ed");
    const cGold = new THREE.Color("#fbbf24");
    const tmp = new THREE.Color();

    for (let i = 0; i < CORE_STARS; i++) {
      const r = Math.pow(hash01(i, 20), 0.4) * 0.42;
      const th = hash01(i, 21) * Math.PI * 2;
      const ph = (hash01(i, 22) - 0.5) * Math.PI * 0.5;
      pos[i * 3] = r * Math.cos(th) * Math.cos(ph);
      pos[i * 3 + 1] = r * Math.sin(ph) * 0.35;
      pos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);

      tmp.copy(cHot).lerp(cGold, hash01(i, 23));
      const b = 0.9 + hash01(i, 24) * 0.5;
      col[i * 3] = tmp.r * b;
      col[i * 3 + 1] = tmp.g * b;
      col[i * 3 + 2] = tmp.b * b;
    }
    return { pos, col };
  }, []);
}

function Galaxy({ isLight }: { isLight: boolean }) {
  const group = useRef<THREE.Group>(null);
  const disk = useGalaxyDisk();
  const halo = useHaloStars();
  const core = useCoreStars();
  const starMap = useStarSpriteMap();
  const blend = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.042;
  });

  return (
    <group ref={group} rotation={[1.05, 0, 0.06]}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[halo.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[halo.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starMap ?? undefined}
          vertexColors
          size={isLight ? 0.062 : 0.05}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.42 : 0.62}
          depthWrite={false}
          blending={blend}
          toneMapped={false}
        />
      </points>

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[disk.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[disk.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starMap ?? undefined}
          vertexColors
          size={isLight ? 0.048 : 0.034}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.58 : 0.76}
          depthWrite={false}
          blending={blend}
          toneMapped={false}
        />
      </points>

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[core.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[core.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starMap ?? undefined}
          vertexColors
          size={isLight ? 0.095 : 0.072}
          sizeAttenuation
          transparent
          opacity={isLight ? 1 : 0.42}
          depthWrite={false}
          blending={blend}
          toneMapped={false}
        />
      </points>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.95, 64, 1]} />
        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={isLight ? 0.09 : 0.04}
          depthWrite={false}
          blending={blend}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function ThreeBackdrop() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100svh] w-full"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 2.2, 10.5], fov: 35 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
      >
        <Galaxy isLight={isLight} />
      </Canvas>
    </div>
  );
}
