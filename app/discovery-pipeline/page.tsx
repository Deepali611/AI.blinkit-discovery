import PageHeader from "@/components/PageHeader";
import { CheckCircle2, Play, GitBranch, Terminal } from "lucide-react";

const STAGES = [
  {
    id: "ingestion",
    name: "Feedback Ingestion",
    icon: Play,
    status: "active",
    color: "text-[#228BE6] bg-[#228BE6]/10",
    description: "Aggregation of customer reviews across 6 distinct digital channels, synchronized daily to form the raw text intelligence database.",
    details: [
      { label: "Google Play Store", val: "662 reviews (56.3%)" },
      { label: "App Store", val: "10 reviews (0.9%)" },
      { label: "Reddit Threads", val: "360 reviews (30.6%)" },
      { label: "YouTube Comments", val: "144 reviews (12.2%)" }
    ]
  },
  {
    id: "filtering",
    name: "Semantic Filtration",
    icon: GitBranch,
    status: "active",
    color: "text-[#228BE6] bg-[#228BE6]/10",
    description: "Automated preprocessing stage eliminating off-topic, spam, and non-actionable reviews (e.g. delivery complaints, rating-only reviews).",
    details: [
      { label: "Minimum Length", val: "Discard strings < 15 characters" },
      { label: "Exclusion Regex", val: "Filter picker/courier/delivery tags" },
      { label: "Language Check", val: "Unicode English detection filter" },
      { label: "Spam Reduction", val: "N-gram duplication detection score > 0.85" }
    ]
  },
  {
    id: "tagging",
    name: "AI Signal Inscription",
    icon: Terminal,
    status: "active",
    color: "text-[#228BE6] bg-[#228BE6]/10",
    description: "Gemini 1.5 Pro prompt chains parse and tag the remaining customer records to identify target metrics.",
    details: [
      { label: "LLM Context Engine", val: "Gemini-1.5-Pro-production" },
      { label: "Temperature Param", val: "0.2 (low-entropy deterministic tags)" },
      { label: "Output Schema", val: "Structured JSON: [category, barrier, quote, confidence]" },
      { label: "Grounding Enforcement", val: "Sub-string matching checks" }
    ]
  }
];

export default function DiscoveryPipeline() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Discovery Pipeline"
        subtitle="Operational stages showing how raw customer comments are ingested, filtered, and converted to validated product insights."
      />

      {/* Conversion Pipeline Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {STAGES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="bg-surface border border-[#E8E5DF] rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center`}>
                    <Icon size={16} />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#028A34]">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15.5px] text-[#1E221F] mb-2 leading-tight">
                  Stage 0{idx + 1}: {s.name}
                </h3>
                <p className="text-[12.5px] text-[#6B7566] leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              {/* Detail parameters list */}
              <div className="border-t border-[#E8E5DF] pt-3 mt-4 space-y-2">
                {s.details.map((d, i) => (
                  <div key={i} className="flex justify-between text-[11.5px] leading-tight">
                    <span className="text-[#6B7566]">{d.label}</span>
                    <span className="font-semibold text-[#1E221F] text-right">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Objective banner */}
      <div className="bg-surface border border-[#E8E5DF] rounded-xl p-6 shadow-sm">
        <h3 className="font-sans text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.08em] mb-2">
          Pipeline Objective
        </h3>
        <p className="text-[13.5px] text-[#1E221F]/95 leading-relaxed" style={{ lineHeight: 1.55 }}>
          Our active objective is to drive cross-category growth. Specifically, we trace and solve blocks in category exploration to help increase the percentage of **Monthly Active Users (MAU) purchasing a new category monthly**.
        </p>
      </div>
    </div>
  );
}
