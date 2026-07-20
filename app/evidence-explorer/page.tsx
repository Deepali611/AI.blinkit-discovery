"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { reviews } from "@/lib/data";

const CONF_COLOR: Record<string, { text: string; bg: string }> = {
  high: { text: "#59624B", bg: "bg-[#F3F5F1]" }, // Olive
  med: { text: "#5F6368", bg: "bg-[#F2F1EC]" }, // Stone
  low: { text: "#8C8C8C", bg: "bg-[#F7F6F2]" }, // Charcoal
};

export default function EvidenceExplorer() {
  const [reasonType, setReasonType] = useState("All");
  const [segment, setSegment] = useState("All");
  const [confidence, setConfidence] = useState("All");

  const reasonTypes = useMemo(() => ["All", ...Array.from(new Set(reviews.map((r) => r.reason_type))).sort()], []);
  const segments = useMemo(() => ["All", ...Array.from(new Set(reviews.map((r) => r.user_segment))).sort()], []);

  const filtered = useMemo(() => {
    return reviews.filter(
      (r) =>
        (reasonType === "All" || r.reason_type === reasonType) &&
        (segment === "All" || r.user_segment === segment) &&
        (confidence === "All" || r.confidence === confidence)
    );
  }, [reasonType, segment, confidence]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evidence Explorer"
        subtitle="Operational review database. Full trace validation from raw customer reviews to AI behavioral tags."
      />

      {/* Filter Toolbar (Linear-style) */}
      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-4 shadow-standard flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select label="Theme Filter" value={reasonType} onChange={setReasonType} options={reasonTypes} />
          <Select label="Segment Filter" value={segment} onChange={setSegment} options={segments} />
          <Select label="Confidence" value={confidence} onChange={setConfidence} options={["All", "high", "med", "low"]} />
        </div>
        <div className="text-[12px] text-[#5F6368] font-semibold">
          {filtered.length} matching reviews
        </div>
      </div>

      {/* Issue Table List (GitHub-style) */}
      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] overflow-hidden shadow-standard">
        <div className="bg-[#F2F1EC] px-4 py-3 border-b border-[#ECE8DE] flex justify-between text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">
          <span>Verbatim Customer Review</span>
          <span>Attributes</span>
        </div>

        <div className="divide-y divide-[#ECE8DE]/60">
          {filtered.slice(0, 30).map((r) => {
            const cs = CONF_COLOR[r.confidence] || CONF_COLOR.low;
            return (
              <div key={r.row_number} className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] hover:bg-[#F2F1EC]/20 transition-colors">
                {/* Left Side: Verbatim Content (Manrope display heading, Inter body) */}
                <div className="space-y-2 max-w-3xl leading-relaxed">
                  <div className="font-sans font-medium text-[13.5px] text-[#171717]">
                    &quot;{r.quote}&quot;
                  </div>
                  <div className="flex items-center gap-2 text-[10.5px] text-[#5F6368]">
                    <span className="font-mono bg-[#F2F1EC] border border-[#ECE8DE] px-1.5 py-0.2 rounded-md text-[#8C8C8C]">
                      Row #{r.row_number}
                    </span>
                    <span>·</span>
                    <span className="text-[#D64545] font-semibold bg-[#FFF5F5] px-2.5 py-0.5 rounded-full border border-[#D64545]/10 text-[10px]">
                      Barrier: {r.barrier_to_new_category}
                    </span>
                  </div>
                </div>

                {/* Right Side: Metadata Tags */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`text-[9.5px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${cs.bg}`} style={{ color: cs.text, borderColor: cs.text + "20" }}>
                    {r.confidence}
                  </span>
                  <span className="text-[9.5px] font-bold text-[#59624B] bg-[#F3F5F1] border border-[#59624B]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {r.category_mentioned}
                  </span>
                  <span className="text-[9.5px] font-bold text-[#5F6368] bg-[#F2F1EC] border border-[#ECE8DE] px-2.5 py-0.5 rounded-full capitalize">
                    {r.user_segment}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-sans text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-[14px] px-3 py-1.5 text-[12px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#F8CB46] font-semibold"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
