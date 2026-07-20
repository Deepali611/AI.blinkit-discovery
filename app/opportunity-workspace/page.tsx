import PageHeader from "@/components/PageHeader";
import { opportunities } from "@/lib/data";

const IMPACT_COLOR: Record<string, string> = { High: "#00B140", Medium: "#6B7566", Low: "#9A9488" };
const CONF_COLOR: Record<string, string> = { High: "#00B140", Medium: "#8A6A0F", Low: "#6B7566" };
const EFFORT_COLOR: Record<string, string> = { Low: "#00B140", Medium: "#6B7566", High: "#9A9488" };

export default function OpportunityWorkspace() {
  return (
    <div>
      <PageHeader
        title="Opportunity Workspace"
        subtitle="Growth experiments ranked by business impact, confidence, and effort."
      />
      <div className="space-y-6">
        {opportunities.map((o) => (
          <div key={o.title} className="bg-surface border border-line rounded-lg p-[18px] shadow-standard">
            <div className="text-[17px] font-bold text-ink mb-2 tracking-tight">{o.title}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge label={`IMPACT: ${o.impact.toUpperCase()}`} color={IMPACT_COLOR[o.impact]} />
              <Badge label={`CONFIDENCE: ${o.confidence.toUpperCase()}`} color={CONF_COLOR[o.confidence]} />
              <Badge label={`EFFORT: ${o.effort.toUpperCase()}`} color={EFFORT_COLOR[o.effort]} />
            </div>
            <div className="space-y-2 text-[13.5px] text-ink/80 leading-relaxed" style={{ lineHeight: 1.55 }}>
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

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-[13px] rounded-full py-[7px] px-[12px] uppercase tracking-wider bg-transparent border"
      style={{ color, borderColor: color, fontWeight: 750 }}
    >
      {label}
    </span>
  );
}
