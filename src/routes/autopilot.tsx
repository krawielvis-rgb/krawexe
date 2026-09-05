import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, Image as ImageIcon, KeyRound, Pin, RefreshCw, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/autopilot")({ component: AutopilotPage });

type Status = { configured: boolean; connected: boolean; missing: string[]; schedule: string; topics: string[] };
type Board = { id: string; name: string; privacy?: string; pin_count?: number };

function AutopilotPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch("/api/pinterest/status");
      setStatus(await response.json());
    } finally { setLoading(false); }
  }

  async function loadBoards() {
    setBoardsLoading(true);
    try {
      const response = await fetch("/api/pinterest/boards");
      const data = await response.json();
      if (response.ok) setBoards(data.items || []);
    } finally { setBoardsLoading(false); }
  }

  useEffect(() => { refresh(); }, []);

  return (
    <SiteShell>
      <section className="hero-surface relative overflow-hidden rounded-[2rem] border border-white/10 p-7 shadow-2xl shadow-black/30 sm:p-10">
        <div className="hero-scanline" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Link to="/" className="mb-5 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" /> Back to scanner</Link>
            <div className="mb-4 flex items-center gap-2 text-primary"><Pin className="size-5" /><span className="eyebrow">Content autopilot</span></div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Pinterest <span className="text-gradient">Autopilot.</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">DeepSeek writes the pin copy. Netlify runs the scheduler. Pinterest receives the finished pin — automatically, without a browser bot.</p>
          </div>
          <button onClick={refresh} className="nav-link self-start"><RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh status</button>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <StatusCard icon={<ShieldCheck />} label="Pinterest" ok={Boolean(status?.connected)} value={status?.connected ? "Connected" : "Not connected"} />
        <StatusCard icon={<Sparkles />} label="DeepSeek" ok={!status?.missing.includes("DEEPSEEK_API_KEY")} value={!status?.missing.includes("DEEPSEEK_API_KEY") ? "Ready" : "API key missing"} />
        <StatusCard icon={<Clock3 />} label="Scheduler" ok={Boolean(status?.configured)} value={status?.schedule || "Daily · 09:00 UTC"} />
      </div>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="panel p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><p className="eyebrow">01 · Connect</p><h2 className="mt-2 font-display text-2xl font-bold">Connect your Pinterest</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Authorize the app once. The server stores the refreshable OAuth token in Netlify Blobs.</p></div>
            <KeyRound className="size-5 text-primary" />
          </div>
          <a href="/api/pinterest/connect" className="neon-button mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"><Pin className="size-4" /> {status?.connected ? "Reconnect Pinterest" : "Connect Pinterest"}</a>
          <p className="mt-4 text-xs text-muted-foreground">Your Pinterest app needs <code>boards:read</code>, <code>boards:write</code>, <code>pins:read</code>, and <code>pins:write</code>.</p>
        </div>

        <div className="panel p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">02 · Configuration</p><h2 className="mt-2 font-display text-2xl font-bold">Server checklist</h2></div><TriangleAlert className="size-5 text-primary" /></div>
          <div className="mt-5 space-y-2">
            {(
              [
                ["PINTEREST_CLIENT_ID", "Pinterest app ID"],
                ["PINTEREST_CLIENT_SECRET", "Pinterest app secret"],
                ["PINTEREST_BOARD_ID", "Destination board"],
                ["PINTEREST_IMAGE_URL", "Public PNG/JPEG pin image"],
                ["DEEPSEEK_API_KEY", "DeepSeek server key"],
              ] as const
            ).map(([key, label]) => <CheckRow key={key} label={label} ok={!status?.missing.includes(key)} />)}
          </div>
        </div>
      </section>

      <section className="panel mt-5 p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">03 · Boards</p><h2 className="mt-2 font-display text-2xl font-bold">Choose the destination board</h2><p className="mt-2 text-sm text-muted-foreground">Use this list to find the board ID, then put it in <code>PINTEREST_BOARD_ID</code>.</p></div><button onClick={loadBoards} disabled={!status?.connected || boardsLoading} className="nav-link"><RefreshCw className={`size-3.5 ${boardsLoading ? "animate-spin" : ""}`} /> Load boards</button></div>
        {boards.length > 0 ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{boards.map((b) => <div key={b.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="font-semibold">{b.name}</p><p className="mt-1 break-all font-mono text-[10px] text-muted-foreground">{b.id}</p><p className="mt-3 text-[11px] text-muted-foreground">{b.pin_count ?? 0} pins · {b.privacy || "PUBLIC"}</p></div>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-muted-foreground">{status?.connected ? "Load your boards to see their IDs here." : "Connect Pinterest first."}</div>}
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="feature-card"><ImageIcon className="size-5 text-primary" /><h3 className="mt-4 font-display text-xl font-semibold">Pin creative</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Set <code>PINTEREST_IMAGE_URL</code> to a public PNG/JPEG. Pinterest fetches that image when the scheduled function creates the Pin.</p></div>
        <div className="feature-card"><Clock3 className="size-5 text-primary" /><h3 className="mt-4 font-display text-xl font-semibold">Runs automatically</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The included Netlify scheduled function runs once per day at 09:00 UTC, generates fresh copy, publishes the Pin, and logs the result.</p></div>
      </section>

      <section className="mt-5 panel p-6"><p className="eyebrow">Topics</p><div className="mt-4 flex flex-wrap gap-2">{(status?.topics || []).map((topic) => <span key={topic} className="rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1.5 text-xs text-muted-foreground">{topic}</span>)}</div><a className="mt-5 inline-flex items-center gap-2 text-xs text-primary hover:underline" href="https://developers.pinterest.com/" target="_blank" rel="noreferrer">Pinterest developer docs <ExternalLink className="size-3" /></a></section>
    </SiteShell>
  );
}

function StatusCard({ icon, label, ok, value }: { icon: React.ReactNode; label: string; ok: boolean; value: string }) { return <div className="panel p-5"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</span><div><p className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div><span className={`ml-auto size-2 rounded-full ${ok ? "bg-success shadow-[0_0_12px_currentColor] text-success" : "bg-muted-foreground"}`} /></div></div>; }
function CheckRow({ label, ok }: { label: string; ok: boolean }) { return <div className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.025] px-3 py-2.5 text-xs"><span className="text-muted-foreground">{label}</span>{ok ? <CheckCircle2 className="size-4 text-success" /> : <span className="text-[10px] text-amber-300">missing</span>}</div>; }
