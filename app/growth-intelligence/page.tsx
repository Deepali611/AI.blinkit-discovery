"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { growthQuestions } from "@/lib/data";

const CONF_STYLES: Record<string, { text: string; bg: string }> = {
  High: { text: "#028A34", bg: "#E7F8ED" },
  Medium: { text: "#8A6A0F", bg: "#FFF6DD" },
};

export default function GrowthIntelligence() {
  return (
    <div>
      <PageHeader
        title="Growth Intelligence"
        subtitle="All 8 required discovery questions, answered as validated growth signals."
      />
      <div className="space-y-3">
        {growthQuestions.map((item, i) => {
          const cs = CONF_STYLES[item.confidence];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-surface border border-line rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-brand-yellowSoft text-[#8A6A0F] border border-[#EFDC9E] rounded px-2 py-0.5">
                  Signal {i + 1}
                </span>
                <span
                  className="text-[10.5px] font-extrabold rounded px-2 py-0.5"
                  style={{ color: cs.text, background: cs.bg }}
                >
                  CONFIDENCE: {item.confidence.toUpperCase()}
                </span>
              </div>
              <div className="text-[14.5px] font-semibold mb-1">{item.q}</div>
              <div className="text-[13px] text-ink/85 leading-relaxed">{item.a}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
