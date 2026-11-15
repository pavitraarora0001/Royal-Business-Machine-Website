"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  highlightWords = [],
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 font-extrabold",
  delay = 0,
  as: Component = "h2",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => cleanWord === hw.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
        );

        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block mr-[0.28em] ${isHighlight ? highlightClass : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
