import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "How Long Should a Resume Be? ATS and Recruiter Rules";
const DESC =
  "One page or two? Here's what actually changes based on experience level, and why length has almost nothing to do with whether an ATS can read your resume.";

export const Route = createFileRoute("/resources/resume-length-ats")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/resume-length-ats",
      headline: "How long should a resume be?",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="How long should a resume be?"
      intro="Length rules get repeated so often they sound like law. In reality, an ATS does not care how many pages you submit — it cares whether it can parse the text. Length is a human-readability question, not a parsing one."
    >
      <Prose>
        <H2>The short answer</H2>
        <DataTable
          head={["Experience level", "Typical length", "Why"]}
          rows={[
            ["Student / entry-level", "1 page", "Not enough relevant history to justify more"],
            ["2–10 years", "1 page (2 if genuinely dense)", "Recruiters skim the top third first"],
            ["10+ years, individual contributor", "2 pages", "Older roles can compress to 1–2 lines each"],
            ["Executive / academic (with publications)", "2–3+ pages", "Different norms; publications and boards add length"],
          ]}
        />

        <H2>Why the ATS itself doesn't care</H2>
        <p>
          An applicant tracking system stores the text it extracts as fields in a database — work
          history, skills, education, contact details. A three-page resume parses exactly as
          reliably as a one-page resume, provided the formatting is clean. Length only affects{" "}
          <em>parsing</em> in one narrow case: if you compress content by shrinking fonts below
          9pt or removing whitespace so aggressively that text overlaps, that can break extraction.
          The fix there is editing content, not fighting the ATS.
        </p>

        <H2>Where length actually matters: the human review</H2>
        <p>
          Once your resume clears the ATS and a recruiter opens it, most give it well under a
          minute on first pass. That is the real constraint. A one-page resume for someone with
          three years of experience reads as focused. A one-page resume for someone with eighteen
          years reads as either early-career or missing something — and a six-page resume for
          anyone reads as unedited.
        </p>

        <H2>How to cut length without cutting substance</H2>
        <Bullets
          items={[
            "Compress roles older than 10–15 years to a single line: title, company, years.",
            "Delete duties that any competent person in the role would obviously perform — keep only what's distinctive or quantified.",
            "Merge a 'Skills' list that repeats what's already demonstrated in your bullets.",
            "Cut an Objective statement — it rarely earns its space; a tailored professional summary does more work in fewer lines.",
            "One page of dense, relevant content always beats two pages with padding.",
          ]}
        />

        <H2>When two pages is the right call</H2>
        <p>
          If cutting to one page means deleting real, relevant, quantified achievements from the
          last five years, don't. Recruiters consistently say they'd rather read a well-organized
          second page than lose evidence that you're qualified. The rule isn't "always one page" —
          it's "never pad, and never cut what's actually relevant to fit an arbitrary number."
        </p>

        <p>
          Once your content is right-sized, run it through the{" "}
          <Link to="/" className="text-primary underline">
            free ATS scanner
          </Link>{" "}
          to confirm the format still parses cleanly, and check the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>{" "}
          for the section structure that holds up across systems regardless of length.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
