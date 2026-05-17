"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { experience, resume } from "@/data/portfolio";
import { GlassPanel } from "../GlassPanel";
import { SectionTitle } from "../SectionTitle";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:px-6 md:py-28"
      aria-label="Work experience"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Industry" title="Work experience" />
        <div className="flex flex-col gap-6">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              whileTap={{ scale: 0.995 }}
            >
              <GlassPanel className="transition-shadow duration-300 hover:shadow-[0_0_28px_var(--accent-glow)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {job.logoSrc ? (
                    <div className="shrink-0">
                      <Image
                        src={job.logoSrc}
                        alt={`${job.company} logo`}
                        width={72}
                        height={72}
                        className="h-16 w-16 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] object-contain p-1 sm:h-[4.5rem] sm:w-[4.5rem]"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text-primary)]">
                          {job.title}
                        </h3>
                        <p className="text-[var(--accent)]">{job.company}</p>
                      </div>
                      <p className="font-mono text-sm text-[var(--text-muted)]">{job.period}</p>
                    </div>
                    <ul className="mt-6 flex list-none flex-col gap-3">
                      {job.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-5 text-sm leading-relaxed text-[var(--text-muted)] before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)] before:shadow-[0_0_8px_var(--accent-glow)]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href={resume.href}
            download={resume.fileName}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur-xl transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--glass-hover)]"
          >
            <DownloadIcon className="h-4 w-4 text-[var(--accent)]" />
            Download resume (PDF)
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
