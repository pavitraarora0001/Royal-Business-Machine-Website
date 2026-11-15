"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "./motion-variants";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.04,
  as: Component = "span",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: EASING.luxury,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block mr-[0.28em] ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
