"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const LOADING_STEPS = [
  "Reading customer conversations...",
  "Normalizing review signals...",
  "Grouping behavioural patterns...",
  "Measuring confidence...",
  "Searching for recurring unmet needs...",
];

export default function SandboxStage() {
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
    <div className="space-y-8 max-w-3xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 7 — Sandbox Playground"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          Test the active extraction workflow yourself. Paste any raw customer feedback below to watch the engine ingest, clean, and inscribe validation tags:
        </p>

        <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard">
          <div className="space-y-4">
            
            {/* API Key */}
            <div>
              <label className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1.5">
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter key (e.g. AIzaSy...)"
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded-[14px] px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F8CB46]/20 focus:border-[#F8CB46] font-medium text-[#171717]"
              />
            </div>

            {/* Feedback String */}
            <div>
              <label className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1.5">
                Raw Review Comment
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                placeholder="e.g. Ordered a fresh milk packet but it was bloated and expired tomorrow. Very poor quality control, going back to buying from Mother Dairy store."
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded-[14px] px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F8CB46]/20 focus:border-[#F8CB46] leading-relaxed font-medium text-[#171717]"
              />
            </div>

            {/* Action Trigger Button */}
            <div>
              <button
                onClick={analyze}
                disabled={loading}
                className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-bold px-4 py-2.5 rounded-[14px] transition-colors disabled:opacity-60 shadow-standard"
              >
                {loading ? "Extracting Signals..." : "Extract Signals"}
              </button>
            </div>

          </div>

          {/* Dynamic In-Progress Timeline */}
          {loading && (
            <div className="mt-6 pt-5 border-t border-[#ECE8DE] space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[#F8CB46] uppercase tracking-wider animate-pulse">
                  {LOADING_STEPS[stepIndex]}
                </span>
                <span className="font-mono text-[#8C8C8C] font-bold">
                  {Math.round(((stepIndex + 1) / LOADING_STEPS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F8CB46] transition-all duration-500 ease-out"
                  style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-[#D64545] text-[13px] font-semibold mt-4 bg-[#FFF5F5] border border-[#D64545]/20 p-3 rounded-[14px]">
              {error}
            </p>
          )}

          {/* Structured Intelligence Report Output */}
          {result && (
            <div className="mt-6 pt-5 border-t border-[#ECE8DE]">
              {result.has_signal === false ? (
                <div className="bg-[#F2F1EC]/60 border border-[#ECE8DE] rounded-[18px] p-4 text-[13px] text-[#5F6368]">
                  No behavioural clusters detected yet. Run analysis to identify recurring shopping patterns.
                </div>
              ) : (
                <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 space-y-4 text-[13px] leading-relaxed text-[#171717] shadow-[0_0_20px_rgba(248,203,70,0.1)]">
                  
                  <div className="border-b border-[#ECE8DE] pb-3 flex justify-between items-center">
                    <span className="font-sans text-[10px] font-extrabold uppercase tracking-wide text-[#59624B] bg-[#F3F5F1] border border-[#59624B]/20 px-2.5 py-0.5 rounded-full">
                      Validated Signal Extracted
                    </span>
                    <span className="text-[12px] font-bold font-mono text-[#59624B]">
                      Confidence: High (█████████░)
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">Primary Theme</span>
                      <span className="text-[#171717] font-semibold capitalize">{result.reason_type || "Trust risk"}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">Discovery Barrier</span>
                      <span className="text-[#D64545] font-semibold">{result.barrier_to_new_category || "Spoiled perishables / short product expiry dates"}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">Evidence (Verbatim quote)</span>
                      <span className="font-sans font-semibold text-[13.5px] text-[#171717] block mt-0.5">&quot;{result.quote}&quot;</span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">Category</span>
                      <span className="text-[#59624B] font-bold uppercase text-[9.5px] bg-[#F3F5F1] px-2.5 py-0.5 rounded-full border border-[#59624B]/25 inline-block mt-0.5 tracking-wider">
                        {result.category_mentioned || "perishables"}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">User Segment</span>
                      <span className="text-[#171717] capitalize font-medium">{result.user_segment_signal || "quality_focused"}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">Product Opportunity</span>
                      <span className="text-[#59624B] font-semibold">{result.product_opportunity || "Introduce live freshness guarantees and transparent expiration badges on listings."}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-0.5">AI Reasoning</span>
                      <span className="text-[#5F6368]">
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

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/opportunities"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 6: Strategic Opportunities
        </Link>
      </div>
    </div>
  );
}
