"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import AIInsightCard from "@/components/AIInsightCard";
import { N } from "@/lib/data";

type CategoryKey = "groceries" | "electronics" | "perishables" | "personal_care" | "baby_care";

const CATEGORY_CLUSTERS = [
  {
    id: "groceries" as CategoryKey,
    name: "Groceries",
    tag: "GR",
    size: 105,
    top: "15%",
    left: "15%",
    color: "border-[#7950F2] text-[#7950F2]", // Purple cluster border
    details: {
      habit: "Routine weekly items are bought repeatedly once trust is established. Habits are fragile and break instantly on incorrect substitutions.",
      evidence: "48% of grocery review signals cite repeat buying.",
      barriers: "Price volatility and forced replacements/substitutions without customer consent.",
      opportunities: "Locked item checklists and direct 'Do Not Substitute' cart parameters.",
      reviews: [
        "Atta and cooking oil are monthly staples, but Blinkit forces a different brand replacement without asking.",
        "Prices change from morning to night. It blocks forming a regular grocery checklist."
      ]
    }
  },
  {
    id: "electronics" as CategoryKey,
    name: "Electronics",
    tag: "EL",
    size: 110,
    top: "30%",
    left: "55%",
    color: "border-[#7950F2] text-[#7950F2]",
    details: {
      habit: "Zero repeat-buying habit. Customers only purchase high-value items in emergencies.",
      evidence: "55.6% of trust-risk reviews are concentrated in electronics.",
      barriers: "Fear of receiving fake/counterfeit goods and complex return policies for open-box delivery.",
      opportunities: "Sealed tamper-evident boxes with live courier video verification.",
      reviews: [
        "Received a tampered box for AirPods. Return was refused. I will never buy gadgets here.",
        "Too risky. For charger cables and adaptors, I prefer physical stores where I can check quality."
      ]
    }
  },
  {
    id: "perishables" as CategoryKey,
    name: "Perishables",
    tag: "PE",
    size: 115,
    top: "55%",
    left: "25%",
    color: "border-[#7950F2] text-[#7950F2]",
    details: {
      habit: "High daily buying intent, but quality inconsistency prevents habitual repeat orders.",
      evidence: "32% of perishables reviews cite spoilage or expiry issues.",
      barriers: "Rotten fruits, stale dairy, and short expiry dates on fresh products.",
      opportunities: "Live expiry countdowns on listing pages and cold-chain bags.",
      reviews: [
        "Ordered yogurt and it expired the next day. Perishables need better expiry checks.",
        "Tomatoes were completely crushed. I'd rather buy from local shop where I inspect produce myself."
      ]
    }
  },
  {
    id: "personal_care" as CategoryKey,
    name: "Personal Care",
    tag: "PC",
    size: 100,
    top: "10%",
    left: "70%",
    color: "border-[#7950F2] text-[#7950F2]",
    details: {
      habit: "High brand loyalty but low discovery rate. Customers avoid testing new personal care brands.",
      evidence: "12% of personal care reviews cite product authenticity fears.",
      barriers: "Lack of brand authorization seals and fear of counterfeit formulations.",
      opportunities: "Official brand-certified distributor badges on category lists.",
      reviews: [
        "Face wash smelled different and caused skin irritation. Blinkit must vet beauty sellers.",
        "Sticking to trusted retail apps for makeup. Urgency is not worth skin damage."
      ]
    }
  },
  {
    id: "baby_care" as CategoryKey,
    name: "Baby Care",
    tag: "BC",
    size: 95,
    top: "60%",
    left: "70%",
    color: "border-[#7950F2] text-[#7950F2]",
    details: {
      habit: "Urgent recurring purchases (diapers, formula) with high channel loyalty.",
      evidence: "8% signal share.",
      barriers: "Sizing variation and diaper/formula stockouts causing immediate app exits.",
      opportunities: "Automatic replenishment subscription loops with reserved stock guarantees.",
      reviews: [
        "Urgent formula variant was out of stock. Switched to Zepto instantly.",
        "Diapers sizing is always wrong or unavailable. Cannot rely on it for baby care."
      ]
    }
  }
];

