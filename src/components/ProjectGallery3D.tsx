"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type GalleryItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

type ProjectGallery3DProps = {
  items: GalleryItem[];
  onImageClick?: (src: string) => void;
  /** compact = narrow; large = wider stage for dialog modals */
  size?: "compact" | "large";
};

const sizeClass = {
  compact: "max-w-lg",
  large: "max-w-3xl",
} as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
  }),
};

export function ProjectGallery3D({
  items,
  onImageClick,
  size = "large",
}: ProjectGallery3DProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : index < active ? -1 : 0);
      setActive((index + total) % total);
    },
    [active, total]
  );

  const paginate = useCallback(
    (delta: number) => {
      setDirection(delta);
      setActive((i) => (i + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const thumb = strip.children[active] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  if (total === 0) return null;

  const current = items[active]!;

  return (
    <motion.div
      className={`relative mx-auto min-w-0 w-full ${sizeClass[size]}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stage frame */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_12px_32px_rgba(0,0,0,0.3),inset_0_1px_0_var(--glass-highlight)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-[var(--glow-2)]/10"
          aria-hidden
        />

        {/* HUD corners */}
        <HudCorner className="left-2 top-2 border-l-2 border-t-2" />
        <HudCorner className="right-2 top-2 border-r-2 border-t-2" />
        <HudCorner className="bottom-2 left-2 border-b-2 border-l-2" />
        <HudCorner className="bottom-2 right-2 border-b-2 border-r-2" />

        {/* Header bar */}
        <div className="relative z-[2] flex items-center justify-between gap-2 border-b border-[var(--glass-border)] px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)]">
            Media feed
          </span>
          <span className="font-mono text-[9px] tabular-nums text-[var(--text-muted)]">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <TypeBadge type={current.type} />
        </div>

        {/* Main viewport */}
        <motion.div
          className="relative z-[1] aspect-video w-full touch-pan-y"
          onPointerDown={(e) => {
            dragStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            const dx = e.clientX - dragStartX.current;
            if (Math.abs(dx) < 50) return;
            paginate(dx < 0 ? 1 : -1);
          }}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`${current.type}-${current.src}`}
              custom={direction}
              variants={reduceMotion ? undefined : slideVariants}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <StageMedia item={current} onImageClick={onImageClick} />
            </motion.div>
          </AnimatePresence>

          {total > 1 ? (
            <>
              <NavButton
                label="Previous slide"
                onClick={() => paginate(-1)}
                className="left-2"
              >
                <ChevronIcon className="h-4 w-4 rotate-180" />
              </NavButton>
              <NavButton label="Next slide" onClick={() => paginate(1)} className="right-2">
                <ChevronIcon className="h-4 w-4" />
              </NavButton>
            </>
          ) : null}
        </motion.div>

        {/* Progress */}
        {total > 1 ? (
          <motion.div
            className="relative z-[2] h-0.5 bg-[var(--glass-border)]"
            aria-hidden
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]"
              animate={{ width: `${((active + 1) / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        ) : null}
      </div>

      {/* Thumbnail filmstrip */}
      {total > 1 ? (
        <div className="mt-3 min-w-0">
          <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Select frame
          </p>
          <div
            ref={thumbStripRef}
            className="flex gap-1.5 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-width:thin] [scrollbar-color:var(--glass-border)_transparent]"
            role="tablist"
            aria-label="Gallery thumbnails"
          >
            {items.map((item, i) => (
              <ThumbButton
                key={`${item.type}-${item.src}`}
                item={item}
                index={i}
                isActive={i === active}
                onSelect={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

function StageMedia({
  item,
  onImageClick,
}: {
  item: GalleryItem;
  onImageClick?: (src: string) => void;
}) {
  if (item.type === "video") {
    return (
      <motion.div className="relative h-full w-full bg-black">
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
    );
  }

  if (onImageClick) {
    return (
      <button
        type="button"
        onClick={() => onImageClick(item.src)}
        className="group relative block h-full w-full cursor-zoom-in overflow-hidden bg-black/40 text-left"
        aria-label="View image larger"
      >
        <Image
          src={item.src}
          alt=""
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 90vw) 768px"
          priority
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          Enlarge
        </span>
      </button>
    );
  }

  return (
    <div className="relative h-full w-full bg-black/40">
      <Image src={item.src} alt="" fill className="object-contain" sizes="(max-width: 90vw) 768px" />
    </div>
  );
}

function ThumbButton({
  item,
  index,
  isActive,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const thumbSrc = item.type === "video" ? item.poster ?? item.src : item.src;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={`Slide ${index + 1}${item.type === "video" ? ", video" : ""}`}
      onClick={onSelect}
      className={`relative h-14 w-[5.5rem] shrink-0 overflow-hidden rounded-md border transition-all duration-300 md:h-16 md:w-28 ${
        isActive
          ? "border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] ring-2 ring-[var(--accent)]/30"
          : "border-[var(--glass-border)] opacity-70 hover:border-[var(--accent)]/40 hover:opacity-100"
      }`}
    >
      {item.type === "video" ? (
        <>
          {item.poster ? (
            <Image src={item.poster} alt="" fill className="object-cover" sizes="112px" />
          ) : (
            <div className="flex h-full items-center justify-center bg-black/80">
              <PlayIcon className="h-5 w-5 text-[var(--accent)]" />
            </div>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/35">
            <PlayIcon className="h-4 w-4 text-white drop-shadow" />
          </span>
        </>
      ) : (
        <Image src={thumbSrc} alt="" fill className="object-cover" sizes="112px" />
      )}
      {isActive ? (
        <motion.span
          layoutId="gallery-thumb-active"
          className="pointer-events-none absolute inset-0 border-2 border-[var(--accent)]"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      ) : null}
    </button>
  );
}

function HudCorner({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-[2] h-3.5 w-3.5 border-[var(--accent)]/70 ${className}`}
      aria-hidden
    />
  );
}

function TypeBadge({ type }: { type: "image" | "video" }) {
  return (
    <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
      {type}
    </span>
  );
}

function NavButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-[3] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-[var(--accent)]/50 hover:bg-black/70 hover:text-[var(--accent)] ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      {children}
    </motion.button>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
