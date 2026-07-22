import { NextRequest, NextResponse } from "next/server";

const PROMPT_TEMPLATE = (review: string) => `You will be given a single user review about a quick-commerce grocery delivery app (Blinkit/Zepto/Instamart).

GOAL: Understand why users repeat-buy the same categories and what stops them from exploring new categories.

STEP 1 — FILTER: Decide if the review has real behavioral signal about shopping habits, category choices, discovery, trust, or barriers to trying something new. Generic praise/complaints with no behavioral detail have no real signal.

STEP 2 — If it has real signal, extract and return ONLY this JSON, nothing else, no markdown fences:
{
  "has_signal": true or false,
  "repeat_buying_signal": "yes" or "no",
  "category_mentioned": "specific category or none",
  "barrier_to_new_category": "specific barrier or none",
  "reason_type": "one of: habit, trust, convenience, price, no_discovery, other",
  "info_needed_to_trust_new_category": "specific info/reassurance that would help, or not stated",
  "user_segment_signal": "one of: heavy_user, price_sensitive, quality_focused, one_time_complainer, light_new_user, senior_citizen, unclear",
  "quote": "exact short quote under 15 words from the review, or none",
  "confidence": "high, medium, or low"
}

If has_signal is false, still return the JSON with has_signal: false and other fields as "none".

Review: ${review}`;

export async function GET() {
  const hasServerKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "");
  return NextResponse.json({ hasServerKey });
}

export async function POST(req: NextRequest) {
  try {
    const { apiKey: clientKey, review } = await req.json();
    const apiKey = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "")
      ? process.env.GEMINI_API_KEY.trim()
      : (clientKey ? clientKey.trim() : "");

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key. Please provide a Gemini API key or set GEMINI_API_KEY in environment variables." }, { status: 400 });
    }
    if (!review || !review.trim()) {
      return NextResponse.json({ error: "Missing review text" }, { status: 400 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: PROMPT_TEMPLATE(review) }] }] }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: `Gemini API error: ${errText}` }, { status: resp.status });
    }

    const data = await resp.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    text = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
