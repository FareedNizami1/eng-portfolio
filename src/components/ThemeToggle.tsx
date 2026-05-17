"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const subscribe = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const ready = mounted && resolvedTheme !== undefined;

  if (!ready) {
    return (
      <div
        className="h-9 w-14 shrink-0 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-9 w-14 shrink-0 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[inset_0_1px_0_var(--glass-highlight)] backdrop-blur-xl transition-colors hover:border-[var(--accent)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span className="sr-only">Toggle theme</span>
      <motion.span
        className="absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)]"
        initial={false}
        animate={{ x: !isDark ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {isDark ? <MoonIcon className="h-3.5 w-3.5" /> : <SunIcon className="h-3.5 w-3.5" />}
      </motion.span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.7.7a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 010-1.42zm12.72 12.72a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zM2 12a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm18 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM4.22 19.78a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0zM17.36 6.64a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}
