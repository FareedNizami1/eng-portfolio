"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { education, type EducationEntry } from "@/data/portfolio";
import { GlassPanel } from "../GlassPanel";
import { SectionTitle } from "../SectionTitle";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

function EducationCard({ e }: { e: EducationEntry }) {
  const ach = e.achievements ?? [];
  const gpa = e.gpa;
  const subjects = e.subjects;
  const logoSrc = e.logoSrc;

  return (
    <GlassPanel className="h-full transition-shadow duration-300 hover:shadow-[0_0_28px_var(--accent-glow)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs text-[var(--accent)]">{e.period}</p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
            {e.degree}
          </h3>
          {subjects ? (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{subjects}</p>
          ) : null}
          <p className="mt-1 text-[var(--accent)]">{e.school}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{e.detail}</p>
          {ach.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {ach.map((a) => (
                <span
                  key={a}
                  className="rounded-lg border border-[var(--glass-border)] bg-[var(--glass-hover)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {a}
                </span>
              ))}
            </div>
          ) : null}
          {gpa ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              GPA {gpa}
            </p>
          ) : null}
        </div>
        {logoSrc ? (
          <div className="flex shrink-0 justify-start sm:justify-end">
            <Image
              src={logoSrc}
              alt={`${e.school} logo`}
              width={88}
              height={88}
              className="h-20 w-20 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] object-contain p-1 sm:h-[5.5rem] sm:w-[5.5rem]"
            />
          </div>
        ) : null}
      </div>
    </GlassPanel>
  );
}

export function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:px-6 md:py-28"
      aria-label="Education"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Academic" title="Education" />
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.school}
              custom={i}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              whileTap={{ scale: 0.99 }}
            >
              <EducationCard e={e} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
