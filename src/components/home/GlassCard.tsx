import { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersFinePointer } from "@/lib/utils";

/**
 * Theme-aware glass surface — the single source of the home page's
 * "Cosmos / Observatory" card language. Translucent so the fixed
 * starfield (NebulaBackground) glows through in both light and dark.
 *
 * Hover cards tilt gently toward the cursor and carry a faint radial
 * glow under it. Both only engage on fine-pointer devices without
 * prefers-reduced-motion — touch and reduced-motion users get exactly
 * the old static card.
 */

const MAX_TILT = 5; // degrees at the card's edge

const GlassCard = ({
  className = "",
  hover = false,
  children,
}: {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  const base = "rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl ";

  if (!hover) {
    return <div className={base + className}>{children}</div>;
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!prefersFinePointer()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = x / rect.width - 0.5; // -0.5 .. 0.5
    const ny = y / rect.height - 0.5;
    rotateY.set(nx * MAX_TILT * 2);
    rotateX.set(-ny * MAX_TILT * 2);
    // Glow position — written straight to the element, no re-render.
    el.style.setProperty("--gx", `${x}px`);
    el.style.setProperty("--gy", `${y}px`);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={
        base +
        // transition-colors (not -all): a CSS transform transition would
        // fight the spring-driven tilt framer-motion writes inline.
        "group relative transition-colors duration-300 hover:border-primary/40 hover:bg-card/60 " +
        className
      }
    >
      {/* Cursor glow — follows --gx/--gy set in onPointerMove. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--gx, 50%) var(--gy, 50%), hsl(var(--primary) / 0.08), transparent 70%)",
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
