import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Write a Skills Section That Passes ATS";
const DESC =
  "Where to put it, what to include, and the formatting mistakes that make a perfectly good skills list invisible to both the ATS and the recruiter scanning it.";

export const Route = createFileRoute("/resources/skills-section-ats")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/skills-section-ats",
      headline: "How to write a skills section that passes ATS",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="How to write a skills section that passes ATS"
      intro="A skills section is one of the highest-leverage parts of a resume for keyword matching — and one of the most commonly formatted in ways that quietly break parsing."
    >
      <Prose>
        <H2>Why this section matters so much</H2>
        <p>
          Recruiters search ATS databases by keyword, and a dedicated skills section is the
          densest concentration of exact-match terms on the page. A well-built skills list can be
          the difference between showing up in a search for "React, TypeScript, GraphQL" and not
          — even if those same skills are described in your work history bullets. Redundancy here
          is a feature, not a flaw.
        </p>

        <H2>Where to put it</H2>
        <p>
          Place it near the top of the resume — directly under your professional summary, before
          work history — if the posting is skills/tool heavy (engineering, data, design, IT). Place
          it lower, after work history, if your experience and titles carry more weight than a
          tool list (senior leadership, sales, most non-technical roles). Either position parses
          fine; this is a human-attention decision, not an ATS one.
        </p>

        <H2>Formatting mistakes that break parsing</H2>
        <Bullets
          items={[
            "Skill \"clouds\" or graphics with proficiency bars — the ATS can't read a visual bar chart at all; use plain text.",
            "Skills packed into a text box or a table cell — many parsers skip text-box content entirely.",
            "Icons instead of words (a tiny React logo instead of the word \"React\") — icons are never read as text.",
            "One giant unbroken paragraph of comma-separated skills with no structure — technically parses, but is hard for a human to scan fast.",
          ]}
        />

        <H2>What actually belongs in the list</H2>
        <DataTable
          head={["Include", "Leave out"]}
          rows={[
            ["Tools and technologies named in the job posting that you genuinely have used", "Soft skills like \"hard worker\" or \"team player\" — show these through bullets instead"],
            ["Certifications and licenses (spelled out, not just acronyms)", "Skills you have only briefly touched and can't speak to in an interview"],
            ["Both the acronym and the full term where relevant (e.g. \"SEO (Search Engine Optimization)\")", "An identical repeat of your entire job title list"],
            ["Proficiency level only if the posting asks for it (e.g. \"conversational Spanish\")", "A 1–5 star or bar-graph proficiency rating"],
          ]}
        />

        <H2>A structure that parses and reads well</H2>
        <p>
          Group related skills under short plain-text subheadings rather than one long list —
          this stays fully readable by every ATS while making the section far easier for a human
          to scan:
        </p>
        <p className="rounded-md border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed">
          Technical Skills: Python, SQL, Tableau, AWS
          <br />
          Certifications: PMP, Six Sigma Green Belt
          <br />
          Languages: English (native), Spanish (conversational)
        </p>

        <H2>Matching skills to a specific posting</H2>
        <p>
          The single biggest lever isn't the format — it's whether the terms in your list actually
          match the language of the job description you're applying to. The{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>{" "}
          compares your resume against a pasted job description and shows exactly which required
          keywords are missing from your skills section, so you can add anything genuinely true of
          your background before you apply. For the terms to pull from a posting in the first
          place, see{" "}
          <Link to="/resources/resume-keywords-from-job-description" className="text-primary underline">
            how to extract resume keywords from a job description
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
