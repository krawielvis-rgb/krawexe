import { schedule } from "@netlify/functions";
import { publishPin } from "./pinterest-lib";

export const handler = schedule(process.env.AUTOPILOT_SCHEDULE || "0 9 * * *", async () => {
  try {
    const result = await publishPin();
    console.log("Pinterest autopilot published:", JSON.stringify(result));
  } catch (error) {
    console.error("Pinterest autopilot failed:", error);
    throw error;
  }
});
