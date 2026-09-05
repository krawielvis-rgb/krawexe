import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, Sparkles, Download, BookOpen, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { AdSlot } from "@/components/AdSlot";
import { ScanTool } from "@/components/ScanTool";

const TITLE = "Free ATS Resume Scanner & CV Builder — No Signup";
const DESC =
  "Scan your resume against a job description for a free ATS score, fix keyword and format gaps, and export an ATS-friendly PDF or DOCX. No signup, no AI.";

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
      <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Will this resume survive the ATS?
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
            Paste a job description, drop in your resume, and see exactly what an applicant
            tracking system would match, miss and flag — then download a fixed version. No
            signup, no AI, nothing leaves your browser.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#scanner"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <FileSearch className="size-4" />
              Scan your resume
            </a>
            <span className="text-xs text-muted-foreground">
              Free · No signup · Runs in your browser
            </span>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-medium text-muted-foreground">Scan preview</span>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
              82 / 100
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              { label: "Contact info parses cleanly", ok: true },
              { label: "Section headings recognized", ok: true },
              { label: "\u201cProject management\u201d — missing from posting", ok: false },
              { label: "Dates use consistent format", ok: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2.5 text-sm">
                {row.ok ? (
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-warning/20 text-warning">
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                      <path
                        d="M6 2.5v4M6 8.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
                <span className={row.ok ? "text-foreground" : "text-muted-foreground"}>
                  {row.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">
            Example output — your actual scan appears below.
          </p>
        </div>
      </section>

      <AdSlot id="ats-ad-top-banner" height={90} />

      <div id="scanner" className="scroll-mt-20">
        <ScanTool />
      </div>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-bold">How it works</h2>
        <div className="mt-6 divide-y divide-border border-y border-border sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4 py-5 sm:flex-col sm:gap-3 sm:px-5 sm:py-6">
              <span className="font-display text-3xl font-bold text-border sm:text-4xl">
                0{i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                  <s.icon className="size-4 text-primary" />
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
              </div>
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
