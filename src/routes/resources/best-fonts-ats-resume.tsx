import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "Best Fonts for an ATS-Friendly Resume (and What to Avoid)";
const DESC =
  "Which typefaces parse cleanly in an ATS, which ones corrupt your text, and the sizing and spacing rules that keep a resume readable by software and humans.";

export const Route = createFileRoute("/resources/best-fonts-ats-resume")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/best-fonts-ats-resume",
      headline: "Best fonts for an ATS-friendly resume",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="Best fonts for an ATS-friendly resume"
      intro="Font choice rarely wins you an interview, but the wrong one can quietly corrupt your text on the way into the system. Here is what is safe, what is risky, and why."
    >
      <Prose>
        <H2>Why fonts matter to an ATS at all</H2>
        <p>
          When a parser reads a PDF or DOCX, it maps the glyphs in the file back to characters.
          Common fonts use clean, standard character mappings, so "experience" comes out as the
          word <em>experience</em>. Decorative fonts, some free downloads and icon fonts use custom
          encodings — the text may look perfect on screen but extract as scrambled or missing
          characters. The risk is invisible until the copy-and-paste test exposes it.
        </p>

        <H2>The safe list</H2>
        <DataTable
          head={["Font", "Style", "Notes"]}
          rows={[
            ["Arial", "Sans-serif", "Universally available, clean extraction, the default safe choice."],
            ["Helvetica", "Sans-serif", "Arial's close relative; standard on Mac and in PDF workflows."],
            ["Calibri", "Sans-serif", "The Word default since 2007 — entirely safe and compact."],
            ["Georgia", "Serif", "Designed for screens; parses well and reads warmly."],
            ["Cambria", "Serif", "Word's serif companion to Calibri; safe everywhere."],
            ["Times New Roman", "Serif", "Traditional and risk-free, if a little dated."],
            ["Verdana / Tahoma", "Sans-serif", "Wide and very readable on screen; use a size smaller than usual."],
            ["Garamond", "Serif", "Elegant and safe in DOCX; confirm it embeds when exporting to PDF."],
          ]}
        />

        <H2>Fonts to avoid</H2>
        <Bullets
          items={[
            "Decorative, script and display faces (Pacifico, Lobster, Brush Script and friends) — character mapping is unpredictable.",
            "Icon fonts such as Font Awesome — a phone glyph extracts as a random letter or nothing at all. Write 'email:' instead of an icon.",
            "Ultra-light or hairline weights — thin strokes can break during PDF rasterisation and extraction.",
            "Condensed variants at small sizes — cramped glyphs merge during extraction.",
            "Rare purchased fonts that fail to embed in the exported PDF, causing substitution and reflow.",
          ]}
        />
        <p>
          A useful rule of thumb: if the font ships with Windows and macOS, it is safe. If you
          downloaded it, test it.
        </p>

        <H2>Size, weight and spacing</H2>
        <Bullets
          items={[
            "Body text: 10–12 pt. Below 9 pt hurts both extraction and the human who reads 80 resumes a day.",
            "Your name: 16–20 pt. Section headings: 12–14 pt, bold.",
            "Regular weight for body; bold for headings and job titles. Avoid italic for long runs.",
            "Line spacing 1.0–1.15, with a clear blank line before each section heading.",
            "If you are shrinking the font to fit one page, cut content instead — nobody was hired for 8 pt text.",
          ]}
        />

        <H2>Colour and emphasis</H2>
        <p>
          Black text on white is the only zero-risk option, and it is also what prints reliably on a
          recruiter's office printer. A single restrained accent colour for your name or headings is
          fine in modern systems, since colour does not affect text extraction — but heavy shading,
          coloured backgrounds and white-on-dark text can, so keep the body plain.
        </p>

        <H2>The thing that matters more than fonts</H2>
        <p>
          A perfect font inside a two-column template still parses badly, and Arial inside a text
          box still vanishes. Structure beats typography every time — the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>{" "}
          covers the layout rules that carry most of the weight. Once both are right, confirm them
          together with the{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>
          , which checks fonts, structure and keyword coverage in one pass.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
