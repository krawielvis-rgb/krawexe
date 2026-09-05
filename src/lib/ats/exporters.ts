/** Client-side exporters: clean, ATS-friendly text, PDF and DOCX. */

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportTxt(text: string, filename = "resume.txt") {
  download(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}

const HEADINGS = /^(professional summary|summary|core skills|skills|professional experience|work experience|experience|education|certifications|projects|additional skills(?: & keywords)?)$/i;

function parseResume(text: string) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      text: line.replace(/^[•*]\s*/, ""),
      bullet: /^[•*]\s+/.test(line) || /^[-–—]\s+/.test(line),
      heading: HEADINGS.test(line) || (line === line.toUpperCase() && line.length >= 4 && line.length <= 42 && /[A-Z]/.test(line)),
    }));
}

export async function exportDocx(text: string, filename = "resume.docx") {
  const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import("docx");
  const lines = parseResume(text);
  const children = lines.map((line, index) => {
    if (index === 0 && !line.heading) {
      return new Paragraph({
        spacing: { after: 90 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: line.text, bold: true, size: 30, font: "Arial" })],
      });
    }
    if (line.heading) {
      return new Paragraph({
        spacing: { before: 220, after: 90 },
        border: { bottom: { color: "333333", size: 4, space: 3 } },
        children: [new TextRun({ text: line.text.toUpperCase(), bold: true, size: 22, font: "Arial" })],
      });
    }
    return new Paragraph({
      bullet: line.bullet ? { level: 0 } : undefined,
      spacing: { after: 55, line: 250 },
      children: [new TextRun({ text: line.text, size: 21, font: "Arial" })],
    });
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: "Arial", size: 21 } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 720, right: 900, bottom: 720, left: 900 } } },
      children,
    }],
  });
  download(await Packer.toBlob(doc), filename);
}

export async function exportPdf(text: string, filename = "resume.pdf") {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  const marginX = 52;
  const top = 48;
  const bottom = 48;
  const contentWidth = 612 - marginX * 2;
  const pageHeight = 792;
  const lines = parseResume(text);
  let y = top;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - bottom) {
      doc.addPage();
      y = top;
    }
  };

  const writeWrapped = (value: string, fontSize: number, leading: number, options: { bold?: boolean; indent?: number } = {}) => {
    const indent = options.indent ?? 0;
    doc.setFont("helvetica", options.bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    const wrapped = doc.splitTextToSize(value, contentWidth - indent) as string[];
    for (const row of wrapped) {
      ensureSpace(leading);
      doc.text(row, marginX + indent, y);
      y += leading;
    }
  };

  lines.forEach((line, index) => {
    if (index === 0 && !line.heading) {
      ensureSpace(32);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      const name = doc.splitTextToSize(line.text, contentWidth) as string[];
      doc.text(name[0], marginX, y);
      y += 22;
      if (name.length > 1) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        for (const extra of name.slice(1)) {
          ensureSpace(13);
          doc.text(extra, marginX, y);
          y += 13;
        }
      }
      y += 3;
      return;
    }

    if (line.heading) {
      ensureSpace(32);
      y += 7;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(line.text.toUpperCase(), marginX, y);
      y += 4;
      doc.setLineWidth(0.7);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 12;
      return;
    }

    if (line.bullet) {
      ensureSpace(15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text("•", marginX, y);
      writeWrapped(line.text, 9.5, 12.5, { indent: 12 });
      y += 1.5;
    } else {
      writeWrapped(line.text, 9.5, 12.5);
      y += 1.5;
    }
  });

  download(doc.output("blob"), filename);
}
