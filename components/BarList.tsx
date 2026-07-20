"use client";

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function BarList({
  data,
  colors,
  unit = "mentions",
}: {
  data: Record<string, number>;
  colors: Record<string, string>;
  unit?: string;
}) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  const rows = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name: name.replace(/_/g, " "), count, pct: ((count / total) * 100).toFixed(0) }));

  return (
    <div style={{ width: "100%", height: rows.length * 40 + 10 }}>
      <ResponsiveContainer>
        <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 12.5, fill: "#16201A" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: any, _name: any, props: any) => [`${value} ${unit} (${props?.payload?.pct}%)`, ""]}
            contentStyle={{ borderRadius: 8, border: "1px solid #E4E8E1", fontSize: 12.5 }}
          />
          <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={10} label={{ position: "right", fontSize: 12, fill: "#6B7566" }}>
            {rows.map((row, i) => (
              <Cell key={i} fill={colors[row.name.replace(/ /g, "_")] || "#C9C4B8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
