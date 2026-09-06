import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout, Prose, H2, Bullets, DataTable, articleHead } from "@/components/ArticleLayout";

const TITLE = "PDF or Word? Which Resume File Type ATS Prefers";
const DESC =
  "The honest answer: it depends on the system and how the PDF was made. Here's when each format is safer, and how to tell if your PDF will actually parse.";

export const Route = createFileRoute("/resources/pdf-vs-word-resume-ats")({
  head: () =>
    articleHead({
      title: TITLE,
      description: DESC,
      path: "/resources/pdf-vs-word-resume-ats",
      headline: "PDF or Word: which does ATS prefer?",
    }),
  component: Page,
});

function Page() {
  return (
    <ArticleLayout
      heading="PDF or Word: which does ATS prefer?"
      intro="This question gets a confident wrong answer more often than almost any other resume topic. The real answer is conditional, and the condition is more important than the file extension."
    >
      <Prose>
        <H2>The actual rule</H2>
        <p>
          Modern ATS platforms (Workday, Greenhouse, Lever, iCIMS, and similar) parse{" "}
          <strong>text-based PDFs</strong> and <strong>.docx</strong> files about equally well.
          The risk isn't the file type — it's how the PDF was produced. A PDF exported directly
          from Word, Google Docs, or a text-based design tool contains a real text layer the ATS
          can extract. A PDF made by <em>scanning a printed page</em> or by flattening a design
          into an image contains no extractable text at all — the ATS sees a picture, not words.
        </p>

        <H2>Quick test: is your PDF actually text?</H2>
        <Bullets
          items={[
            "Open the PDF and try to select a sentence with your cursor. If it highlights normally, it's text-based.",
            "Try Ctrl+F / Cmd+F inside the PDF viewer and search for a word you know is on the page. If it finds it, you're fine.",
            "If nothing highlights and search finds nothing, it's an image — re-export from the original document.",
          ]}
        />

        <H2>When Word (.docx) is the safer default</H2>
        <Bullets
          items={[
            "Older or smaller-company ATS platforms — some legacy systems still handle .docx more reliably than PDF.",
            "A job posting that explicitly requests Word format — always follow the posting's instruction over general advice.",
            "You're unsure how the PDF export was generated — .docx removes the guesswork entirely.",
          ]}
        />

        <H2>When PDF is the safer or better choice</H2>
        <Bullets
          items={[
            "You want to guarantee formatting looks identical on every device — PDF locks layout, .docx can shift between Word versions.",
            "You're sending the file directly to a person by email rather than through an ATS upload field.",
            "The posting doesn't specify a format and the company uses a modern ATS — most handle text-based PDF cleanly today.",
          ]}
        />

        <H2>Comparison at a glance</H2>
        <DataTable
          head={["Factor", "PDF (text-based)", ".docx"]}
          rows={[
            ["Parsing reliability (modern ATS)", "High", "High"],
            ["Parsing reliability (older/legacy ATS)", "Variable", "Generally more consistent"],
            ["Layout consistency across devices", "Locked, always identical", "Can shift slightly"],
            ["Risk if made from a scan/image", "Fails parsing completely", "Not applicable — always text"],
            ["Editable by the recruiter", "No", "Yes"],
          ]}
        />

        <H2>The one rule that matters more than the format</H2>
        <p>
          Whatever format you choose, avoid multi-column layouts, text boxes, tables for layout,
          and headers/footers containing your contact details — these break extraction in both
          PDF and .docx alike, on systems that otherwise parse either format fine. File type is a
          minor factor next to structure.
        </p>
        <p>
          Run your actual file through the{" "}
          <Link to="/" className="text-primary underline">
            free scanner
          </Link>{" "}
          to see exactly what text it extracts — if it looks garbled or empty, that's true
          regardless of which format you picked. For the structural rules that keep either format
          safe, see the{" "}
          <Link to="/resources/ats-resume-format-guide" className="text-primary underline">
            format guide
          </Link>
          .
        </p>
      </Prose>
    </ArticleLayout>
  );
}
