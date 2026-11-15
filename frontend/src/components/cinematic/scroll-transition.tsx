"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScrollTransitionProps {
  className?: string;
  glow?: boolean;
}

export function ScrollTransition({ className = "", glow = true }: ScrollTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full h-16 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background Soft Glow */}
      {glow && (
        <div className="absolute w-72 h-12 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Central Golden Hairline Beam */}
      <div className="relative w-full max-w-4xl px-4 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        
        {/* Animated Center Pulse Gem */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#C6A869]"
          />
        )}
      </div>
    </div>
  );
}
