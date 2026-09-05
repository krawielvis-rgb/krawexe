import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, articleHead } from "@/components/ArticleLayout";

const TITLE = "Best Fonts for an ATS-Friendly Resume (and What to Avoid)";
const DESC =
  "Which typefaces parse cleanly in applicant tracking systems, which ones break character mapping, and the sizing and spacing that keep you readable.";

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
      intro="Font choice rarely wins you an interview, but the wrong one can quietly corrupt your text on the way into the system."
    >
      <Prose>
        <H2>Safe choices</H2>
        <Bullets
          items={[
            "Arial and Helvetica — universally embedded, clean extraction.",
            "Calibri — the Word default, entirely safe.",
            "Georgia and Cambria — serif options that still parse well.",
            "Times New Roman — traditional, no parsing risk.",
            "Verdana and Tahoma — wide and readable on screen.",
          ]}
        />

        <H2>Fonts to avoid</H2>
        <Bullets
          items={[
            "Decorative and script faces — characters map unpredictably.",
            "Condensed or 'light' weights at small sizes — thin strokes confuse text extraction.",
            "Icon fonts such as Font Awesome — they extract as random letters.",
            "Rare or purchased fonts that may not embed in the exported file.",
          ]}
        />

        <H2>Size and spacing</H2>
        <p>
          Body text at 10–12 pt, headings at 12–14 pt, line spacing between 1.0 and 1.15, and a
          clear blank line before each section. Never shrink below 9 pt to fit one page — cut
          content instead.
        </p>

        <H2>One thing that matters more</H2>
        <p>
          A perfect font in a two-column template still parses badly. Structure beats typography.
          Check both at once with the{" "}
          <Link to="/" className="text-primary underline">
            resume scanner
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