export default function BehaviorIntelligence() {
  const [selectedId, setSelectedId] = useState<CategoryKey>("groceries");
  const selected = CATEGORY_CLUSTERS.find((c) => c.id === selectedId) || CATEGORY_CLUSTERS[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Behavior Intelligence"
        subtitle="Visualizing customer exploration pathways and discovery blocks. Click clusters to explore raw evidence."
      />

      {/* Figma FigJam Cluster Explorer Section */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em]">
          Category Cluster Map
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* FigJam Canvas (7 cols) */}
          <div className="lg:col-span-7 h-[420px] bg-surface border border-[#E4E8E1]/60 rounded-xl shadow-sm relative overflow-hidden select-none"
               style={{
                 backgroundImage: "radial-gradient(#E4E8E1 1px, transparent 1px)",
                 backgroundSize: "16px 16px"
               }}>
            
            {/* SVG Connecting Dotted Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
              <line x1="20%" y1="20%" x2="30%" y2="60%" stroke="#6B7566" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="20%" y1="20%" x2="58%" y2="35%" stroke="#6B7566" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="58%" y1="35%" x2="30%" y2="60%" stroke="#6B7566" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="58%" y1="35%" x2="72%" y2="15%" stroke="#6B7566" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="58%" y1="35%" x2="72%" y2="65%" stroke="#6B7566" strokeWidth="1" strokeDasharray="3 4" />
            </svg>

            {/* Floating Clusters */}
            {CATEGORY_CLUSTERS.map((c) => {
              const active = selectedId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    position: "absolute",
                    top: c.top,
                    left: c.left,
                    width: c.size,
                    height: c.size,
                  }}
                  className={`rounded-full border bg-surface shadow-sm flex flex-col items-center justify-center text-center p-2.5 transition-all duration-200 border-gray-100 ${
                    active ? "ring-2 ring-[#7950F2] border-[#7950F2] scale-105" : "hover:border-[#7950F2]/50"
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold text-[#7950F2] bg-[#7950F2]/10 px-1.5 py-0.5 rounded mb-1">
                    {c.tag}
                  </span>
                  <span className="text-[12px] font-bold text-ink leading-tight">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Details Panel (5 cols) */}
          <div className="lg:col-span-5 bg-surface border border-[#E4E8E1]/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-[#E4E8E1]/60 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#7950F2] bg-[#7950F2]/10 border border-[#7950F2]/20 px-2.5 py-0.5 rounded-full">
                  Behavior Cluster
                </span>
                <span className="text-[12px] font-bold font-mono text-[#7950F2]">
                  {selected.tag}
                </span>
              </div>

              <div className="space-y-4 text-[13px] leading-relaxed">
                <div>
                  <h4 className="text-[10px] text-muted/70 uppercase tracking-[0.06em] font-bold mb-0.5">Shopping Habit</h4>
                  <p className="text-ink/80">{selected.details.habit}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-[#7950F2] uppercase tracking-[0.06em] font-bold mb-0.5">Evidence Strength</h4>
                  <p className="text-ink/80">{selected.details.evidence}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-[#FA5252] uppercase tracking-[0.06em] font-bold mb-0.5">Discovery Barriers</h4>
                  <p className="text-[#FA5252] font-medium">{selected.details.barriers}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-[#FD7E14] uppercase tracking-[0.06em] font-bold mb-0.5">Opportunities</h4>
                  <p className="text-[#FD7E14] font-medium">{selected.details.opportunities}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E8E1]/60">
              <h4 className="text-[10px] text-[#868E96] uppercase tracking-[0.06em] font-bold mb-2">Supporting Evidence (Quotes)</h4>
              <div className="space-y-2">
                {selected.details.reviews.map((r, i) => (
                  <div key={i} className="text-[12px] italic text-[#868E96] bg-[#F9F9FA] p-3 rounded-lg border border-[#E4E8E1]/40">
                    &quot;{r}&quot;
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Research Findings */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-muted/70 uppercase tracking-[0.06em]">
          Validation Findings
        </h3>
        
        <div className="space-y-6">
          <AIInsightCard
            findingNumber="02"
            summary="Heavy, loyal customers show the clearest readiness to explore once trust is addressed — they are the highest-leverage segment for a first experiment."
            confidence="Medium"
            evidenceN={N}
            sources="Google Play, Reddit, YouTube, App Store"
            reasoning="Segment is inferred from review language — frequency cues, price-comparison behavior, and tenure mentions — not verified account data."
            validation="Segment classification is a text-proxy hypothesis; recommend validating against real behavioral/transactional data before large-scale rollout."
            pmImplication="quality_focused and price_sensitive customers are distinct populations needing different fixes, not one generic offer."
            businessImpact="Targeting heavy_user first maximizes early conversion probability on the core growth metric."
            recommendedAction="Pilot the Category Trust Badge experiment with heavy_user customers before wider release."
          />

          <AIInsightCard
            findingNumber="03"
            summary="Electronics and perishables (dairy, eggs, produce) concentrate the highest share of trust-risk mentions across categories."
            confidence="Medium"
            evidenceN={N}
            sources="Google Play, Reddit, YouTube, App Store"
            reasoning="High-value and perishable items carry the greatest downside if quality fails, making customers most risk-averse there."
            validation="Category is extracted only when explicitly named — reviews with no named category are excluded from this view."
            pmImplication="A platform-wide trust fix is unnecessary; targeted category-level intervention is more efficient."
            businessImpact="Pilot categories represent the fastest path to a measurable lift in cross-category purchase rate."
            recommendedAction="Launch the trust-badge pilot on electronics and dairy/eggs before extending platform-wide."
          />
        </div>
      </div>
    </div>
  );
}
