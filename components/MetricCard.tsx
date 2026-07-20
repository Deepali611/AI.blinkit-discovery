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
      className="bg-surface border border-line/40 rounded-[20px] p-5 shadow-standard"
    >
      <div className="text-[10px] font-semibold text-muted/90 uppercase tracking-[0.06em]">{label}</div>
      <div className="text-[28px] text-ink mt-2 tracking-tight leading-none" style={{ fontWeight: 650 }}>{value}</div>
      {note && <div className="text-[11px] text-muted/80 mt-2 leading-normal">{note}</div>}
    </motion.div>
  );
}
