import { getToken } from "./pinterest-lib";

export default async () => {
  const token = await getToken();
  const required = ["PINTEREST_CLIENT_ID", "PINTEREST_CLIENT_SECRET", "PINTEREST_BOARD_ID", "PINTEREST_IMAGE_URL", "DEEPSEEK_API_KEY"];
  const missing = required.filter((key) => !process.env[key]);
  return Response.json({
    configured: missing.length === 0,
    connected: Boolean(token),
    missing,
    schedule: process.env.AUTOPILOT_SCHEDULE || "@daily",
    topics: (process.env.AUTOPILOT_TOPICS || "ATS resume tips,Resume keywords,Resume formatting,Job search tips,Interview preparation").split(",").map((x) => x.trim()).filter(Boolean),
  });
};

export const config = { path: "/api/pinterest/status" };
