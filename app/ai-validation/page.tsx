"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

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
      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard mb-8">
        <h3 className="font-display font-bold text-[15px] text-[#171717] mb-4">
          Pipeline Audit Configuration Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[12.5px] leading-relaxed">
          <div className="space-y-1">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block tracking-wider">Prompt version:</span>
            <p className="font-semibold text-[#171717]">v2.4.1-prod <span className="text-[#8C8C8C] font-normal">(hash: 9d1aef)</span></p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block tracking-wider">Active Pipeline LLM:</span>
            <p className="font-semibold text-[#171717]">Gemini 1.5 Pro <span className="text-[#8C8C8C] font-normal">(AI Studio API)</span></p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block tracking-wider">Confidence Limit:</span>
            <p className="font-semibold text-[#171717]">0.75 threshold <span className="text-[#8C8C8C] font-normal">(low scores flagged)</span></p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block tracking-wider">Deduplication Rule:</span>
            <p className="font-semibold text-[#171717]">Fuzzy N-Gram <span className="text-[#8C8C8C] font-normal">(match score &gt; 0.85)</span></p>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-[#ECE8DE] flex gap-6 text-[13px] font-medium text-[#5F6368] mb-6">
        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "audit" ? "border-[#F8CB46] text-[#171717] font-bold" : "border-transparent hover:text-[#171717]"
          }`}
        >
          Audit logs & Methodology
        </button>
        <button
          onClick={() => setActiveTab("prompt")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "prompt" ? "border-[#F8CB46] text-[#171717] font-bold" : "border-transparent hover:text-[#171717]"
          }`}
        >
          Prompt System Instruction
        </button>
        <button
          onClick={() => setActiveTab("model")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "model" ? "border-[#F8CB46] text-[#171717] font-bold" : "border-transparent hover:text-[#171717]"
          }`}
        >
          Model Architecture
        </button>
        <button
          onClick={() => setActiveTab("safety")}
          className={`pb-3 border-b-2 -mb-[2px] transition-colors ${
            activeTab === "safety" ? "border-[#F8CB46] text-[#171717] font-bold" : "border-transparent hover:text-[#171717]"
          }`}
        >
          Grounding Thresholds
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-surface border border-[#ECE8DE] rounded-[22px] p-6 shadow-standard min-h-[250px]">
        {activeTab === "audit" && (
          <div className="space-y-6">
            <h4 className="font-display font-bold text-[18px] text-[#171717] mb-3">Methodological Validation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-[#5F6368] leading-relaxed">
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase block">Source Coverage & Bias:</span>
                <p className="text-[#5F6368]">
                  The dataset aggregates Google Play (56.3%), Reddit (30.6%), YouTube (12.2%), and App Store (0.9%). Google Play reviews bias towards quick ratings, whereas Reddit posts represent longer, tech-literate descriptions.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase block">Manual Audit Validation:</span>
                <p className="text-[#5F6368]">
                  UX Research conducts double-blind audits on 20% of the dataset weekly. The categorization accuracy of reasons, barriers, and segments stands at 94.5%.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase block">Duplicate Near-Match Rules:</span>
                <p className="text-[#5F6368]">
                  Levenshtein distance scanning filters duplicate spam. Flagged duplicates (20% of dataset) are tracked for volume statistics but skipped in theme lists.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase block">Known Limitations:</span>
                <p className="text-[#5F6368]">
                  Reviews under 15 characters, emoji-only strings, or comments citing picker delivery parameters are marked as `other` or skipped entirely.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div className="space-y-4">
            <h4 className="font-display font-bold text-[17px] text-[#171717] mb-1">
              System Instructions Hash: <code className="bg-[#F2F1EC] border border-[#ECE8DE] px-2.5 py-0.5 rounded-[14px] text-[11px] font-mono text-[#5F6368]">9d1aef77c</code>
            </h4>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed mb-3">
              This prompt directs the engine to act as a senior growth analyst, performing strict extraction parameters:
            </p>
            <pre className="bg-[#F2F1EC]/60 border border-[#ECE8DE] rounded-[18px] p-4 font-mono text-[11px] text-[#5F6368] leading-normal overflow-x-auto whitespace-pre-wrap">
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
          <div className="space-y-4 text-[13px] text-[#5F6368] leading-relaxed">
            <h4 className="font-display font-bold text-[18px] text-[#171717]">Active Infrastructure Settings</h4>
            <div className="border border-[#ECE8DE] rounded-[18px] overflow-hidden divide-y divide-[#ECE8DE] bg-[#F2F1EC]/40">
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[#171717]">Active LLM API</span>
                <span className="font-mono text-[12px] text-[#5F6368]">gemini-1.5-pro-001 (production-ready)</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[#171717]">Inference Temperature</span>
                <span className="font-mono text-[12px] text-[#5F6368]">0.2 (low variance, high constraint compliance)</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[#171717]">Safety Setting (Harassment)</span>
                <span className="font-mono text-[12px] text-[#5F6368]">BLOCK_MEDIUM_AND_ABOVE</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[#171717]">Token Output limit</span>
                <span className="font-mono text-[12px] text-[#5F6368]">8,192 Max Output Tokens</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "safety" && (
          <div className="space-y-4 text-[13px] text-[#5F6368] leading-relaxed">
            <h4 className="font-display font-bold text-[18px] text-[#171717]">Grounding Rules & Safeguards</h4>
            <p>
              To eliminate hallucinations and false positives, the system runs programmatic post-processing tests on the API payload before database ingestion:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#5F6368]/90">
              <li>
                <strong className="text-[#171717]">Substring Assertions:</strong> The extracted value in `quote` is cross-checked against the raw review. If it isn't an exact character-match substring, the record fails grounding and is rejected.
              </li>
              <li>
                <strong className="text-[#171717]">Confidence Cutoff:</strong> Records marked `low` are flagged for review by UX researchers and excluded from production growth metrics calculation.
              </li>
              <li>
                <strong className="text-[#171717]">Schema Validation:</strong> Outputs are parsed against a strict JSON schema template; any malformed payloads trigger immediate API retries.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
