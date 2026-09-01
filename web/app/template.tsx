"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth fade in on every route change
    setMounted(false);
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ease-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
