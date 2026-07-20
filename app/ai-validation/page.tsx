import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import { metrics, N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

export default function AIValidation() {
  return (
    <div>
      <PageHeader title="AI Validation" subtitle="Why these signals can be trusted — and where they can't." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard label="Signal Coverage" value={`${metrics.reviewCoverage.toFixed(1)}%`} note={`${N} of ${TOTAL_REVIEWS_SCANNED.toLocaleString()} carried signal`} />
        <MetricCard label="Quote-Grounded" value="100%" note="every signal requires an exact quote" delay={0.05} />
        <MetricCard label="Flagged Duplicates" value={metrics.flaggedDuplicates} note="flagged, not deleted — visible in Evidence Explorer" delay={0.1} />
        <MetricCard label="High-Confidence Signals" value={`${metrics.highConfidenceShare.toFixed(0)}%`} note="self-reported by model" delay={0.15} />
      </div>

      <div className="space-y-6">
        <Section title="Hallucination risk & mitigation">
          Every extracted reason/barrier requires a verbatim supporting quote — rows without one are excluded.
          This prevents the model from inventing plausible-sounding but unfounded reasoning. Confidence scores
          are self-reported by the model and should be read as a signal of certainty, not a guarantee of
          correctness.
        </Section>

        <Section title="Source bias & known limitations">
          <ul className="list-disc pl-5 space-y-2">
            <li>Reddit rows are mostly post titles, not full post bodies (avg. 70 characters, 773/1,176 rows under 60 characters)</li>
            <li>App Store sample (n=10) is too small for independent conclusions — directional only</li>
            <li>Google Play reviews skew toward one-word ratings — main driver of the 16% overall signal rate</li>
            <li>YouTube comments included substantial off-topic industry-economics debate, filtered before extraction</li>
            <li>Duplicate/near-identical content is flagged (20% of tagged rows) so theme frequencies aren&apos;t inflated</li>
          </ul>
        </Section>

        <Section title="Sampling & human review">
          A sample of tagged rows was manually re-read against original source text to confirm reason_type and
          category assignments were accurate rather than merely plausible-sounding. Low-confidence signals
          remain visible in Evidence Explorer and should be weighted less heavily in decisions.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 shadow-card">
      <h3 className="text-[16px] font-bold text-ink mb-2 tracking-tight">{title}</h3>
      <div className="text-[13.5px] text-ink/80 leading-relaxed">{children}</div>
    </div>
  );
}
