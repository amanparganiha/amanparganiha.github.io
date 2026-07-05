import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import NebulaBackground from "./NebulaBackground";
import CommandPalette from "./CommandPalette";

declare global {
  interface Window {
    goatcounter?: { count?: (opts: { path: string }) => void };
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    // Instant, not smooth: the route-enter fade below should start with the
    // new page already at the top rather than visibly crawling up to it.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // GoatCounter SPA tracking — the script counts the initial page load by
  // itself; client-side route changes have to be counted manually. No-ops
  // when the script isn't loaded (dev, or analytics not configured yet).
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    window.goatcounter?.count?.({ path: pathname });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NebulaBackground />
      <Navbar />
      <CommandPalette />
      {/* Keyed by pathname: each route change re-mounts main with a short
          enter fade. Exit animations are deliberately omitted — they're
          brittle with react-router v6 + lazy routes. */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Aman Parganiha. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
