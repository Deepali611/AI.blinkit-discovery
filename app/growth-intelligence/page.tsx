"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { growthQuestions } from "@/lib/data";

const CONF_BADGES: Record<string, string> = {
  High: "text-[#028A34] bg-[#E7F8ED] border-[#00B140]/10",
  Medium: "text-[#8A6A0F] bg-[#FFF6DD] border-[#F8CB46]/10",
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
        title="Growth Intelligence"
        subtitle="Addressing the fellowship's 8 core discovery prompts. Each response represents a validated, evidence-backed growth finding."
      />

      <div className="space-y-12">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-6">
            {/* Section Divider */}
            <div className="border-b border-[#E8E5DF] pb-2">
              <h2 className="font-serif font-bold text-[18px] text-[#1E221F]">
                {sec.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {sec.indices.map((idx) => {
                const item = growthQuestions[idx];
                const badgeStyle = CONF_BADGES[item.confidence] || "text-[#6B7566] bg-[#FAF8F5]";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface border border-[#E8E5DF] rounded-xl p-5 shadow-sm space-y-4"
                  >
                    {/* Meta Tags */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-[#6B7566] bg-[#F5F2EC] px-2 py-0.5 rounded border border-[#E8E5DF]">
                        PROMPT #0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeStyle}`}>
                        Confidence: {item.confidence}
                      </span>
                    </div>

                    {/* Question (Serif Lora) */}
                    <h3 className="font-serif font-bold text-[17px] text-[#1E221F] leading-snug tracking-tight">
                      {item.q}
                    </h3>

                    {/* Answer (Beige box with Left Yellow accent line) */}
                    <div className="text-[13.5px] text-[#1E221F]/90 leading-relaxed bg-[#FAF8F5]/80 border-l-[3px] border-l-[#F8CB46] p-4 rounded-r-lg">
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
