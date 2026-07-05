import { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersFinePointer } from "@/lib/utils";

/**
 * Magnetic wrapper: its child drifts a few pixels toward the cursor while
 * hovered and springs back on leave. Fine-pointer devices only — on touch
 * or with reduced motion it renders as a plain wrapper.
 */

const PULL = 6; // max drift in px at the wrapper's edge

const Magnetic = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 15 });
  const springY = useSpring(y, { stiffness: 220, damping: 15 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!prefersFinePointer()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx * PULL * 2);
    y.set(ny * PULL * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={"inline-block " + className}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
