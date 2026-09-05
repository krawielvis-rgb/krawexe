import { schedule } from "@netlify/functions";
import { publishPin } from "./pinterest-lib.mts";

// Netlify statically reads this literal string at deploy time to register the
// schedule — it cannot evaluate an expression like `process.env.X || "..."` here.
// To change the schedule, edit this literal directly and redeploy.
export const handler = schedule("0 9 * * *", async () => {
  try {
    const result = await publishPin();
    console.log("Pinterest autopilot published:", JSON.stringify(result));
  } catch (error) {
    console.error("Pinterest autopilot failed:", error);
    throw error;
  }
});
