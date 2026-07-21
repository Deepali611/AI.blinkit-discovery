"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import { reviews, ReviewRow } from "@/lib/data";

interface VerbatimEvidenceProps {
  reasonType?: string;
  category?: string;
  segment?: string;
  hasInfoNeeded?: boolean;
  limit?: number;
}

export default function VerbatimEvidence({
  reasonType,
  category,
  segment,
  hasInfoNeeded,
  limit = 2
}: VerbatimEvidenceProps) {
  const [expanded, setExpanded] = useState(false);

  // Filter dynamically to ensure absolute data integrity
  const matchedReviews = reviews.filter((r) => {
    if (reasonType && r.reason_type !== reasonType) return false;
    if (category && r.category_mentioned.toLowerCase() !== category.toLowerCase()) return false;
    if (segment && r.user_segment !== segment) return false;
    if (hasInfoNeeded && (!r.info_needed || r.info_needed === "none" || r.info_needed === "not stated")) return false;
    return true;
  }).slice(0, limit);

  if (matchedReviews.length === 0) return null;

  return (
    <div className="mt-3 text-[12px] border border-[#ECE8DE] rounded-[12px] overflow-hidden bg-[#FFFFFF]/40 shadow-sm max-w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3.5 py-2 text-[#5F6368] hover:text-[#171717] hover:bg-[#F2F1EC]/30 font-bold transition-all text-left focus:outline-none"
      >
        <span className="flex items-center gap-1.5">
          <Quote size={11} className="text-[#59624B]" />
          Verbatim Evidence Examples ({matchedReviews.length} reviews)
        </span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div className="p-3.5 border-t border-[#ECE8DE] space-y-3 bg-[#FFFFFF]/70">
          {matchedReviews.map((r) => (
            <div key={r.row_number} className="space-y-1">
              <p className="italic text-[#171717] leading-relaxed">
                &quot;{r.quote}&quot;
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#8C8C8C] font-mono">
                <span>Row #{r.row_number}</span>
                <span>•</span>
                <span className={`uppercase font-bold ${
                  r.confidence === "high" ? "text-[#59624B]" : "text-[#F59E0B]"
                }`}>
                  Confidence: {r.confidence}
                </span>
                <span>•</span>
                <span className="bg-[#F2F1EC] text-[#5F6368] px-1.5 py-0.2 rounded font-sans">
                  Segment: {r.user_segment}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
