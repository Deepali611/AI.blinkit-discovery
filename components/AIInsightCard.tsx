"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; border: string; bar: string; note: string }> = {
  High: { text: "#00B140", border: "#00B140", bar: "█████████░", note: "Cross-source verified" },
  Medium: { text: "#8A6A0F", border: "#EFDC9E", bar: "██████░░░░", note: "Strong signal" },
  Low: { text: "#6B7566", border: "#E4E8E1", bar: "███░░░░░░░", note: "Directional only" },
};

export default function AIInsightCard({
  findingNumber = "01",
  summary,
  confidence,
  evidenceN,
  sources,
  reasoning,
  validation,
  pmImplication,
  businessImpact,
  recommendedAction,
  chart,
}: {
  findingNumber?: string;
  summary: string;
  confidence: "High" | "Medium" | "Low";
  evidenceN: number;
  sources: string;
  reasoning: string;
  validation: string;
  pmImplication: string;
  businessImpact: string;
  recommendedAction: string;
  chart?: ReactNode;
}) {
  const cs = CONF_STYLES[confidence];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-y border-r border-line/40 border-l-4 border-l-brand-green rounded-[20px] shadow-featured mb-6 pt-[22px] px-[24px] pb-[18px]"
      style={{ background: "linear-gradient(135deg, rgba(0, 177, 64, 0.12), rgba(255, 255, 255, 0.98) 58%, rgba(0, 177, 64, 0.05))" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-[13px] rounded-full py-[7px] px-[12px] border border-[#EFDC9E] text-[#8A6A0F] bg-transparent"
          style={{ fontWeight: 750 }}
        >
          <Sparkles size={13} /> AI Research Finding #{findingNumber}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-[11px] text-muted/80 uppercase tracking-[0.04em] font-extrabold block mb-1">Observation</span>
        <div className="text-[18px] font-bold text-ink leading-snug tracking-tight">{summary}</div>
      </div>

      {chart && <div className="mb-4">{chart}</div>}

      <div className="mt-5 pt-5 border-t border-line/40 space-y-3.5 text-[13.5px] text-ink/90" style={{ lineHeight: 1.55 }}>
        <div>
          <span className="font-semibold text-ink">Supporting Evidence:</span>{" "}
          <span className="text-ink/85">{evidenceN} reviews extracted across {sources}. {reasoning} ({validation})</span>
        </div>
        <div>
          <span className="font-semibold text-ink">Confidence:</span>{" "}
          <span className="font-mono text-[12px] text-ink/80 tracking-normal mr-1.5">{cs.bar}</span>
          <span className="font-semibold text-[13px] mr-1.5" style={{ color: cs.text }}>{confidence}</span>
          <span className="text-muted/80 text-[12.5px]">({cs.note})</span>
        </div>
        <div>
          <span className="font-semibold text-ink">Business Impact:</span>{" "}
          <span className="text-ink/85">{businessImpact}</span>
        </div>
        <div>
          <span className="font-semibold text-ink">PM Implication:</span>{" "}
          <span className="text-ink/85">{pmImplication}</span>
        </div>
        <div>
          <span className="font-semibold text-ink">Suggested Experiment:</span>{" "}
          <span className="text-ink/85">{recommendedAction}</span>
        </div>
      </div>
    </motion.div>
  );
}
