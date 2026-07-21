import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProblemStage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <PageHeader
        title="Blinkit Discovery Engine"
        subtitle="Stage 0 — The Discovery Problem"
      />

      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-8 shadow-standard space-y-6">
        <h3 className="font-display font-extrabold text-[22px] text-[#171717] tracking-tight leading-snug">
          Why don't loyal Blinkit customers buy outside their usual categories?
        </h3>
        
        <div className="font-sans text-[15px] leading-relaxed text-[#5F6368] space-y-5">
          <p>
            Blinkit customers order groceries and daily essentials weekly — but rarely branch into adjacent categories like electronics, personal care, or specialty foods, even when those categories are available on the same app. This caps customer lifetime value and limits cross-category growth. Before proposing a fix, this engine analyzes real customer feedback to find the actual reason — not an assumed one.
          </p>
        </div>

        {/* Takeaway Box */}
        <div className="border-l-2 border-[#59624B] pl-4 py-2 bg-[#F3F5F1] rounded-r-lg">
          <p className="text-[13px] text-[#59624B] font-semibold leading-normal">
            Before building a recommendation feed, we need to know: is this a discovery problem, a trust problem, or a price problem? Guessing wrong wastes a quarter of roadmap.
          </p>
        </div>
      </div>

      {/* North Star Metric Component */}
      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-5">
        <h3 className="font-display font-bold text-[16px] text-[#171717]">
          The Metric This Engine Serves
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* True North Star */}
          <div className="space-y-2.5">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">True North Star (Blinkit's Stated Goal)</span>
            <h4 className="font-display font-bold text-[14.5px] text-[#171717] leading-tight">
              % of Monthly Active Customers purchasing from ≥1 new category per month
            </h4>
            <div className="bg-[#F2F1EC] p-3 rounded-[14px] text-[11.5px] font-mono text-[#5F6368] space-y-1">
              <div>Formula:</div>
              <div className="text-[#171717] font-semibold">
                (MAU with ≥1 new-category order this month ÷ Total MAU this month) × 100
              </div>
            </div>
            <p className="text-[12px] text-[#8C8C8C] italic">
              Note: This requires Blinkit's internal transaction data — not observable from public reviews. This engine cannot measure it directly.
            </p>
          </div>

          {/* Proxy Metric */}
          <div className="space-y-2.5">
            <span className="font-sans text-[9px] font-bold text-[#59624B] uppercase tracking-wider block">Proxy Metric (What This Engine Measures)</span>
            <h4 className="font-display font-bold text-[14.5px] text-[#171717] leading-tight">
              Discovery Barrier Index — % of analyzed customer signal citing trust or price risk as a reason for category avoidance
            </h4>
            <div className="bg-[#F3F5F1] border border-[#59624B]/15 p-3 rounded-[14px] text-[11.5px] font-mono text-[#5F6368] space-y-1">
              <div className="flex justify-between">
                <span>Formula:</span>
                <span className="text-[#59624B] font-bold">76.7% Score</span>
              </div>
              <div className="text-[#171717] font-semibold">
                (trust signals + price signals) ÷ total tagged signals × 100
              </div>
            </div>
            <p className="text-[12px] text-[#5F6368]">
              <strong>Rationale:</strong> This is a leading indicator. Hypothesis: reducing this index through targeted interventions should correlate with an increase in the true North Star metric — to be confirmed via post-launch A/B testing, not assumed.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-end pt-4">
        <Link
          href="/evidence"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Gathering Evidence <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
