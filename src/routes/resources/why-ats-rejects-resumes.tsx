import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "Why Does My Resume Get Rejected by ATS? Real Causes & Fixes";
const DESC =
  "The actual reasons applications disappear inside applicant tracking systems, and how many of them are parsing problems rather than hiring decisions.";

export const Route = createFileRoute("/resources/why-ats-rejects-resumes")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/why-ats-rejects-resumes",
      headline: "Why does my resume get rejected by ATS?",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="Why does my resume get rejected by ATS?"
      intro="An applicant tracking system rarely 'rejects' anyone on its own. It ranks, filters and sometimes mangles — and each of those has a different fix."
    >
      <Prose>
        <H2>1. The file did not parse</H2>
        <p>
          Scanned PDFs, multi-column templates, text boxes and layout tables all break extraction.
          The result is a profile with empty fields, so you never surface in a recruiter's search.
        </p>

        <H2>2. Missing the exact terms recruiters search for</H2>
        <p>
          Recruiters query by keyword. If the posting says "accounts payable" and you wrote "AP
          processing", you will not appear in that search even though you did the job.
        </p>

        <H2>3. Knockout questions</H2>
        <p>
          Work authorisation, minimum years, required certification and location questions are
          answered in the application form, not the resume. A wrong answer filters you out before
          anyone reads anything.
        </p>

        <H2>4. Volume</H2>
        <p>
          Popular roles collect hundreds of applications. Many are never opened simply because the
          role closed early.
        </p>

        <H2>What actually helps</H2>
        <Bullets
          items={[
            "Single column, standard headings, text-based file.",
            "Mirror the posting's wording for real skills you have.",
            "Put the job title you are targeting near the top, if it is honest.",
            "Apply early and complete the form carefully.",
          ]}
        />
        <p>
          You can confirm the first two in about 30 seconds with the{" "}
          <Link to="/" className="text-primary underline">
            resume scanner
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
