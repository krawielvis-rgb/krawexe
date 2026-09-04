import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, FileSearch } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { AdSlot } from "@/components/AdSlot";

export const SITE_URL = "https://krawexe.lovable.app";

export function articleHead(opts: {
  title: string;
  description: string;
  path: string;
  headline: string;
}) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: opts.headline,
          description: opts.description,
          url,
          isAccessibleForFree: true,
          publisher: { "@type": "Organization", name: "ATS Pro", url: SITE_URL },
          mainEntityOfPage: url,
        }),
      },
    ],
  };
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">{children}</div>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-xl font-bold text-foreground">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-base font-semibold text-foreground">{children}</h3>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export function ArticleLayout({
  heading,
  intro,
  children,
}: {
  heading: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl">
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All resources
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{intro}</p>

        {children}

        <div className="panel mt-10 flex flex-wrap items-center gap-4 p-5">
          <div>
            <p className="font-display text-base font-semibold text-foreground">
              Check your own resume in about 30 seconds
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Paste the job description, upload your CV, get a keyword and format score. Free, no
              signup, runs entirely in your browser.
            </p>
          </div>
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <FileSearch className="size-4" /> Open the scanner
          </Link>
        </div>

        <AdSlot id="ats-ad-article-footer" height={250} />
      </article>
    </SiteShell>
  );
}
