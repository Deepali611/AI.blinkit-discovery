import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const DETAILED_FINDINGS = [
  {
    num: "1",
    q: "Why do customers repeatedly purchase from the same categories?",
    finding: "Repeat-buying is risk-avoidance behavior, not habit.",
    evidence: "Only 7 of 189 signals (3.7%) cite habit as a reason — the weakest of all 6 reason types. Customers explicitly describe avoiding categories where they've had a negative experience, not simply repeating routine.",
    segment: "This pattern holds most strongly among quality_focused customers (40 signals, 21.2%), who explicitly reference past quality failures as their reason.",
    implication: "A discovery/recommendation feed alone will not fix this — it doesn't address the underlying risk perception driving repeat-buying.",
    confidence: "High",
    confidenceDesc: "High confidence = supported by 20+ signals with consistent pattern."
  },
  {
    num: "2",
    q: "What prevents customers from exploring new categories?",
    finding: "Trust/quality risk is the dominant barrier, more than 2.5x the next factor.",
    evidence: "105 of 189 signals (55.6%) cite trust — fake products, expired/damaged perishables, tampered electronics. Price uncertainty follows at 40 signals (21.2%), limited/unavailable SKUs at 9 signals (4.8%).",
    segment: "quality_focused (40 signals) and heavy_user (19 signals) segments show the clearest trust-driven avoidance pattern.",
    implication: "Roadmap should prioritize trust-building features over generic discovery/recommendation mechanics — see Root Cause Chain in Stage 4.",
    confidence: "High",
    confidenceDesc: "High confidence = supported by 20+ signals with consistent pattern."
  },
  {
    num: "3",
    q: "How do customers discover products today?",
    finding: "Discovery is weak and largely accidental, not systematic.",
    evidence: "Signals show broken search functionality, unawareness of existing platform features, and customers leaving for competitors over unavailable specific product variants — this is under the no_discovery reason type (9 signals, 4.8% — smallest category, but qualitatively distinct from trust/price).",
    segment: "Sample size here is small (n=9) — treat as directional, not statistically robust; flag for User Validation follow-up (see Segmentation & Hypotheses stage).",
    implication: "Discovery mechanics (search, browse, feature awareness) are a real but secondary problem — worth fixing, but trust is the primary lever.",
    confidence: "Medium",
    confidenceDesc: "Medium confidence = supported by 5-20 signals or requires directional interpretation."
  },
  {
    num: "4",
    q: "What role do habits play in shopping behavior?",
    finding: "Minimal — habit is the weakest of 6 reason types.",
    evidence: "7 of 189 signals (3.7%). By contrast, 40 signals (21.2%) show active, deliberate price-driven switching between apps — the opposite of habitual loyalty.",
    segment: "price_sensitive segment (38 signals, 20.1%) is defined specifically by this active comparison-shopping behavior.",
    implication: "Customers are not passively habitual — they are actively evaluating options. This means engagement mechanics have room to work, if risk is addressed first.",
    confidence: "High",
    confidenceDesc: "High confidence = supported by 20+ signals with consistent pattern."
  },
  {
    num: "5",
    q: "What information do customers need before trying a new category?",
    finding: "Nearly half of all signal names a specific, actionable requirement.",
    evidence: "86 of 189 signals (45.5%) gave a concrete ask, grouped into 7 themes: authenticity/quality guarantees, packaging/delivery integrity, pricing transparency, return/refund reliability, stock accuracy, payment trust, and discovery/usability.",
    segment: "Authenticity and packaging integrity asks concentrate in quality_focused; pricing transparency asks concentrate in price_sensitive.",
    implication: "This is the most directly actionable finding — each of the 7 theme groups maps to a specific, buildable feature (see Opportunity Workspace).",
    confidence: "High",
    confidenceDesc: "High confidence = supported by 20+ signals with consistent pattern."
  },
  {
    num: "6",
    q: "What frustrations emerge repeatedly?",
    finding: "Fake/counterfeit goods, expired perishables, broken refund promises, forced substitutions without consent, and unhonored promo codes.",
    evidence: "These patterns recur across the 105 trust-type signals and are the most frequently repeated specific complaints within that category.",
    segment: "Forced substitution and broken refunds skew toward one_time_complainer (56 signals, 29.6%) — Blinkit's highest churn-risk segment.",
    implication: "Fixing forced-substitution and refund-reliability issues may retain at-risk customers, not just enable new-category growth — a secondary business case.",
    confidence: "High",
    confidenceDesc: "High confidence = supported by 20+ signals with consistent pattern."
  },
  {
    num: "7",
    q: "Which customer segments are more likely to experiment?",
    finding: "heavy_user shows the clearest readiness signal.",
    evidence: "19 of 189 signals (10.1%) are heavy_user — loyal, high-frequency customers whose complaints focus on specific fixable issues rather than blanket distrust, suggesting they'd return to a category once the specific issue is addressed.",
    segment: "This is inferred from review language (frequency/tenure cues), not verified account data — flagged explicitly as a hypothesis requiring validation, not a confirmed fact (see Segmentation & Hypotheses stage).",
    implication: "Pilot any new feature with heavy_user first — highest expected conversion, lowest risk to test.",
    confidence: "Medium",
    confidenceDesc: "Medium confidence = supported by 5-20 signals or requires directional interpretation."
  },
  {
    num: "8",
    q: "What unmet needs emerge consistently?",
    finding: "Five consistent unmet needs: authenticity guarantees, transparent real-time pricing, reliable return/replace flows, niche/regional stock visibility, and simpler UI for accessibility.",
    evidence: "Derived from the same 86-signal info-needed breakdown as Finding 5, cross-referenced against frustration patterns in Finding 6.",
    segment: "Accessibility-specific need (simpler UI) appears in only 1 signal (senior_citizen segment) — too small to generalize, explicitly flagged as an anecdotal signal worth a follow-up interview, not a proven segment need.",
    implication: "These 5 needs map directly to the 4 opportunities in Opportunity Workspace — this stage is the evidence base, that stage is the action plan.",
    confidence: "Medium",
    confidenceDesc: "Medium confidence = supported by 5-20 signals or requires directional interpretation."
  }
];

