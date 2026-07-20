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
            <div key={lane.title} className="bg-[#F5F2EC]/40 border border-[#E8E5DF] rounded-xl p-4 space-y-4">
              {/* Lane Header */}
              <div>
                <h3 className="font-serif font-bold text-[15px] text-[#1E221F]">
                  {lane.title}
                </h3>
                <p className="text-[11.5px] text-[#6B7566] mt-0.5 leading-relaxed">
                  {lane.subtitle}
                </p>
              </div>

              {/* Lane Cards */}
              <div className="space-y-3">
                {laneItems.map((o) => (
                  <div key={o.title} className="bg-surface border border-[#E8E5DF] rounded-lg p-4 shadow-sm space-y-3">
                    <h4 className="font-serif font-bold text-[14.5px] text-[#1E221F] leading-tight">
                      {o.title}
                    </h4>

                    {/* Metadata pill parameters */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9.5px] font-bold text-[#028A34] bg-[#E7F8ED] border border-[#00B140]/15 px-2 py-0.5 rounded uppercase">
                        Impact: {o.impact}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#8A6A0F] bg-[#FFF6DD] border border-[#F8CB46]/15 px-2 py-0.5 rounded uppercase">
                        Conf: {o.confidence}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#6B7566] bg-[#FAF8F5] border border-[#E8E5DF] px-2 py-0.5 rounded uppercase">
                        Effort: {o.effort}
                      </span>
                    </div>

                    {/* Card Content details */}
                    <div className="space-y-2 text-[11.5px] text-[#1E221F]/85 leading-relaxed">
                      <p>
                        <strong className="text-[#6B7566] font-bold block mb-0.5">Problem:</strong>
                        {o.problem}
                      </p>
                      <p>
                        <strong className="text-[#6B7566] font-bold block mb-0.5">Evidence Share:</strong>
                        {o.evidence} <span className="text-[#6B7566]/70">({o.segment})</span>
                      </p>
                      <p>
                        <strong className="text-[#6B7566] font-bold block mb-0.5">PM Implication:</strong>
                        {o.recommendation}
                      </p>
                      <p>
                        <strong className="text-[#028A34] font-bold block mb-0.5">KPI Goal:</strong>
                        {o.kpiImpact}
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
