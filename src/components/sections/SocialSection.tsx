"use client";

import { motion } from "framer-motion";
import { connect } from "@/data/portfolio";
import { GlassPanel } from "../GlassPanel";
import { SectionTitle } from "../SectionTitle";

export function SocialSection() {
  return (
    <section
      id="social"
      className="scroll-mt-28 px-4 py-20 pb-32 md:scroll-mt-32 md:px-6 md:py-28 md:pb-40"
      aria-label="Connect"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Contact" title="Connect" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <GlassPanel className="transition-shadow duration-300 hover:shadow-[0_0_36px_var(--accent-glow)]">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Reach me</p>
            <div className="mt-6 flex flex-col gap-6 text-[var(--text-primary)]">
              <p className="text-sm leading-relaxed text-[var(--text-muted)] md:hidden">{connect.display}</p>
              <div className="hidden flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm md:flex md:text-base">
                <a
                  href={`mailto:${connect.personalEmail}`}
                  className="text-[var(--text-primary)] underline decoration-[var(--accent)]/50 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                >
                  {connect.personalEmail}
                </a>
                <span className="text-[var(--text-muted)]">|</span>
                <a
                  href={`mailto:${connect.schoolEmail}`}
                  className="text-[var(--text-primary)] underline decoration-[var(--accent)]/50 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                >
                  {connect.schoolEmail}
                </a>
                <span className="text-[var(--text-muted)]">|</span>
                <span className="text-[var(--text-muted)]">LinkedIn:</span>
                <a
                  href={connect.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline decoration-[var(--accent)]/50 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                >
                  {connect.linkedinSlug}
                </a>
              </div>
              <div className="flex flex-col gap-4 md:hidden">
                <a
                  href={`mailto:${connect.personalEmail}`}
                  className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-hover)] px-4 py-3 text-center text-sm font-medium transition-colors hover:border-[var(--accent)]/40"
                >
                  {connect.personalEmail}
                </a>
                <a
                  href={`mailto:${connect.schoolEmail}`}
                  className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-hover)] px-4 py-3 text-center text-sm font-medium transition-colors hover:border-[var(--accent)]/40"
                >
                  {connect.schoolEmail}
                </a>
                <a
                  href={connect.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-hover)] px-4 py-3 text-center text-sm font-medium transition-colors hover:border-[var(--accent)]/40"
                >
                  LinkedIn: {connect.linkedinSlug}
                </a>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
