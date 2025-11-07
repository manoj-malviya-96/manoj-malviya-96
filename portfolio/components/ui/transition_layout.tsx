"use client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function TransitionLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -1000 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
