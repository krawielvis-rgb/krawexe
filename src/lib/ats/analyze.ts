/**
 * Deterministic, rule-based ATS analysis. No AI/LLM calls anywhere.
 */

export const STOPWORDS = new Set([
  "with",
  "that",
  "this",
  "will",
  "from",
  "your",
  "have",
  "they",
  "them",
  "their",
  "then",
  "than",
  "into",
  "about",
  "such",
  "these",
  "those",
  "each",
  "other",
  "also",
  "been",
  "being",
  "were",
  "what",
  "when",
  "where",
  "while",
  "which",
  "would",
  "could",
  "should",
  "must",
  "more",
  "most",
  "some",
  "very",
  "over",
  "under",
  "上",
  "experience",
  "experienced",
  "required",
  "requirements",
  "requirement",
  "responsibilities",
  "responsible",
  "responsibility",
  "team",
  "teams",
  "candidate",
  "candidates",
  "applicant",
  "applicants",
  "job",
  "jobs",
  "role",
  "roles",
  "position",
  "positions",
  "company",
  "companies",
  "work",
  "working",
  "years",
  "year",
  "ability",
  "able",
  "strong",
  "good",
  "excellent",
  "great",
  "including",
  "include",
  "includes",
  "etc",
  "plus",
  "preferred",
  "prefer",
  "desired",
  "skills",
  "skill",
  "knowledge",
  "understanding",
  "opportunity",
  "opportunities",
  "employment",
  "employer",
  "benefits",
  "salary",
  "apply",
  "please",
  "email",
  "resume",
  "cover",
  "letter",
  "full",
  "time",
  "part",
  "hours",
  "week",
  "daily",
  "well",
  "help",
  "make",
  "made",
  "need",
  "needs",
  "needed",
  "provide",
  "provides",
  "ensure",
  "ensuring",
  "within",
  "across",
  "among",
  "using",
  "used",
  "self",
  "both",
  "like",
  "many",
  "much",
  "here",
  "there",
  "only",
  "just",
  "join",
  "looking",
  "seeking",
  "hiring",
  "environment",
  "based",
  "level",
  "high",
  "list",
  "along",
  "upon",
  "per",
  "may",
  "our",
  "you",
  "who",
  "all",
  "and",
  "for",
  "the",
]);

/** Synonym / stem families used for fuzzy keyword matching. */
export const SYNONYMS: Record<string, string[]> = {
  management: ["managed", "manage", "managing", "manager", "management"],
  manage: ["managed", "manage", "managing", "manager", "management"],
  leadership: ["led", "lead", "leading", "leader", "leadership"],
  lead: ["led", "lead", "leading", "leader", "leadership"],
  development: ["develop", "developed", "developing", "developer", "development"],
  develop: ["develop", "developed", "developing", "developer", "development"],
  analysis: ["analyze", "analyzed", "analysis", "analytical", "analytics", "analyst"],
  analytics: ["analyze", "analyzed", "analysis", "analytical", "analytics", "analyst"],
  communication: ["communicate", "communicated", "communication", "communications"],
  collaboration: ["collaborate", "collaborated", "collaboration", "collaborative"],
  design: ["design", "designed", "designing", "designer"],
  implementation: ["implement", "implemented", "implementing", "implementation"],
  optimization: ["optimize", "optimized", "optimizing", "optimization"],
  training: ["train", "trained", "training", "trainer"],
  reporting: ["report", "reported", "reporting", "reports"],
  planning: ["plan", "planned", "planning", "plans"],
  testing: ["test", "tested", "testing", "tests", "qa"],
  budgeting: ["budget", "budgets", "budgeting"],
  recruiting: ["recruit", "recruited", "recruiting", "recruitment"],
  engineering: ["engineer", "engineered", "engineering"],
  marketing: ["market", "marketing", "marketed"],
  operations: ["operation", "operations", "operational", "operate"],
  research: ["research", "researched", "researching", "researcher"],
  documentation: ["document", "documented", "documentation"],
  automation: ["automate", "automated", "automating", "automation"],
  supervision: ["supervise", "supervised", "supervising", "supervisor"],
  nursing: ["nurse", "nurses", "nursing"],
  sales: ["sale", "sales", "selling", "sold"],
  javascript: ["javascript", "js", "node", "typescript"],
  typescript: ["typescript", "ts", "javascript"],
  kubernetes: ["kubernetes", "k8s"],
  postgresql: ["postgresql", "postgres", "psql"],
};

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

