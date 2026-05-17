"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type ImageLightboxProps = {
  src: string | null;
  onClose: () => void;
};

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-[1] rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            onClick={onClose}
          >
            Close
          </button>
          <motion.div
            className="relative max-h-[90vh] max-w-[min(96vw,1400px)]"
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt=""
              width={1920}
              height={1440}
              className="h-auto max-h-[88vh] w-full object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
