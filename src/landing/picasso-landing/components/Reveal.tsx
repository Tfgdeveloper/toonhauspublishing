import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** "right" = slides in from the right (old .box), "left" = from the left (old .box-y) */
  from?: "left" | "right";
  delay?: number;
  className?: string;
  as?: "section" | "div";
};

/** Replaces the GSAP ScrollTrigger fade/slide-in from the original site. */
export default function Reveal({ children, from = "right", delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, x: from === "right" ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </Comp>
  );
}
