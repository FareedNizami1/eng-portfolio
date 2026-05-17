"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cadSoftware } from "@/data/cadSoftware";
import type { CadProjectItem, CadSoftwareGroup } from "@/data/cadSoftware";
import { CadProjectDialog } from "../CadProjectDialog";
import { GlassPanel } from "../GlassPanel";
import { SectionTitle } from "../SectionTitle";

type Selection = { software: CadSoftwareGroup; project: CadProjectItem };

export function CADSection() {
  const [selected, setSelected] = useState<Selection | null>(null);

  return (
    <section
      id="cad"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:px-6 md:py-28"
      aria-label="CAD portfolio"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Design" title="CAD portfolio" />
        <p className="-mt-6 mb-12 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          Work organized by platform—same structure as my previous portfolio. Click any tile for the full write-up
          and specs.
        </p>

        {cadSoftware.map((software, gi) => (
          <div key={software.id} className={gi > 0 ? "mt-16" : ""}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2">
                <Image
                  src={software.logoUrl}
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)] md:text-xl">
                  {software.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {software.projects.length} exercises
                </p>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {software.projects.map((project, i) => (
                <motion.div
                  key={`${software.id}-${project.localId}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.04, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelected({ software, project })}
                    className="group w-full text-left"
                  >
                    <GlassPanel className="relative h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_0_28px_var(--accent-glow)]">
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${software.color} opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]`}
                        aria-hidden
                      />
                      <motion.div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.08) 50%, transparent 62%)",
                          backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8 }}
                      />
                      <div className="relative z-[1]">
                        <h4 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                          {project.title}
                        </h4>
                        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{project.description}</p>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                          View details →
                        </p>
                      </div>
                    </GlassPanel>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CadProjectDialog
        key={selected ? `${selected.software.id}-${selected.project.localId}` : "cad-dialog-closed"}
        software={selected?.software ?? null}
        project={selected?.project ?? null}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
