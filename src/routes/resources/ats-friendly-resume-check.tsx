import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, H3, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "How to Check If Your Resume Is ATS Friendly (10-Point Test)";
const DESC =
  "A practical 10-point manual test plus free automated checks to confirm an applicant tracking system can actually read, parse and rank your resume.";

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
      intro="Most rejections blamed on 'the algorithm' are really parsing failures. Here is how to test for them yourself in a few minutes — before a recruiter's software does it for you."
    >
      <Prose>
        <H2>What "ATS friendly" actually means</H2>
        <p>
          An applicant tracking system does two things with your file: it <strong>extracts</strong>{" "}
          the text (parsing), and it <strong>matches</strong> that text against the job's
          requirements (ranking and search). A resume is ATS friendly when both steps work — the
          text comes out in the right order with nothing missing, and it contains the vocabulary
          the employer actually searches for. A beautifully designed resume can fail step one
          completely.
        </p>

        <H2>Check 1: the copy-and-paste test</H2>
        <p>
          This is the single most revealing test and it takes ten seconds. Open your resume, press{" "}
          <em>Ctrl+A</em> (or <em>Cmd+A</em>), copy, and paste into a plain text editor like
          Notepad or TextEdit. What you see is very close to what an ATS sees.
        </p>
        <Bullets
          items={[
            "If the text comes out in the right reading order — name, summary, jobs in sequence — parsing will likely work.",
            "If columns interleave, dates detach from job titles, or whole blocks are missing, the file will not parse cleanly.",
            "If nothing pastes at all, your PDF is an image: to the ATS, your resume is literally blank.",
          ]}
        />
        <p>
          Anything that looks wrong in Notepad will look wrong inside Workday, Greenhouse, Lever,
          Taleo or iCIMS. Fix the document, not the symptom.
        </p>

        <H2>Check 2: the 10-point manual test</H2>
        <p>Work through this list against your current file. Every "no" is a fixable issue.</p>
        <DataTable
          head={["#", "Test", "Pass looks like"]}
          rows={[
            ["1", "Selectable text", "You can highlight and copy every word — the file is not a scan or image."],
            ["2", "Single column", "One column edge to edge; no sidebars, panels or two-column skills areas."],
            ["3", "No layout tables", "No tables, text boxes or frames used to position content."],
            ["4", "Standard headings", "Professional Summary, Work Experience, Education, Skills — the literal words."],
            ["5", "Contact in the body", "Name, email, phone and city appear as normal text, not inside the header/footer layer."],
            ["6", "Common font", "Arial, Calibri, Helvetica, Georgia or similar, at 10–12 pt."],
            ["7", "Consistent dates", "One date style throughout, e.g. Jan 2021 – Mar 2024, with months and years."],
            ["8", "No meaning in graphics", "No icons, logos, charts, rating dots or progress bars carrying information."],
            ["9", "Safe file type", "A text-based .pdf or a .docx — not .pages, .odt or an exported image."],
            ["10", "Sensible file name", "Firstname-Lastname-CV.pdf rather than document-final-v3.pdf."],
          ]}
        />

        <H2>Check 3: keyword coverage</H2>
        <p>
          Parsing is only half the test. Once your text extracts cleanly, the ATS ranks or filters
          it against the specific posting. That means the posting's own vocabulary — its tools,
          methods, certifications and job titles — needs to appear in your resume, written the way
          the employer writes it.
        </p>
        <p>
          A quick manual version: paste the job description into a word counter or just read it and
          highlight the concrete noun phrases, then search your CV for each one. The automated
          version: paste the job description and your CV into the{" "}
          <Link to="/" className="text-primary underline">
            free ATS Pro scanner
          </Link>
          . It lists matched and missing keywords, scores your formatting against the rules above,
          and shows exactly which section each problem lives in.
        </p>

        <H2>Check 4: an application-form dry run</H2>
        <p>
          Find any live posting that uses a major ATS (most large employers do) and start an
          application — you can abandon it before submitting. Upload your file and watch the
          auto-fill. If your name lands in the wrong field, your jobs merge into one, or dates come
          out blank, real applications are seeing the same corruption.
        </p>

        <H2>What to do when something fails</H2>
        <H3>Text pastes in the wrong order</H3>
        <p>
          Almost always columns or text boxes. Rebuild the document as a single column in Word or
          Google Docs — it is faster than repairing the template.
        </p>
        <H3>Whole sections vanish</H3>
        <p>
          Content in the header/footer layer or in graphics never extracts. Move it into the body
          as plain text.
        </p>
        <H3>Keywords are missing</H3>
        <p>
          Add the posting's terms to bullets describing work you genuinely did — never to a hidden
          block or white text, which some systems flag and all recruiters can see after parsing.
          Our{" "}
          <Link to="/resources/resume-keywords-from-job-description" className="text-primary underline">
            keyword method
          </Link>{" "}
          walks through this step by step, and the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>{" "}
          covers the structural fixes in detail.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
