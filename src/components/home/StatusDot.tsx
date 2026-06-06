/**
 * A small emerald pinging "live" indicator — mirrors the StatusDot
 * pattern from the Observatory, with theme-aware label color.
 */
const StatusDot = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
    {label}
  </span>
);

export default StatusDot;
