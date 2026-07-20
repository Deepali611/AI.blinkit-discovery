"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; bar: string; bg: string }> = {
  High: { text: "#028A34", bar: "█████████░", bg: "bg-[#E7F8ED]" },
  Medium: { text: "#8A6A0F", bar: "██████░░░░", bg: "bg-[#FFF6DD]" },
  Low: { text: "#6B7566", bar: "███░░░░░░░", bg: "bg-[#F9F9FA]" },
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
      transition={{ duration: 0.35 }}
      className="bg-surface border-y border-r border-[#E4E8E1]/60 border-l-4 border-l-[#00B140] rounded-2xl shadow-sm mb-6 p-6 flex flex-col"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#028A34] bg-[#E7F8ED] px-2.5 py-1 rounded-full uppercase tracking-wider">
          <Sparkles size={11} /> AI Analysis Finding #{findingNumber}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#028A34]">
          <CheckCircle2 size={12} /> Validated Signal
        </span>
      </div>

      {/* Observation Section */}
      <div className="mb-5">
        <h4 className="text-[10px] font-bold text-muted/70 uppercase tracking-[0.06em] mb-1.5">Observation</h4>
        <div className="text-[17px] font-bold text-ink leading-snug tracking-tight">
          {summary}
        </div>
      </div>

      {chart && <div className="mb-5">{chart}</div>}

      {/* Structured Growth Analyst Details */}
      <div className="mt-4 pt-4 border-t border-[#E4E8E1]/60 space-y-4 text-[13px] text-ink/90 leading-relaxed">
        
        {/* Supporting Evidence */}
        <div>
          <span className="text-[11px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block mb-1">Supporting Evidence</span>
          <p className="text-ink/85">
            {evidenceN} customer reviews analyzed across <span className="font-semibold text-ink">{sources}</span>. {reasoning} <span className="text-muted">({validation})</span>
          </p>
        </div>

        {/* Confidence Block */}
        <div>
          <span className="text-[11px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block mb-1">Confidence</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11.5px] text-ink/70 tracking-normal">{cs.bar}</span>
            <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${cs.bg}`} style={{ color: cs.text }}>
              {confidence}
            </span>
          </div>
        </div>

        {/* Business Impact */}
        <div>
          <span className="text-[11px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block mb-1">Business Impact</span>
          <p className="text-ink/85">{businessImpact}</p>
        </div>

        {/* PM Implication */}
        <div>
          <span className="text-[11px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block mb-1">PM Implication</span>
          <p className="text-ink/85">{pmImplication}</p>
        </div>

        {/* Suggested Experiment */}
        <div>
          <span className="text-[11px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em] block mb-1 text-[#028A34]">Suggested Experiment</span>
          <p className="text-ink/90 font-medium bg-[#E7F8ED]/30 border border-[#00B140]/10 p-3 rounded-lg mt-1">
            {recommendedAction}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
