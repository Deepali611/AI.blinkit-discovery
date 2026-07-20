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

const NAV = [
  { href: "/executive-briefing", label: "Executive Briefing", icon: LayoutGrid },
  { href: "/discovery-pipeline", label: "Discovery Pipeline", icon: Workflow },
  { href: "/behavioral-intelligence", label: "Behavioral Intelligence", icon: Brain },
  { href: "/growth-intelligence", label: "Growth Intelligence", icon: TrendingUp },
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck },
  { href: "/opportunity-workspace", label: "Opportunity Workspace", icon: Rocket },
  { href: "/ai-validation", label: "AI Validation", icon: ShieldCheck },
  { href: "/live-analysis", label: "Live Analysis", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-line bg-surface h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <div>
            <div className="font-bold text-[14.5px] leading-tight">Growth Intelligence</div>
          </div>
        </div>
        <div className="text-[11px] text-muted mt-1">AI-Powered Discovery Engine</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-medium transition-colors ${
                active
                  ? "bg-brand-greenSoft text-brand-greenDark"
                  : "text-ink/70 hover:bg-canvas"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-line text-[11px] text-muted">
        {N} validated signals · {TOTAL_REVIEWS_SCANNED.toLocaleString()} reviews scanned
      </div>
    </aside>
  );
}