export type Keyword = { term: string; count: number; type: "phrase" | "word" };

/** Extract top JD keywords: recurring bigrams first, then frequent single words. */
export function extractKeywords(jd: string, limit = 15): Keyword[] {
  const words = tokens(jd);

  const bigramCounts = new Map<string, number>();
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    if (!a || !b) continue;
    if (a.length < 3 || b.length < 3) continue;
    if (STOPWORDS.has(a) || STOPWORDS.has(b)) continue;
    const key = `${a} ${b}`;
    bigramCounts.set(key, (bigramCounts.get(key) ?? 0) + 1);
  }
  const bigrams: Keyword[] = [...bigramCounts.entries()]
    .filter(([, c]) => c > 1)
    .sort((x, y) => y[1] - x[1])
    .map(([term, count]) => ({ term, count, type: "phrase" as const }));

  const wordCounts = new Map<string, number>();
  for (const w of words) {
    if (w.length <= 3) continue;
    if (STOPWORDS.has(w)) continue;
    if (/^\d+$/.test(w)) continue;
    wordCounts.set(w, (wordCounts.get(w) ?? 0) + 1);
  }
  const singles: Keyword[] = [...wordCounts.entries()]
    .sort((x, y) => y[1] - x[1])
    .map(([term, count]) => ({ term, count, type: "word" as const }));

  const phraseSlots = Math.min(bigrams.length, Math.ceil(limit / 2));
  const picked: Keyword[] = bigrams.slice(0, phraseSlots);
  const usedWords = new Set(picked.flatMap((k) => k.term.split(" ")));

  for (const s of singles) {
    if (picked.length >= limit) break;
    if (usedWords.has(s.term)) continue;
    picked.push(s);
  }
  return picked.slice(0, limit);
}

function variantsFor(term: string): string[] {
  const base = SYNONYMS[term];
  if (base) return base;
  const v = new Set<string>([term]);
  if (term.endsWith("s")) v.add(term.slice(0, -1));
  else v.add(term + "s");
  if (term.endsWith("ing")) v.add(term.slice(0, -3));
  if (term.endsWith("ed")) v.add(term.slice(0, -2));
  return [...v];
}

export type KeywordMatch = Keyword & { found: boolean };

export function matchKeywords(keywords: Keyword[], resumeText: string): KeywordMatch[] {
  const norm = ` ${normalize(resumeText)} `;
  return keywords.map((k) => {
    let found = false;
    if (k.type === "phrase") {
      const parts = k.term.split(" ");
      found =
        norm.includes(` ${k.term} `) ||
        parts.every((p) => variantsFor(p).some((v) => norm.includes(v)));
    } else {
      found = variantsFor(k.term).some((v) => norm.includes(v));
    }
    return { ...k, found };
  });
}

export type FormatCheck = {
  id: string;
  label: string;
  passed: boolean;
  why: string;
  detail: string;
};

