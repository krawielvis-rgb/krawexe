import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Write a Career-Change Resume That Still Passes ATS";
const DESC =
  "Switching fields means your exact job titles and keywords won't match the posting. Here's how to bridge that gap without misrepresenting your background.";

export const Route = createFileRoute("/resources/career-change-resume-ats")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/career-change-resume-ats",
      headline: "How to write a career-change resume that passes ATS",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="How to write a career-change resume that passes ATS"
      intro="ATS keyword matching was built around the assumption that your last job title resembles your next one. Changing fields breaks that assumption — here's how to work around it honestly."
    >
      <Prose>
        <H2>Why career changers get filtered out more often</H2>
        <p>
          An ATS search for "marketing manager, 5 years" looks for those words in your recent
          titles and bullets. If your last five years were spent as a teacher, none of that
          language appears — even if you genuinely have transferable project management,
          stakeholder communication, and budget experience that would serve you well in the new
          role. The gap isn't your qualification; it's vocabulary.
        </p>

        <H2>Translate, don't fabricate</H2>
        <p>
          The fix is describing real past work using the target field's terminology, not
          inventing experience you don't have. "Managed classroom of 30 students, coordinated
          with 12 parent stakeholders, and administered a $2,000 annual supply budget" is
          accurate — and it's also project coordination, stakeholder management, and budget
          ownership, described honestly in language a hiring manager in the new field recognizes.
        </p>

        <H2>Structural choices that help</H2>
        <Bullets
          items={[
            "Lead with a professional summary that states your target role directly and names the 2–3 transferable strengths most relevant to it.",
            "Consider a \"Relevant Experience\" and \"Additional Experience\" split if your most applicable experience isn't chronologically most recent.",
            "Add a skills section using the new field's exact terminology for tools and competencies you genuinely have.",
            "If you've done any coursework, certifications, volunteer work, or side projects in the new field, give them real space — they carry more keyword weight than you'd think.",
          ]}
        />

        <H2>What to avoid</H2>
        <DataTable
          head={["Avoid", "Why"]}
          rows={[
            ["Retitling your old job to sound like the new field (\"Chief Learning Officer\" for a classroom teacher role)", "Misleading, and easy for an interviewer to catch — damages trust immediately"],
            ["A purely chronological resume with no summary or framing", "Forces the reader to make the translation themselves; most won't bother"],
            ["Over-explaining why you're changing fields in the resume itself", "Save the narrative for the cover letter and interview — the resume's job is to show fit through evidence"],
            ["Omitting the old field entirely", "Looks like an unexplained gap; better to reframe it than hide it"],
          ]}
        />

        <H2>Using the scanner for a career change specifically</H2>
        <p>
          Career-change applications benefit the most from checking against the actual posting,
          since the vocabulary gap is exactly what keyword matching exposes. Paste the target job
          description into the{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>{" "}
          alongside your resume — it will show you precisely which required terms are missing, so
          you can decide, honestly, whether you have transferable experience to describe in that
          language. If a required term reflects experience you genuinely don't have, that's useful
          information too: it tells you where a certification or short course would close a real
          gap, not just a wording one.
        </p>
        <p>
          Once your content reflects your real background in the new field's language, confirm the
          format itself parses cleanly with the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            ATS format guide
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
