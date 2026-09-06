import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FileSearch, ShieldCheck, BookOpen, Sparkles } from "lucide-react";

const tabs = [
  { to: "/", label: "Scan Resume", icon: FileSearch },
  { to: "/resources", label: "Guides", icon: BookOpen },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="app-shell flex min-h-screen flex-col overflow-x-hidden">
      <div className="ambient-field" aria-hidden="true"><div className="ambient-orb ambient-orb-a" /><div className="ambient-orb ambient-orb-b" /><div className="ambient-orb ambient-orb-c" /><div className="energy-wave energy-wave-a" /><div className="energy-wave energy-wave-b" /><div className="energy-wave energy-wave-c" /><div className="particle-field" /><div className="floor-grid" /></div>
      <header className="site-header sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3.5">
          <Link to="/" className="brand group flex items-center gap-3"><span className="brand-mark"><ShieldCheck className="size-5" /></span><span><span className="block font-display text-lg font-bold tracking-wide">ATS Pro</span><span className="hidden text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:block">ATS intelligence platform</span></span></Link>
          <nav className="ml-4 flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.035] p-1 shadow-2xl shadow-black/20">{tabs.map((t) => { const active = t.to === "/" ? path === "/" : path.startsWith(t.to); return <Link key={t.to} to={t.to} className={`nav-link ${active ? "nav-link-active" : ""}`}><t.icon className="size-3.5" />{t.label}</Link>; })}</nav>
          <div className="brand-mark brand-mark-small ml-auto"><Sparkles className="size-4" /></div>
        </div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-8 md:py-10">{children}</main>
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-6 text-xs text-muted-foreground"><span>© {new Date().getFullYear()} ATS Pro — ATS intelligence.</span><Link to="/privacy" className="ml-auto underline decoration-white/20 underline-offset-4 hover:text-foreground">Privacy Policy</Link></div></footer>
    </div>
  );
}
