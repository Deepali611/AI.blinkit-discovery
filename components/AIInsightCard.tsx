"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; bar: string; bg: string }> = {
  High: { text: "#028A34", bar: "█████████░", bg: "bg-[#E7F8ED]" },
  Medium: { text: "#8A6A0F", bar: "██████░░░░", bg: "bg-[#FFF6DD]" },
  Low: { text: "#6B7566", bar: "███░░░░░░░", bg: "bg-[#FAF8F5]" },
};

const BORDER_ACCENTS = {
  validated: "border-l-4 border-l-[#00B140]",
  risk: "border-l-4 border-l-[#8B263E]",
  opportunity: "border-l-4 border-l-[#FD7E14]",
};

const ICON_ACCENTS = {
  validated: <CheckCircle2 size={13} className="text-[#00B140]" />,
  risk: <AlertTriangle size={13} className="text-[#8B263E]" />,
  opportunity: <Lightbulb size={13} className="text-[#FD7E14]" />,
};

const TEXT_COLORS = {
  validated: "text-[#028A34]",
  risk: "text-[#8B263E]",
  opportunity: "text-[#D9480F]",
};

const BG_COLORS = {
  validated: "bg-[#E7F8ED] border-[#00B140]/20",
  risk: "bg-[#FDF2F4] border-[#8B263E]/20",
  opportunity: "bg-[#FFF4E6] border-[#FD7E14]/20",
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
  type = "validated",
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
  type?: "validated" | "risk" | "opportunity";
}) {
  const cs = CONF_STYLES[confidence];
  const borderStyle = BORDER_ACCENTS[type] || BORDER_ACCENTS.validated;
  const icon = ICON_ACCENTS[type] || ICON_ACCENTS.validated;
  const badgeColor = TEXT_COLORS[type] || TEXT_COLORS.validated;
  const badgeBg = BG_COLORS[type] || BG_COLORS.validated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`bg-surface border-y border-r border-[#E8E5DF] rounded-xl shadow-sm mb-6 p-6 flex flex-col ${borderStyle}`}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${badgeColor} ${badgeBg} border px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
          <Sparkles size={11} /> AI Analysis Finding #{findingNumber}
        </span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold capitalize ${badgeColor}`}>
          {icon} {type} Signal
        </span>
      </div>

      {/* Observation Heading (Lora Serif) */}
      <div className="mb-5">
        <h4 className="text-[9.5px] font-bold text-[#6B7566]/85 uppercase tracking-[0.08em] mb-1.5">Observation</h4>
        <div className="font-serif font-semibold text-[17.5px] text-[#1E221F] leading-snug tracking-tight">
          {summary}
        </div>
      </div>

      {chart && <div className="mb-5">{chart}</div>}

      {/* Details Grid */}
      <div className="mt-4 pt-4 border-t border-[#E8E5DF] space-y-4 text-[13px] text-[#1E221F]/90 leading-relaxed">
        
        {/* Supporting Evidence */}
        <div>
          <span className="text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.06em] block mb-1">Supporting Evidence</span>
          <p className="text-[#1E221F]/85">
            {evidenceN} customer reviews analyzed across <span className="font-semibold text-[#1E221F]">{sources}</span>. {reasoning} <span className="text-[#6B7566]">({validation})</span>
          </p>
        </div>

        {/* Confidence Progress */}
        <div>
          <span className="text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.06em] block mb-1">Confidence</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11.5px] text-[#1E221F]/70 tracking-normal">{cs.bar}</span>
            <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${cs.bg}`} style={{ color: cs.text }}>
              {confidence}
            </span>
          </div>
        </div>

        {/* Business Impact */}
        <div>
          <span className="text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.06em] block mb-1">Business Impact</span>
          <p className="text-[#1E221F]/85">{businessImpact}</p>
        </div>

        {/* PM Implication */}
        <div>
          <span className="text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.06em] block mb-1">PM Implication</span>
          <p className="text-[#1E221F]/85">{pmImplication}</p>
        </div>

        {/* Suggested Experiment */}
        <div>
          <span className="text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.06em] block mb-1 text-[#028A34]">Suggested Experiment</span>
          <p className="text-[#1E221F]/90 font-medium bg-[#E7F8ED]/30 border border-[#00B140]/10 p-3 rounded-lg mt-1">
            {recommendedAction}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
