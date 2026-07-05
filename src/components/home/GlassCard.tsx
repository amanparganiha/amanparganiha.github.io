import { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Theme-aware glass surface — the single source of the home page's
 * "Cosmos / Observatory" card language. Translucent so the fixed
 * starfield (NebulaBackground) glows through in both light and dark.
 *
 * Hover cards also tilt gently toward the cursor. Tilt only engages on
 * fine-pointer devices without prefers-reduced-motion — touch and
 * reduced-motion users get exactly the old static card.
 */

const MAX_TILT = 5; // degrees at the card's edge

const canTilt = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    if (!canTilt()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(nx * MAX_TILT * 2);
    rotateX.set(-ny * MAX_TILT * 2);
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
        "transition-colors duration-300 hover:border-primary/40 hover:bg-card/60 " +
        className
      }
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
