"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Play,
  SearchCheck,
  Sparkles,
  Brain,
  ShieldCheck,
  TrendingUp,
  Rocket,
} from "lucide-react";
import { N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

const WORKFLOW_STEPS = [
  { href: "/executive-briefing", label: "Overview Desk", icon: LayoutGrid, step: null },
  { href: "/discovery-pipeline", label: "Collect & Clean", icon: Play, step: "01" },
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck, step: "02" },
  { href: "/live-analysis", label: "Run Live Analysis", icon: Sparkles, step: "03" },
  { href: "/behavioral-intelligence", label: "Behavioral Clusters", icon: Brain, step: "04" },
  { href: "/ai-validation", label: "Validation Logic", icon: ShieldCheck, step: "05" },
  { href: "/growth-intelligence", label: "Generated Insights", icon: TrendingUp, step: "06" },
  { href: "/opportunity-workspace", label: "Growth Opportunities", icon: Rocket, step: "07" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-[#ECE8DE] bg-[#F2F1EC] h-screen sticky top-0 flex flex-col z-20 transition-all duration-200 ease-out">
      
      {/* Workspace Branding Header */}
      <div className="px-5 py-6 border-b border-[#ECE8DE] flex flex-col justify-center min-h-[90px] w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-[14px] bg-[#171717] flex items-center justify-center text-[#F8CB46] text-[15px] font-black shadow-sm">
            B
          </div>
          <div>
            <h1 className="font-display font-bold text-[14px] text-[#171717] leading-tight tracking-tight">
              Blinkit RAW
            </h1>
            <div className="text-[9px] text-[#5F6368] font-semibold mt-0.5 tracking-wide uppercase">
              Review Analysis Workflow
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Chronological Steps) */}
      <div className="flex-1 px-2 py-6 overflow-y-auto space-y-6">
        <div className="space-y-1">
          <h3 className="px-4 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8C8C8C] mb-3">
            Workflow Pipeline
          </h3>
          {WORKFLOW_STEPS.map(({ href, label, icon: Icon, step }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 py-2 text-[12.5px] font-medium transition-all w-full border-l-[4px] pl-3 ${
                  active
                    ? "text-[#171717] font-bold border-[#F8CB46] bg-[#FFFFFF]/40"
                    : "text-[#5F6368] border-transparent hover:text-[#171717] hover:bg-[#FFFFFF]/20"
                }`}
              >
                <Icon size={14} strokeWidth={1.5} className={active ? "text-[#59624B]" : "text-[#5F6368]"} />
                <span className="flex-1 text-left">{label}</span>
                {step && (
                  <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border font-semibold tracking-normal shrink-0 ${
                    active ? "bg-[#59624B]/10 text-[#59624B] border-[#59624B]/20" : "bg-transparent text-[#8C8C8C] border-[#ECE8DE]"
                  }`}>
                    {step}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="p-5 border-t border-[#ECE8DE] text-[11px] text-[#5F6368] shrink-0 space-y-1.5 bg-[#FFFFFF]/10">
        <div className="flex justify-between items-center">
          <span>Validated Signals</span>
          <span className="font-bold text-[#171717] font-mono text-[12px]">{N}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Scanned Dataset</span>
          <span className="font-bold text-[#171717] font-mono text-[11.5px]">{TOTAL_REVIEWS_SCANNED.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#59624B] pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#59624B] inline-block"></span>
          <span>Engine Status Active</span>
        </div>
      </div>
    </aside>
  );
}
