# ATS Resume Companion

Build a single-purpose web app called "ATS Pro" — an ATS resume scanner and

ATS resume scanner with ATS-friendly export tools. No AI/LLM API calls anywhere in the app — every score,

suggestion, and generated document must come from deterministic, rule-based

logic that runs entirely in the app (no external API dependency, no per-use cost).

=====================================================

1. AUTH — SINGLE HARDCODED ADMIN, NO USER SYSTEM

=====================================================

- No sign-up, no user table, no database of accounts or applicants.

- One login screen only. Hardcoded credentials: username "admin", password "9o9a".

- On submit, check the two values client-side against constants and set a session

  flag (e.g. in localStorage/sessionStorage) if they match; otherwise show

  "Invalid credentials" and do not proceed.

- All other routes/pages redirect to the login screen if the session flag isn't set.

- Add a simple "Log out" action that clears the session flag.

- Do not build any admin dashboard for managing other users — there are none.

  This login is purely a gate to the tool itself.

=====================================================

2. APP STRUCTURE (after login)

=====================================================

Two main tools behind the same login, switchable via tabs or nav:

  A) "Scan" — analyze a resume against a job description (rule-based ATS scoring).

  B) "Build" — generate a new ATS-friendly CV from scratch, tailored to a job description.

No applicant tracking, no saved candidate lists, no pipeline/stages — just these

two tools, same as a single-user utility.

=====================================================

3. TOOL A — RESUME SCANNER (core feature, no AI)

=====================================================

Inputs: paste/upload a job description (text), upload a resume (PDF or DOCX).

Step 1 — Text extraction

- Extract raw text from PDF and DOCX (including table cells in DOCX, since resumes

  sometimes use tables). If a PDF yields no extractable text, show a clear warning

  that it's likely a scanned image and won't parse in any real ATS either.

- Normalize a lowercase, punctuation-stripped copy for matching, but keep the raw

  text too (needed for format checks and quantifiable-results detection).

Step 2 — Keyword extraction from the job description

- Extract meaningful single words (length > 3, filtered against a stopword list —

  filter generic words like "with", "experience", "required", "responsibilities",

  "team", "candidate", etc.).

- Also extract two-word phrases (bigrams) that recur more than once in the JD

  (e.g. "project management", "patient care") — these matter more than single words.

- Rank by frequency, take the top ~15 keywords/phrases, mixing bigrams and singles.

Step 3 — Matching against the resume

- For each JD keyword, check: (a) direct substring match, (b) a small synonym map

  you define (e.g. "management" ~ "managed"/"manage"/"managing", "leadership" ~

  "led"/"lead"), (c) for multi-word phrases, match if all words appear anywhere

  in the resume even if not adjacent.

- Produce a per-keyword table: keyword, found (yes/no).

- keyword_score = (matched keywords / total keywords) * 100.

Step 4 — ATS format compatibility checks (independent of keyword matching)

- Contact email detected (regex).

- Phone number detected (regex).

- Standard section headers found: count how many of "experience", "education",

  "skills" appear; flag pass if 2+ of 3 found.

- Contains quantifiable results (numbers or % signs).

- Reasonable length (roughly 250–1200 words — too short or too long both flagged).

- Show each check with a pass/fail icon and one-line explanation of why it matters.

Step 5 — Scoring & the "missing" review (this replaces the AI reviewer — same output

shape, computed with rules only)

- format_score = (passed checks / total checks) * 100.

- overall_score = keyword_score * 0.7 + format_score * 0.3.

- Section scores: Skills = keyword_score; Experience = high if quantifiable-results

  check passed, lower otherwise; Education = high if section-headers check passed.

- "Top fixes" (max 3): the highest-value missing keywords first, then any failed

  format checks, phrased as direct actions ("Add the keyword X — it's in the job

  description but not your resume").

- "Strengths": list matched keywords + passed checks.

- "Weaknesses": list missing keywords + failed checks, explicitly and specifically

  (this is the "acts like an HR reviewer telling you what's missing" behavior —

  achieved with rules, not a model).

- Analyze the uploaded resume and show actionable ATS fixes without rewriting the candidate's content.


  "Additional Skills & Keywords" section listing the missing keywords, so a

  re-scan of the exported version would score higher.

Step 6 — Results UI

- Score gauge/meter (0–100) with color bands (red <50, yellow 50–75, green 75+).

- Tabs: Overview (section scores, why-this-score, top fixes, strengths/weaknesses),

  Keywords (the full matched/missing table), Format Check (the pass/fail list),


  Resume & Export (original resume preview with export buttons),

  green highlight = added, red strikethrough = removed).

- Export the resume as .docx, .txt, and a real text-based .pdf (must be

  actual selectable text, not a rasterized image — this matters for it to be

  scannable by a real ATS).

=====================================================

4. TOOL B — ATS RESUME ANALYZER (no AI)

=====================================================

Purpose: build a brand-new, ATS-friendly CV tailored to a pasted job description,

using the user's own input data — not generated/invented content.

Inputs (a form):

- Full name, email, phone, location, LinkedIn/portfolio (optional).

- Professional summary (user-written, optional).

- Work experience: repeatable entries — title, company, dates, bullet points

  (user-written).

- Education: repeatable entries — degree, institution, dates.

- Skills: free-text list the user provides.

- The job description (paste) — used only to (a) extract the same top keywords

  as Tool A, and (b) reorder/highlight the user's own matching skills first, and

  (c) flag which JD keywords the user hasn't listed anywhere, prompting them to

  add if genuinely applicable. Never invent experience or skills the user didn't

  enter — only reorganize and surface gaps.

Output — the actual CV document must follow strict ATS-friendly formatting rules:

- Single column layout only — no multi-column, no text boxes, no tables for

  layout, no headers/footers containing critical info, no images/icons/graphics.

- Fonts: a small fixed list of ATS-safe sans-serif fonts only — Arial, Calibri,

  Helvetica, or Georgia as a serif fallback. No decorative/script fonts.

- Standard section headers exactly as: "Professional Summary", "Work Experience",

  "Education", "Skills" (plain text headers, not styled as images).

- Reverse chronological order for experience and education.

- Bullet points for experience, not paragraphs.

- No embedded tables, no columns, no text wrapped in boxes.

- Export as a real text-based PDF (selectable text) and DOCX.

- Show a live preview of the CV as the user fills the form.

- After generation, run the same Tool A scanning logic against the pasted JD

  automatically and show the resulting score, so the user sees how ATS-ready it is

  before downloading.

=====================================================

5. GENERAL CONSTRAINTS

=====================================================

- Zero calls to any AI/LLM API anywhere in the app — all logic above is

  deterministic string/regex/matching logic.

- No database beyond whatever local state is needed to run the two tools in a

  session — no applicant records, no saved user list, no analytics dashboard.

- Clean, professional UI — dark or light, your choice — with clear typography,

  a results dashboard feel (gauge chart, tabs, colored pass/fail badges).

- Everything must work fully client-side if possible; PDF/DOCX generation can

  use client-side libraries.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://krawexe.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/76c3777f-37c4-4f71-8202-1a84ba82b608).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
