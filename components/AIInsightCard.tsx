"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; border: string }> = {
  High: { text: "#00B140", border: "#00B140" },
  Medium: { text: "#8A6A0F", border: "#EFDC9E" },
  Low: { text: "#6B7566", border: "#E4E8E1" },
};

export default function AIInsightCard({
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
      className="border-y border-r border-line border-l-4 border-l-brand-green rounded-lg shadow-featured mb-6 pt-[22px] px-[24px] pb-[18px]"
      style={{ background: "linear-gradient(135deg, rgba(0, 177, 64, 0.12), rgba(255, 255, 255, 0.98) 58%, rgba(0, 177, 64, 0.05))" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-[13px] rounded-full py-[7px] px-[12px] border border-[#EFDC9E] text-[#8A6A0F] bg-transparent"
          style={{ fontWeight: 750 }}
        >
          <Sparkles size={13} /> AI Growth Analyst
        </span>
        <span
          className="text-[13px] rounded-full py-[7px] px-[12px] uppercase tracking-wider bg-transparent border"
          style={{ color: cs.text, borderColor: cs.border, fontWeight: 750 }}
        >
          Confidence: {confidence}
        </span>
      </div>

      <div className="text-[18px] font-bold text-ink leading-snug tracking-tight mb-4">{summary}</div>

      <div className="flex gap-5 text-[12.5px] text-muted border-b border-line pb-4 mb-4">
        <span>
          <b className="text-ink font-semibold">{evidenceN}</b> supporting reviews
        </span>
        <span>
          Sources: <b className="text-ink font-semibold">{sources}</b>
        </span>
      </div>

      {chart && <div className="mb-4">{chart}</div>}

      <div className="space-y-4 text-[13.5px] text-ink/80" style={{ lineHeight: 1.55 }}>
        <div>
          <div className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-1" style={{ fontWeight: 800 }}>Reasoning</div>
          <div className="leading-relaxed">{reasoning}</div>
        </div>
        <div>
          <div className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-1" style={{ fontWeight: 800 }}>Validation</div>
          <div className="leading-relaxed">{validation}</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-line space-y-3.5 text-[13.5px]" style={{ lineHeight: 1.55 }}>
        <div className="leading-relaxed">
          <span className="font-semibold text-ink">PM Implication:</span>{" "}
          <span className="text-ink/80">{pmImplication}</span>
        </div>
        <div className="leading-relaxed">
          <span className="font-semibold text-ink">Business Impact:</span>{" "}
          <span className="text-ink/80">{businessImpact}</span>
        </div>
        <div className="leading-relaxed">
          <span className="font-semibold text-ink">Recommended Action:</span>{" "}
          <span className="text-ink/80">{recommendedAction}</span>
        </div>
      </div>
    </motion.div>
  );
}
