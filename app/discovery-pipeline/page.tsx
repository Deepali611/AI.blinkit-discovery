import PageHeader from "@/components/PageHeader";
import BarList from "@/components/BarList";
import { sourceBreakdown } from "@/lib/data";

const STEPS = [
  "Business goal",
  "Collect feedback",
  "AI analysis",
  "Behavior understanding",
  "Evidence",
  "Validation",
  "Insights",
  "Growth opportunities",
];

export default function DiscoveryPipeline() {
  const sourceData = Object.fromEntries(sourceBreakdown.map((s) => [s.source, s.count]));
  const sourceColors = Object.fromEntries(sourceBreakdown.map((s) => [s.source, "#3B5BDB"]));

  return (
    <div>
      <PageHeader title="Discovery Pipeline" subtitle="How customer feedback becomes a validated growth signal." />

      <div className="flex flex-wrap items-center gap-y-3 mb-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="bg-surface border border-line rounded-lg py-[7px] px-[12px] text-[12.5px] font-medium text-ink shadow-subtle">
              {step}
            </div>
            {i < STEPS.length - 1 && <span className="text-muted px-2.5">→</span>}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-line rounded-lg p-[18px] shadow-standard">
        <h3 className="text-[16px] font-bold text-ink mb-2 tracking-tight">Business goal</h3>
        <p className="text-[13.5px] text-ink/80 leading-relaxed mb-6" style={{ lineHeight: 1.55 }}>
          Increase the percentage of Monthly Active Customers who purchase from at least one new category
          every month.
        </p>

        <h3 className="text-[16px] font-bold text-ink mb-3 tracking-tight">Collect customer feedback</h3>
        <div className="mb-6">
          <BarList data={sourceData} colors={sourceColors} unit="records" />
        </div>

        <h3 className="text-[16px] font-bold text-ink mb-2 tracking-tight">AI analysis</h3>
        <p className="text-[13.5px] text-ink/80 leading-relaxed" style={{ lineHeight: 1.55 }}>
          Off-topic content (labor/picker posts, industry debate) and bare statements with no reasoning are
          filtered before extraction. A single controlled Gemini prompt then tags each remaining review with a
          signal gate followed by structured extraction: repeat-buying signal, category, barrier, reason type,
          actionable trust-building ask, customer segment, a grounding quote, and confidence.
        </p>
      </div>
    </div>
  );
}
