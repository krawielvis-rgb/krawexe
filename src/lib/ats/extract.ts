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
    let lastY: number | null = null;
    let line = "";
    for (const raw of content.items) {
      if (!("str" in raw)) continue;
      const item = raw as { str: string; transform: number[]; hasEOL?: boolean };
      const y = item.transform?.[5];
      if (lastY !== null && y !== undefined && Math.abs(y - lastY) > 2) {
        text += line.trim() + "\n";
        line = "";
      }
      line += item.str + (item.hasEOL ? "" : " ");
      if (y !== undefined) lastY = y;
      if (item.hasEOL) {
        text += line.trim() + "\n";
        line = "";
        lastY = null;
      }
    }
    if (line.trim()) text += line.trim() + "\n";
    text += "\n";
  }
  const trimmed = text
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const result: ExtractResult = { kind: "pdf", text: trimmed };
  if (trimmed.length < 40) {
    result.warning =
      "No selectable text found in this PDF — it is most likely a scanned image. A real ATS will not be able to read it either. Re-export your resume as a text-based PDF or DOCX.";
  }
  return result;
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
