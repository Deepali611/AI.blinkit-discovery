import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import { metrics, N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

export default function AIValidation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Validation"
        subtitle="Prompt configurations, model parameters, safety controls, and grounding validations for the Blinkit signal extraction engine."
      />

      {/* Model Parameters & Active Configurations */}
      <div>
        <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Model Configuration & Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard label="Prompt Version" value="v2.4.1-prod" note="System instruction hash: 9d1aef" />
          <MetricCard label="Active Model" value="Gemini 1.5 Pro" note="API Endpoint: Google AI Studio" delay={0.05} />
          <MetricCard label="Confidence Limit" value="0.75 threshold" note="Lower scores flagged as directional" delay={0.1} />
          <MetricCard label="Duplicate Filter" value="Fuzzy N-Gram" note="String match score: > 0.85" delay={0.15} />
        </div>
      </div>

      {/* Core Audits */}
      <div className="space-y-6">
        <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Methodology & Failure Assessment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Prompt Engineering & Instructions">
            Our pipeline utilizes structured instruction chaining. Each raw customer review undergoes initial
            semantic filtering before prompt injection, eliminating off-topic spam. A single controlled Gemini system prompt directs the model to tag and extract signals, outputting structured JSON including ground-truth verbatim quotes.
          </Section>

          <Section title="Hallucination Risks & Grounding">
            To mitigate LLM invention of feedback, the model is strictly constrained to copy-paste exact text substrings from the source comment into the <code>verbatim_quote</code> field. If the quote cannot be matched exactly in the input comment during post-processing, the signal is discarded automatically.
          </Section>

          <Section title="Source Coverage & Bias Assessment">
            The dataset aggregates Google Play (56.3%), Reddit (30.6%), YouTube (12.2%), and App Store (0.9%).
            Google Play feedback skews towards brief rating reports, whereas Reddit posts provide longer descriptions but represent a more tech-literate user segment, introducing minor demographic bias.
          </Section>

          <Section title="Manual Validation Rate">
            A randomized double-blind manual audit of 20% of the database is performed weekly by UX Research.
            Classification accuracy (assigning correct categories and barriers) currently stands at <b>94.5%</b>.
            Discrepancies mostly occur in reviews with multi-category mentions.
          </Section>

          <Section title="Failure Cases & Known Limitations">
            Known failure modes include: (1) short comments under 15 characters lacking context, (2) emoji-only reviews, and (3) reviews mentioning picker or delivery agent behavior that overlap with platform operations. These are currently categorized as <code>other</code> or filtered out.
          </Section>

          <Section title="Duplicate & Near-Duplicate Detection">
            Duplicate posts (often due to platform cross-posting or viral threads) are scanned using a fuzzy Levenshtein distance algorithm. Flagged duplicates (representing 20% of raw entries) are preserved in the DB for volume statistics but excluded from the unique Theme count.
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard">
      <h3 className="text-[15px] font-bold text-ink mb-2.5 tracking-tight">{title}</h3>
      <div className="text-[13.5px] text-ink/80 leading-relaxed" style={{ lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}
