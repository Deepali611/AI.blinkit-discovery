import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Database } from "lucide-react";

const SOURCE_CARDS = [
  {
    name: "Google Play Store Reviews",
    metrics: "56.3% of aggregated feed",
    purpose: "Captures immediate post-delivery feedback and quick quality complaints.",
  },
  {
    name: "Reddit Community Threads",
    metrics: "30.6% of aggregated feed",
    purpose: "Captures long-form discussions comparing Blinkit to alternative retail channels.",
  },
  {
    name: "YouTube Comment Sections",
    metrics: "12.2% of aggregated feed",
    purpose: "Captures unedited reviews highlighting product packaging and item quality.",
  },
  {
    name: "Apple App Store Reviews",
    metrics: "0.9% of aggregated feed",
    purpose: "Provides qualitative iOS feedback. Treats small sample size (n=10) as directional only.",
  }
];

export default function EvidenceStage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Blinkit Discovery Engine"
        subtitle="Stage 1 — Gathering Evidence"
      />

      <div className="space-y-6">
        <p className="font-sans text-[14.5px] leading-relaxed text-[#5F6368] max-w-2xl">
          To isolate category discovery barriers, we pull customer feedback across channels where organic buying complaints are most prominent. We limit density to focus on high-fidelity channels:
        </p>

        {/* Source Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOURCE_CARDS.map((src) => (
            <div key={src.name} className="bg-surface border border-[#ECE8DE] rounded-[18px] p-5 shadow-standard space-y-3 flex flex-col justify-between min-h-[200px]">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-[14px] bg-[#F2F1EC] flex items-center justify-center text-[#59624B]">
                  <Database size={15} strokeWidth={1.5} />
                </div>
                <h4 className="font-display font-bold text-[14px] text-[#171717] leading-tight">
                  {src.name}
                </h4>
                <p className="text-[11.5px] text-[#8C8C8C] font-mono">{src.metrics}</p>
                <p className="text-[12px] text-[#5F6368] leading-relaxed">
                  {src.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Queue Status callout */}
        <div className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-[18px] p-5 flex items-center justify-between text-[13px] text-[#5F6368]">
          <span>Evidence Collection Queue Status:</span>
          <span className="font-mono text-[#59624B] font-bold">1,176 raw review strings aggregated</span>
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#ECE8DE]">
        <Link
          href="/problem"
          className="bg-surface border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Stage 0: The Problem
        </Link>
        <Link
          href="/extraction"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Filtering & Extraction <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
