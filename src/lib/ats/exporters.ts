/** Client-side exporters: real text-based PDF, DOCX and TXT. */

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportTxt(text: string, filename = "resume.txt") {
  download(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}

const HEADINGS = /^(professional summary|work experience|experience|education|skills|additional skills & keywords|certifications|projects)$/i;

export async function exportDocx(text: string, filename = "resume.docx") {
  const { Document, Packer, Paragraph, TextRun } = await import("docx");

  const lines = text.replace(/\r/g, "").split("\n");
  const children = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return new Paragraph({ children: [new TextRun("")] });
    const isHeading = HEADINGS.test(trimmed) || (trimmed === trimmed.toUpperCase() && trimmed.length < 40);
    if (isHeading) {
      return new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [new TextRun({ text: trimmed, bold: true, size: 26, font: "Arial" })],
      });
    }
    const isBullet = /^[-•*]\s+/.test(trimmed);
    return new Paragraph({
      spacing: { after: 60 },
      ...(isBullet ? { bullet: { level: 0 } } : {}),
      children: [
        new TextRun({
          text: isBullet ? trimmed.replace(/^[-•*]\s+/, "") : trimmed,
          size: 22,
          font: "Arial",
        }),
      ],
    });
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  download(blob, filename);
}

export async function exportPdf(text: string, filename = "resume.pdf") {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const marginX = 54;
  const marginY = 54;
  const maxWidth = 612 - marginX * 2;
  const pageHeight = 792;
  let y = marginY;

  const lines = text.replace(/\r/g, "").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      y += 8;
      continue;
    }
    const isHeading =
      HEADINGS.test(trimmed) || (trimmed === trimmed.toUpperCase() && trimmed.length < 40);
    doc.setFont("helvetica", isHeading ? "bold" : "normal");
    doc.setFontSize(isHeading ? 12.5 : 10.5);
    const wrapped = doc.splitTextToSize(trimmed, maxWidth) as string[];
    if (isHeading) y += 8;
    for (const w of wrapped) {
      if (y > pageHeight - marginY) {
        doc.addPage();
        y = marginY;
      }
      doc.text(w, marginX, y);
      y += isHeading ? 17 : 14;
    }
    if (isHeading) y += 2;
  }
  download(doc.output("blob"), filename);
}