export default function InsightsStage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Discovery Engine"
        subtitle="Stage 5 — Discovery Synthesis"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          By compiling the validated customer feedback loops, we have resolved the 8 primary cross-category customer discovery questions:
        </p>

        {/* 8 Questions Resolved Flow */}
        <div className="space-y-6">
          {DETAILED_FINDINGS.map((f, idx) => (
            <div key={idx} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-4">
              
              {/* Card Header metadata */}
              <div className="flex flex-wrap items-center gap-3 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[9px] font-bold text-[#8C8C8C] bg-[#F2F1EC] px-2.5 py-0.5 rounded-full border border-[#ECE8DE]">
                  Resolution Prompt 0{f.num}
                </span>
                
                {/* Confidence Badge + Caption */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                    f.confidence === "High" 
                      ? "bg-[#59624B]/10 text-[#59624B] border-[#59624B]/20" 
                      : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                  }`}>
                    Confidence: {f.confidence}
                  </span>
                  <span className="text-[10.5px] text-[#8C8C8C] font-sans">
                    ({f.confidenceDesc})
                  </span>
                </div>
              </div>

              {/* Question */}
              <h4 className="font-display font-extrabold text-[15.5px] text-[#171717] leading-snug tracking-tight">
                {f.q}
              </h4>

              {/* Detailed 4-part synthesis panel */}
              <div className="space-y-3 text-[12.5px] text-[#5F6368] leading-relaxed pl-1.5">
                <div>
                  <strong className="text-[#171717] block font-bold text-[10.5px] uppercase tracking-wider text-[#8C8C8C]">Finding:</strong>
                  <p className="text-[#171717] font-semibold text-[13px]">{f.finding}</p>
                </div>
                <div>
                  <strong className="text-[#171717] block font-bold text-[10.5px] uppercase tracking-wider text-[#8C8C8C]">Evidence Base:</strong>
                  <p>{f.evidence}</p>
                </div>
                <div>
                  <strong className="text-[#171717] block font-bold text-[10.5px] uppercase tracking-wider text-[#8C8C8C]">Segment Breakdown:</strong>
                  <p>{f.segment}</p>
                </div>
                <div>
                  <strong className="text-[#171717] block font-bold text-[10.5px] uppercase tracking-wider text-[#8C8C8C]">PM Implication:</strong>
                  <p className="font-medium text-[#59624B] bg-[#F3F5F1] p-3 rounded-[10px] border border-[#59624B]/10 mt-1">{f.implication}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/themes"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 4: Themes & Signals
        </Link>
        <Link
          href="/segmentation"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Segmentation & Hypotheses <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
