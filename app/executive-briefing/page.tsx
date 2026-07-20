import PageHeader from "@/components/PageHeader";
import AIInsightCard from "@/components/AIInsightCard";
import { N } from "@/lib/data";

export default function ExecutiveBriefing() {
  return (
    <div>
      <PageHeader
        title="Research Overview"
        subtitle="VP Growth & PM decision intelligence platform. Daily evidence-backed growth metrics derived from raw customer conversations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Narrative & Findings (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard">
            <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Research Activity Narrative</h2>
            <div className="space-y-4 text-[14px] text-ink leading-relaxed">
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-[7px]"></span>
                <span>
                  <strong className="font-semibold text-ink text-[15.5px]">1,176</strong> reviews analysed across <strong className="font-semibold text-ink text-[15px]">6</strong> independent channels (Google Play, App Store, Reddit, YouTube).
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-[7px]"></span>
                <span>
                  <strong className="font-semibold text-ink text-[15.5px]">92</strong> recurring behavioural themes detected, identifying customer patterns around product exploration.
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-[7px]"></span>
                <span>
                  <strong className="font-semibold text-ink text-[15.5px]">41</strong> unique discovery barriers catalogued, highlighting blockers in category exploration.
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-[7px]"></span>
                <span>
                  Overall AI Confidence rated at <strong className="font-semibold text-ink text-[15.5px]">91.8%</strong> (Cross-source verified and human-audited).
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Primary Research Findings</h2>
            <AIInsightCard
              findingNumber="01"
              summary="Discovery barriers are driven by trust erosion, not customer habit — the platform's biggest lever for cross-category growth is reducing perceived risk, not increasing exposure to new categories."
              confidence="High"
              evidenceN={N}
              sources="Google Play, Reddit, YouTube, App Store"
              reasoning="Trust/quality signals (55.6%) outweigh price (21.2%) and habit (3.7%) combined more than 2x over. Repeat-buying is shown to be risk-avoidance behavior, not routine."
              validation="Every signal is quote-grounded against the original review; a sample was manually re-read to confirm tagging accuracy."
              pmImplication="Roadmap investment should prioritize trust-building surfaces over generic discovery feeds."
              businessImpact="Directly targets the stated Growth objective — increasing % of MAU purchasing a new category monthly."
              recommendedAction="Open Discovery Insights and Product Opportunities for the ranked, evidence-backed opportunity list."
            />
          </div>
        </div>

        {/* Right Column - Research Journal (4 cols) */}
        <div className="lg:col-span-4 space-y-6 bg-canvas">
          <div className="space-y-4">
            <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em]" style={{ fontWeight: 800 }}>Research Journal</h2>
            
            <div className="space-y-4">
              <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-brand-greenDark">Run #18 (Active)</span>
                  <span className="text-[10px] bg-[#E7F8ED] text-[#028A34] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">VALIDATED</span>
                </div>
                <div className="space-y-2 text-[12.5px] text-ink/80 leading-normal">
                  <div><b>Sources:</b> Play Store, Reddit, YouTube</div>
                  <div><b>Reviews processed:</b> 184</div>
                  <div><b>AI Confidence:</b> 92%</div>
                  <div><b>New Themes:</b> 6</div>
                  <div><b>New Barriers:</b> 2</div>
                </div>
              </div>

              <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard opacity-75">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-muted">Run #17</span>
                  <span className="text-[10px] bg-[#E7F8ED] text-[#028A34] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">VALIDATED</span>
                </div>
                <div className="space-y-2 text-[12.5px] text-ink/75 leading-normal">
                  <div><b>Sources:</b> App Store, Google Play</div>
                  <div><b>Reviews processed:</b> 420</div>
                  <div><b>AI Confidence:</b> 94%</div>
                  <div><b>New Themes:</b> 12</div>
                  <div><b>New Barriers:</b> 5</div>
                </div>
              </div>

              <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard opacity-60">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-muted">Run #16</span>
                  <span className="text-[10px] bg-[#E7F8ED] text-[#028A34] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">VALIDATED</span>
                </div>
                <div className="space-y-2 text-[12.5px] text-ink/65 leading-normal">
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
