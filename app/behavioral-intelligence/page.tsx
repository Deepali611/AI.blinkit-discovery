import PageHeader from "@/components/PageHeader";
import AIInsightCard from "@/components/AIInsightCard";
import BarList from "@/components/BarList";
import { reasonCounts, segmentCounts, categoryCounts, REASON_COLORS, SEGMENT_COLORS, N } from "@/lib/data";

export default function BehavioralIntelligence() {
  const topCategories = Object.fromEntries(
    Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
  );
  const catColors = Object.fromEntries(Object.keys(topCategories).map((k) => [k, "#4A5447"]));

  return (
    <div className="space-y-6">
      <PageHeader title="Behavioral Intelligence" subtitle="Discovery signals behind repeat-category shopping behaviour." />

      <div className="space-y-10">
        <div>
          <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-3" style={{ fontWeight: 800 }}>I. Core Barrier Analysis</h2>
          <AIInsightCard
            summary={`Trust/quality risk drives ${reasonCounts["trust"] || 0} of ${N} discovery signals — by far the strongest barrier to cross-category exploration.`}
            confidence="High"
            evidenceN={N}
            sources="Google Play, Reddit, YouTube, App Store"
            reasoning="Customers describe being burned by fake, expired, or damaged products in unfamiliar categories, then retreating to categories they already trust."
            validation="100% quote-grounded; 20% of signals flagged as possible duplicate/viral content to avoid inflated counts."
            pmImplication="Habit-breaking mechanics (badges, nudges, discovery feeds) will underperform relative to trust-building features."
            businessImpact="Fixing the dominant barrier has outsized leverage on the % of MAU exploring new categories."
            recommendedAction="Prioritize authenticity guarantees and tamper-evident packaging for electronics and perishables."
            chart={<BarList data={reasonCounts} colors={REASON_COLORS} />}
          />
        </div>

        <div>
          <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-3" style={{ fontWeight: 800 }}>II. Customer Segment Readiness</h2>
          <AIInsightCard
            summary="Heavy, loyal customers show the clearest readiness to explore once trust is addressed — they are the highest-leverage segment for a first experiment."
            confidence="Medium"
            evidenceN={N}
            sources="Google Play, Reddit, YouTube, App Store"
            reasoning="Segment is inferred from review language — frequency cues, price-comparison behavior, and tenure mentions — not verified account data."
            validation="Segment classification is a text-proxy hypothesis; recommend validating against real behavioral/transactional data before large-scale rollout."
            pmImplication="quality_focused and price_sensitive customers are distinct populations needing different fixes, not one generic offer."
            businessImpact="Targeting heavy_user first maximizes early conversion probability on the core growth metric."
            recommendedAction="Pilot the Category Trust Badge experiment with heavy_user customers before wider release."
            chart={<BarList data={segmentCounts} colors={SEGMENT_COLORS} unit="records" />}
          />
        </div>

        <div>
          <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-3" style={{ fontWeight: 800 }}>III. Category-Specific Risk Density</h2>
          <AIInsightCard
            summary="Electronics and perishables (dairy, eggs, produce) concentrate the highest share of trust-risk mentions across categories."
            confidence="Medium"
            evidenceN={Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
            sources="Google Play, Reddit, YouTube, App Store"
            reasoning="High-value and perishable items carry the greatest downside if quality fails, making customers most risk-averse there."
            validation="Category is extracted only when explicitly named — reviews with no named category are excluded from this view."
            pmImplication="A platform-wide trust fix is unnecessary; targeted category-level intervention is more efficient."
            businessImpact="Pilot categories represent the fastest path to a measurable lift in cross-category purchase rate."
            recommendedAction="Launch the trust-badge pilot on electronics and dairy/eggs before extending platform-wide."
            chart={<BarList data={topCategories} colors={catColors} />}
          />
        </div>
      </div>
    </div>
  );
}
