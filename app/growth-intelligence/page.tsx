"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { growthQuestions } from "@/lib/data";

const CONF_STYLES: Record<string, { text: string; border: string }> = {
  High: { text: "#00B140", border: "#00B140" },
  Medium: { text: "#8A6A0F", border: "#EFDC9E" },
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
            <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>{sec.title}</h2>
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
                    className="bg-surface border border-line rounded-lg p-[18px] shadow-standard"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[13px] rounded-full py-[7px] px-[12px] border border-[#EFDC9E] text-[#8A6A0F] bg-transparent"
                        style={{ fontWeight: 750 }}
                      >
                        Signal {idx + 1}
                      </span>
                      <span
                        className="text-[13px] rounded-full py-[7px] px-[12px] uppercase tracking-wider bg-transparent border"
                        style={{ color: cs.text, borderColor: cs.border, fontWeight: 750 }}
                      >
                        Confidence: {item.confidence}
                      </span>
                    </div>
                    <div className="text-[16px] font-bold text-ink mb-2 tracking-tight">{item.q}</div>
                    <div className="text-[13.5px] text-ink/80 leading-relaxed" style={{ lineHeight: 1.55 }}>{item.a}</div>
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
