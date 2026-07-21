import { ShieldCheck } from "lucide-react";
import { N, TOTAL_REVIEWS_SCANNED } from "@/lib/data";

export default function SignalQualityBanner() {
  const filteredCount = TOTAL_REVIEWS_SCANNED - N; // 1176 - 189 = 987
  return (
    <div className="bg-surface/65 border border-[#ECE8DE] rounded-[14px] px-4 py-2.5 flex items-center gap-2.5 text-[12px] text-[#5F6368] leading-normal shadow-sm">
      <ShieldCheck size={14} className="text-[#59624B] shrink-0" />
      <span>
        Using <strong className="text-[#171717]">{N}</strong> high-confidence signals from <strong className="text-[#171717]">{TOTAL_REVIEWS_SCANNED.toLocaleString()}</strong> reviews scanned. <strong className="text-[#171717]">{filteredCount}</strong> records were filtered out — off-topic, no reasoning stated, or below signal threshold — so every chart stays grounded in real evidence.
      </span>
    </div>
  );
}
