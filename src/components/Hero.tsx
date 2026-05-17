"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--glow-1)] blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-64 w-64 translate-x-1/4 rounded-full bg-[var(--glow-2)] blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 rounded-full bg-[var(--accent)]/10 blur-[70px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 xl:grid-cols-[1fr_auto] xl:items-center xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl xl:col-start-1 xl:row-start-1"
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Mechatronics · Product design · Build
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl xl:text-7xl">
            Hi, I&apos;m {site.navName}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)]/40 via-[var(--accent-dim)]/20 to-transparent opacity-60 blur-2xl" />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_0_48px_var(--accent-glow)] sm:h-64 sm:w-64 md:h-72 md:w-72">
              <Image
                src="/profile.png"
                alt={site.name}
                width={288}
                height={288}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-3xl xl:mx-0 xl:col-start-1 xl:row-start-2"
        >
          <div className="text-center xl:text-left">
            <p className="text-lg text-[var(--text-secondary)] md:text-xl">{site.name}</p>
            <p className="mt-2 text-xl text-[var(--text-secondary)] md:text-2xl">{site.role}</p>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
            {site.location}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-4 xl:col-span-2 xl:row-start-3"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)] shadow-[0_0_32px_var(--accent-glow)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View projects
          </Link>
          <Link
            href="#social"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur-xl transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--glass-hover)]"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
