"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingGeometryProps {
  className?: string;
  type?: "cube" | "octahedron" | "prism" | "ring";
  size?: number;
  color?: string;
  speed?: number;
}

export function FloatingGeometry({
  className = "",
  type = "cube",
  size = 48,
  color = "#C6A869",
  speed = 6,
}: FloatingGeometryProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  const renderShape = () => {
    switch (type) {
      case "octahedron":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon
              points="50,10 90,50 50,90 10,50"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <polygon
              points="50,10 50,90"
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
            <polygon
              points="10,50 90,50"
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
          </svg>
        );

      case "prism":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon
              points="50,15 85,80 15,80"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.45"
            />
            <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        );

      case "ring":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="20"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.4"
              transform="rotate(-25 50 50)"
            />
            <circle cx="50" cy="50" r="4" fill={color} fillOpacity="0.6" />
          </svg>
        );

      default: // cube
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              rx="6"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.35"
              transform="rotate(45 50 50)"
            />
            <rect
              x="30"
              y="30"
              width="40"
              height="40"
              rx="4"
              stroke={color}
              strokeWidth="1"
              strokeOpacity="0.2"
              transform="rotate(45 50 50)"
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none select-none ${className}`}
    >
      {renderShape()}
    </motion.div>
  );
}
