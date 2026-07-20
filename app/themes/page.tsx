"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

const THEMES = [
  {
    id: "trust",
    num: "01",
    title: "Category transaction risk prevents exploration, not pricing barriers.",
    evidence: "55.6% of customer friction mentions center on trust erosion (unsealed boxes, crushed items, short product expiries) rather than routine habits or price objections.",
    matters: "Customers actively explore new listings but exit when the downside risk is high. Adding recommender systems is useless without live packaging assurances.",
    accent: "border-l-4 border-l-[#D64545] bg-[#FFF5F5] text-[#D64545]"
  },
  {
    id: "price",
    num: "02",
    title: "Cross-app price sensitivity triggers immediate platform switching, bypassing loyal habits.",
    evidence: "21.2% of raw reviews document price-driven app switching (comparing delivery charges, tax fees, or grocery item prices against competitors).",
    matters: "Customer exploration is active, but high price friction drives instant churn to alternative quick-commerce apps. Front-end pricing transparency is required to prevent checkout abandonment.",
    accent: "border-l-4 border-l-[#F8CB46] bg-[#FFF6DD] text-[#171717]"
  }
];

export default function ThemesStage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = THEMES[activeIdx];

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 4 — Themes & Behavioral Signals"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          Aggregated behavioral patterns are extracted by the engine. Rather than showing a crowded grid of metrics, we isolate and interpret key themes one at a time:
        </p>

        {/* Theme Stepper Selector */}
        <div className="flex gap-3 border-b border-[#ECE8DE] pb-3">
          {THEMES.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 text-[12.5px] font-bold rounded-full transition-colors ${
                activeIdx === idx ? "bg-[#171717] text-white" : "bg-[#F2F1EC] text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              Theme {theme.num}
            </button>
          ))}
        </div>

        {/* Theme Detail Panel */}
        <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-6 shadow-standard space-y-5">
          {/* Finding statement */}
          <div className="space-y-1">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Finding:</span>
            <p className="font-display font-extrabold text-[18px] text-[#171717] tracking-tight leading-snug">
              {t.title}
            </p>
          </div>

          {/* Supporting Evidence */}
          <div className="space-y-1.5">
            <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Supporting Evidence (takeaway sentence):</span>
            <div className={`p-4 rounded-[14px] text-[13px] leading-relaxed ${t.accent}`}>
              {t.evidence}
            </div>
          </div>

          {/* Why it matters */}
          <div className="space-y-1 pt-2">
            <span className="font-sans text-[9px] font-bold text-[#59624B] uppercase tracking-wider block">Why it matters to product decisions:</span>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              {t.matters}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/validation"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 3: Validation & Safety
        </Link>
        <Link
          href="/insights"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Discovery Synthesis <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
