type Props = { score: number; label?: string; size?: number };

export function bandOf(score: number): { name: string; color: string } {
  if (score < 50) return { name: "Needs work", color: "var(--destructive)" };
  if (score < 75) return { name: "Getting there", color: "var(--warning)" };
  return { name: "ATS ready", color: "var(--success)" };
}

export function ScoreGauge({ score, label = "ATS score", size = 190 }: Props) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const band = bandOf(clamped);
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c * 0.75;
  const track = c * 0.75;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[135deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${track} ${c}`}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={band.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            style={{ transition: "stroke-dasharray 600ms ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold" style={{ color: band.color }}>
            {clamped}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        </div>
      </div>
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: `color-mix(in oklab, ${band.color} 18%, transparent)`, color: band.color }}
      >
        {band.name}
      </span>
    </div>
  );
}

export function ScoreBar({ label, value }: { label: string; value: number }) {
  const band = bandOf(value);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold" style={{ color: band.color }}>
          {Math.round(value)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(2, Math.min(100, value))}%`, backgroundColor: band.color }}
        />
      </div>
    </div>
  );
}
