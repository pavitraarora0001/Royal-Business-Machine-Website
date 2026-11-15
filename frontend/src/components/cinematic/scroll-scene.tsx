"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { TechnologyCore } from "./technology-core";
import { ParticleNetwork } from "./particle-network";

interface ScrollSceneProps {
  className?: string;
  intensity?: "full" | "subtle";
}

export function ScrollScene({ className = "", intensity = "full" }: ScrollSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container || shouldReduceMotion) return;

    // Check WebGL availability
    let gl: WebGLRenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (!gl) return;
    } catch {
      return;
    }

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.6);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xc6a869, 1.8);
    goldKeyLight.position.set(12, 16, 20);
    scene.add(goldKeyLight);

    const blueFillLight = new THREE.DirectionalLight(0x475569, 0.9);
    blueFillLight.position.set(-16, -10, -10);
    scene.add(blueFillLight);

    const coreLight = new THREE.PointLight(0xe5c583, 2.0, 18);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Initialize 3D Entities
    const core = new TechnologyCore({
      wireframeColor: 0xc6a869,
      innerColor: 0xe5c583,
      ringColor: 0xc6a869,
      nodeColor: 0xffedd5,
      lineColor: 0xa38548,
    });
    scene.add(core.group);

    const particles = new ParticleNetwork(intensity === "full" ? 140 : 60, 0xc6a869);
    scene.add(particles.points);

    // Scroll & Mouse Tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const deltaY = window.scrollY - lastScrollY;
      scrollVelocity = deltaY * 0.05;
      lastScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    onScroll();

    // Resize Handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop with clock
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth scroll progress lerp
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * (delta * 5.0);
      core.updateScroll(currentScrollProgress);

      // Mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * (delta * 3.5);
      currentMouseY += (targetMouseY - currentMouseY) * (delta * 3.5);
      core.setMouseParallax(currentMouseX, currentMouseY);

      // Dampen scroll velocity
      scrollVelocity *= 0.92;

      // Update entities
      core.update(delta);
      particles.update(delta, scrollVelocity);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      core.dispose();
      particles.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shouldReduceMotion, intensity]);

  if (shouldReduceMotion) {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
        {/* Static elegant ambient fallback */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-slate-500/5 rounded-full blur-[140px]" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${className}`}
      style={{ willChange: "transform" }}
    />
  );
}
