"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { reviews } from "@/lib/data";

const CONF_COLOR: Record<string, { text: string; bg: string }> = {
  high: { text: "#028A34", bg: "bg-[#E7F8ED]" },
  med: { text: "#8A6A0F", bg: "bg-[#FFF6DD]" },
  low: { text: "#6B7566", bg: "bg-[#FAF8F5]" },
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
      <div className="bg-surface border border-[#E8E5DF] rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select label="Theme Filter" value={reasonType} onChange={setReasonType} options={reasonTypes} />
          <Select label="Segment Filter" value={segment} onChange={setSegment} options={segments} />
          <Select label="Confidence" value={confidence} onChange={setConfidence} options={["All", "high", "med", "low"]} />
        </div>
        <div className="text-[12px] text-[#6B7566] font-medium">
          {filtered.length} matching reviews
        </div>
      </div>

      {/* Issue Table List (GitHub-style) */}
      <div className="bg-surface border border-[#E8E5DF] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#FAF8F5] px-4 py-3 border-b border-[#E8E5DF] flex justify-between text-[10px] font-bold text-[#6B7566]/80 uppercase tracking-[0.08em]">
          <span>Verbatim Customer Review</span>
          <span>Attributes</span>
        </div>

        <div className="divide-y divide-[#E8E5DF]/50">
          {filtered.slice(0, 30).map((r) => {
            const cs = CONF_COLOR[r.confidence] || CONF_COLOR.low;
            return (
              <div key={r.row_number} className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px]">
                {/* Left Side: Verbatim Content (Lora Serif for quote) */}
                <div className="space-y-2 max-w-3xl leading-relaxed">
                  <div className="font-serif font-medium text-[14.5px] text-[#1E221F]">
                    &quot;{r.quote}&quot;
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7566]">
                    <span className="font-mono bg-[#F5F2EC] border border-[#E8E5DF] px-1.5 py-0.2 rounded">
                      Row #{r.row_number}
                    </span>
                    <span>·</span>
                    <span className="text-[#8B263E] font-semibold bg-[#FDF2F4] px-2 py-0.5 rounded border border-[#8B263E]/10">
                      Barrier: {r.barrier_to_new_category}
                    </span>
                  </div>
                </div>

                {/* Right Side: Metadata Tags */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${cs.bg}`} style={{ color: cs.text, borderColor: cs.text + "15" }}>
                    {r.confidence}
                  </span>
                  <span className="text-[10px] font-bold text-[#7C5CBF] bg-[#7C5CBF]/10 border border-[#7C5CBF]/20 px-2 py-0.5 rounded uppercase tracking-wider">
                    {r.category_mentioned}
                  </span>
                  <span className="text-[10px] font-bold text-[#6B7566] bg-[#FAF8F5] border border-[#E8E5DF] px-2 py-0.5 rounded capitalize">
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
      <span className="text-[11px] font-bold text-[#6B7566]/80 uppercase tracking-[0.08em]">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#FAF8F5] border border-[#E8E5DF] rounded-md px-2.5 py-1 text-[12px] text-[#1E221F] focus:outline-none focus:ring-1 focus:ring-[#00B140] font-medium"
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
