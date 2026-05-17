"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectEntry } from "@/data/portfolio";
import { projects } from "@/data/portfolio";
import { ProjectDialog } from "../ProjectDialog";
import { SectionTitle } from "../SectionTitle";

export function ProjectsSection() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null);

  return (
    <section
      id="projects"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:px-6 md:py-28"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Build" title="Projects" />
        <p className="-mt-6 mb-10 text-sm text-[var(--text-muted)]">
          Click a card to open details.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" } }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectCard project={p} onClick={() => setSelected(p)} />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectDialog
        key={selected?.id ?? "project-dialog-closed"}
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: ProjectEntry; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 text-left shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:border-white/20 hover:shadow-[0_0_40px_var(--accent-glow)]"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl opacity-20 transition-opacity group-hover:opacity-35"
        aria-hidden
      />

      <div className="relative flex flex-col p-4 md:p-5">
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl border border-white/15 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-white/50">
              No preview
            </div>
          )}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5"
            aria-hidden
          />
          {project.video ? (
            <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur-sm">
              Has video
            </span>
          ) : null}
        </div>

        <div className="relative z-[1] mt-4 flex flex-1 flex-col px-1 pb-1">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
              backgroundSize: "220% 100%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
          />

          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white transition-colors group-hover:text-[var(--accent)]">
              {project.name}
            </h3>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--accent-foreground)] shadow-[0_0_16px_var(--accent-glow)] transition-transform group-hover:rotate-12 group-hover:scale-105">
              <ChevronIcon className="h-4 w-4" />
            </span>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-white/75">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 3 ? (
              <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] text-white/60">
                +{project.technologies.length - 3}
              </span>
            ) : null}
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            Open overview →
          </p>
        </div>
      </div>
    </button>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
