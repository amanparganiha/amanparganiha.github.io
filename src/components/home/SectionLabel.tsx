/**
 * Observatory-style eyebrow: a mono index like "[ 01 ]" followed by an
 * uppercase, wide-tracked label. Theme-aware via semantic tokens.
 */
const SectionLabel = ({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={
      "flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground " +
      className
    }
  >
    {index && (
      <span className="font-mono tracking-normal text-primary/70">[ {index} ]</span>
    )}
    <span>{children}</span>
  </p>
);

export default SectionLabel;
