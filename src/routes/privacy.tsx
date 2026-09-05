import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

const TITLE = "Privacy Policy — ATS Pro";
const DESC =
  "ATS Pro runs entirely in your browser. Your resume and job description are never uploaded, stored, or shared. Read how the free ATS resume scanner handles data.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ats-scanner-pro.netlify.app/privacy" },
      { property: "og:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ats-scanner-pro.netlify.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://ats-scanner-pro.netlify.app/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "The short version",
    body: "ATS Pro is a fully client-side tool. Everything you paste or upload — your resume, job descriptions, anything you type — is processed locally in your browser and never sent to a server. We have no accounts, no database of users, and nothing to leak.",
  },
  {
    title: "What we collect",
    body: "Nothing about your documents. Because all analysis happens in your browser, your resume text never leaves your device. There is no signup, so we hold no name, email, or password for you.",
  },
  {
    title: "Advertising",
    body: "This site displays ads served by Google AdSense. Google may use cookies and similar technologies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising at Google Ad Settings (adssettings.google.com) and learn more in Google's Privacy & Terms. We do not share your resume content with Google or any other third party — ad scripts never see the text you analyze.",
  },
  {
    title: "Cookies and local storage",
    body: "The app itself sets no tracking cookies. Ad partners (Google) may set their own cookies as described above. Your browser may keep site data in local storage purely for functionality; clearing your browser data removes it.",
  },
  {
    title: "Analytics",
    body: "We use Google Analytics to understand overall traffic patterns, such as which pages are visited and roughly how many people use the site. This is aggregated usage data — it does not include the resume or job description text you scan, which never leaves your browser. You can opt out of Google Analytics tracking using a browser extension such as the Google Analytics Opt-out Add-on.",
  },
  {
    title: "Your files",
    body: "Uploaded PDF and DOCX resumes are read by code running in your browser tab only. Closing the tab discards everything — nothing persists on our side because there is no 'our side'.",
  },
  {
    title: "Changes to this policy",
    body: "If this policy changes, the updated version will be posted on this page. The core promise will not change: your documents are processed locally and never uploaded.",
  },
  {
    title: "Contact",
    body: "Questions about this policy? Reach out via the project page where this app is published.",
  },
];

function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: September 2026. Plain-language summary of how ATS Pro handles data — spoiler:
          your resume never leaves your browser.
        </p>
        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.title} className="panel p-5">
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
