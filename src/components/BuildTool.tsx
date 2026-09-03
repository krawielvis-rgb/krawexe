import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScoreBar, ScoreGauge } from "@/components/ScoreGauge";
import { DownloadRow } from "@/components/ScanTool";
import { analyze, extractKeywords, matchKeywords, normalize } from "@/lib/ats/analyze";

type Exp = { title: string; company: string; dates: string; bullets: string };
type Edu = { degree: string; institution: string; dates: string };

const emptyExp: Exp = { title: "", company: "", dates: "", bullets: "" };
const emptyEdu: Edu = { degree: "", institution: "", dates: "" };

/** Parse "Jan 2020 – Present" style ranges into a sortable end value. */
function endValue(dates: string): number {
  const d = dates.toLowerCase();
  if (/present|current|now/.test(d)) return 999999;
  const years = d.match(/\b(19|20)\d{2}\b/g);
  if (!years) return 0;
  return Math.max(...years.map(Number));
}

function bulletLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

export function BuildTool() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [jd, setJd] = useState("");
  const [experience, setExperience] = useState<Exp[]>([{ ...emptyExp }]);
  const [education, setEducation] = useState<Edu[]>([{ ...emptyEdu }]);

  const keywords = useMemo(() => (jd.trim() ? extractKeywords(jd) : []), [jd]);

  const userSkills = useMemo(
    () =>
      skills
        .split(/[,\n;]/)
        .map((s) => s.trim())
        .filter(Boolean),
    [skills],
  );

  /** Reorder the user's OWN skills so JD-matching ones come first. Nothing invented. */
  const orderedSkills = useMemo(() => {
    if (!keywords.length) return userSkills;
    const norm = keywords.map((k) => k.term);
    const rank = (s: string) => {
      const n = normalize(s);
      const i = norm.findIndex((k) => n.includes(k) || k.includes(n));
      return i === -1 ? 999 : i;
    };
    return [...userSkills].sort((a, b) => rank(a) - rank(b));
  }, [userSkills, keywords]);

  const cvText = useMemo(() => {
    const lines: string[] = [];
    if (name.trim()) lines.push(name.trim().toUpperCase());
    const contact = [email, phone, location, link].map((v) => v.trim()).filter(Boolean);
    if (contact.length) lines.push(contact.join(" | "));

    if (summary.trim()) {
      lines.push("", "Professional Summary", summary.trim());
    }

    const exps = [...experience]
      .filter((e) => e.title.trim() || e.company.trim())
      .sort((a, b) => endValue(b.dates) - endValue(a.dates));
    if (exps.length) {
      lines.push("", "Work Experience");
      for (const e of exps) {
        const header = [e.title.trim(), e.company.trim()].filter(Boolean).join(", ");
        lines.push(e.dates.trim() ? `${header} (${e.dates.trim()})` : header);
        for (const b of bulletLines(e.bullets)) lines.push(`- ${b}`);
        lines.push("");
      }
      if (lines[lines.length - 1] === "") lines.pop();
    }

    const edus = [...education]
      .filter((e) => e.degree.trim() || e.institution.trim())
      .sort((a, b) => endValue(b.dates) - endValue(a.dates));
    if (edus.length) {
      lines.push("", "Education");
      for (const e of edus) {
        const header = [e.degree.trim(), e.institution.trim()].filter(Boolean).join(", ");
        lines.push(e.dates.trim() ? `${header} (${e.dates.trim()})` : header);
      }
    }

    if (orderedSkills.length) {
      lines.push("", "Skills", orderedSkills.join(", "));
    }

    return lines.join("\n").trim() + "\n";
  }, [name, email, phone, location, link, summary, experience, education, orderedSkills]);

  const gaps = useMemo(() => {
    if (!keywords.length) return [];
    return matchKeywords(keywords, cvText).filter((k) => !k.found);
  }, [keywords, cvText]);

  const analysis = useMemo(
    () => (jd.trim() && cvText.trim().length > 20 ? analyze(cvText, jd) : null),
    [jd, cvText],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">ATS-friendly CV builder</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Single column, standard headers, ATS-safe fonts, no tables or graphics. Your words only —
          the job description is used to reorder your skills and flag gaps, never to invent content.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------------- Form ---------------- */}
        <div className="space-y-5">
          <section className="panel space-y-3 p-5">
            <h2 className="font-display text-lg font-semibold">Contact</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" value={name} onChange={setName} />
              <Field label="Email" value={email} onChange={setEmail} />
              <Field label="Phone" value={phone} onChange={setPhone} />
              <Field label="Location" value={location} onChange={setLocation} />
              <div className="sm:col-span-2">
                <Field label="LinkedIn / portfolio (optional)" value={link} onChange={setLink} />
              </div>
            </div>
          </section>

          <section className="panel space-y-3 p-5">
            <h2 className="font-display text-lg font-semibold">Professional summary</h2>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="2–3 sentences in your own words (optional)"
              className="min-h-24"
            />
          </section>

          <section className="panel space-y-4 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Work experience</h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setExperience((e) => [...e, { ...emptyExp }])}
              >
                <Plus className="size-4" /> Add
              </Button>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="space-y-3 rounded-lg border border-border p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Job title"
                    value={exp.title}
                    onChange={(v) => setExperience(update(experience, i, { title: v }))}
                  />
                  <Field
                    label="Company"
                    value={exp.company}
                    onChange={(v) => setExperience(update(experience, i, { company: v }))}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Dates (e.g. Jan 2021 – Present)"
                      value={exp.dates}
                      onChange={(v) => setExperience(update(experience, i, { dates: v }))}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Bullet points (one per line)</Label>
                  <Textarea
                    value={exp.bullets}
                    onChange={(e) => setExperience(update(experience, i, { bullets: e.target.value }))}
                    placeholder={"Reduced ticket backlog by 40%\nLed a team of 6 engineers"}
                    className="min-h-24 text-sm"
                  />
                </div>
                {experience.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setExperience(experience.filter((_, x) => x !== i))}
                  >
                    <Trash2 className="size-4" /> Remove
                  </Button>
                )}
              </div>
            ))}
          </section>

          <section className="panel space-y-4 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Education</h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEducation((e) => [...e, { ...emptyEdu }])}
              >
                <Plus className="size-4" /> Add
              </Button>
            </div>
            {education.map((edu, i) => (
              <div key={i} className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-2">
                <Field
                  label="Degree"
                  value={edu.degree}
                  onChange={(v) => setEducation(update(education, i, { degree: v }))}
                />
                <Field
                  label="Institution"
                  value={edu.institution}
                  onChange={(v) => setEducation(update(education, i, { institution: v }))}
                />
                <Field
                  label="Dates"
                  value={edu.dates}
                  onChange={(v) => setEducation(update(education, i, { dates: v }))}
                />
                {education.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEducation(education.filter((_, x) => x !== i))}
                    >
                      <Trash2 className="size-4" /> Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="panel space-y-3 p-5">
            <h2 className="font-display text-lg font-semibold">Skills</h2>
            <Textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Comma separated: Project management, SQL, Stakeholder reporting…"
              className="min-h-20"
            />
          </section>

          <section className="panel space-y-3 p-5">
            <h2 className="font-display text-lg font-semibold">Target job description</h2>
            <Textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the job description to tailor ordering and see gaps…"
              className="min-h-40 font-mono text-xs"
            />
            {gaps.length > 0 && (
              <div className="rounded-md bg-warning/10 p-3 text-xs">
                <p className="font-semibold text-warning">
                  Job keywords not present anywhere in your CV
                </p>
                <p className="mt-1 text-muted-foreground">
                  Add any that genuinely apply to you — nothing is added automatically.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {gaps.map((g) => (
                    <span
                      key={g.term}
                      className="rounded-full bg-warning/20 px-2 py-0.5 font-medium text-warning"
                    >
                      {g.term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ---------------- Preview ---------------- */}
        <div className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <section className="panel space-y-3 p-5">
            <h2 className="font-display text-lg font-semibold">Live preview</h2>
            <div
              className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-background p-6 text-[13px] leading-relaxed"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {cvText.trim() || "Fill the form to see your CV take shape."}
            </div>
            <DownloadRow text={cvText} baseName="ats-cv" />
          </section>

          {analysis && (
            <section className="panel space-y-4 p-5">
              <h2 className="font-display text-lg font-semibold">Score against this job</h2>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <ScoreGauge score={analysis.overallScore} size={150} />
                <div className="w-full space-y-3">
                  <ScoreBar label="Skills" value={analysis.sections.skills} />
                  <ScoreBar label="Experience" value={analysis.sections.experience} />
                  <ScoreBar label="Education" value={analysis.sections.education} />
                </div>
              </div>
              {analysis.topFixes.length > 0 && (
                <ul className="space-y-2 text-sm">
                  {analysis.topFixes.map((f, i) => (
                    <li key={i} className="rounded-md bg-secondary/50 p-3">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function update<T>(list: T[], index: number, patch: Partial<T>): T[] {
  return list.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
