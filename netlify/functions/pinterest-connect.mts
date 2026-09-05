import { getStore } from "@netlify/blobs";
import { redirectUri, siteUrl } from "./pinterest-lib.mts";

export default async () => {
  const clientId = process.env.PINTEREST_CLIENT_ID;
  if (!clientId) return new Response("PINTEREST_CLIENT_ID is not configured.", { status: 500 });

  const state = crypto.randomUUID();
  const store = getStore("pinterest-autopilot");
  await store.setJSON(`oauth-state/${state}`, { created_at: Date.now() });

  const url = new URL("https://www.pinterest.com/oauth/");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "boards:read boards:write pins:read pins:write");
  url.searchParams.set("state", state);

  return Response.redirect(url.toString(), 302);
};

export const config = { path: "/api/pinterest/connect" };
