import { getStore } from "@netlify/blobs";

const STORE = "pinterest-autopilot";
const TOKEN_KEY = "oauth-token";

export type PinterestToken = {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  refresh_token_expires_at?: number;
  scope?: string;
};

export function store() { return getStore(STORE); }
export function siteUrl() { return (process.env.URL || process.env.SITE_URL || "http://localhost:8888").replace(/\/$/, ""); }
export function redirectUri() { return process.env.PINTEREST_REDIRECT_URI || `${siteUrl()}/api/pinterest/callback`; }

export async function getToken() { return (await store().get(TOKEN_KEY, { type: "json" })) as PinterestToken | null; }
export async function saveToken(token: PinterestToken) { await store().setJSON(TOKEN_KEY, token); }

export async function refreshTokenIfNeeded(token: PinterestToken) {
  if (token.expires_at > Date.now() + 5 * 60_000) return token;
  if (!token.refresh_token) throw new Error("Pinterest access token expired and no refresh token is stored.");
  const clientId = process.env.PINTEREST_CLIENT_ID;
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Pinterest OAuth credentials are not configured.");
  const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: token.refresh_token });
  const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Pinterest token refresh failed.");
  const next: PinterestToken = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || token.refresh_token,
    expires_at: Date.now() + Number(data.expires_in || 2_592_000) * 1000,
    refresh_token_expires_at: data.refresh_token_expires_at ? Number(data.refresh_token_expires_at) * 1000 : token.refresh_token_expires_at,
    scope: data.scope || token.scope,
  };
  await saveToken(next);
  return next;
}

export async function pinterestFetch(path: string, init: RequestInit = {}) {
  const stored = await getToken();
  if (!stored) throw new Error("Pinterest is not connected. Connect Pinterest first.");
  const token = await refreshTokenIfNeeded(stored);
  return fetch(`https://api.pinterest.com/v5${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.access_token}`, ...(init.headers || {}) },
  });
}

export async function generatePinCopy(topic: string) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY is not configured.");
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-v4-flash",
      thinking: { type: "disabled" }, temperature: 0.8, response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write useful, non-spammy Pinterest content. Return ONLY JSON with title, description, keywords. Never invent facts. Title max 100 chars. Description max 500 chars. keywords is an array of 5-10 short phrases." },
        { role: "user", content: `Create one Pinterest pin for this topic: ${topic}. Brand: KRAWEXE, a free ATS resume scanner. Teach one practical job-search or resume lesson and naturally encourage readers to visit the site.` },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "DeepSeek request failed.");
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("DeepSeek returned no content.");
  const parsed = JSON.parse(raw);
  return { title: String(parsed.title || topic).slice(0, 100), description: String(parsed.description || topic).slice(0, 500), keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String).slice(0, 10) : [] };
}

export async function publishPin() {
  const boardId = process.env.PINTEREST_BOARD_ID;
  const imageUrl = process.env.PINTEREST_IMAGE_URL;
  if (!boardId) throw new Error("PINTEREST_BOARD_ID is not configured.");
  if (!imageUrl) throw new Error("PINTEREST_IMAGE_URL is not configured. Use a public PNG/JPEG URL.");
  const topics = (process.env.AUTOPILOT_TOPICS || "ATS resume tips,Resume keywords,Resume formatting,Job search tips,Interview preparation").split(",").map((x) => x.trim()).filter(Boolean);
  const topic = topics[Math.floor(Date.now() / 86_400_000) % topics.length];
  const copy = await generatePinCopy(topic);
  const hashtags = copy.keywords.map((k: string) => `#${k.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()}`).join(" ");
  const response = await pinterestFetch("/pins", {
    method: "POST",
    body: JSON.stringify({ board_id: boardId, title: copy.title, description: `${copy.description}${hashtags ? `\n\n${hashtags}` : ""}`.slice(0, 500), link: process.env.PINTEREST_LINK_URL || siteUrl(), media_source: { source_type: "image_url", url: imageUrl, is_standard: true } }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || JSON.stringify(data));
  await store().setJSON(`history/${Date.now()}`, { pin_id: data.id, title: copy.title, topic, created_at: new Date().toISOString() });
  return { ...copy, pinId: data.id, topic };
}
