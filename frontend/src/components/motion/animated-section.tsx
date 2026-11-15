"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "./motion-variants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ambientGlow?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  id,
  ambientGlow = false,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {ambientGlow && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        </div>
      )}
      {shouldReduceMotion ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DURATION.slow, ease: EASING.luxury }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
