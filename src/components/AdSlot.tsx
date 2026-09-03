/**
 * Reserved, clearly bounded ad container. Empty by default — an ad network
 * script can target the id/data attribute later. Never overlaps tool UI.
 */
export function AdSlot({
  id,
  label = "Advertisement",
  height = 90,
}: {
  id: string;
  label?: string;
  height?: number;
}) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-hidden="true"
      className="my-6 flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-border/70 bg-secondary/25 text-[10px] uppercase tracking-widest text-muted-foreground/60"
      style={{ minHeight: height }}
    >
      {label}
    </div>
  );
}
