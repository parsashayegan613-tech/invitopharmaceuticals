"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const FadeInOnScroll = ({
  children,
  delay = 0,
  direction = "up",
  className = ""
}: FadeInOnScrollProps) => {
  const shouldReduceMotion = useReducedMotion();
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 0, y: 40 },
    right: { x: 0, y: 40 },
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : {
        opacity: 0,
        ...directionOffset[direction]
      }}
      whileInView={shouldReduceMotion ? undefined : {
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={shouldReduceMotion ? undefined : {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