export function runFormatChecks(rawResume: string): FormatCheck[] {
  const lower = rawResume.toLowerCase();
  const wordCount = rawResume.split(/\s+/).filter(Boolean).length;

  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.-]{2,}/.test(rawResume);
  const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(rawResume);
  const sections = ["experience", "education", "skills"].filter((s) => lower.includes(s));
  const hasNumbers = /\d|%/.test(rawResume);
  const lengthOk = wordCount >= 250 && wordCount <= 1200;

  return [
    {
      id: "email",
      label: "Contact email detected",
      passed: hasEmail,
      why: "Recruiters and ATS parsers pull your email straight from the resume body.",
      detail: hasEmail ? "An email address was found." : "No email address pattern found.",
    },
    {
      id: "phone",
      label: "Phone number detected",
      passed: hasPhone,
      why: "A missing phone number blocks the fastest way a recruiter reaches you.",
      detail: hasPhone ? "A phone number was found." : "No phone number pattern found.",
    },
    {
      id: "sections",
      label: "Standard section headers",
      passed: sections.length >= 2,
      why: "ATS parsers map content using standard headers like Experience, Education and Skills.",
      detail: `${sections.length} of 3 found${sections.length ? `: ${sections.join(", ")}` : ""}.`,
    },
    {
      id: "quantified",
      label: "Quantifiable results present",
      passed: hasNumbers,
      why: "Numbers and percentages prove impact instead of just listing duties.",
      detail: hasNumbers
        ? "Numbers or percentages were detected."
        : "No numbers or percentages detected in your bullets.",
    },
    {
      id: "length",
      label: "Reasonable length",
      passed: lengthOk,
      why: "Under ~250 words reads thin; over ~1200 words gets truncated or skimmed.",
      detail: `${wordCount} words (target 250–1200).`,
    },
  ];
}

export type Analysis = {
  keywords: KeywordMatch[];
  matched: KeywordMatch[];
  missing: KeywordMatch[];
  checks: FormatCheck[];
  keywordScore: number;
  formatScore: number;
  overallScore: number;
  sections: { skills: number; experience: number; education: number };
  topFixes: string[];
  strengths: string[];
  weaknesses: string[];
  wordCount: number;
};

export function analyze(resumeText: string, jobDescription: string): Analysis {
  const keywords = extractKeywords(jobDescription);
  const matches = matchKeywords(keywords, resumeText);
  const matched = matches.filter((m) => m.found);
  const missing = matches.filter((m) => !m.found);
  const checks = runFormatChecks(resumeText);

  const keywordScore = matches.length ? Math.round((matched.length / matches.length) * 100) : 0;
  const passedChecks = checks.filter((c) => c.passed).length;
  const formatScore = Math.round((passedChecks / checks.length) * 100);
  const overallScore = Math.round(keywordScore * 0.7 + formatScore * 0.3);

  const quantified = checks.find((c) => c.id === "quantified")!.passed;
  const sectionsOk = checks.find((c) => c.id === "sections")!.passed;

  const topFixes: string[] = [];
  for (const m of [...missing].sort((a, b) => b.count - a.count).slice(0, 3)) {
    topFixes.push(
      `Add the keyword “${m.term}” — it appears ${m.count}× in the job description but is missing from your resume.`,
    );
  }
  for (const c of checks.filter((c) => !c.passed)) {
    if (topFixes.length >= 3) break;
    topFixes.push(`Fix: ${c.label.toLowerCase()} — ${c.detail} ${c.why}`);
  }

  const strengths = [
    ...matched.map((m) => `Matches job keyword “${m.term}”.`),
    ...checks.filter((c) => c.passed).map((c) => `${c.label}: ${c.detail}`),
  ];
  const weaknesses = [
    ...missing.map(
      (m) => `Missing job keyword “${m.term}” (mentioned ${m.count}× in the job description).`,
    ),
    ...checks.filter((c) => !c.passed).map((c) => `${c.label} failed — ${c.detail}`),
  ];

  return {
    keywords: matches,
    matched,
    missing,
    checks,
    keywordScore,
    formatScore,
    overallScore,
    sections: {
      skills: keywordScore,
      experience: quantified ? Math.max(80, keywordScore) : Math.min(55, keywordScore + 10),
      education: sectionsOk ? 90 : 45,
    },
    topFixes,
    strengths,
    weaknesses,
    wordCount: resumeText.split(/\s+/).filter(Boolean).length,
  };
}
