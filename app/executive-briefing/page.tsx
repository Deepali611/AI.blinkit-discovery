import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import AIInsightCard from "@/components/AIInsightCard";
import { metrics, N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

export default function ExecutiveBriefing() {
  return (
    <div>
      <PageHeader
        title="Executive Briefing"
        subtitle="Growth Intelligence on cross-category discovery — everything below ties back to one goal: growing the share of customers exploring beyond their usual categories."
      />

      <div className="grid grid-cols-4 gap-3 mb-3">
        <MetricCard label="Discovery Barrier Index" value={`${metrics.discoveryBarrierIndex.toFixed(0)}%`} note="signal driven by trust or price risk" delay={0} />
        <MetricCard label="Trust Gap Score" value={`${metrics.trustGapScore.toFixed(0)}%`} note="signal citing trust/quality risk" delay={0.05} />
        <MetricCard label="Shopping Habit Score" value={`${metrics.habitScore.toFixed(0)}%`} note="signal attributable to habit" delay={0.1} />
        <MetricCard label="Customer Exploration Intent" value={`${metrics.explorationIntent.toFixed(0)}%`} note="customers naming a specific ask" delay={0.15} />
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <MetricCard label="Discovery Opportunity Readiness" value={`${metrics.discoveryReadiness.toFixed(0)}%`} note="heavy users clear of trust/price blockers" delay={0.2} />
        <MetricCard label="Insight Confidence" value={`${metrics.insightConfidence.toFixed(0)}%`} note="confidence-weighted across signals" delay={0.25} />
        <MetricCard label="Signal Coverage" value={`${metrics.reviewCoverage.toFixed(1)}%`} note={`${N} of ${TOTAL_REVIEWS_SCANNED.toLocaleString()} reviews scanned`} delay={0.3} />
        <MetricCard label="Theme Saturation" value={metrics.themeSaturation} note="distinct categories surfaced" delay={0.35} />
      </div>

      <AIInsightCard
        summary="Discovery barriers are driven by trust erosion, not customer habit — the platform's biggest lever for cross-category growth is reducing perceived risk, not increasing exposure to new categories."
        confidence="High"
        evidenceN={N}
        sources="Google Play, Reddit, YouTube, App Store"
        reasoning="Trust/quality signals (55.6%) outweigh price (21.2%) and habit (3.7%) combined more than 2x over. Repeat-buying is shown to be risk-avoidance behavior, not routine."
        validation="Every signal is quote-grounded against the original review; a sample was manually re-read to confirm tagging accuracy."
        pmImplication="Roadmap investment should prioritize trust-building surfaces over generic discovery feeds."
        businessImpact="Directly targets the stated Growth objective — increasing % of MAU purchasing a new category monthly."
        recommendedAction="Open Growth Intelligence and Opportunity Workspace for the ranked, evidence-backed opportunity list."
      />
    </div>
  );
}
