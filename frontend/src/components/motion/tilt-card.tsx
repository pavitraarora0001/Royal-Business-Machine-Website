"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  tiltIntensity?: number;
  glareEffect?: boolean;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt,
  tiltIntensity = 7,
  glareEffect = true,
  glareOpacity = 0.18,
}: TiltCardProps) {
  const effectiveMaxTilt = maxTilt !== undefined ? maxTilt : tiltIntensity;
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -effectiveMaxTilt;
    const rotateYValue = ((x - centerX) / centerX) * effectiveMaxTilt;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className={`relative transform-gpu ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {glareEffect && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(198, 168, 105, 0.35) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
