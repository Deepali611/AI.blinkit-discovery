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
  Settings,
} from "lucide-react";
import { N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

const WORKFLOW_NAV = [
  { href: "/executive-briefing", label: "Executive Briefing", icon: LayoutGrid },
  { href: "/discovery-pipeline", label: "Discovery Pipeline", icon: Workflow },
  { href: "/growth-intelligence", label: "Growth Intelligence", icon: TrendingUp },
  { href: "/behavioral-intelligence", label: "Behavior Intelligence", icon: Brain },
];

const DATA_NAV = [
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck },
  { href: "/ai-validation", label: "AI Validation", icon: ShieldCheck },
  { href: "/live-analysis", label: "Mine Reviews", icon: Sparkles },
  { href: "/opportunity-workspace", label: "Opportunity Workspace", icon: Rocket },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-[#E4E8E1]/60 bg-[#F9F9FA] h-screen sticky top-0 flex flex-col z-20">
      {/* Workspace Selector Block */}
      <div className="px-5 py-5 border-b border-[#E4E8E1]/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[6px] bg-[#00B140] flex items-center justify-center text-white text-[13px] font-extrabold shadow-sm">
            B
          </div>
          <div>
            <div className="font-bold text-[13px] text-ink leading-tight tracking-tight">Blinkit Growth</div>
            <div className="text-[10px] text-muted font-medium mt-0.5">Growth Intelligence</div>
          </div>
        </div>
        <span className="text-[9px] bg-[#E7F8ED] border border-[#00B140]/20 text-[#028A34] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
          v2.4
        </span>
      </div>

      {/* Nav Content */}
      <div className="flex-1 px-3 py-5 overflow-y-auto space-y-6">
        
        {/* Section 1: Growth Workflow */}
        <div className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7566]/60 mb-2">
            Growth Workflow
          </h3>
          {WORKFLOW_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full ${
                  active
                    ? "bg-[#00B140]/8 text-[#028A34] font-semibold"
                    : "text-ink/80 hover:bg-canvas hover:text-ink"
                }`}
              >
                <Icon size={15} strokeWidth={2} className={active ? "text-[#028A34]" : "text-[#6B7566]/70"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Section 2: Evidence & Audits */}
        <div className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7566]/60 mb-2">
            Evidence & Audits
          </h3>
          {DATA_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full ${
                  active
                    ? "bg-[#00B140]/8 text-[#028A34] font-semibold"
                    : "text-ink/80 hover:bg-canvas hover:text-ink"
                }`}
              >
                <Icon size={15} strokeWidth={2} className={active ? "text-[#028A34]" : "text-[#6B7566]/70"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Section 3: Configuration */}
        <div className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7566]/60 mb-2">
            System
          </h3>
          <Link
            href="/executive-briefing"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium text-ink/70 hover:bg-canvas hover:text-ink transition-colors w-full"
          >
            <Settings size={15} strokeWidth={2} className="text-[#6B7566]/70" />
            <span>Settings</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-[#6B7566]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B140] inline-block animate-pulse"></span>
            <span>API Engine Status: Active</span>
          </div>
        </div>

      </div>

      {/* Footer Metrics */}
      <div className="p-4 border-t border-[#E4E8E1]/60 text-[11px] text-muted shrink-0 space-y-1">
        <div className="flex justify-between">
          <span>Validated Signals</span>
          <span className="font-semibold text-ink">{N}</span>
        </div>
        <div className="flex justify-between">
          <span>Reviews Scanned</span>
          <span className="font-semibold text-ink">{TOTAL_REVIEWS_SCANNED.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
}
