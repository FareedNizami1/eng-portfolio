"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CadProjectItem, CadSoftwareGroup } from "@/data/cadSoftware";
import { ImageLightbox } from "./ImageLightbox";

type CadProjectDialogProps = {
  software: CadSoftwareGroup | null;
  project: CadProjectItem | null;
  onClose: () => void;
};

export function CadProjectDialog({ software, project, onClose }: CadProjectDialogProps) {
  const open = software !== null && project !== null;
  const [imgFailed, setImgFailed] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightboxSrc) {
        setLightboxSrc(null);
        return;
      }
      onClose();
    },
    [lightboxSrc, onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onKeyDown]);

  useEffect(() => {
    if (!open) setLightboxSrc(null);
  }, [open]);

  return (
    <>
    <AnimatePresence>
      {open && software && project ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cad-dialog-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div
              className={`relative shrink-0 bg-gradient-to-br ${software.color} px-6 py-6 md:px-8 md:py-8`}
            >
              <div className="absolute inset-0 bg-black/25" aria-hidden />
              <div className="relative flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 p-2 backdrop-blur-sm">
                  <Image
                    src={software.logoUrl}
                    alt=""
                    width={36}
                    height={36}
                    className="max-h-8 max-w-8 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-10">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/80">{software.name}</p>
                  <h2
                    id="cad-dialog-title"
                    className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/90">{project.description}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-0 right-0 rounded-lg border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  aria-label="Close"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8 md:py-8">
              {project.imageUrl && !imgFailed ? (
                <button
                  type="button"
                  onClick={() => setLightboxSrc(project.imageUrl!)}
                  className="group relative mb-6 aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-left transition-all hover:border-[var(--accent)]/50 hover:ring-2 hover:ring-[var(--accent)]/25"
                  aria-label="View image larger"
                >
                  <Image
                    src={project.imageUrl}
                    alt=""
                    fill
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 672px"
                    onError={() => setImgFailed(true)}
                  />
                  <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                    Enlarge
                  </span>
                </button>
              ) : null}

              <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{project.details}</p>

              {project.specifications && project.specifications.length > 0 ? (
                <div className="mt-6 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Specifications
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {project.specifications.map((line) => (
                      <li
                        key={line}
                        className="relative pl-4 text-sm text-[var(--text-muted)] before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {imgFailed && project.imageUrl ? (
                <p className="mt-4 font-mono text-[10px] text-[var(--text-muted)]">
                  Preview: {project.imageUrl} — copy renders into{" "}
                  <code className="text-[var(--accent)]">public/</code> to display.
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
    <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
