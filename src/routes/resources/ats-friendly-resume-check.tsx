import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Check If Your Resume Is ATS Friendly (10-Point Test)";
const DESC =
  "A practical 10-point manual test plus the fastest automated check to confirm an applicant tracking system can actually read your resume.";

export const Route = createFileRoute("/resources/ats-friendly-resume-check")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/ats-friendly-resume-check",
      headline: "How to check if your resume is ATS friendly",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="How to check if your resume is ATS friendly"
      intro="Most rejections blamed on 'the algorithm' are really parsing failures. Here is how to test for them in a few minutes."
    >
      <Prose>
        <H2>The fastest check: copy and paste</H2>
        <p>
          Open your resume, select all, and paste it into a plain text editor. What you see is close
          to what an applicant tracking system sees. If the order jumbles, dates detach from job
          titles, or whole blocks vanish, the file will not parse cleanly.
        </p>

        <H2>The 10-point manual test</H2>
        <Bullets
          items={[
            "Text is selectable — not an image or a scan.",
            "One column, no side panels or text boxes.",
            "No tables used for layout.",
            "Standard headings: Professional Summary, Work Experience, Education, Skills.",
            "Contact details in the body, never in the header or footer.",
            "A common font such as Arial, Calibri, Helvetica or Georgia.",
            "Dates written consistently, for example Jan 2021 – Mar 2024.",
            "No icons, logos, charts or progress bars carrying meaning.",
            "Saved as .docx or a text-based .pdf.",
            "A simple file name with your name in it.",
          ]}
        />

        <H2>Then check keyword coverage</H2>
        <p>
          Parsing is only half of it. The posting's own vocabulary needs to appear in your resume,
          written the way the employer writes it. Paste the job description and your CV into the{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>{" "}
          to see which terms are missing and how the formatting scores.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
