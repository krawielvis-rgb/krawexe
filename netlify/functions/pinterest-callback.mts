import { getStore } from "@netlify/blobs";
import { redirectUri, saveToken, siteUrl } from "./pinterest-lib.mts";

export default async (req: Request) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  if (error) return Response.redirect(`${siteUrl()}/autopilot?error=${encodeURIComponent(error)}`, 302);
  if (!code || !state) return new Response("Missing Pinterest OAuth code/state.", { status: 400 });

  const clientId = process.env.PINTEREST_CLIENT_ID;
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET;
  if (!clientId || !clientSecret) return new Response("Pinterest OAuth credentials are not configured.", { status: 500 });

  const stateStore = getStore("pinterest-autopilot");
  const stateData = await stateStore.get(`oauth-state/${state}`, { type: "json" });
  if (!stateData || Date.now() - Number(stateData.created_at) > 10 * 60_000) {
    return new Response("Invalid or expired OAuth state.", { status: 400 });
  }
  await stateStore.delete(`oauth-state/${state}`);

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
  });
  const tokenResponse = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await tokenResponse.json();
  if (!tokenResponse.ok) return new Response(data.message || "Pinterest token exchange failed.", { status: 502 });

  await saveToken({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + Number(data.expires_in || 2_592_000) * 1000,
    refresh_token_expires_at: data.refresh_token_expires_at ? Number(data.refresh_token_expires_at) * 1000 : undefined,
    scope: data.scope,
  });

  return Response.redirect(`${siteUrl()}/autopilot?connected=1`, 302);
};

export const config = { path: "/api/pinterest/callback" };
