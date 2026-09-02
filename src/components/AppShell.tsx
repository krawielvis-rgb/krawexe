import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { FileSearch, FilePlus2, LogOut, ShieldCheck } from "lucide-react";
import { isAuthed, logout } from "@/lib/session";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/", replace: true });
    } else {
      setReady(true);
    }
  }, [navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking session…
      </div>
    );
  }

  const tabs = [
    { to: "/scan", label: "Scan", icon: FileSearch },
    { to: "/build", label: "Build", icon: FilePlus2 },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-display text-lg font-bold">ATS Pro</span>
          </div>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const active = path.startsWith(t.to);
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
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                navigate({ to: "/", replace: true });
              }}
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
