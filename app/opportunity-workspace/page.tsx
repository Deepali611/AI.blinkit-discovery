"use client";

import PageHeader from "@/components/PageHeader";
import { opportunities } from "@/lib/data";

const STAGE_LANES = [
  {
    title: "Stage 01: Immediate Pilot",
    subtitle: "High confidence growth ideas prepared for quick code release.",
    keys: ["Category Trust Badge", "First-New-Category Return Guarantee"],
  },
  {
    title: "Stage 02: Strategic Refinement",
    subtitle: "Medium confidence signals requiring telemetry design validation.",
    keys: ["Transparent Real-Time Pricing"],
  },
  {
    title: "Stage 03: Backlog Pipeline",
    subtitle: "Low impact/effort ideas monitored for trend acceleration.",
    keys: ["Niche & Regional Stock Visibility"],
  },
];

export default function OpportunityWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunity Workspace"
        subtitle="Growth experiments mapped by execution ready stages. Prioritized by validation confidence and business reach."
      />

      {/* Kanban lanes layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {STAGE_LANES.map((lane) => {
          const laneItems = opportunities.filter((o) => lane.keys.includes(o.title));
          return (
            <div key={lane.title} className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-[22px] p-4.5 space-y-4 shadow-standard">
              {/* Lane Header */}
              <div>
                <h3 className="font-display font-bold text-[15px] text-[#171717] tracking-tight">
                  {lane.title}
                </h3>
                <p className="font-sans text-[11px] text-[#5F6368] mt-0.5 leading-relaxed">
                  {lane.subtitle}
                </p>
              </div>

              {/* Lane Cards */}
              <div className="space-y-3.5">
                {laneItems.map((o) => (
                  <div key={o.title} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-4.5 shadow-standard space-y-3.5">
                    <h4 className="font-display font-bold text-[14px] text-[#171717] leading-tight tracking-tight">
                      {o.title}
                    </h4>

                    {/* Metadata pill parameters */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-bold text-[#59624B] bg-[#F3F5F1] border border-[#59624B]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Impact: {o.impact}
                      </span>
                      <span className="text-[9px] font-bold text-[#171717] bg-[#FFF6DD] border border-[#F8CB46]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Conf: {o.confidence}
                      </span>
                      <span className="text-[9px] font-bold text-[#5F6368] bg-[#F2F1EC] border border-[#ECE8DE] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Effort: {o.effort}
                      </span>
                    </div>

                    {/* Card Content details */}
                    <div className="space-y-2.5 text-[11.5px] text-[#5F6368] leading-relaxed">
                      <p>
                        <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9px] uppercase tracking-wider">Problem:</strong>
                        {o.problem}
                      </p>
                      <p>
                        <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9px] uppercase tracking-wider">Evidence Share:</strong>
                        {o.evidence} <span className="text-[#8C8C8C]">({o.segment})</span>
                      </p>
                      <p>
                        <strong className="text-[#8C8C8C] font-bold block mb-0.5 text-[9px] uppercase tracking-wider">PM Implication:</strong>
                        {o.recommendation}
                      </p>
                      <p>
                        <strong className="text-[#59624B] font-bold block mb-0.5 text-[9px] uppercase tracking-wider">KPI Goal:</strong>
                        <span className="text-[#171717] font-semibold">{o.kpiImpact}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
