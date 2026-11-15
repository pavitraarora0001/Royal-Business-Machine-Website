"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  scaleEffect?: boolean;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scaleEffect = false,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 36, x: 0 };
      case "down":
        return { y: -36, x: 0 };
      case "left":
        return { x: 36, y: 0 };
      case "right":
        return { x: -36, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scaleEffect ? 0.97 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1] as const, // Luxury cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
