import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

const TITLE = "ATS Resume Resources — Guides on Formats, Keywords & Rejections";
const DESC =
  "No-fluff guides on making a resume ATS friendly: format rules, font choices, keyword extraction from job postings, and why ATS filters reject CVs.";
const URL = "https://ats-scanner-pro.netlify.app/resources";

export const articles = [
  {
    to: "/resources/ats-friendly-resume-check",
    title: "How to check if your resume is ATS friendly",
    blurb:
      "A 10-point manual test plus the fastest automated way to confirm an applicant tracking system can actually read your CV.",
  },
  {
    to: "/resources/why-ats-rejects-resumes",
    title: "Why does my resume get rejected by ATS?",
    blurb:
      "The real reasons applications disappear — and how many of them are parsing failures rather than hiring decisions.",
  },
  {
    to: "/resources/ats-resume-format-guide",
    title: "ATS resume format guide",
    blurb:
      "Section order, headings, dates, file types and layout rules that survive parsing in every major ATS.",
  },
  {
    to: "/resources/best-fonts-ats-resume",
    title: "Best fonts for an ATS-friendly resume",
    blurb:
      "Which typefaces parse cleanly, which break character mapping, and the sizing and spacing that keep you readable.",
  },
  {
    to: "/resources/resume-keywords-from-job-description",
    title: "How to add keywords to your resume from a job description",
    blurb:
      "A repeatable method for pulling the right terms out of a posting and placing them where both the ATS and a recruiter will see them.",
  },
] as const;

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          ATS resume resources
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Short, specific guides on how applicant tracking systems read a CV — written to be used
          next to the{" "}
          <Link to="/" className="text-primary underline">
            free resume scanner
          </Link>
          , not instead of it.
        </p>

        <div className="mt-8 grid gap-4">
          {articles.map((a) => (
            <Link key={a.to} to={a.to} className="panel block p-5 transition-colors hover:border-primary/50">
              <h2 className="font-display text-lg font-semibold text-foreground">{a.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
