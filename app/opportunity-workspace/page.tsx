import PageHeader from "@/components/PageHeader";
import { opportunities } from "@/lib/data";

const IMPACT_COLOR: Record<string, string> = { High: "#028A34", Medium: "#B8860B", Low: "#6B7566" };

export default function OpportunityWorkspace() {
  return (
    <div>
      <PageHeader
        title="Opportunity Workspace"
        subtitle="Growth experiments ranked by business impact, confidence, and effort."
      />
      <div className="space-y-3">
        {opportunities.map((o) => (
          <div key={o.title} className="bg-surface border border-line rounded-2xl p-5 shadow-card">
            <div className="text-[15.5px] font-semibold mb-2">{o.title}</div>
            <div className="flex gap-2 mb-3">
              <Badge label={`IMPACT: ${o.impact.toUpperCase()}`} color={IMPACT_COLOR[o.impact]} />
              <Badge label={`CONFIDENCE: ${o.confidence.toUpperCase()}`} color="#16201A" muted />
              <Badge label={`EFFORT: ${o.effort.toUpperCase()}`} color="#16201A" muted />
            </div>
            <p className="text-[13px] mb-1">
              <b>Problem:</b> {o.problem}
            </p>
            <p className="text-[13px] mb-1">
              <b>Evidence:</b> {o.evidence} · <b>Affected segment:</b> {o.segment}
            </p>
            <p className="text-[13px] mb-1">
              <b>PM recommendation:</b> {o.recommendation}
            </p>
            <p className="text-[13px]">
              <b>Expected KPI impact:</b> {o.kpiImpact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ label, color, muted }: { label: string; color: string; muted?: boolean }) {
  return (
    <span
      className="text-[10.5px] font-bold rounded px-2 py-1"
      style={{ color: muted ? color : color, background: muted ? "#F1F1EF" : `${color}20` }}
    >
      {label}
    </span>
  );
}
