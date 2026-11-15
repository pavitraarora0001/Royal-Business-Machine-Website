"use client";

import { motion } from "framer-motion";

interface AnimatedCircuitProps {
  className?: string;
  orientation?: "horizontal" | "vertical" | "curved";
  color?: string;
  pulse?: boolean;
}

export function AnimatedCircuit({
  className = "",
  orientation = "horizontal",
  color = "#C6A869",
  pulse = true,
}: AnimatedCircuitProps) {
  if (orientation === "vertical") {
    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        <svg
          width="24"
          height="120"
          viewBox="0 0 24 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Background hairline line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="120"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeOpacity="0.25"
          />
          {/* Animated drawing line */}
          <motion.line
            x1="12"
            y1="0"
            x2="12"
            y2="120"
            stroke={color}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0.2 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Glowing node at center */}
          <circle cx="12" cy="60" r="3" fill={color} />
          {pulse && (
            <motion.circle
              cx="12"
              cy="60"
              r="6"
              stroke={color}
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    );
  }

  if (orientation === "curved") {
    return (
      <div className={`relative overflow-visible pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <path
            d="M 10,60 C 100,10 200,110 390,60"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.2"
          />
          <motion.path
            d="M 10,60 C 100,10 200,110 390,60"
            stroke={color}
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {/* End nodes */}
          <circle cx="10" cy="60" r="3" fill={color} />
          <circle cx="390" cy="60" r="3" fill={color} />
        </svg>
      </div>
    );
  }

  // Default Horizontal
  return (
    <div className={`relative flex items-center justify-center w-full py-2 ${className}`}>
      <svg
        width="100%"
        height="16"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <line
          x1="0"
          y1="8"
          x2="300"
          y2="8"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.2"
        />
        <motion.line
          x1="0"
          y1="8"
          x2="300"
          y2="8"
          stroke={color}
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* Pulsing Central Energy Node */}
        <circle cx="150" cy="8" r="2.5" fill={color} />
        {pulse && (
          <motion.circle
            cx="150"
            cy="8"
            r="6"
            stroke={color}
            strokeWidth="0.8"
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: [1, 2.2, 1], opacity: [0.9, 0, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}
