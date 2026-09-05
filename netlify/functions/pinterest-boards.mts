import { pinterestFetch } from "./pinterest-lib.mts";

export default async () => {
  try {
    const response = await pinterestFetch("/boards?page_size=100");
    const data = await response.json();
    if (!response.ok) return Response.json({ error: data.message || "Unable to load boards." }, { status: response.status });
    return Response.json({ items: data.items || [] });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load boards." }, { status: 400 });
  }
};

export const config = { path: "/api/pinterest/boards" };
