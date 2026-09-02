import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Lock, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAuthed, login } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATS Pro — Resume Scanner & ATS-Friendly CV Builder" },
      {
        name: "description",
        content:
          "Sign in to ATS Pro: scan your resume against any job description and build an ATS-friendly CV. Rule-based scoring, no AI required.",
      },
      { property: "og:title", content: "ATS Pro — Resume Scanner & CV Builder" },
      {
        property: "og:description",
        content:
          "Deterministic ATS resume scoring, keyword gap analysis and an ATS-safe CV builder with PDF and DOCX export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthed()) navigate({ to: "/scan", replace: true });
  }, [navigate]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(username, password)) {
      setError("");
      navigate({ to: "/scan", replace: true });
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="hero-surface flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/15">
            <ShieldCheck className="size-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">ATS Pro</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Resume scanner and ATS-friendly CV builder. Private tool — sign in to continue.
          </p>
        </div>

        <form onSubmit={onSubmit} className="panel space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="pl-9"
                placeholder="admin"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                placeholder="••••••"
              />
            </div>
          </div>
          {error && (
            <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
