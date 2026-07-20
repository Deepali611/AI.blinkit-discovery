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
      className="bg-surface border border-line rounded-2xl p-6 shadow-card mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide bg-brand-yellowSoft text-[#8A6A0F] border border-[#EFDC9E] rounded px-2 py-0.5">
          <Sparkles size={11} /> AI Growth Analyst
        </span>
        <span
          className="text-[10.5px] font-extrabold rounded px-2 py-0.5"
          style={{ color: cs.text, background: cs.bg }}
        >
          CONFIDENCE: {confidence.toUpperCase()}
        </span>
      </div>

      <div className="text-[16px] font-semibold leading-snug mb-3">{summary}</div>

      <div className="flex gap-5 text-[12px] text-muted border-b border-line pb-3 mb-3">
        <span>
          <b className="text-ink">{evidenceN}</b> supporting reviews
        </span>
        <span>
          Sources: <b className="text-ink">{sources}</b>
        </span>
      </div>

      {chart && <div className="mb-3">{chart}</div>}

      <div className="space-y-2 text-[13px]">
        <div>
          <div className="text-[10.5px] font-extrabold text-muted uppercase tracking-wide mb-0.5">Reasoning</div>
          <div className="leading-relaxed">{reasoning}</div>
        </div>
        <div>
          <div className="text-[10.5px] font-extrabold text-muted uppercase tracking-wide mb-0.5">Validation</div>
          <div className="leading-relaxed">{validation}</div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="bg-brand-yellowSoft border-l-2 border-brand-yellow rounded-r-lg px-3 py-2 text-[13px]">
          <b>PM implication:</b> {pmImplication}
        </div>
        <div className="bg-brand-greenSoft border-l-2 border-brand-green rounded-r-lg px-3 py-2 text-[13px]">
          <b>Business impact:</b> {businessImpact}
        </div>
        <div className="bg-canvas border-l-2 border-ink rounded-r-lg px-3 py-2 text-[13px]">
          <b>Recommended action:</b> {recommendedAction}
        </div>
      </div>
    </motion.div>
  );
}
