"use client";

import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectEntry, ProjectDialogBlock } from "@/data/portfolio";
import { ImageLightbox } from "./ImageLightbox";
import { ProjectGallery3D, type GalleryItem } from "./ProjectGallery3D";

type ProjectDialogProps = {
  project: ProjectEntry | null;
  onClose: () => void;
};

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const open = project !== null;
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
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
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
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 flex h-[95vh] w-[95vw] max-h-[95vh] max-w-[95vw] flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div
              className={`relative shrink-0 bg-gradient-to-br ${project.color} px-6 py-8 md:px-8 md:py-10`}
            >
              <div className="absolute inset-0 bg-black/25" aria-hidden />
              <div className="relative">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-0 right-0 rounded-lg border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  aria-label="Close"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
                <h2
                  id="project-dialog-title"
                  className="font-[family-name:var(--font-display)] pr-12 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {project.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-6 py-6 md:px-8 md:py-8">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Technologies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[var(--glass-border)] bg-[var(--glass-hover)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.images.length > 0 || project.video ? (
                <div className="mt-8 min-w-0 overflow-hidden">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Project gallery
                  </h3>
                  <div className="mt-4">
                    <ProjectGallery3D
                      items={buildGalleryItems(project)}
                      onImageClick={setLightboxSrc}
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-8 min-w-0 space-y-8 border-t border-[var(--glass-border)] pt-8">
                <DialogBlocks blocks={project.dialog} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
    <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}

function DialogBlocks({ blocks }: { blocks: ProjectDialogBlock[] }) {
  return blocks.map((block, i) => <Block key={i} block={block} />);
}

function Block({ block }: { block: ProjectDialogBlock }) {
  switch (block.type) {
    case "paragraphs":
      return (
        <div className="space-y-4">
          {block.items.map((p) => (
            <p key={p.slice(0, 48)} className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              {p}
            </p>
          ))}
        </div>
      );
    case "twoColumnList":
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text-primary)]">
              {block.left.title}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              {block.left.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text-primary)]">
              {block.right.title}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              {block.right.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "bullets":
      return (
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)]">
            {block.title}
          </h4>
          <ul className="mt-4 space-y-3">
            {block.items.map((item) => (
              <li
                key={item}
                className="relative pl-5 text-sm leading-relaxed text-[var(--text-muted)] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "stats":
      return (
        <div>
          {block.title ? (
            <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)]">
              {block.title}
            </h4>
          ) : null}
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {block.items.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)] md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "highlightCards":
      return (
        <div>
          {block.title ? (
            <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)]">
              {block.title}
            </h4>
          ) : null}
          <div className={`grid gap-4 ${block.title ? "mt-4" : ""} md:grid-cols-2`}>
            {block.items.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4"
              >
                <h5 className="font-semibold text-[var(--text-primary)]">{c.title}</h5>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "numberedCards":
      return (
        <div className="space-y-3">
          {block.items.map((c, idx) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-sm font-bold text-[var(--accent-foreground)]">
                {idx + 1}
              </span>
              <div>
                <h5 className="font-semibold text-[var(--text-primary)]">{c.title}</h5>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function buildGalleryItems(project: ProjectEntry): GalleryItem[] {
  const items: GalleryItem[] = [];
  if (project.video) {
    items.push({ type: "video", src: project.video, poster: project.images[0] });
  }
  for (const src of project.images) {
    items.push({ type: "image", src });
  }
  return items;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
