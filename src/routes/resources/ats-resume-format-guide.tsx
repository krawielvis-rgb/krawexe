import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, H3, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "ATS Resume Format Guide — Sections, Dates & File Types";
const DESC =
  "Section order, headings, date styles, file types and layout rules that survive parsing in every major applicant tracking system.";

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
      intro="A format that parses is boring on purpose. Here is the structure that works, top to bottom."
    >
      <Prose>
        <H2>Section order</H2>
        <Bullets
          items={[
            "Name and contact details, as normal body text.",
            "Professional Summary — three or four lines.",
            "Work Experience — reverse chronological.",
            "Education.",
            "Skills.",
            "Optional: Certifications, Projects, Languages.",
          ]}
        />

        <H2>Headings</H2>
        <p>
          Use the standard words above. Creative headings such as "Where I've Made an Impact" are
          not recognised as section markers, so everything under them can be filed in the wrong
          place.
        </p>

        <H2>Entries and dates</H2>
        <H3>Experience</H3>
        <p>
          One line for the role: job title, company, location, then dates. Keep the date style
          identical everywhere — <em>Jan 2021 – Mar 2024</em> or <em>01/2021 – 03/2024</em>, never
          both. Follow with three to six bullets starting with a verb and, where possible, a number.
        </p>
        <H3>Education</H3>
        <p>Degree, institution, then dates. Drop your graduation year only if you want to.</p>

        <H2>Layout rules</H2>
        <Bullets
          items={[
            "One column across the whole document.",
            "No tables, text boxes, columns, headers or footers.",
            "No images, logos, icons or rating bars.",
            "Plain round bullets, not custom glyphs.",
            "Margins of 1.5–2.5 cm and 10–12 pt body text.",
          ]}
        />

        <H2>File type</H2>
        <p>
          A text-based .pdf or a .docx are both safe. Avoid .pages, .odt and image-only exports. If
          the posting names a format, use that one.
        </p>
        <p>
          Run the finished file through the{" "}
          <Link to="/" className="text-primary underline">
            scanner
          </Link>{" "}
          to see a format score and the specific rules it breaks.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
