import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(20),
  college: z.string().trim().min(1).max(200),
  state: z.string().trim().min(1).max(120),
  language: z.string().trim().min(1).max(60),
  message: z.string().trim().min(1).max(1000),
  year: z.string().trim().max(4).optional().default(""),
  source: z.string().trim().max(80).optional().default("talk-to-senior"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const timestamp = new Date().toISOString();
    // Log lead event without PII; details go to the Sheets webhook only.
    console.log("[lead:new]", JSON.stringify({ timestamp, source: data.source, college: data.college, state: data.state }));


    if (sheetsUrl) {
      try {
        const res = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ timestamp, ...data }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error("[lead:sheets-failed]", res.status, body);
          return { ok: true, delivered: false };
        }
        return { ok: true, delivered: true };
      } catch (err) {
        console.error("[lead:sheets-error]", err);
        return { ok: true, delivered: false };
      }
    }

    return { ok: true, delivered: false };
  });
