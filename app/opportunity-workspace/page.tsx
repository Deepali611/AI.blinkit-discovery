import PageHeader from "@/components/PageHeader";
import { opportunities } from "@/lib/data";

const IMPACT_COLOR: Record<string, string> = { High: "#028A34", Medium: "#6B7566", Low: "#9A9488" };

export default function OpportunityWorkspace() {
  return (
    <div>
      <PageHeader
        title="Opportunity Workspace"
        subtitle="Growth experiments ranked by business impact, confidence, and effort."
      />
      <div className="space-y-6">
        {opportunities.map((o) => (
          <div key={o.title} className="bg-surface border border-line rounded-2xl p-6 shadow-card">
            <div className="text-[17px] font-bold text-ink mb-2 tracking-tight">{o.title}</div>
            <div className="flex gap-2 mb-4">
              <Badge label={`IMPACT: ${o.impact.toUpperCase()}`} color={IMPACT_COLOR[o.impact]} />
              <Badge label={`CONFIDENCE: ${o.confidence.toUpperCase()}`} color="#16201A" muted />
              <Badge label={`EFFORT: ${o.effort.toUpperCase()}`} color="#16201A" muted />
            </div>
            <div className="space-y-2 text-[13.5px] text-ink/80 leading-relaxed">
              <p>
                <span className="font-semibold text-ink">Problem:</span> {o.problem}
              </p>
              <p>
                <span className="font-semibold text-ink">Evidence:</span> {o.evidence} ·{" "}
                <span className="font-semibold text-ink">Affected segment:</span> {o.segment}
              </p>
              <p>
                <span className="font-semibold text-ink">PM recommendation:</span> {o.recommendation}
              </p>
              <p>
                <span className="font-semibold text-ink">Expected KPI impact:</span> {o.kpiImpact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ label, color, muted }: { label: string; color: string; muted?: boolean }) {
  return (
    <span
      className="text-[10px] font-semibold rounded-full px-3 py-1 uppercase tracking-wider"
      style={{ color: muted ? color : color, background: muted ? "#F1F1EF" : `${color}15` }}
    >
      {label}
    </span>
  );
}
