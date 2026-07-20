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
    size: 110,
    top: "15%",
    left: "15%",
    color: "border-[#F8CB46] hover:bg-[#FFF6DD]/30",
    details: {
      habit: "Routine items are bought repeatedly once trust is built. Habits are fragile and break instantly on substitutions.",
      evidence: "48% of grocery signals are repeat purchases.",
      barriers: "Forced substitutions without customer consent and sudden stockouts.",
      opportunities: "Lock recurring item lists; add explicit 'do not substitute' toggle at cart level.",
      reviews: [
        "Atta and cooking oil are monthly staples, but Blinkit forces a different brand replacement without asking.",
        "Prices change from morning to night. It blocks forming a regular grocery checklist."
      ]
    }
  },
  {
    id: "electronics" as CategoryKey,
    name: "Electronics",
    size: 120,
    top: "30%",
    left: "55%",
    color: "border-risk-red/40 hover:bg-[#FCEAE9]/30",
    details: {
      habit: "Zero repeat-buying habit. Customers only buy high-value items in emergencies.",
      evidence: "55.6% of overall trust risk signals are concentrated in electronics.",
      barriers: "Fear of receiving counterfeit goods; complex return policies for open-box delivery.",
      opportunities: "Sealed open-box delivery with live courier verification and clear brand-auth badges.",
      reviews: [
        "Received a tampered box for AirPods. Return was refused. I will never buy gadgets here.",
        "Too risky. For charger cables and adaptors, I prefer physical stores where I can check quality."
      ]
    }
  },
  {
    id: "perishables" as CategoryKey,
    name: "Perishables",
    size: 130,
    top: "55%",
    left: "25%",
    color: "border-brand-green/40 hover:bg-[#E7F8ED]/30",
    details: {
      habit: "High daily buying intent, but quality inconsistency prevents regular shopping habits.",
      evidence: "32% of perishable reviews complain of spoilage.",
      barriers: "Rotten fruits, stale dairy, and very short expiry dates.",
      opportunities: "Live expiry-date indicators on product pages; temperature-controlled delivery bags.",
      reviews: [
        "Ordered yogurt and it expired the next day. Perishables need better expiry checks.",
        "Tomatoes were completely crushed. I'd rather buy from local shop where I inspect produce myself."
      ]
    }
  },
  {
    id: "personal_care" as CategoryKey,
    name: "Personal Care",
    size: 105,
    top: "10%",
    left: "70%",
    color: "border-risk-purple/40 hover:bg-transparent",
    details: {
      habit: "High brand loyalty but low discovery rate. Customers avoid testing new personal care brands.",
      evidence: "12% of signals cite quality concerns.",
      barriers: "Lack of brand authenticity seals; fear of chemical reactions from fake batches.",
      opportunities: "Surface official brand-authorized distributor certificates on listings.",
      reviews: [
        "Face wash smelled different and caused skin irritation. Blinkit must vet beauty sellers.",
        "Sticking to trusted retail apps for makeup. Urgency is not worth skin damage."
      ]
    }
  },
  {
    id: "baby_care" as CategoryKey,
    name: "Baby Care",
    size: 100,
    top: "60%",
    left: "70%",
    color: "border-risk-blue/40 hover:bg-transparent",
    details: {
      habit: "diapers and formula show repeat logic but depend entirely on catalog accuracy.",
      evidence: "8% signal share.",
      barriers: "Formula size variations and diapers out-of-stock messages leading to immediate app exits.",
      opportunities: "Subscription-based auto-replenishment with guaranteed inventory allocation.",
      reviews: [
        "Urgent formula variant was out of stock. Switched to Zepto instantly.",
        "Diapers sizing is always wrong or unavailable. Cannot rely on it for baby care."
      ]
    }
  }
];

export default function BehavioralIntelligence() {
  const [selectedId, setSelectedId] = useState<CategoryKey>("groceries");
  const selected = CATEGORY_CLUSTERS.find((c) => c.id === selectedId) || CATEGORY_CLUSTERS[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Behavior Intelligence"
        subtitle="Visualizing customer exploration pathways and discovery blocks. Click clusters to explore raw evidence."
      />

      {/* Figma FigJam Cluster Explorer Section */}
      <div>
        <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Category Cluster Map</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* FigJam Canvas (7 cols) */}
          <div className="lg:col-span-7 h-[420px] bg-surface border border-line/40 rounded-[20px] shadow-standard relative overflow-hidden select-none"
               style={{
                 backgroundImage: "radial-gradient(#E4E8E1 1.5px, transparent 1.5px)",
                 backgroundSize: "20px 20px"
               }}>
            
            {/* SVG Connecting Dotted Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="20%" y1="20%" x2="30%" y2="60%" stroke="#E4E8E1" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="20%" y1="20%" x2="58%" y2="35%" stroke="#E4E8E1" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="58%" y1="35%" x2="30%" y2="60%" stroke="#E4E8E1" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="58%" y1="35%" x2="72%" y2="15%" stroke="#E4E8E1" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="58%" y1="35%" x2="72%" y2="65%" stroke="#E4E8E1" strokeWidth="2" strokeDasharray="4 6" />
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
                  className={`rounded-full border bg-surface/90 shadow-subtle flex flex-col items-center justify-center text-center p-3 transition-all duration-300 ${c.color} ${
                    active ? "ring-2 ring-brand-yellow border-brand-yellow scale-105 bg-brand-yellowSoft/10" : ""
                  }`}
                >
                  <span className="text-[14px] font-bold text-ink tracking-tight">{c.name}</span>
                  <span className="text-[10px] text-muted mt-1 uppercase font-semibold tracking-wider">Explore</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Details Panel (5 cols) */}
          <div className="lg:col-span-5 bg-surface border border-line/40 rounded-[20px] p-[18px] shadow-standard flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-line/40 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-yellow bg-brand-yellowSoft/20 border border-[#EFDC9E]/40 px-2 py-0.5 rounded-full">
                  CLUSTER DATA
                </span>
                <h3 className="text-[18px] font-bold text-ink mt-2 tracking-tight">{selected.name} Analysis</h3>
              </div>

              <div className="space-y-3.5 text-[13.5px] leading-relaxed">
                <div>
                  <h4 className="text-[11px] text-muted/80 uppercase tracking-wider font-semibold">Shopping Habit</h4>
                  <p className="text-ink/80">{selected.details.habit}</p>
                </div>
                <div>
                  <h4 className="text-[11px] text-muted/80 uppercase tracking-wider font-semibold">Evidence Strength</h4>
                  <p className="text-ink/80">{selected.details.evidence}</p>
                </div>
                <div>
                  <h4 className="text-[11px] text-muted/80 uppercase tracking-wider font-semibold">Discovery Barriers</h4>
                  <p className="text-ink/80">{selected.details.barriers}</p>
                </div>
                <div>
                  <h4 className="text-[11px] text-muted/80 uppercase tracking-wider font-semibold">Opportunities</h4>
                  <p className="text-ink/80">{selected.details.opportunities}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line/40">
              <h4 className="text-[11px] text-muted/80 uppercase tracking-wider font-semibold mb-2">Supporting Reviews</h4>
              <div className="space-y-2">
                {selected.details.reviews.map((r, i) => (
                  <div key={i} className="text-[12.5px] italic text-ink/75 bg-canvas p-2.5 rounded-lg border border-line/20">
                    &quot;{r}&quot;
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Research Findings */}
      <div>
        <h2 className="text-[12px] text-muted/80 uppercase tracking-[0.04em] mb-4" style={{ fontWeight: 800 }}>Validation Findings</h2>
        
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
