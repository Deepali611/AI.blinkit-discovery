"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { reviews } from "@/lib/data";

const CONF_COLOR: Record<string, { text: string; bg: string }> = {
  high: { text: "#028A34", bg: "bg-[#E7F8ED]" },
  med: { text: "#8A6A0F", bg: "bg-[#FFF6DD]" },
  low: { text: "#6B7566", bg: "bg-[#F9F9FA]" },
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
      <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select label="Theme Filter" value={reasonType} onChange={setReasonType} options={reasonTypes} />
          <Select label="Segment Filter" value={segment} onChange={setSegment} options={segments} />
          <Select label="Confidence" value={confidence} onChange={setConfidence} options={["All", "high", "med", "low"]} />
        </div>
        <div className="text-[12px] text-muted/80 font-medium">
          {filtered.length} matching reviews
        </div>
      </div>

      {/* Issue Table List (GitHub-style) */}
      <div className="bg-surface border border-[#E4E8E1]/60 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#F9F9FA] px-4 py-3 border-b border-[#E4E8E1]/60 flex justify-between text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em]">
          <span>Verbatim Customer Review</span>
          <span>Attributes</span>
        </div>

        <div className="divide-y divide-[#E4E8E1]/40">
          {filtered.slice(0, 30).map((r) => {
            const cs = CONF_COLOR[r.confidence];
            return (
              <div key={r.row_number} className="px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px]">
                {/* Left Side: Verbatim Content */}
                <div className="space-y-1.5 max-w-3xl leading-relaxed">
                  <div className="text-ink font-medium">
                    &quot;{r.quote}&quot;
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#868E96]">
                    <span className="font-mono bg-canvas border border-[#E4E8E1]/40 px-1 py-0.2 rounded">
                      Row #{r.row_number}
                    </span>
                    <span>·</span>
                    <span className="text-[#FA5252] font-semibold">
                      Barrier: {r.barrier_to_new_category}
                    </span>
                  </div>
                </div>

                {/* Right Side: Metadata Tags */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${cs.bg}`} style={{ color: cs.text }}>
                    {r.confidence}
                  </span>
                  <span className="text-[10px] font-bold text-[#7950F2] bg-[#7950F2]/8 px-2 py-0.5 rounded uppercase tracking-wider">
                    {r.category_mentioned}
                  </span>
                  <span className="text-[10px] font-bold text-[#6B7566] bg-canvas border border-[#E4E8E1]/60 px-2 py-0.5 rounded capitalize">
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
      <span className="text-[11.5px] font-bold text-[#6B7566]/70 uppercase tracking-[0.06em]">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-canvas border border-[#E4E8E1]/60 rounded-md px-2.5 py-1 text-[12.5px] text-ink focus:outline-none focus:ring-1 focus:ring-[#00B140]"
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
