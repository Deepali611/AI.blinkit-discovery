import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowRightLeft } from "lucide-react";

export default function ExtractionStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 2 — Filtering & Extraction"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          Raw text contains too much noise (spelling variations, delivery complaints). The engine runs a filtration gate to discard off-topic reviews, then extracts highly structured attributes from target signals:
        </p>

        {/* Before/After Transformation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Panel: Raw Review (Before) */}
          <div className="md:col-span-5 bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-3 min-h-[220px]">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Before: Raw Customer Feedback</span>
            <blockquote className="font-sans text-[13.5px] text-[#5F6368] leading-relaxed italic bg-[#F2F1EC]/60 p-4 rounded-[14px] border border-[#ECE8DE]">
              &quot;Ordered a fresh milk packet but it was bloated and expired tomorrow. Very poor quality control, going back to buying from Mother Dairy store.&quot;
            </blockquote>
            <p className="text-[11.5px] text-[#8C8C8C]">
              Feedback is messy and contains redundant complaints.
            </p>
          </div>

          {/* Center Connector */}
          <div className="md:col-span-2 flex justify-center text-[#59624B]">
            <ArrowRightLeft size={24} className="rotate-90 md:rotate-0" strokeWidth={1.5} />
          </div>

          {/* Right Panel: Structured JSON (After) */}
          <div className="md:col-span-5 bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-3 min-h-[220px]">
            <span className="font-sans text-[9px] font-bold text-[#59624B] uppercase tracking-wider block">After: Structured Inscription</span>
            
            <pre className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-[14px] p-4 text-[11px] font-mono text-[#5F6368] leading-normal overflow-x-auto">
{`{
  "has_signal": true,
  "reason_type": "trust",
  "category": "perishables",
  "segment": "quality_focused",
  "quote": "expired tomorrow",
  "confidence": "high"
}`}
            </pre>
            <p className="text-[11.5px] text-[#59624B] font-semibold">
              ✓ Grounded character-match validated.
            </p>
          </div>

        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/evidence"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 1: Gathering Evidence
        </Link>
        <Link
          href="/validation"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Validation & Safety <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
