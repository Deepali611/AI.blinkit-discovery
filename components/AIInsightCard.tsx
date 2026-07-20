"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; bg: string }> = {
  High: { text: "#028A34", bg: "#E7F8ED" },
  Medium: { text: "#8A6A0F", bg: "#FFF6DD" },
  Low: { text: "#6B7566", bg: "#F1F1EF" },
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
      className="bg-surface border border-line rounded-2xl p-6 shadow-card mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider bg-brand-yellowSoft/60 text-[#8A6A0F] border border-[#EFDC9E]/40 rounded-full px-3 py-1">
          <Sparkles size={11} /> AI Growth Analyst
        </span>
        <span
          className="text-[10px] font-semibold rounded-full px-3 py-1 uppercase tracking-wider"
          style={{ color: cs.text, background: cs.bg }}
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

      <div className="space-y-4 text-[13.5px] text-ink/80">
        <div>
          <div className="text-[10px] font-semibold text-muted/80 uppercase tracking-wider mb-1">Reasoning</div>
          <div className="leading-relaxed">{reasoning}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-muted/80 uppercase tracking-wider mb-1">Validation</div>
          <div className="leading-relaxed">{validation}</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-line space-y-3.5 text-[13.5px]">
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
