"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/** Stagger container — children must use AnimatedItem to get the stagger effect */
export function AnimatedSection({ children, className, style }) {
  return (
    <motion.section
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

/** Standalone fade-up div — self-contained, no parent needed */
export function AnimatedDiv({ children, className, style, delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside AnimatedSection (inherits stagger) */
export function AnimatedItem({ children, className, style }) {
  return (
    <motion.div className={className} style={style} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
