import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { AdSlot } from "@/components/AdSlot";
import { ScanTool } from "@/components/ScanTool";

const TITLE = "Free ATS Resume Scanner — No Signup";
const DESC =
  "Scan your resume against a job description for a free ATS score, identify keyword gaps and format problems, and get clear fixes before you apply. No signup, no AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ats-scanner-pro.netlify.app/" },
      { property: "og:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://ats-scanner-pro.netlify.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ATS Pro",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: DESC,
          url: "https://ats-scanner-pro.netlify.app/",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: HomePage,
});

const steps = [
  {
    icon: FileSearch,
    title: "1. Scan",
    body: "Paste the job description and upload your resume (PDF or DOCX). We extract the text in your browser, pull the top keywords from the posting and check your resume for ATS format problems.",
  },
  {
    icon: Sparkles,
    title: "2. Fix",
    body: "You get a 0–100 score, a matched/missing keyword table, pass-fail format checks and a prioritised list of fixes — without rewriting your resume.",
  },
];

function HomePage() {
  return (
    <SiteShell>
      <section className="hero-surface relative overflow-hidden rounded-[2rem] border border-white/10 p-7 shadow-2xl shadow-black/30 sm:p-10 lg:p-12">
        <div className="hero-scanline" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="live-dot" /> ATS intelligence · 100% local
            </div>
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Turn your resume into an <span className="text-gradient">ATS-ready</span> application.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Compare your resume against a real job description, find keyword gaps, inspect ATS
              formatting, and get practical fixes before you apply.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#scanner" className="neon-button inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                <FileSearch className="size-4" /> Scan your resume <ArrowRight className="size-4" />
              </a>
              <span className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs text-muted-foreground">
                PDF · DOCX · TXT · no signup
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="hologram-card rounded-3xl border border-primary/20 bg-black/30 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileTextIcon /></span>
                  <div><p className="text-xs font-semibold">Resume analysis</p><p className="text-[10px] text-muted-foreground">Live preview</p></div>
                </div>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">SCAN READY</span>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div className="score-orbit">
                  <div className="score-orbit-ring" />
                  <div><strong>94</strong><span>/100</span></div>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  {["Keywords matched", "ATS structure", "Impact signals"].map((label, i) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-[10px]"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{[96, 91, 88][i]}%</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-primary to-violet-400" style={{ width: `${[96, 91, 88][i]}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3"><div className="text-success">✓</div><span>Readable</span></div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3"><div className="text-success">✓</div><span>Structured</span></div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3"><div className="text-primary">+12</div><span>Keywords</span></div>
              </div>
            </div>
            <div className="hologram-platform" aria-hidden="true"><div /></div>
          </div>
        </div>
      </section>

      <AdSlot id="ats-ad-top-banner" height={90} />

      <div id="scanner" className="scroll-mt-20">
        <ScanTool />
      </div>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Workflow</p><h2 className="font-display mt-2 text-3xl font-bold">From raw resume to recruiter-ready.</h2></div>
          <span className="hidden text-xs text-muted-foreground sm:block">Simple rules. Clear fixes. Better output.</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="feature-card group">
              <div className="mb-5 flex items-center justify-between"><span className="step-number">0{i + 1}</span><s.icon className="size-5 text-primary transition-transform group-hover:scale-110" /></div>
              <h3 className="font-display text-xl font-semibold">{s.title.replace(/^\d\.\s*/, "")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Every score and suggestion comes from deterministic keyword, synonym and regex rules that run entirely in your browser.</p>
      </section>

      <section className="mt-12">
        <div className="panel flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4"><BookOpen className="mt-1 size-5 shrink-0 text-primary" /><div><p className="eyebrow">Learn the system</p><h2 className="font-display mt-1 text-xl font-semibold">Understand why ATS rejects resumes.</h2><p className="mt-1 text-sm text-muted-foreground">Formatting, keywords, fonts and the mistakes that quietly kill applications.</p></div></div>
          <Link to="/resources" className="neon-button inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">Read the guides <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </SiteShell>
  );
}

function FileTextIcon() {
  return <span className="text-xs font-black">CV</span>;
}

