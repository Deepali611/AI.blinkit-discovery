"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { growthQuestions } from "@/lib/data";

const CONF_STYLES: Record<string, { text: string; bg: string }> = {
  High: { text: "#028A34", bg: "#E7F8ED" },
  Medium: { text: "#8A6A0F", bg: "#FFF6DD" },
};

export default function GrowthIntelligence() {
  const sections = [
    {
      title: "I. Habits & Core Barriers",
      indices: [0, 1, 3],
    },
    {
      title: "II. Unmet Needs & Frustrations",
      indices: [4, 5, 7],
    },
    {
      title: "III. Discovery & Targeting",
      indices: [2, 6],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Growth Intelligence"
        subtitle="All 8 required discovery questions, answered as validated growth signals."
      />
      <div className="space-y-10">
        {sections.map((sec) => (
          <div key={sec.title}>
            <h2 className="text-[11.5px] font-bold text-muted/80 uppercase tracking-wider mb-4">{sec.title}</h2>
            <div className="space-y-5">
              {sec.indices.map((idx) => {
                const item = growthQuestions[idx];
                const cs = CONF_STYLES[item.confidence];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface border border-line rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-yellowSoft/60 text-[#8A6A0F] border border-[#EFDC9E]/40 rounded-full px-3 py-1">
                        Signal {idx + 1}
                      </span>
                      <span
                        className="text-[10px] font-semibold rounded-full px-3 py-1 uppercase tracking-wider"
                        style={{ color: cs.text, background: cs.bg }}
                      >
                        Confidence: {item.confidence}
                      </span>
                    </div>
                    <div className="text-[16px] font-bold text-ink mb-2 tracking-tight">{item.q}</div>
                    <div className="text-[13.5px] text-ink/80 leading-relaxed">{item.a}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
