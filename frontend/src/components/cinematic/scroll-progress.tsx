"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress({ showPercentage = false }: { showPercentage?: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background track */}
      <div className="h-[2px] w-full bg-transparent">
        {/* Animated golden beam */}
        <motion.div
          style={{ scaleX, transformOrigin: "0%" }}
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(198,168,105,0.7)]"
        />
      </div>

      {showPercentage && percentage > 3 && percentage < 98 && (
        <div className="absolute right-4 top-2 text-[10px] font-mono font-bold tracking-widest text-amber-500/80 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/20">
          {percentage}%
        </div>
      )}
    </div>
  );
}
