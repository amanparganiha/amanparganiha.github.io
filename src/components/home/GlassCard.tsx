import { ReactNode } from "react";

/**
 * Theme-aware glass surface — the single source of the home page's
 * "Cosmos / Observatory" card language. Translucent so the fixed
 * starfield (NebulaBackground) glows through in both light and dark.
 */
const GlassCard = ({
  className = "",
  hover = false,
  children,
}: {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}) => (
  <div
    className={
      "rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl " +
      (hover
        ? "transition-all duration-300 hover:border-primary/40 hover:bg-card/60 "
        : "") +
      className
    }
  >
    {children}
  </div>
);

export default GlassCard;
