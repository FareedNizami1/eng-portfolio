"use client";

import { motion } from "framer-motion";
import { background } from "@/data/portfolio";
import { GlassPanel } from "../GlassPanel";
import { SectionTitle } from "../SectionTitle";

export function BackgroundSection() {
  return (
    <section
      id="background"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:px-6 md:py-28"
      aria-label="Background"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About" title="Background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <GlassPanel className="transition-shadow duration-300 hover:shadow-[0_0_32px_var(--accent-glow)]">
            <div className="space-y-6 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              {background.paragraphs.map((p, i) => (
                <motion.p
                  key={p.slice(0, 48)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
