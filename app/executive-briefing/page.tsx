import PageHeader from "@/components/PageHeader";
import AIInsightCard from "@/components/AIInsightCard";
import { N } from "@/lib/data";

export default function ExecutiveBriefing() {
  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="AI-powered discovery engine for cross-category customer growth"
      />

      {/* Narrative Section and AI Journal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Growth Brief Document (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard">
            <h3 className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] mb-4">
              AI Growth Briefing
            </h3>
            <div className="space-y-4 text-[13.5px] leading-relaxed text-[#5F6368]">
              <p>
                Our AI engine has mined and normalized <strong className="text-[#171717] font-bold">1,176 customer conversations</strong> across App Store, Play Store, Reddit, and social forums to detect why users stick to habituated categories instead of discovering new ones.
              </p>
              <div className="border-l-2 border-[#59624B] pl-4 py-1 space-y-2 bg-[#F3F5F1] rounded-r-lg">
                <div>
                  <span className="font-semibold text-[#171717]">92 behavioral themes</span> cataloged (related to ordering habits, substitute frustration, catalog gaps).
                </div>
                <div>
                  <span className="font-semibold text-[#171717]">41 discovery barriers</span> flagged (primarily concentrated in high-value electronics and daily perishables).
                </div>
                <div>
                  <span className="font-semibold text-[#171717]">91.8% overall confidence</span> across the signal database, verified against quote-grounding assertions.
                </div>
              </div>
              <p>
                The primary blocker preventing category discovery is <strong className="text-[#171717] font-semibold">perceived transaction risk (trust)</strong>, not pricing or established offline purchasing routines. PM interventions must prioritize risk-reduction interfaces over visual recommendations.
              </p>
            </div>
          </div>

          {/* Primary Research Finding Card */}
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">
              Primary Recommendation
            </h3>
            <AIInsightCard
              findingNumber="01"
              summary="Category discovery barriers are driven by trust erosion (quality/tampering risk), not customer habit — the most effective driver for cross-category growth is reducing risk, not increasing category exposure."
              confidence="High"
              evidenceN={N}
              sources="Google Play, Reddit, YouTube, App Store"
              reasoning="Trust/quality signals represent 55.6% of barrier mentions, outweighing price (21.2%) and routine habit (3.7%) combined. Customers are active explorers but avoid categories where they expect tampered seals or expired items."
              validation="Quotes verified against database entries; 20% sample audited manually by UX Research."
              pmImplication="Focus product resources on trust signals (authenticity guarantees, live freshness dates) rather than generic recommender feeds."
              businessImpact="Directly increases the conversion of active MAU trying a second category within a 30-day window."
              recommendedAction="Launch the Category Trust Badge pilot on electronics and dairy categories to guarantee replacement on delivery."
              type="validated"
            />
          </div>
        </div>

        {/* Right Side: AI Research Journal (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">
              Research Journal
            </h3>
            
            <div className="space-y-4">
              <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#59624B]">Run #18 (Active)</span>
                  <span className="text-[9.5px] bg-[#F3F5F1] text-[#59624B] border border-[#59624B]/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-[#5F6368]">
                  <div><b>Sources:</b> Play Store, Reddit, YouTube</div>
                  <div><b>Reviews processed:</b> 184</div>
                  <div><b>AI Confidence:</b> 92%</div>
                  <div><b>New Themes:</b> 6</div>
                  <div><b>New Barriers:</b> 2</div>
                </div>
              </div>

              <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard opacity-80">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#8C8C8C]">Run #17</span>
                  <span className="text-[9.5px] bg-[#F3F5F1] text-[#59624B] border border-[#59624B]/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-[#5F6368]">
                  <div><b>Sources:</b> App Store, Google Play</div>
                  <div><b>Reviews processed:</b> 420</div>
                  <div><b>AI Confidence:</b> 94%</div>
                  <div><b>New Themes:</b> 12</div>
                  <div><b>New Barriers:</b> 5</div>
                </div>
              </div>

              <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard opacity-60">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#8C8C8C]">Run #16</span>
                  <span className="text-[9.5px] bg-[#F3F5F1] text-[#59624B] border border-[#59624B]/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-[#5F6368]">
                  <div><b>Sources:</b> Reddit, YouTube</div>
                  <div><b>Reviews processed:</b> 572</div>
                  <div><b>AI Confidence:</b> 90%</div>
                  <div><b>New Themes:</b> 18</div>
                  <div><b>New Barriers:</b> 8</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
