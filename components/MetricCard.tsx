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
      className="bg-surface border border-line rounded-xl p-4 shadow-card"
    >
      <div className="text-[11.5px] font-semibold text-muted uppercase tracking-wide">{label}</div>
      <div className="text-[26px] font-extrabold text-ink mt-1 tracking-tight">{value}</div>
      {note && <div className="text-[11.5px] text-muted mt-1">{note}</div>}
    </motion.div>
  );
}
