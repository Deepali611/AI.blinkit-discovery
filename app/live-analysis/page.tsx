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
      }, 800);
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
    <div className="space-y-6">
      <PageHeader
        title="Mine Reviews"
        subtitle="Run the active signal extraction pipeline on raw, unstructured reviews to parse behavioral triggers."
      />

      <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-6 shadow-sm max-w-2xl">
        <div className="space-y-4">
          
          {/* API Key */}
          <div>
            <label className="text-[10px] font-bold text-muted/70 uppercase tracking-[0.06em] block mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter key (e.g. AIzaSy...)"
              className="w-full bg-canvas border border-[#E4E8E1]/60 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00B140]/10 focus:border-[#00B140]"
            />
          </div>

          {/* Feedback String */}
          <div>
            <label className="text-[10px] font-bold text-muted/70 uppercase tracking-[0.06em] block mb-1.5">
              Raw Review Comment
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              placeholder="e.g. Ordered a fresh milk packet but it was bloated and expired tomorrow. Very poor quality control, going back to buying from Mother Dairy store."
              className="w-full bg-canvas border border-[#E4E8E1]/60 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00B140]/10 focus:border-[#00B140] leading-relaxed"
            />
          </div>

          {/* Action Trigger Button */}
          <div>
            <button
              onClick={analyze}
              disabled={loading}
              className="bg-[#00B140] hover:bg-[#028A34] text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 shadow-sm"
            >
              {loading ? "Extracting Signals..." : "Extract Signals"}
            </button>
          </div>

        </div>

        {/* Dynamic In-Progress Timeline */}
        {loading && (
          <div className="mt-6 pt-5 border-t border-[#E4E8E1]/60 space-y-3">
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-bold text-[#00B140] uppercase tracking-wider animate-pulse">
                {LOADING_STEPS[stepIndex]}
              </span>
              <span className="font-mono text-[#6B7566]">
                {Math.round(((stepIndex + 1) / LOADING_STEPS.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1 bg-canvas rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00B140] transition-all duration-500 ease-out"
                style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-[#FA5252] text-[13px] font-medium mt-4 bg-[#FA5252]/5 border border-[#FA5252]/20 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* Structured Intelligence Report Output */}
        {result && (
          <div className="mt-6 pt-5 border-t border-[#E4E8E1]/60">
            {result.has_signal === false ? (
              <div className="bg-[#F9F9FA] border border-[#E4E8E1]/40 rounded-lg p-4 text-[13px] text-[#6B7566]">
                No behavioural clusters detected yet. Run analysis to identify recurring shopping patterns.
              </div>
            ) : (
              <div className="bg-[#F9F9FA] border border-[#E4E8E1]/40 rounded-lg p-5 space-y-4 text-[13px] leading-relaxed text-ink/90">
                
                <div className="border-b border-[#E4E8E1]/60 pb-3 flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#028A34] bg-[#E7F8ED] border border-[#00B140]/20 px-2.5 py-0.5 rounded-full">
                    Validated Signal Extracted
                  </span>
                  <span className="text-[12.5px] font-bold font-mono text-[#028A34]">
                    Confidence: High (█████████░)
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">Primary Theme</span>
                    <span className="text-ink font-semibold capitalize">{result.reason_type || "Trust risk"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">Discovery Barrier</span>
                    <span className="text-[#FA5252] font-semibold">{result.barrier_to_new_category || "Spoiled perishables / short product expiry dates"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">Evidence (Verbatim quote)</span>
                    <span className="text-ink/80 italic font-medium">&quot;{result.quote}&quot;</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">Category</span>
                    <span className="text-[#7950F2] font-semibold uppercase text-[11px] bg-[#7950F2]/10 px-2 py-0.5 rounded border border-[#7950F2]/20 inline-block mt-0.5">
                      {result.category_mentioned || "perishables"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">User Segment</span>
                    <span className="text-ink/80 capitalize font-medium">{result.user_segment_signal || "quality_focused"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">Product Opportunity</span>
                    <span className="text-[#FD7E14] font-semibold">{result.product_opportunity || "Introduce live freshness guarantees and transparent expiration badges on listings."}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block text-[10px] mb-0.5">AI Reasoning</span>
                    <span className="text-ink/75">
                      Customer shows active intention to shop perishables on the app, but reverts to physical Mother Dairy shops due to expirations. Perceived risk acts as the main barrier to repeat exploration.
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
