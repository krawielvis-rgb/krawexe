import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, Sparkles, Download, BookOpen, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { AdSlot } from "@/components/AdSlot";
import { ScanTool } from "@/components/ScanTool";

const TITLE = "Free ATS Resume Scanner & CV Builder — No Signup";
const DESC =
  "Scan your resume against any job description for a free, rule-based ATS score, fix keyword and format gaps, and export an ATS-friendly CV as PDF or DOCX. No signup, no AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ats-scanner-pro.netlify.app/" },
      { name: "twitter:card", content: "summary_large_image" },
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
    body: "You get a 0–100 score, a matched/missing keyword table, pass-fail format checks and a prioritised list of fixes — plus an improved resume you can edit right on the page.",
  },
  {
    icon: Download,
    title: "3. Export",
    body: "Download the result as a real text-based PDF, DOCX or TXT — selectable text a real applicant tracking system can actually read.",
  },
];

function HomePage() {
  return (
    <SiteShell>
      <section className="hero-surface -mx-5 mb-2 px-5 py-10 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Free ATS resume scanner & CV builder
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Check how an applicant tracking system reads your resume against a specific job — keyword
          match, format checks and a fixed-up version you can download. No signup, no AI, nothing
          leaves your browser.
        </p>
      </section>

      <AdSlot id="ats-ad-top-banner" height={90} />

      <ScanTool />

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-bold">How it works</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="panel p-5">
              <s.icon className="size-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Every score and suggestion comes from deterministic keyword, synonym and regex rules that
          run entirely in your browser. No AI models, no uploads to a server, no accounts.
        </p>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <div className="panel flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-lg font-semibold">
                Want to understand why ATS rejects resumes?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Free guides on ATS formatting, keywords, fonts and common rejection causes.
              </p>
            </div>
          </div>
          <Link
            to="/resources"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read the guides
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
