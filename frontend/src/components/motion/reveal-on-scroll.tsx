"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "./motion-variants";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  threshold?: number;
}

export function RevealOnScroll({
  children,
  delay = 0,
  duration = DURATION.slow,
  direction = "up",
  distance = 28,
  className = "",
  threshold = 0.15,
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: EASING.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
