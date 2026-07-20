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

const NAV = [
  { href: "/executive-briefing", label: "Executive Briefing", icon: LayoutGrid },
  { href: "/discovery-pipeline", label: "Discovery Pipeline", icon: Workflow },
  { href: "/growth-intelligence", label: "Growth Intelligence", icon: TrendingUp },
  { href: "/behavioral-intelligence", label: "Behavior Intelligence", icon: Brain },
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck },
  { href: "/ai-validation", label: "AI Validation", icon: ShieldCheck },
  { href: "/opportunity-workspace", label: "Opportunity Workspace", icon: Rocket },
  { href: "/live-analysis", label: "Mine Reviews", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-line bg-surface h-screen sticky top-0 flex flex-col z-20">
      {/* Title Header */}
      <div className="px-5 py-5 border-b border-line flex flex-col justify-center min-h-[85px] w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-brand-green flex items-center justify-center text-white text-sm font-bold">
            B
          </div>
          <div>
            <div className="font-bold text-[14px] leading-tight text-ink">Growth Intelligence</div>
            <div className="text-[11px] text-muted mt-0.5">AI-Powered Discovery</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden w-full">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors w-full ${
                active
                  ? "bg-brand-greenSoft text-brand-greenDark font-semibold"
                  : "text-ink/75 hover:bg-canvas hover:text-ink"
              }`}
            >
              <Icon size={16} strokeWidth={2} className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}

        {/* Settings (Placeholder link) */}
        <Link
          href="/executive-briefing"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-ink/50 hover:bg-canvas hover:text-ink transition-colors w-full"
        >
          <Settings size={16} strokeWidth={2} className="shrink-0" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-line text-[11px] text-muted shrink-0">
        <div className="font-semibold text-ink/75">{N} validated signals</div>
        <div className="mt-0.5">{TOTAL_REVIEWS_SCANNED.toLocaleString()} reviews analyzed</div>
      </div>
    </aside>
  );
}
