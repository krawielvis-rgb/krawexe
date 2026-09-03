import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react";
import { ScoreBar, ScoreGauge } from "@/components/ScoreGauge";
import { AdSlot } from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyze, type Analysis } from "@/lib/ats/analyze";
import { extractText } from "@/lib/ats/extract";
import { exportDocx, exportPdf, exportTxt } from "@/lib/ats/exporters";

export function ScanTool() {
  const [jd, setJd] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [improved, setImproved] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    setWarning("");
    try {
      const res = await extractText(file);
      setResumeText(res.text);
      setFileName(file.name);
      if (res.warning) setWarning(res.warning);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that file.");
    } finally {
      setBusy(false);
    }
  }

  function runAnalysis() {
    if (!resumeText.trim() || !jd.trim()) {
      setError("Add both a job description and a resume before scanning.");
      return;
    }
    setError("");
    const analysis = analyze(resumeText, jd);
    setResult(analysis);
    setImproved(analysis.improvedResume);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Resume scanner</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Deterministic keyword + format analysis. Nothing leaves your browser, no AI involved.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="panel space-y-3 p-5">
          <Label htmlFor="jd">Job description</Label>
          <Textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here…"
            className="min-h-64 font-mono text-xs"
          />
          <p className="text-xs text-muted-foreground">
            {jd.split(/\s+/).filter(Boolean).length} words pasted
          </p>
        </div>

        <div className="panel space-y-3 p-5">
          <Label>Resume (PDF, DOCX or TXT)</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-primary/60">
            {busy ? (
              <Loader2 className="size-6 animate-spin text-primary" />
            ) : (
              <Upload className="size-6 text-primary" />
            )}
            <span className="text-sm font-medium">
              {fileName || "Click to upload your resume"}
            </span>
            <span className="text-xs text-muted-foreground">PDF · DOCX · TXT</span>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="…or paste your resume text directly"
            className="min-h-32 font-mono text-xs"
          />
          {warning && (
            <p className="flex gap-2 rounded-md bg-warning/15 px-3 py-2 text-xs text-warning">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              {warning}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <Button size="lg" onClick={runAnalysis} disabled={busy}>
        <FileText className="size-4" />
        Scan resume
      </Button>

      {result && (
        <>
          <ResultsPanel
            result={result}
            improved={improved}
            onImprovedChange={setImproved}
            original={resumeText}
          />
          <AdSlot id="ats-ad-below-results" height={250} />
        </>
      )}
    </div>
  );
}

export function ResultsPanel({
  result,
  improved,
  onImprovedChange,
  original,
}: {
  result: Analysis;
  improved: string;
  onImprovedChange: (v: string) => void;
  original: string;
}) {
  return (
    <div className="panel p-6">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center gap-4">
          <ScoreGauge score={result.overallScore} />
          <div className="w-full space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Keyword score (70%)</span>
              <span className="font-semibold text-foreground">{result.keywordScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Format score (30%)</span>
              <span className="font-semibold text-foreground">{result.formatScore}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="format">Format check</TabsTrigger>
            <TabsTrigger value="improved">Improved resume</TabsTrigger>
            <TabsTrigger value="diff">What changed</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <ScoreBar label="Skills" value={result.sections.skills} />
              <ScoreBar label="Experience" value={result.sections.experience} />
              <ScoreBar label="Education" value={result.sections.education} />
            </div>

            <div className="rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Why this score: </span>
              you matched {result.matched.length} of {result.keywords.length} job keywords (
              {result.keywordScore}%) and passed {result.checks.filter((c) => c.passed).length} of{" "}
              {result.checks.length} ATS format checks ({result.formatScore}%). Overall = keyword
              score × 0.7 + format score × 0.3.
            </div>

            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                Top fixes
              </h3>
              <ol className="space-y-2">
                {result.topFixes.length ? (
                  result.topFixes.map((f, i) => (
                    <li key={i} className="flex gap-3 rounded-md bg-secondary/50 p-3 text-sm">
                      <span className="font-display font-bold text-primary">{i + 1}</span>
                      <span>{f}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">
                    No blocking issues found — this resume is already well aligned.
                  </li>
                )}
              </ol>
            </section>

            <div className="grid gap-5 sm:grid-cols-2">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-success">
                  Strengths
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-destructive">
                  Weaknesses
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {result.weaknesses.length ? (
                    result.weaknesses.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                        <span>{s}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">Nothing flagged.</li>
                  )}
                </ul>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="pt-5">
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2">Keyword</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">In JD</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.keywords.map((k) => (
                    <tr key={k.term} className="border-t border-border">
                      <td className="px-4 py-2 font-medium">{k.term}</td>
                      <td className="px-4 py-2 text-muted-foreground">{k.type}</td>
                      <td className="px-4 py-2 text-muted-foreground">{k.count}×</td>
                      <td className="px-4 py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            k.found
                              ? "bg-success/15 text-success"
                              : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {k.found ? "Found" : "Missing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="format" className="space-y-3 pt-5">
            {result.checks.map((c) => (
              <div key={c.id} className="flex gap-3 rounded-lg border border-border p-3">
                {c.passed ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                ) : (
                  <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground/80">Why it matters: {c.why}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="improved" className="space-y-3 pt-5">
            <p className="text-xs text-muted-foreground">
              Edit freely — every download below uses exactly what is in this box.
            </p>
            <Textarea
              value={improved}
              onChange={(e) => onImprovedChange(e.target.value)}
              className="min-h-96 font-mono text-xs"
            />
            <DownloadRow text={improved} baseName="improved-resume" />
          </TabsContent>

          <TabsContent value="diff" className="pt-5">
            <WordDiff original={original} updated={improved} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function DownloadRow({ text, baseName }: { text: string; baseName: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => exportDocx(text, `${baseName}.docx`)}>
        <Download className="size-4" /> DOCX
      </Button>
      <Button variant="secondary" onClick={() => exportPdf(text, `${baseName}.pdf`)}>
        <Download className="size-4" /> PDF (text-based)
      </Button>
      <Button variant="secondary" onClick={() => exportTxt(text, `${baseName}.txt`)}>
        <Download className="size-4" /> TXT
      </Button>
    </div>
  );
}

function WordDiff({ original, updated }: { original: string; updated: string }) {
  const [parts, setParts] = useState<{ value: string; added?: boolean; removed?: boolean }[]>([]);

  useEffect(() => {
    let cancelled = false;
    import("diff").then(({ diffWords }) => {
      if (!cancelled) setParts(diffWords(original, updated));
    });
    return () => {
      cancelled = true;
    };
  }, [original, updated]);

  return (
    <div className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed">
      {parts.map((p, i) =>
        p.added ? (
          <span key={i} className="rounded bg-success/25 text-success">
            {p.value}
          </span>
        ) : p.removed ? (
          <span key={i} className="rounded bg-destructive/20 text-destructive line-through">
            {p.value}
          </span>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </div>
  );
}
