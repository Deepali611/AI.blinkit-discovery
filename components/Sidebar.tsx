"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

const WORKFLOW_STEPS = [
  { href: "/problem", label: "The Problem", numStr: "01" },
  { href: "/evidence", label: "Gathering Evidence", numStr: "02" },
  { href: "/extraction", label: "Filtering & Extraction", numStr: "03" },
  { href: "/validation", label: "Validation & Risks", numStr: "04" },
  { href: "/themes", label: "Themes & Signals", numStr: "05" },
  { href: "/insights", label: "Discovery Synthesis", numStr: "06" },
  { href: "/opportunities", label: "Opportunities", numStr: "07" },
  { href: "/sandbox", label: "Sandbox Playground", numStr: "08" },
];

export default function Sidebar() {
  const pathname = usePathname();

  let activeIdx = WORKFLOW_STEPS.findIndex(
    (s) => pathname === s.href || (pathname === "/" && s.href === "/problem")
  );
  if (activeIdx === -1) activeIdx = 0;

  return (
    <aside className="w-64 shrink-0 border-r border-[#ECE8DE] bg-[#F2F1EC] h-screen sticky top-0 flex flex-col z-20 transition-all duration-200 ease-out">
      
      {/* Workspace Branding Header */}
      <div className="px-5 py-6 border-b border-[#ECE8DE] flex flex-col justify-center min-h-[90px] w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-[14px] bg-[#F8CB46] flex items-center justify-center text-[#171717] text-[15px] font-black shadow-sm">
            B
          </div>
          <div>
            <h1 className="font-display font-bold text-[14px] text-[#171717] leading-tight tracking-tight">
              Blinkit Discovery Engine
            </h1>
            <div className="text-[9px] text-[#5F6368] font-semibold mt-0.5 tracking-wide uppercase">
              Review Analysis Workflow
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Chronological Stepper) */}
      <div className="flex-1 px-4 py-8 overflow-y-auto relative">
        <div className="relative pl-6 space-y-4">
          
          {/* Vertical Stepper Connecting Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-[#ECE8DE] z-0" />

          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeIdx;
            const isVisited = idx < activeIdx;
            const isFuture = idx > activeIdx;

            return (
              <Link
                key={step.href}
                href={step.href}
                className="flex items-center gap-3 relative py-2.5 z-10 w-full group focus:outline-none"
              >
                {/* Stepper Circle */}
                <div
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-mono font-bold z-10 border transition-all duration-200 ${
                    isActive
                      ? "bg-[#F8CB46] border-[#F8CB46] text-[#171717] shadow-sm"
                      : isVisited
                      ? "bg-[#1F8A70] border-[#1F8A70] text-white"
                      : "bg-[#F2F1EC] border-[#ECE8DE] text-[#8C8C8C]"
                  }`}
                >
                  {isVisited ? (
                    <Check size={11} strokeWidth={3} />
                  ) : (
                    <span>{step.numStr}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[12.5px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#171717] font-bold"
                      : isVisited
                      ? "text-[#5F6368] group-hover:text-[#171717]"
                      : "text-[#8C8C8C] group-hover:text-[#5F6368]"
                  }`}
                >
                  {step.label}
                </span>
              </Link>
            );
          })}

        </div>
      </div>

    </aside>
  );
}
