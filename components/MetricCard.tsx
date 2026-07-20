"use client";

import { motion } from "framer-motion";

export default function MetricCard({
  label,
  value,
  note,
  delay = 0,
}: {
  label: string;
  value: string | number;
  note?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-surface border border-line rounded-lg p-[18px] shadow-hero"
    >
      <div className="text-[11px] font-semibold text-muted uppercase tracking-[0.05em]">{label}</div>
      <div className="text-[28px] text-ink mt-2 tracking-tight leading-none" style={{ fontWeight: 650 }}>{value}</div>
      {note && <div className="text-[11.5px] text-muted/80 mt-2 leading-normal">{note}</div>}
    </motion.div>
  );
}
