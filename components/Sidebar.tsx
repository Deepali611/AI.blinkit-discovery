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
  { href: "/executive-briefing", label: "Overview", icon: LayoutGrid },
  { href: "/discovery-pipeline", label: "Research Pipeline", icon: Workflow },
  { href: "/behavioral-intelligence", label: "Behavior Explorer", icon: Brain },
  { href: "/growth-intelligence", label: "Discovery Insights", icon: TrendingUp },
  { href: "/evidence-explorer", label: "Evidence Explorer", icon: SearchCheck },
  { href: "/opportunity-workspace", label: "Product Opportunities", icon: Rocket },
  { href: "/ai-validation", label: "AI Reliability", icon: ShieldCheck },
  { href: "/live-analysis", label: "Mine Reviews", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[72px] hover:w-64 shrink-0 border-r border-line bg-surface h-screen sticky top-0 flex flex-col transition-all duration-300 group overflow-hidden z-20">
      <div className="px-5 py-5 border-b border-line flex flex-col justify-center min-h-[85px] w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-brand-green flex items-center justify-center text-white text-sm font-bold">
            B
          </div>
          <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
            <div className="font-bold text-[14.5px] leading-tight">Growth Intelligence</div>
            <div className="text-[11px] text-muted mt-0.5">AI Discovery Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden w-full">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-1.5 rounded-lg text-[13.5px] font-medium transition-colors w-full ${
                active
                  ? "bg-brand-greenSoft text-brand-greenDark font-semibold"
                  : "text-ink/70 hover:bg-canvas hover:text-ink"
              }`}
            >
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                <Icon size={18} strokeWidth={2} />
              </div>
              <span className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-line text-[11px] text-muted whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100 shrink-0">
        {N} signals · {TOTAL_REVIEWS_SCANNED.toLocaleString()} reviews
      </div>
    </aside>
  );
}
