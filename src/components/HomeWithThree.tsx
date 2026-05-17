"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ThreeBackdrop = dynamic(
  () => import("@/components/ThreeBackdrop").then((m) => m.ThreeBackdrop),
  { ssr: false }
);

export function HomeWithThree({ children }: { children: ReactNode }) {
  return (
    <>
      <ThreeBackdrop />
      <div className="relative z-[2] flex min-h-full w-full flex-1 flex-col">{children}</div>
    </>
  );
}
