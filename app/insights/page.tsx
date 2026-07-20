import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { growthQuestions } from "@/lib/data";

export default function InsightsStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 5 — Synthesis of Customer Discovery"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          By compiling the validated customer feedback loops, we have resolved the 8 primary cross-category customer discovery questions:
        </p>

        {/* 8 Questions Resolved Flow */}
        <div className="space-y-6">
          {growthQuestions.map((q, idx) => (
            <div key={idx} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-[#8C8C8C] bg-[#F2F1EC] px-2.5 py-0.5 rounded-full border border-[#ECE8DE]">
                  Resolution Prompt 0{idx + 1}
                </span>
                <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider">
                  Confidence: {q.confidence}
                </span>
              </div>
              
              <h4 className="font-display font-bold text-[15px] text-[#171717] leading-snug tracking-tight">
                {q.q}
              </h4>
              
              <div className="text-[13px] text-[#5F6368] leading-relaxed bg-[#F2F1EC]/60 border-l-[3px] border-l-[#F8CB46] p-4 rounded-r-lg">
                {q.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/themes"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 4: Themes & Signals
        </Link>
        <Link
          href="/opportunities"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Strategic Opportunities <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
