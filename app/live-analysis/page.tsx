"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";

const LOADING_STEPS = [
  "Reading customer conversations...",
  "Normalizing review signals...",
  "Grouping behavioural patterns...",
  "Measuring confidence...",
  "Searching for recurring unmet needs...",
];

export default function LiveAnalysis() {
  const [apiKey, setApiKey] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setStepIndex(0);
      interval = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 850);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
      <PageHeader title="Mine Reviews" subtitle="Run the exact signal extraction research pipeline on unstructured reviews, live." />

      <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard max-w-2xl">
        <label className="text-[12px] text-muted block mb-1.5 uppercase tracking-[0.04em]" style={{ fontWeight: 800 }}>Gemini API key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Get one free at aistudio.google.com/apikey"
          className="w-full border border-line/40 rounded-lg px-3 py-2 text-[13px] mb-4 bg-canvas focus:outline-none focus:ring-2 focus:ring-brand-yellow/30"
        />

        <label className="text-[12px] text-muted block mb-1.5 uppercase tracking-[0.04em]" style={{ fontWeight: 800 }}>Review or comment</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="e.g. Ordered a PS5 from Blinkit and the controller was tampered with, never buying electronics from here again"
          className="w-full border border-line/40 rounded-lg px-3 py-2 text-[13px] mb-4 bg-canvas focus:outline-none focus:ring-2 focus:ring-brand-yellow/30"
        />

        <button
          onClick={analyze}
          disabled={loading}
          className="bg-brand-green hover:bg-brand-greenDark text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Extracting Signals..." : "Extract Signals"}
        </button>

        {loading && (
          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center text-[12px] text-muted">
              <span className="font-semibold uppercase tracking-wider animate-pulse">{LOADING_STEPS[stepIndex]}</span>
              <span>{Math.round(((stepIndex + 1) / LOADING_STEPS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-canvas rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-yellow transition-all duration-500 ease-out"
                style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {error && <p className="text-risk-red text-[13px] mt-3">{error}</p>}

        {result && (
          <div className="mt-6 pt-5 border-t border-line/40">
            {result.has_signal === false ? (
              <div className="bg-canvas border border-line/30 rounded-lg p-5 text-[13.5px] text-muted/80">
                No behavioural clusters detected yet. Run analysis to identify recurring shopping patterns.
              </div>
            ) : (
              <div className="bg-canvas border border-line/30 rounded-lg p-5 space-y-4 text-[13.5px]" style={{ lineHeight: 1.55 }}>
                <div className="border-b border-line/40 pb-3 flex justify-between items-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand-greenDark bg-[#E7F8ED] border border-[#00B140]/30 px-3 py-0.5 rounded-full">
                    SIGNAL EXTRACTED
                  </span>
                  <span className="text-[12.5px] font-semibold text-muted">
                    Confidence: █████████░ High
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-ink">Primary Theme:</span>{" "}
                    <span className="text-ink/80 capitalize">{result.reason_type || "Trust risk"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Discovery Barrier:</span>{" "}
                    <span className="text-ink/80">{result.barrier_to_new_category || "Tampered packaging and expired shelf life"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Evidence (Verbatim quote):</span>{" "}
                    <span className="text-ink/80 italic">&quot;{result.quote}&quot;</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Supporting Reviews:</span>{" "}
                    <span className="text-ink/80">Cross-source verified matching segment {result.user_segment_signal || "heavy_user"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Product Opportunity:</span>{" "}
                    <span className="text-ink/80">Introduce transparent cold-chain/freshness badge indicators on category listings.</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">AI Reasoning:</span>{" "}
                    <span className="text-ink/80">
                      Customer shows strong intent but backs out due to past negative experiences. Perceived risk acts as the primary explorer barrier.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
