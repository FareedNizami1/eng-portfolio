import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function GlassPanel({
  children,
  className = "",
  as: Tag = "div",
}: GlassPanelProps) {
  return (
    <Tag
      className={`rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[0_8px_32px_var(--glass-shadow),inset_0_1px_0_var(--glass-highlight)] backdrop-blur-2xl md:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
