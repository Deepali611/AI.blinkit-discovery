"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { REASON_COLORS } from "@/lib/data";

export default function LiveAnalysis() {
  const [apiKey, setApiKey] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function analyze() {
    setError("");
    setResult(null);
    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key.");
      return;
    }
    if (!reviewText.trim()) {
      setError("Please paste a review to analyze.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, review: reviewText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Live Analysis" subtitle="Run the exact extraction pipeline used on all 1,176 reviews, live." />

      <div className="bg-surface border border-line rounded-2xl p-6 shadow-card max-w-2xl">
        <label className="text-[12px] font-semibold text-muted block mb-1">Gemini API key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Get one free at aistudio.google.com/apikey"
          className="w-full border border-line rounded-xl px-3 py-2 text-[13px] mb-4 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
        />

        <label className="text-[12px] font-semibold text-muted block mb-1">Review or comment</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="e.g. Ordered a PS5 from Blinkit and the controller was tampered with, never buying electronics from here again"
          className="w-full border border-line rounded-xl px-3 py-2 text-[13px] mb-4 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
        />

        <button
          onClick={analyze}
          disabled={loading}
          className="bg-brand-green hover:bg-brand-greenDark text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze review"}
        </button>

        {error && <p className="text-risk-red text-[13px] mt-3">{error}</p>}

        {result && (
          <div className="mt-5 pt-4 border-t border-line">
            {result.has_signal === false ? (
              <p className="text-[13px] text-muted">
                No real behavioral signal detected — filtered out by design.
              </p>
            ) : (
              <div
                className="bg-canvas rounded-xl px-4 py-3 text-[13px]"
                style={{ borderLeft: `3px solid ${REASON_COLORS[result.reason_type] || "#6B7566"}` }}
              >
                <b>{result.reason_type}</b> · {result.category_mentioned} · {result.user_segment_signal} ·
                confidence: {result.confidence}
                <div className="italic mt-1">&quot;{result.quote}&quot;</div>
              </div>
            )}
            <details className="mt-3">
              <summary className="text-[12px] text-muted cursor-pointer">Raw JSON output</summary>
              <pre className="text-[11px] bg-canvas rounded-lg p-3 mt-2 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
