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
      className="bg-surface border border-[#E8E5DF] rounded-xl p-5 shadow-sm"
    >
      <div className="font-sans text-[10px] font-bold text-[#6B7566]/90 uppercase tracking-[0.08em]">{label}</div>
      <div className="font-sans text-[26px] font-extrabold text-[#1E221F] mt-2 tracking-tight leading-none">{value}</div>
      {note && <div className="font-sans text-[11px] text-[#6B7566] mt-2.5 leading-normal">{note}</div>}
    </motion.div>
  );
}
