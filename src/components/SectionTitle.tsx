"use client";

import { motion } from "framer-motion";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
};

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-px max-w-xs bg-gradient-to-r from-[var(--accent)]/60 to-transparent" />
    </motion.div>
  );
}
