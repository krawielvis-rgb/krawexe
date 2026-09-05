import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, H3, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "ATS Resume Format Guide — Sections, Dates & File Types";
const DESC =
  "Section order, headings, date formats, file types and layout rules that parse cleanly in every major ATS, with copy-ready examples.";

export const Route = createFileRoute("/resources/ats-resume-format-guide")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/ats-resume-format-guide",
      headline: "ATS resume format guide",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="ATS resume format guide"
      intro="A format that parses is boring on purpose. Here is the structure that survives every major ATS, top to bottom, with the reasoning behind each rule."
    >
      <Prose>
        <H2>Section order</H2>
        <p>
          ATS parsers look for familiar section headings and file everything that follows under
          them. Use this order:
        </p>
        <Bullets
          items={[
            "Name and contact details, as normal body text at the top.",
            "Professional Summary — three or four lines positioning you for this role.",
            "Work Experience — reverse chronological, most recent first.",
            "Education.",
            "Skills.",
            "Optional extras: Certifications, Projects, Languages, Publications.",
          ]}
        />
        <p>
          If you are a recent graduate, swap Education above Work Experience. Everything else stays
          the same.
        </p>

        <H2>Headings: use the literal words</H2>
        <p>
          Parsers recognise a small vocabulary of standard headings. "Work Experience",
          "Professional Experience" and "Employment History" all map to the experience bucket;
          "Where I've Made an Impact" maps to nothing, and everything under it can be filed in the
          wrong place or dropped. The same applies to "Skills" (not "Toolbox"), "Education" (not
          "My Journey") and "Professional Summary" (not "About Me").
        </p>

        <H2>Contact block</H2>
        <p>Put this at the top as plain body text — never inside the document's header layer:</p>
        <Bullets
          items={[
            "Full name on its own line.",
            "Phone, email, city and country on the following lines.",
            "LinkedIn URL or portfolio if relevant, as a full URL.",
          ]}
        />
        <p>
          Word and Google Docs headers/footers are a separate text layer that several parsers skip
          entirely — contact details placed there simply never arrive. Leave out photo, date of
          birth and full street address; they add parsing risk and no value.
        </p>

        <H2>Experience entries</H2>
        <H3>Structure</H3>
        <p>
          Keep each role to a predictable pattern: job title, company, location, dates — then
          bullets. For example:
        </p>
        <p className="rounded-md border border-border bg-muted/40 p-3 font-mono text-xs text-foreground">
          Senior Accountant — Brightline Ltd, London
          <br />
          Jan 2021 – Mar 2024
          <br />
          • Rebuilt monthly reporting in Power BI, cutting close time from five days to two
          <br />• Led a two-person team through a clean external audit
        </p>
        <p>
          Three to six bullets per role is plenty. Start each with a verb, and attach a number
          wherever one honestly exists — recruiters skim for scale, and numbers survive parsing
          perfectly.
        </p>
        <H3>Dates</H3>
        <p>
          Pick one style and use it everywhere. <em>Jan 2021 – Mar 2024</em> and{" "}
          <em>01/2021 – 03/2024</em> both parse; mixing them, omitting months, or writing "Spring
          2022" causes inconsistent results. For your current role write <em>Jan 2023 – Present</em>.
        </p>

        <H2>Layout rules</H2>
        <Bullets
          items={[
            "One column across the whole document — sidebars break reading order.",
            "No tables, text boxes, frames or columns, even for the skills list.",
            "No images, logos, photos, icons or skill-rating bars.",
            "Plain round or square bullets; custom glyphs can extract as junk characters.",
            "Margins of 1.5–2.5 cm and body text at 10–12 pt.",
            "One or two pages; length does not affect parsing, but recruiters skim.",
          ]}
        />

        <H2>File type and file name</H2>
        <DataTable
          head={["Format", "ATS verdict", "Notes"]}
          rows={[
            [".docx", "Safest everywhere", "Best choice for older systems (Taleo-era platforms)."],
            ["Text-based .pdf", "Safe in modern systems", "Fine for Greenhouse, Lever, Workday, iCIMS. Confirm text is selectable."],
            ["Image-only .pdf", "Fails", "Extracts as nothing. Often the result of 'print to PDF' from design tools."],
            [".pages / .odt", "Risky", "Frequently rejected at upload or misparsed."],
            [".txt", "Parses, looks bare", "Useful as a diagnostic, not as your application."],
          ]}
        />
        <p>
          If the posting names a format, use that one. Name the file{" "}
          <em>Firstname-Lastname-CV.pdf</em> — recruiters download these in bulk, and a searchable
          name is a small kindness that also keeps the file identifiable in the ATS.
        </p>

        <H2>Check your work</H2>
        <p>
          Run the finished file through the{" "}
          <Link to="/" className="text-primary underline">
            ATS Pro scanner
          </Link>
          . It checks the document against these exact rules — columns, tables, headers/footers,
          standard sections, contact placement, date style — and reports a format score with the
          specific issues it found. If you suspect your current template is the problem, our{" "}
          <Link to="/resources/why-ats-rejects-resumes" className="text-primary underline">
            rejection-causes guide
          </Link>{" "}
          helps confirm it before you rebuild.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
