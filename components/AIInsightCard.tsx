"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

const CONF_STYLES: Record<string, { text: string; bar: string; bg: string }> = {
  High: { text: "#59624B", bar: "█████████░", bg: "bg-[#F3F5F1]" }, // Muted Olive
  Medium: { text: "#5F6368", bar: "██████░░░░", bg: "bg-[#F2F1EC]" }, // Stone
  Low: { text: "#8C8C8C", bar: "███░░░░░░░", bg: "bg-[#F7F6F2]" }, // Charcoal
};

const BORDER_ACCENTS = {
  validated: "border-l-4 border-l-[#59624B]", // Deep Olive
  risk: "border-l-4 border-l-[#D64545]", // Rust Red
  opportunity: "border-l-4 border-l-[#F8CB46]", // Blinkit Yellow
};

const ICON_ACCENTS = {
  validated: <CheckCircle2 size={13} className="text-[#59624B]" />,
  risk: <AlertTriangle size={13} className="text-[#D64545]" />,
  opportunity: <Lightbulb size={13} className="text-[#F8CB46]" />,
};

const TEXT_COLORS = {
  validated: "text-[#59624B]",
  risk: "text-[#D64545]",
  opportunity: "text-[#171717]",
};

const BG_COLORS = {
  validated: "bg-[#F3F5F1] border-[#59624B]/20",
  risk: "bg-[#FFF5F5] border-[#D64545]/20",
  opportunity: "bg-[#FFF6DD] border-[#F8CB46]/30 shadow-[0_0_15px_rgba(248,203,70,0.06)]",
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
  const cs = CONF_STYLES[confidence] || CONF_STYLES.High;
  const borderStyle = BORDER_ACCENTS[type] || BORDER_ACCENTS.validated;
  const icon = ICON_ACCENTS[type] || ICON_ACCENTS.validated;
  const badgeColor = TEXT_COLORS[type] || TEXT_COLORS.validated;
  const badgeBg = BG_COLORS[type] || BG_COLORS.validated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className={`bg-surface border-y border-r border-[#ECE8DE] rounded-[18px] shadow-standard mb-6 p-6 flex flex-col transition-all duration-200 ease-out ${borderStyle}`}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[9.5px] font-bold ${badgeColor} ${badgeBg} border px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
          <Sparkles size={11} /> AI Analysis Finding #{findingNumber}
        </span>
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold capitalize ${badgeColor}`}>
          {icon} {type} Signal
        </span>
      </div>

      {/* Observation Heading (Manrope display font) */}
      <div className="mb-5">
        <h4 className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] mb-1.5">Observation</h4>
        <div className="font-display font-bold text-[17px] text-[#171717] leading-snug tracking-tight">
          {summary}
        </div>
      </div>

      {chart && <div className="mb-5">{chart}</div>}

      {/* Details Grid */}
      <div className="mt-4 pt-4 border-t border-[#ECE8DE] space-y-4 text-[12.5px] text-[#5F6368] leading-relaxed">
        
        {/* Supporting Evidence */}
        <div>
          <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1">Supporting Evidence</span>
          <p className="text-[#5F6368]">
            {evidenceN} customer reviews analyzed across <span className="font-semibold text-[#171717]">{sources}</span>. {reasoning} <span className="text-[#8C8C8C]">({validation})</span>
          </p>
        </div>

        {/* Confidence Progress */}
        <div>
          <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1">Confidence</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#8C8C8C] tracking-normal">{cs.bar}</span>
            <span className={`text-[9.5px] font-bold uppercase px-2 py-0.5 rounded ${cs.bg}`} style={{ color: cs.text }}>
              {confidence}
            </span>
          </div>
        </div>

        {/* Business Impact */}
        <div>
          <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1">Business Impact</span>
          <p className="text-[#5F6368]">{businessImpact}</p>
        </div>

        {/* PM Implication */}
        <div>
          <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] block mb-1">PM Implication</span>
          <p className="text-[#5F6368]">{pmImplication}</p>
        </div>

        {/* Suggested Experiment */}
        <div>
          <span className="font-sans text-[9px] font-bold text-[#59624B] uppercase tracking-[0.08em] block mb-1">Suggested Experiment</span>
          <p className="text-[#171717] font-medium bg-[#F3F5F1] border border-[#ECE8DE] p-3.5 rounded-[14px] mt-1">
            {recommendedAction}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
