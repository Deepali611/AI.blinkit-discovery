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
      className="bg-surface border border-line rounded-2xl p-6 shadow-card"
    >
      <div className="text-[10.5px] font-semibold text-muted uppercase tracking-wider">{label}</div>
      <div className="text-[30px] font-bold text-ink mt-2 tracking-tight leading-none">{value}</div>
      {note && <div className="text-[11.5px] text-muted/80 mt-2 leading-normal">{note}</div>}
    </motion.div>
  );
}
