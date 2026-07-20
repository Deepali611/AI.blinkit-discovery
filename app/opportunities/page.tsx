import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { opportunities } from "@/lib/data";

export default function OpportunitiesStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 6 — Strategic Growth Opportunities"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          Based on the resolved customer friction barriers, we prioritize the following strategic experiments to drive cross-category customer exploration:
        </p>

        {/* Opportunities List */}
        <div className="space-y-6">
          {opportunities.map((opp) => (
            <div key={opp.title} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-[14px] bg-[#F2F1EC] flex items-center justify-center text-[#59624B]">
                  <Lightbulb size={15} strokeWidth={1.5} />
                </span>
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider">
                  Growth Experiment Proposal
                </span>
              </div>

              <h4 className="font-display font-bold text-[16px] text-[#171717] tracking-tight leading-snug">
                {opp.title}
              </h4>

              <div className="space-y-3 text-[12.5px] text-[#5F6368] leading-relaxed">
                <p>
                  <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9.5px] uppercase tracking-wider">Core Problem Addressed:</strong>
                  {opp.problem}
                </p>
                <p>
                  <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9.5px] uppercase tracking-wider">Evidence Target Segment:</strong>
                  {opp.evidence} ({opp.segment})
                </p>
                <p>
                  <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9.5px] uppercase tracking-wider">Implication:</strong>
                  {opp.recommendation}
                </p>
                <div className="bg-[#F3F5F1] border border-[#ECE8DE] p-4 rounded-[14px]">
                  <strong className="text-[#59624B] font-bold block mb-0.5 text-[9.5px] uppercase tracking-wider">KPI Target:</strong>
                  <span className="text-[#171717] font-semibold">{opp.kpiImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/insights"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 5: Discovery Synthesis
        </Link>
        <Link
          href="/sandbox"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Sandbox Playground <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
