/** Client-side text extraction from PDF and DOCX files. */

export type ExtractResult = {
  text: string;
  warning?: string;
  kind: "pdf" | "docx" | "txt";
};

async function extractPdf(file: File): Promise<ExtractResult> {
  const pdfjs = await import("pdfjs-dist");
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .map((it) => ("str" in it ? (it as { str: string }).str : ""))
      .filter(Boolean);
    text += strings.join(" ") + "\n";
  }
  const trimmed = text.trim();
  return {
    kind: "pdf",
    text: trimmed,
    warning: trimmed.length < 40
      ? "No selectable text found in this PDF — it is most likely a scanned image. A real ATS will not be able to read it either. Re-export your resume as a text-based PDF or DOCX."
      : undefined,
  };
}

async function extractDocx(file: File): Promise<ExtractResult> {
  const mammoth = await import("mammoth/mammoth.browser.js");
  const buf = await file.arrayBuffer();
  // convertToHtml keeps table cells, which resumes often use for layout.
  const result = await (mammoth as unknown as {
    convertToHtml: (i: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  }).convertToHtml({ arrayBuffer: buf });
  const html = result.value;
  const text = html
    .replace(/<\/(p|div|li|tr|h[1-6])>/gi, "\n")
    .replace(/<\/t[dh]>/gi, " | ")
    .replace(/<br\s*\/?>(\s*)/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { kind: "docx", text };
}

export async function extractText(file: File): Promise<ExtractResult> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return extractPdf(file);
  if (name.endsWith(".docx")) return extractDocx(file);
  if (name.endsWith(".txt") || file.type.startsWith("text/")) {
    return { kind: "txt", text: (await file.text()).trim() };
  }
  throw new Error("Unsupported file type. Upload a PDF, DOCX or TXT resume.");
}
