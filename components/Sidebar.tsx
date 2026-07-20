"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Workflow,
  Brain,
  TrendingUp,
  SearchCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

const WORKFLOW_NAV = [
  { href: "/executive-briefing", label: "Executive Briefing", icon: LayoutGrid },
  { href: "/discovery-pipeline", label: "Discovery Pipeline", icon: Workflow },
  { href: "/behavioral-intelligence", label: "Behavioral Intelligence", icon: Brain },
  { href: "/growth-intelligence", label: "Growth Intelligence", icon: TrendingUp },
];

const AUDIT_NAV = [
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck },
  { href: "/opportunity-workspace", label: "Opportunity Workspace", icon: Rocket },
  { href: "/ai-validation", label: "AI Validation", icon: ShieldCheck },
  { href: "/live-analysis", label: "Live Analysis", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-[#E8E5DF] bg-[#F5F2EC] h-screen sticky top-0 flex flex-col z-20">
      
      {/* Workspace Branding Header */}
      <div className="px-5 py-6 border-b border-[#E8E5DF] flex flex-col justify-center min-h-[90px] w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#00B140] flex items-center justify-center text-white text-[14px] font-black shadow-sm">
            B
          </div>
          <div>
            <h1 className="font-serif font-bold text-[15px] text-[#1E221F] leading-tight tracking-tight">
              Blinkit Growth
            </h1>
            <div className="text-[10px] text-[#6B7566] font-medium mt-0.5 tracking-wide">
              Discovery Engine
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Grouped by Scope) */}
      <div className="flex-1 px-3 py-6 overflow-y-auto space-y-6">
        
        {/* Section 1: Workflow */}
        <div className="space-y-1">
          <h3 className="px-3.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6B7566]/65 mb-2">
            Growth Workflow
          </h3>
          {WORKFLOW_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 text-[12.5px] font-medium transition-all w-full border-l-2 ${
                  active
                    ? "text-[#1E221F] font-bold border-[#F8CB46] bg-[#FAF8F5]/60"
                    : "text-[#1E221F]/70 border-transparent hover:text-[#1E221F] hover:bg-[#FAF8F5]/30"
                }`}
              >
                <Icon size={14} strokeWidth={active ? 2.5 : 2} className={active ? "text-[#00B140]" : "text-[#6B7566]/70"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Section 2: Evidence & Audits */}
        <div className="space-y-1">
          <h3 className="px-3.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6B7566]/65 mb-2">
            Evidence & Audits
          </h3>
          {AUDIT_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 text-[12.5px] font-medium transition-all w-full border-l-2 ${
                  active
                    ? "text-[#1E221F] font-bold border-[#F8CB46] bg-[#FAF8F5]/60"
                    : "text-[#1E221F]/70 border-transparent hover:text-[#1E221F] hover:bg-[#FAF8F5]/30"
                }`}
              >
                <Icon size={14} strokeWidth={active ? 2.5 : 2} className={active ? "text-[#00B140]" : "text-[#6B7566]/70"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Footer Metrics */}
      <div className="p-5 border-t border-[#E8E5DF] text-[11px] text-[#6B7566] shrink-0 space-y-1.5 bg-[#FAF8F5]/30">
        <div className="flex justify-between items-center">
          <span>Validated Signals</span>
          <span className="font-bold text-[#1E221F] font-mono text-[12px]">{N}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Scanned Dataset</span>
          <span className="font-bold text-[#1E221F] font-mono text-[11.5px]">{TOTAL_REVIEWS_SCANNED.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#028A34] pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B140] inline-block animate-pulse"></span>
          <span>Engine Status Active</span>
        </div>
      </div>
    </aside>
  );
}
