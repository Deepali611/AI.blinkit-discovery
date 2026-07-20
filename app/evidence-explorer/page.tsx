"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { reviews } from "@/lib/data";

const CONF_COLOR: Record<string, string> = { high: "#028A34", med: "#6B7566", low: "#9A9488" };

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
    <div>
      <PageHeader title="Evidence Explorer" subtitle="Drill from signal to theme to source review — full traceability." />

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Select label="Reason type" value={reasonType} onChange={setReasonType} options={reasonTypes} />
        <Select label="Segment" value={segment} onChange={setSegment} options={segments} />
        <Select label="Confidence" value={confidence} onChange={setConfidence} options={["All", "high", "med", "low"]} />
      </div>

      <p className="text-[12.5px] text-muted mb-3">{filtered.length} supporting reviews match this path</p>

      <div className="bg-surface border border-line rounded-2xl divide-y divide-line shadow-card">
        {filtered.slice(0, 30).map((r) => (
          <div key={r.row_number} className="px-6 py-4.5 text-[13.5px]">
            <span style={{ color: CONF_COLOR[r.confidence] }} className="font-semibold text-[12px] tracking-wider">{r.confidence.toUpperCase()}</span>
            {" · "}
            <span className="font-semibold text-ink">{r.reason_type}</span> · <span className="text-ink/80">{r.category_mentioned}</span> · <span className="text-ink/80">{r.user_segment}</span>
            <div className="text-muted/80 text-[12px] mt-1">
              Row #{r.row_number} — barrier: {r.barrier_to_new_category}
            </div>
          </div>
        ))}
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
    <div>
      <label className="text-[11.5px] font-semibold text-muted mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line rounded-xl px-3 py-2 text-[13px] bg-surface focus:outline-none focus:ring-2 focus:ring-brand-green/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
