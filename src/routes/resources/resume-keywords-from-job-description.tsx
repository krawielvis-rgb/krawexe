import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Add Resume Keywords From a Job Description";
const DESC =
  "A repeatable method for pulling the right terms out of a job posting and placing them where both the applicant tracking system and a recruiter will see them.";

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
      intro="Keyword matching is not about stuffing. It is about describing work you genuinely did using the employer's own vocabulary."
    >
      <Prose>
        <H2>Step 1 — pull the terms out</H2>
        <p>
          Read the posting and mark every concrete noun phrase: tools, methods, certifications,
          domains, job titles. Ignore filler like "fast-paced environment" and "team player".
          Repeated terms matter most — they signal what the role is actually measured on.
        </p>

        <H2>Step 2 — sort into three buckets</H2>
        <Bullets
          items={[
            "Have it and it's already on the CV — check the wording matches the posting.",
            "Have it but it's missing — add it to the relevant role's bullets.",
            "Don't have it — leave it out. Never claim a skill you cannot discuss.",
          ]}
        />

        <H2>Step 3 — place them where they count</H2>
        <p>
          A term inside an achievement bullet carries far more weight with a human than the same
          word in a skills list. Write "Rebuilt monthly reporting in Power BI, cutting close time
          from five days to two" rather than adding "Power BI" to a comma-separated pile.
        </p>

        <H2>Step 4 — match the exact form</H2>
        <p>
          Spell out an acronym once and pair it with the full term: "search engine optimisation
          (SEO)". Use the posting's spelling and its job title if it honestly describes your work.
        </p>

        <H2>Step 5 — measure the coverage</H2>
        <p>
          Paste the posting and your CV into the{" "}
          <Link to="/" className="text-primary underline">
            scanner
          </Link>{" "}
          to see matched and missing terms, then repeat until the important ones are covered. Also
          worth reading: the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
