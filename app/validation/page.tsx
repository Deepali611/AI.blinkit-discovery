import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";

export default function ValidationStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
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
              <Shield size={16} className="text-[#59624B]" /> Ingestion Safety Filters
            </h3>
            
            <div className="space-y-4 text-[12.5px] text-[#5F6368] leading-relaxed">
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">Substring Assertions:</span>
                <p>
                  The engine scans the raw review string to confirm the extracted `quote` exists as an exact character-match substring. If it does not, the record is immediately rejected.
                </p>
              </div>
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">Confidence Safeguard:</span>
                <p>
                  Any reviews marked with low confidence scores are filtered from calculations and routed to a manual audit review queue.
                </p>
              </div>
              <div>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase block mb-0.5">Low Temperature Constraint:</span>
                <p>
                  Active inference temperature is locked at <span className="font-mono font-bold text-[#171717]">0.2</span> to reduce variance and enforce strict JSON schema compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Hallucinations & Limits Narrative Panel */}
          <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-4">
            <h3 className="font-display font-bold text-[15.5px] text-[#171717]">
              Addressing AI Hallucinations
            </h3>
            <div className="text-[13px] text-[#5F6368] space-y-4 leading-relaxed">
              <p>
                <strong className="text-[#171717]">Risk:</strong> Customer feedback often contains regional dialects or sarcasm. Off-the-shelf LLMs frequently mischaracterize delivery delays as product quality issues.
              </p>
              <p>
                <strong className="text-[#171717]">Mitigation:</strong> Our prompt enforces classification rules that isolate courier and picker tags from structural catalog gaps. Double-blind human audits verify 20% of processed records weekly to guarantee 94.5% precision.
              </p>
              <div className="border-l-2 border-[#D64545] pl-4 py-1.5 bg-[#FFF5F5] rounded-r-lg">
                <span className="text-[12px] font-semibold text-[#D64545]">Limitation: Reviews shorter than 15 characters are skipped to prevent rating bias.</span>
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
