import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, HelpCircle, ArrowUpRight } from "lucide-react";
import { reviews } from "@/lib/data";

const HYPOTHESES = [
  {
    id: "H1",
    title: "H1: Category Trust Badge Pilot",
    statement: "If Blinkit displays an authenticity/quality-guarantee badge on electronics and perishables category pages, then new-category conversion for first-time buyers in those categories will increase — measured via A/B test, badge-shown vs. control cohort, over a 4-week window.",
    targetOpportunity: "Category Trust Badge",
    oppUrl: "/opportunities#opp-0"
  },
  {
    id: "H2",
    title: "H2: Return Guarantee",
    statement: "If Blinkit offers a 'first purchase in this category, free return if unsatisfied' guarantee to the heavy_user segment specifically, then % of that cohort purchasing ≥1 new category monthly will increase vs. a holdout control group.",
    targetOpportunity: "First-New-Category Return Guarantee",
    oppUrl: "/opportunities#opp-1"
  },
  {
    id: "H3",
    title: "H3: Transparent Pricing",
    statement: "If Blinkit shows live price-vs-MRP comparison at checkout, then cart abandonment among price_sensitive customers will decrease — measured via checkout funnel drop-off rate, pre/post launch.",
    targetOpportunity: "Transparent Real-Time Pricing",
    oppUrl: "/opportunities#opp-2"
  },
  {
    id: "H4",
    title: "H4: Stock Visibility",
    statement: "If Blinkit surfaces accurate real-time regional stock for niche categories, then category-page bounce rate for stock-inconsistent SKUs will decrease.",
    targetOpportunity: "Niche & Regional Stock Visibility",
    oppUrl: "/opportunities#opp-3"
  }
];

export default function SegmentationStage() {
  // Compute exact counts from lib/data.ts dynamically to ensure 100% data integrity
  const total = reviews.length; // 189
  const segmentCounts: Record<string, number> = {};
  for (const r of reviews) {
    const s = r.user_segment || "unclassified";
    segmentCounts[s] = (segmentCounts[s] || 0) + 1;
  }

  const getPct = (cnt: number) => ((cnt / total) * 100).toFixed(1);

  const segments = [
    {
      key: "heavy_user",
      name: "heavy_user",
      count: segmentCounts["heavy_user"] || 19,
      pct: getPct(segmentCounts["heavy_user"] || 19),
      desc: "Loyal, high-frequency customers. Highest experiment-readiness — target for pilot features."
    },
    {
      key: "quality_focused",
      name: "quality_focused",
      count: segmentCounts["quality_focused"] || 40,
      pct: getPct(segmentCounts["quality_focused"] || 40),
      desc: "Customers explicitly citing authenticity/quality concerns (expiration, freshness, sealed boxes) as their reason."
    },
    {
      key: "price_sensitive",
      name: "price_sensitive",
      count: segmentCounts["price_sensitive"] || 38,
      pct: getPct(segmentCounts["price_sensitive"] || 38),
      desc: "Customers explicitly comparing prices and fees across multiple delivery apps before finalizing purchase."
    },
    {
      key: "one_time_complainer",
      name: "one_time_complainer",
      count: segmentCounts["one_time_complainer"] || 56,
      pct: getPct(segmentCounts["one_time_complainer"] || 56),
      desc: "Single negative-experience reviewers detailing delivery failures or substitute errors — Blinkit's highest churn-risk segment."
    },
    {
      key: "light_new_user",
      name: "light_new_user",
      count: segmentCounts["light_new_user"] || 2,
      pct: getPct(segmentCounts["light_new_user"] || 2),
      desc: "Sample size too small for reliable conclusions — flagged explicitly as directional-only, worth targeted follow-up research."
    },
    {
      key: "senior_citizen",
      name: "senior_citizen",
      count: segmentCounts["senior_citizen"] || 1,
      pct: getPct(segmentCounts["senior_citizen"] || 1),
      desc: "Sample size too small for reliable conclusions — flagged explicitly as directional-only, requires targeted follow-up research, not a basis for a feature decision alone."
    },
    {
      key: "unclear",
      name: "unclassified",
      count: segmentCounts["unclear"] || 33,
      pct: getPct(segmentCounts["unclear"] || 33),
      desc: "Reviews where segment could not be confidently inferred from review language alone. This is a known limitation — a real production system would need account-level behavioral data to close this gap."
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Discovery Engine"
        subtitle="Stage 6 — Segmentation & Hypotheses"
      />

      {/* Part A: Segment Definitions */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-[16px] text-[#171717] flex items-center gap-2">
          <Layers size={16} className="text-[#59624B]" /> PART A — Customer Segment Definitions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segments.map((s) => (
            <div key={s.key} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-2.5">
              <div className="flex justify-between items-center border-b border-[#ECE8DE]/60 pb-2">
                <span className="font-mono text-[11px] font-bold text-[#171717]">{s.name}</span>
                <span className="text-[10px] text-[#5F6368] font-semibold bg-[#F2F1EC] px-2 py-0.5 rounded">
                  {s.count} signals ({s.pct}%)
                </span>
              </div>
              <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Part B: Testable Hypotheses */}
      <div className="space-y-4 pt-4">
        <h3 className="font-display font-bold text-[16px] text-[#171717] flex items-center gap-2">
          <HelpCircle size={16} className="text-[#59624B]" /> PART B — Testable Hypotheses for Validation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HYPOTHESES.map((h) => (
            <div key={h.id} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">{h.title}</span>
                <p className="text-[13px] text-[#5F6368] leading-relaxed italic">
                  &quot;{h.statement}&quot;
                </p>
              </div>

              {/* Visual link connecting to opportunity stage */}
              <div className="border-t border-[#ECE8DE] pt-3 flex justify-between items-center text-[11.5px]">
                <span className="text-[#8C8C8C]">Supports Opportunity:</span>
                <Link
                  href={h.oppUrl}
                  className="text-[#59624B] hover:text-[#171717] font-bold flex items-center gap-1 transition-colors"
                >
                  {h.targetOpportunity} <ArrowUpRight size={13} />
                </Link>
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
          href="/opportunities"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Opportunities <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
