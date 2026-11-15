"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface FloatingParticlesProps {
  particleCount?: number;
  className?: string;
  color?: string; // e.g. "182, 154, 105" (metallic gold)
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  opacitySpeed: number;
}

export function FloatingParticles({
  particleCount = 38,
  className = "",
  color = "182, 154, 105", // RBM gold
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const particles: Particle[] = [];
    const container = containerRef.current;
    const width = container ? container.offsetWidth : 800;
    const height = container ? container.offsetHeight : 600;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        maxOpacity: Math.random() * 0.5 + 0.25,
        opacitySpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const render = () => {
      if (isVisible) {
        const w = container ? container.offsetWidth : 800;
        const h = container ? container.offsetHeight : 600;

        ctx.clearRect(0, 0, w, h);

        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity += p.opacitySpeed;

          if (p.opacity >= p.maxOpacity || p.opacity <= 0.05) {
            p.opacitySpeed = -p.opacitySpeed;
          }

          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${Math.max(0, p.opacity)})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, color, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
