"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { growthQuestions } from "@/lib/data";

const CONF_BADGES: Record<string, string> = {
  High: "text-[#59624B] bg-[#F3F5F1] border-[#59624B]/15", // Olive
  Medium: "text-[#5F6368] bg-[#F2F1EC] border-[#ECE8DE]", // Stone
};

export default function GrowthIntelligence() {
  const sections = [
    {
      title: "Category Friction & Shopping Habits",
      indices: [0, 1, 3],
    },
    {
      title: "Frustrations & Latent Customer Needs",
      indices: [4, 5, 7],
    },
    {
      title: "Search, Discovery & Targeting Logic",
      indices: [2, 6],
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Discovery Intelligence"
        subtitle="Addressing the fellowship's 8 core discovery prompts. Each response represents a validated, evidence-backed growth finding."
      />

      <div className="space-y-12">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-6">
            {/* Section Divider */}
            <div className="border-b border-[#ECE8DE] pb-2">
              <h2 className="font-display font-extrabold text-[17px] text-[#171717] tracking-tight">
                {sec.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {sec.indices.map((idx) => {
                const item = growthQuestions[idx];
                const badgeStyle = CONF_BADGES[item.confidence] || "text-[#8C8C8C] bg-[#F2F1EC] border-[#ECE8DE]";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-4"
                  >
                    {/* Meta Tags */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-[#8C8C8C] bg-[#F2F1EC] px-2.5 py-0.5 rounded border border-[#ECE8DE]">
                        PROMPT #0{idx + 1}
                      </span>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeStyle}`}>
                        Confidence: {item.confidence}
                      </span>
                    </div>

                    {/* Question (Manrope) */}
                    <h3 className="font-display font-bold text-[16px] text-[#171717] leading-snug tracking-tight">
                      {item.q}
                    </h3>

                    {/* Answer (Secondary surface box with Left Yellow accent line) */}
                    <div className="text-[13px] text-[#5F6368] leading-relaxed bg-[#F2F1EC]/60 border-l-[3px] border-l-[#F8CB46] p-4 rounded-r-lg">
                      {item.a}
                    </div>
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
