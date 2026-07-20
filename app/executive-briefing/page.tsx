import PageHeader from "@/components/PageHeader";
import AIInsightCard from "@/components/AIInsightCard";
import { N } from "@/lib/data";

export default function ExecutiveBriefing() {
  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <PageHeader
        title="Blinkit Growth Intelligence"
        subtitle="AI-Powered Discovery Engine for Cross-Category Customer Growth"
      />

      {/* Narrative Section and AI Journal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Growth Brief Document (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em] mb-4">
              AI Growth Briefing
            </h3>
            <div className="space-y-4 text-[13.5px] leading-relaxed text-ink/80">
              <p>
                Our AI engine has mined and normalized <strong className="text-ink font-bold">1,176 customer conversations</strong> across App Store, Play Store, Reddit, and social forums to detect why users stick to habituated categories instead of discovering new ones.
              </p>
              <div className="border-l-2 border-[#00B140] pl-4 py-1 space-y-2 bg-[#E7F8ED]/10 rounded-r-md">
                <div>
                  <span className="font-semibold text-[#028A34]">92 behavioral themes</span> cataloged (related to ordering habits, substitute frustration, catalog gaps).
                </div>
                <div>
                  <span className="font-semibold text-[#028A34]">41 discovery barriers</span> flagged (primarily concentrated in high-value electronics and daily perishables).
                </div>
                <div>
                  <span className="font-semibold text-[#028A34]">91.8% overall confidence</span> across the signal database, verified against quote-grounding assertions.
                </div>
              </div>
              <p>
                The primary blocker preventing category discovery is <strong className="text-ink font-semibold">perceived transaction risk (trust)</strong>, not pricing or established offline purchasing routines. PM interventions must prioritize risk-reduction interfaces over visual recommendations.
              </p>
            </div>
          </div>

          {/* Primary Research Finding Card */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em]">
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
            />
          </div>
        </div>

        {/* Right Side: AI Research Journal (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em]">
              Research Journal
            </h3>
            
            <div className="space-y-4">
              <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#028A34]">Run #18 (Active)</span>
                  <span className="text-[9px] bg-[#E7F8ED] text-[#028A34] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-ink/75">
                  <div><b>Sources:</b> Play Store, Reddit, YouTube</div>
                  <div><b>Reviews processed:</b> 184</div>
                  <div><b>AI Confidence:</b> 92%</div>
                  <div><b>New Themes:</b> 6</div>
                  <div><b>New Barriers:</b> 2</div>
                </div>
              </div>

              <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-5 shadow-sm opacity-80">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Run #17</span>
                  <span className="text-[9px] bg-[#E7F8ED] text-[#028A34] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-ink/70">
                  <div><b>Sources:</b> App Store, Google Play</div>
                  <div><b>Reviews processed:</b> 420</div>
                  <div><b>AI Confidence:</b> 94%</div>
                  <div><b>New Themes:</b> 12</div>
                  <div><b>New Barriers:</b> 5</div>
                </div>
              </div>

              <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-5 shadow-sm opacity-60">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Run #16</span>
                  <span className="text-[9px] bg-[#E7F8ED] text-[#028A34] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    VALIDATED
                  </span>
                </div>
                <div className="space-y-2 text-[12px] text-ink/65">
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
