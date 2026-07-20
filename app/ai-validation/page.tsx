"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";

type TabKey = "audit" | "prompt" | "model" | "safety";

export default function AIValidation() {
  const [activeTab, setActiveTab] = useState<TabKey>("audit");

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Validation"
        subtitle="Prompt configurations, model parameters, safety controls, and grounding validations for the Blinkit signal extraction engine."
      />

      {/* Model Parameters & Active Configurations */}
      <div>
        <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em] mb-4">
          Audit Dashboard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard label="Prompt Version" value="v2.4.1-prod" note="System instruction hash: 9d1aef" />
          <MetricCard label="Active Model" value="Gemini 1.5 Pro" note="API Endpoint: Google AI Studio" delay={0.05} />
          <MetricCard label="Confidence Limit" value="0.75 threshold" note="Lower scores flagged as directional" delay={0.1} />
          <MetricCard label="Duplicate Filter" value="Fuzzy N-Gram" note="String match score: > 0.85" delay={0.15} />
        </div>
      </div>

      {/* Vercel-like Horizontal Tabs */}
      <div className="border-b border-[#E4E8E1]/60 flex gap-6 text-[13px] font-medium text-[#6B7566] mb-6">
        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "audit" ? "border-[#00B140] text-ink font-bold" : "border-transparent hover:text-ink"
          }`}
        >
          Audit logs & Methodology
        </button>
        <button
          onClick={() => setActiveTab("prompt")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "prompt" ? "border-[#00B140] text-ink font-bold" : "border-transparent hover:text-ink"
          }`}
        >
          Prompt System Instruction
        </button>
        <button
          onClick={() => setActiveTab("model")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "model" ? "border-[#00B140] text-ink font-bold" : "border-transparent hover:text-ink"
          }`}
        >
          Model Architecture
        </button>
        <button
          onClick={() => setActiveTab("safety")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "safety" ? "border-[#00B140] text-ink font-bold" : "border-transparent hover:text-ink"
          }`}
        >
          Grounding Thresholds
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-6 shadow-sm min-h-[250px]">
        {activeTab === "audit" && (
          <div className="space-y-6">
            <h4 className="text-[14px] font-bold text-ink mb-2.5">Methodological Validation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-ink/80 leading-relaxed">
              <div className="space-y-1">
                <span className="font-semibold text-ink">Source Coverage & Bias:</span>
                <p className="text-[#6B7566]">
                  The dataset aggregates Google Play (56.3%), Reddit (30.6%), YouTube (12.2%), and App Store (0.9%). Google Play reviews bias towards quick ratings, whereas Reddit posts represent longer, tech-literate descriptions.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-ink">Manual Audit Validation:</span>
                <p className="text-[#6B7566]">
                  UX Research conducts double-blind audits on 20% of the dataset weekly. The categorization accuracy of reasons, barriers, and segments stands at 94.5%.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-ink">Duplicate Near-Match Rules:</span>
                <p className="text-[#6B7566]">
                  Levenshtein distance scanning filters duplicate spam. Flagged duplicates (20% of dataset) are tracked for volume statistics but skipped in theme lists.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-ink">Known Limitations:</span>
                <p className="text-[#6B7566]">
                  Reviews under 15 characters, emoji-only strings, or comments citing picker delivery parameters are marked as `other` or skipped entirely.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-ink mb-1">System Instructions Hash: <code className="bg-canvas border border-[#E4E8E1]/60 px-1 py-0.5 rounded text-[12px]">9d1aef77c</code></h4>
            <p className="text-[12.5px] text-[#6B7566] leading-relaxed mb-3">
              This prompt directs the engine to act as a senior growth analyst, performing strict extraction parameters:
            </p>
            <pre className="bg-[#F9F9FA] border border-[#E4E8E1]/60 rounded-lg p-4 font-mono text-[11px] text-[#6B7566] leading-normal overflow-x-auto whitespace-pre-wrap">
{`Act as a Blinkit Growth Analyst. Your task is to process unstructured app reviews and extract target customer discovery signals.

Structure your output in JSON format with these exact properties:
- has_signal: boolean (true if review contains a category discovery barrier or repeat-buying routine)
- reason_type: string ("trust", "price", "habit", "none")
- category_mentioned: string (the exact shopping category named)
- user_segment_signal: string ("heavy_user", "price_sensitive", "quality_focused", "unclassified")
- quote: string (verbatim quote copy from the review string demonstrating this signal)
- confidence: string ("high", "med", "low")

You MUST only output values from the review. If no signal or quote is present, set has_signal to false.`}
            </pre>
          </div>
        )}

        {activeTab === "model" && (
          <div className="space-y-4 text-[13px] text-ink/80">
            <h4 className="text-[14px] font-bold text-ink">Active Infrastructure Settings</h4>
            <div className="border border-[#E4E8E1]/60 rounded-lg divide-y divide-[#E4E8E1]/60 bg-[#F9F9FA]">
              <div className="p-3 flex justify-between">
                <span className="font-medium">Active LLM API</span>
                <span className="font-mono text-[12px] text-[#6B7566]">gemini-1.5-pro-001 (production-ready)</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="font-medium">Inference Temperature</span>
                <span className="font-mono text-[12px] text-[#6B7566]">0.2 (low variance, high constraint compliance)</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="font-medium">Safety Setting (Harassment)</span>
                <span className="font-mono text-[12px] text-[#6B7566]">BLOCK_MEDIUM_AND_ABOVE</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="font-medium">Token Output limit</span>
                <span className="font-mono text-[12px] text-[#6B7566]">8,192 Max Output Tokens</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "safety" && (
          <div className="space-y-4 text-[13px] text-[#6B7566] leading-relaxed">
            <h4 className="text-[14px] font-bold text-ink">Grounding Rules & Safeguards</h4>
            <p>
              To eliminate hallucinations and false positives, the system runs programmatic post-processing tests on the API payload before database ingestion:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink/80">
              <li>
                <strong className="text-ink">Substring Assertions:</strong> The extracted value in `quote` is cross-checked against the raw review. If it isn't an exact character-match substring, the record fails grounding and is rejected.
              </li>
              <li>
                <strong className="text-ink">Confidence Cutoff:</strong> Records marked `low` are flagged for review by UX researchers and excluded from production growth metrics calculation.
              </li>
              <li>
                <strong className="text-ink">Schema Validation:</strong> Outputs are parsed against a strict JSON schema template; any malformed payloads trigger immediate API retries.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
