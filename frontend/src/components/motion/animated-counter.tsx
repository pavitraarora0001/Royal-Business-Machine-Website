"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // Parse prefix, target number, suffix, and decimal precision
  // Examples: "₹1.8 Cr+" -> prefix: "₹", num: 1.8, suffix: " Cr+"
  //           "50+"      -> prefix: "", num: 50, suffix: "+"
  //           "99%"      -> prefix: "", num: 99, suffix: "%"
  //           "5,000+"   -> prefix: "", num: 5000, suffix: "+", hasComma: true
  const match = value.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const rawNumStr = match ? match[2] : "";
  const suffix = match ? match[3] : "";

  const hasComma = rawNumStr.includes(",");
  const cleanNumStr = rawNumStr.replace(/,/g, "");
  const targetNumber = parseFloat(cleanNumStr) || 0;
  const isDecimal = cleanNumStr.includes(".");
  const decimalPlaces = isDecimal ? cleanNumStr.split(".")[1].length : 0;

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * targetNumber;

      setCurrentNumber(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentNumber(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  const valueToFormat = shouldReduceMotion ? targetNumber : currentNumber;

  const formattedNumber = () => {
    if (isDecimal) {
      return valueToFormat.toFixed(decimalPlaces);
    }
    const rounded = Math.floor(valueToFormat);
    if (hasComma) {
      return rounded.toLocaleString("en-IN");
    }
    return rounded.toString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber()}
      {suffix}
    </span>
  );
}
