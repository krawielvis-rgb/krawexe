import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Add Resume Keywords From a Job Description";
const DESC =
  "A repeatable five-step method for pulling the right keywords out of a job posting and placing them where both the applicant tracking system and the recruiter will see them.";

export const Route = createFileRoute("/resources/resume-keywords-from-job-description")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/resume-keywords-from-job-description",
      headline: "How to add keywords to your resume from a job description",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="How to add keywords to your resume from a job description"
      intro="Keyword matching is not about stuffing. It is about describing work you genuinely did using the employer's own vocabulary. This method takes about fifteen minutes per application."
    >
      <Prose>
        <H2>Why the posting's exact words matter</H2>
        <p>
          Recruiters find candidates by searching the ATS database, and they search using the
          language of the job they wrote. "Customer success manager" and "client account manager"
          may be the same job, but a search for one does not reliably return the other. Your task
          is translation: keep your experience honest, express it in their terms.
        </p>

        <H2>Step 1 — pull the terms out of the posting</H2>
        <p>
          Read the posting once for sense, then a second time with a highlighter. Mark every{" "}
          <strong>concrete noun phrase</strong>: tools and software, methods and frameworks,
          certifications, domains, deliverables, and the job title itself. Ignore filler —
          "fast-paced environment", "team player", "dynamic self-starter" carry no searchable
          meaning.
        </p>
        <p>
          Pay special attention to <strong>repeated terms</strong>. If "stakeholder management"
          appears in the summary, the responsibilities and the requirements, that is what the role
          is actually measured on. Terms in the "requirements" or "must-have" section outrank those
          in "nice to have".
        </p>

        <H2>Step 2 — sort your list into three buckets</H2>
        <Bullets
          items={[
            "Have it, and it's already on the CV — check the wording matches the posting exactly.",
            "Have it, but it's missing — add it to the bullets of the role where you actually used it.",
            "Don't have it — leave it out. Never claim a skill you cannot discuss for five minutes in an interview.",
          ]}
        />
        <p>
          The third bucket is where keyword advice goes wrong. Recruiters probe lists, and a
          flagged mismatch between CV and interview is worse than a missing keyword.
        </p>

        <H2>Step 3 — place keywords where they count</H2>
        <p>
          Three locations do almost all the work, in this order:
        </p>
        <Bullets
          items={[
            "Achievement bullets — a term inside a result carries weight with the software and the human: 'Rebuilt monthly reporting in Power BI, cutting close time from five days to two'.",
            "Professional summary — three or four lines is room for the job title and two or three core terms.",
            "Skills section — the right place for tools, certifications and methods that need no story: 'SQL, Power BI, IFRS, month-end close'.",
          ]}
        />
        <p>
          What not to do: a comma-separated pile of sixty terms, a hidden white-text block, or
          keywords with no evidence behind them. The first reads as noise to a human; the second is
          visible after parsing and can get you blacklisted.
        </p>

        <H2>Step 4 — match the exact form</H2>
        <Bullets
          items={[
            "Use the posting's spelling: 'optimisation' vs 'optimization', 'programme' vs 'program'.",
            "Spell out an acronym once with the full term: 'search engine optimisation (SEO)' — the search may use either form.",
            "Use the posting's job title in your summary if it honestly describes your work.",
            "Keep variants natural — 'managed a team of six' and 'team management' cover both phrasings.",
          ]}
        />

        <H2>Step 5 — measure the coverage, then stop</H2>
        <p>
          Paste the posting and your CV into the{" "}
          <Link to="/" className="text-primary underline">
            ATS Pro scanner
          </Link>
          . It lists matched and missing keywords so you can iterate: add a missing term you
          genuinely have, re-scan, and stop when the important ones — the repeated, must-have terms
          — are covered. Chasing 100% coverage pushes you toward stuffing; covering the top terms
          honestly is the goal.
        </p>
        <p>
          Keywords only matter if the file parses in the first place, so pair this method with the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>{" "}
          and the{" "}
          <Link to="/resources/ats-friendly-resume-check" className="text-primary underline">
            10-point ATS-friendly test
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
