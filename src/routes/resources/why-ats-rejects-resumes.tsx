import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, H3, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "Why Does My Resume Get Rejected by ATS? Real Causes & Fixes";
const DESC =
  "The real reasons applications disappear inside an ATS — parsing failures, keyword gaps, knockout questions and volume — and the fix for each one.";

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
      intro="An applicant tracking system rarely 'rejects' anyone on its own. It parses, ranks, filters and sometimes mangles — and each failure has a different cause and a different fix."
    >
      <Prose>
        <H2>First, a myth worth killing</H2>
        <p>
          The popular story is that a robot reads your resume and auto-rejects 75% of applicants.
          In reality, most ATS platforms are databases with search. A human recruiter runs
          searches, applies filters and reads a shortlist. Where automation does act, it is
          usually through <strong>knockout questions</strong> on the application form, not through
          an AI judging your bullet points. That is good news: almost every real cause of silence
          is something you can diagnose and fix.
        </p>

        <H2>Cause 1: your file did not parse</H2>
        <p>
          This is the most common technical failure. Scanned PDFs, two-column templates, text
          boxes, headers and footers, and layout tables all break text extraction. The ATS ends up
          with a candidate profile full of empty fields. When the recruiter searches for "project
          manager, 5 years", your mangled profile does not match — not because you lack the
          experience, but because the system never captured it.
        </p>
        <p>
          Diagnose it with the copy-and-paste test described in our{" "}
          <Link to="/resources/ats-friendly-resume-check" className="text-primary underline">
            ATS-friendly check
          </Link>
          . If the paste comes out garbled, that is your answer.
        </p>

        <H2>Cause 2: you are missing the exact terms being searched</H2>
        <p>
          Recruiters search by keyword, and they search using the language of the job posting. If
          the posting says "accounts payable" and your resume says "AP processing", you will not
          appear in that search even though you did the job for years. Synonyms, abbreviations and
          internal jargon are invisible unless the system happens to know them.
        </p>
        <p>
          The fix is not stuffing — it is translation. Describe your real work using the employer's
          vocabulary. The{" "}
          <Link to="/" className="text-primary underline">
            scanner
          </Link>{" "}
          shows exactly which terms from a posting are missing from your CV.
        </p>

        <H2>Cause 3: knockout questions</H2>
        <p>
          Work authorisation, willingness to relocate, minimum years of experience, required
          licences and certifications — these are usually asked as form questions, and a "no" can
          filter you automatically before a human opens anything. If you are being rejected within
          minutes of applying, a knockout question is the likely cause, not your resume. Answer
          carefully; some forms treat an unanswered or ambiguous response as a fail.
        </p>

        <H2>Cause 4: timing and volume</H2>
        <p>
          Popular postings collect hundreds of applications in the first few days. Many recruiters
          stop reviewing once they have a strong shortlist, and some roles close early. An
          excellent application sent in week three may simply never be opened. Applying within the
          first few days of a posting measurably improves your odds.
        </p>

        <H2>Cause 5: the quiet filters</H2>
        <Bullets
          items={[
            "Location filters — a CV with no city, or a city far from the role, can be filtered before review.",
            "Job-title mismatch — if your recent titles share no words with the target title, you rank lower in searches for it.",
            "Employment-date anomalies — overlapping or unparsable dates sometimes push a profile down or flag it for review.",
            "File-type issues — some older systems still choke on anything except .docx.",
          ]}
        />

        <H2>How to tell which cause is yours</H2>
        <DataTable
          head={["Symptom", "Likely cause", "Where to start"]}
          rows={[
            ["Instant rejection email", "Knockout question or hard requirement", "Re-read the form answers and must-haves"],
            ["Silence despite strong match", "Parsing failure or missing keywords", "Copy-paste test, then scan against the posting"],
            ["Rejection weeks later", "Human reviewed you — resume content, not ATS", "Strengthen bullets and quantify results"],
            ["Silence on a very popular role", "Volume and timing", "Apply earlier; tailor the top third of the CV"],
          ]}
        />

        <H2>The five things that actually help</H2>
        <Bullets
          items={[
            "Single column, standard headings, text-based .pdf or .docx.",
            "Mirror the posting's wording for skills you genuinely have.",
            "Put the target job title near the top if it honestly describes your work.",
            "Include your city and keep one consistent date format.",
            "Apply early and complete every form field carefully.",
          ]}
        />
        <p>
          You can confirm the first two in about 30 seconds with the{" "}
          <Link to="/" className="text-primary underline">
            free resume scanner
          </Link>
          , and the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>{" "}
          shows the structure that parses cleanly in every major system.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
