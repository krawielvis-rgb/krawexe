import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FilePlus2, FileSearch, ShieldCheck } from "lucide-react";

const tabs = [
  { to: "/", label: "Scan", icon: FileSearch },
  { to: "/build", label: "Build", icon: FilePlus2 },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-display text-lg font-bold">ATS Pro</span>
          </Link>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const active = t.to === "/" ? path === "/" : path.startsWith(t.to);
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <t.icon className="size-4" />
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
            Free · No signup · Runs in your browser
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ATS Pro — free ATS resume scanner & CV builder.</span>
          <Link to="/privacy" className="ml-auto underline hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
