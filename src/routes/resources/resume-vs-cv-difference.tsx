import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "Resume vs CV: What's the Difference (and Which Do You Need)";
const DESC =
  "The terms mean different things depending on the country and the field. Here's how to tell which one a job posting actually wants, and how ATS handles each.";

export const Route = createFileRoute("/resources/resume-vs-cv-difference")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/resume-vs-cv-difference",
      headline: "Resume vs CV: what's the difference?",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="Resume vs CV: what's the difference?"
      intro="Same word, different meaning depending on where you are and what field you're in. Getting this wrong can mean submitting a document twice the expected length, or missing sections a reviewer expects to see."
    >
      <Prose>
        <H2>It depends on which country you mean</H2>
        <DataTable
          head={["Region", "\u201cResume\u201d means", "\u201cCV\u201d means"]}
          rows={[
            ["United States / Canada", "Short, tailored, 1–2 pages, for any job", "Full academic history — used mainly for academia, research, medicine"],
            ["United Kingdom / Ireland / most of Europe", "Same as CV — the terms are used interchangeably", "Same as resume, 1–2 pages, for any job"],
            ["Academia / scientific research (worldwide)", "Not typically used", "Comprehensive: publications, grants, conferences, teaching — can run many pages"],
          ]}
        />
        <p>
          So the honest first question isn't "resume or CV" — it's "which country is this
          employer in, and is this an academic or research role?" That answers it almost every
          time.
        </p>

        <H2>Outside the US: resume and CV are usually the same document</H2>
        <p>
          If you're applying in the UK, Ireland, Australia, or most of Europe, a request for a
          "CV" almost always means exactly what Americans call a resume: one to two pages,
          tailored to the role, no exhaustive academic detail. Don't pad it out thinking a CV must
          be longer — that confusion mainly affects candidates crossing between US and non-US job
          markets.
        </p>

        <H2>Inside the US: the two documents genuinely differ</H2>
        <Bullets
          items={[
            "A US resume is tailored per application, 1–2 pages, achievement-focused, and omits anything not relevant to the specific role.",
            "A US academic CV is comprehensive and cumulative — it grows over your career and includes publications, presentations, grants, teaching experience, and professional service.",
            "US employers outside academia, medicine, and research essentially never ask for a CV — if a US-based general employer says \"CV,\" they usually still mean a resume.",
          ]}
        />

        <H2>Does ATS handle them differently?</H2>
        <p>
          No — an ATS parses whatever text and structure you give it, regardless of what you call
          the document. The parsing rules are identical: clean single-column layout, standard
          section headings, text-based file. A long academic CV parses the same way a two-page
          resume does, section by section. The one practical difference is that many corporate
          ATS platforms are built around resume-length expectations, so a 10-page academic CV
          uploaded to a corporate portal may just take longer to review — not fail to parse.
        </p>

        <H2>Quick way to decide which to send</H2>
        <Bullets
          items={[
            "Job posting explicitly says \"CV\" and you're applying to a US academic, research, or medical role → send the full academic CV.",
            "Job posting says \"CV\" anywhere outside the US, or at a non-academic US employer → send a standard tailored resume.",
            "Posting says \"resume\" → always a standard tailored resume, everywhere.",
            "Still unsure → a focused 1–2 page resume is the safer default for the overwhelming majority of jobs.",
          ]}
        />

        <p>
          Whichever version you send, the same formatting rules apply for reliable parsing — see
          the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            ATS format guide
          </Link>{" "}
          — and you can check your actual document against a specific posting with the{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
