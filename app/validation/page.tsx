import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";

export default function ValidationStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Discovery Engine"
        subtitle="Stage 3 — Validation & Safety Controls"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          To build an engine Blinkit leadership can trust, we implement a strict programmatic gate on LLM responses to eliminate hallucination risks:
        </p>

        {/* Validation Steps and Discussion Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Safeguard parameters panel */}
          <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-4">
            <h3 className="font-display font-bold text-[15.5px] text-[#171717] flex items-center gap-2">
              <Shield size={16} className="text-[#59624B]" /> Programmatic Ingestion Safeguards
            </h3>
            
            <div className="space-y-4 text-[12.5px] text-[#5F6368] leading-relaxed">
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">Exact Substring Validation:</span>
                <p>
                  The pipeline scans every record to verify that the extracted `quote` exists word-for-word in the raw review text string. If a mismatch is detected, the review is discarded.
                </p>
              </div>
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">In-Dataset Duplicate Filtering:</span>
                <p>
                  Our pipeline tags spam and viral copy-paste reviews. Out of all parsed signal records, 20.1% of rows are marked as duplicates and isolated from core metrics.
                </p>
              </div>
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">Manual Spot-Checking:</span>
                <p>
                  A segment of parsed feedback outputs is manually cross-referenced against original reviewer screenshots to confirm category alignment.
                </p>
              </div>
            </div>
          </div>

          {/* Hallucinations & Limits Narrative Panel */}
          <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-4">
            <h3 className="font-display font-bold text-[15.5px] text-[#171717]">
              Addressing AI Classification Errors
            </h3>
            <div className="text-[13px] text-[#5F6368] space-y-4 leading-relaxed">
              <p>
                <strong className="text-[#171717]">Risk:</strong> Customer feedback often contains regional idioms or sarcasm. LLMs can mischaracterize delivery issues as quality concerns.
              </p>
              <p>
                <strong className="text-[#171717]">Mitigation:</strong> Programmatic schema checks require strict categorization codes that isolate delivery agent errors from root catalog selection gaps. Low-confidence responses are logged and audited manually.
              </p>
              <div className="border-l-2 border-[#D64545] pl-4 py-1.5 bg-[#FFF5F5] rounded-r-lg space-y-2">
                <span className="text-[12px] font-semibold text-[#D64545] block">Limitation: Non-English feedback and emoji-only comments are filtered out due to schema mapping limitations.</span>
                <span className="text-[12.5px] text-[#5F6368] block">Source selection bias: Reddit and app-store reviews skew toward customers with negative experiences; satisfied customers are underrepresented in this dataset by nature of who leaves reviews.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/extraction"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 2: Filtering & Extraction
        </Link>
        <Link
          href="/themes"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Themes & Signals <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
