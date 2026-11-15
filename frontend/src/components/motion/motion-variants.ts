import { Variants } from "framer-motion";

export const EASING = {
  luxury: [0.22, 1, 0.36, 1], // Smooth enterprise decelerate
  standard: [0.16, 1, 0.3, 1],
  gentle: [0.33, 1, 0.68, 1],
  sharp: [0.4, 0, 0.2, 1],
} as const;

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  cinematic: 1.1,
} as const;

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      delay: custom * 0.1,
      ease: EASING.luxury,
    },
  }),
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      delay: custom * 0.08,
      ease: EASING.luxury,
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      delay: custom * 0.08,
      ease: EASING.luxury,
    },
  }),
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      delay: custom * 0.1,
      ease: EASING.luxury,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, scale: 1, transition: { duration: 0.3, ease: EASING.standard } },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.35, ease: EASING.luxury },
  },
};
