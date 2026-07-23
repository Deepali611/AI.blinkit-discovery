import reviewsRaw from "@/public/data/reviews.json";

export type ReviewRow = {
  row_number: number;
  repeat_buying_signal: "yes" | "no";
  category_mentioned: string;
  barrier_to_new_category: string;
  reason_type: "trust" | "price" | "convenience" | "no_discovery" | "habit" | "other";
  info_needed: string;
  user_segment: string;
  duplicate_flag: "yes" | "no";
  confidence: "high" | "med" | "low";
  source: "Google Play" | "Reddit" | "YouTube" | "App Store";
  quote: string;
};

export const reviews = (reviewsRaw as any[]).map((r) => ({
  ...r,
  source: r.source || "Google Play",
  quote: r.quote || "Customer review signal extracted from source."
})) as ReviewRow[];

export const TOTAL_REVIEWS_SCANNED = 1176;
export const N = reviews.length;

export const REASON_COLORS: Record<string, string> = {
  trust: "#16201A",
  price: "#4A5447",
  convenience: "#6B7566",
  no_discovery: "#9A9488",
  habit: "#C9C4B8",
  other: "#E4E8E1",
};

export const SEGMENT_COLORS: Record<string, string> = {
  heavy_user: "#54B226", // Genuinely positive/validated segment
  quality_focused: "#1F1F1F",
  price_sensitive: "#4A5447",
  light_new_user: "#6B7566",
  one_time_complainer: "#9A9488",
  senior_citizen: "#C9C4B8",
  unclear: "#E4E8E1",
};

export const SEGMENT_LABELS: Record<string, string> = {
  heavy_user: "language-inferred frequent user",
  quality_focused: "language-inferred quality-focused",
  price_sensitive: "language-inferred price-comparer",
  one_time_complainer: "language-inferred one-time complainer",
  light_new_user: "language-inferred new user",
  senior_citizen: "language-inferred senior citizen",
  unclear: "unclassified",
};

export function formatSegmentLabel(segment: string): string {
  return SEGMENT_LABELS[segment] || `language-inferred ${segment.replace(/_/g, " ")}`;
}

function countBy<T extends string>(arr: ReviewRow[], key: keyof ReviewRow): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of arr) {
    const v = String(r[key] ?? "none");
    if (v === "none") continue;
    out[v] = (out[v] || 0) + 1;
  }
  return out;
}

export const reasonCounts = (() => {
  const out: Record<string, number> = {};
  for (const r of reviews) out[r.reason_type] = (out[r.reason_type] || 0) + 1;
  return out;
})();

export const segmentCounts = (() => {
  const out: Record<string, number> = {};
  for (const r of reviews) out[r.user_segment] = (out[r.user_segment] || 0) + 1;
  return out;
})();

export const categoryCounts = countBy(reviews, "category_mentioned");

function bucketInfoNeeded(text: string): string | null {
  if (!text || text === "none" || text === "not stated") return null;
  const t = text.toLowerCase();
  if (/(authentic|seller verif|condition guarantee|seal|ingredient|quality rec|quality assurance)/.test(t))
    return "Authenticity & quality guarantee";
  if (/(expiry|tamper|cold-chain|packaging|delivery time guarantee|weatherproof)/.test(t))
    return "Packaging & delivery integrity";
  if (/(price|fee|mrp|tax|surge|billing)/.test(t)) return "Pricing transparency";
  if (/(return|replace|refund|cancellation|compensation|promo|substitution|order edit)/.test(t))
    return "Return & refund reliability";
  if (/(stock|catalog|assortment|sku|variant|coupon|incentive)/.test(t)) return "Stock & catalog accuracy";
  if (/(payment|wallet|cod|upi|permission|accountability)/.test(t)) return "Payment & platform trust";
  if (/(interface|feature awareness|search|cart|elderly|serviceability|coverage|order-mod)/.test(t))
    return "Discovery & usability";
  return "Other";
}

export const infoBucketCounts = (() => {
  const out: Record<string, number> = {};
  for (const r of reviews) {
    const b = bucketInfoNeeded(r.info_needed);
    if (b) out[b] = (out[b] || 0) + 1;
  }
  return out;
})();

const CONF_WEIGHT: Record<string, number> = { high: 1, med: 0.6, low: 0.3 };

export const metrics = {
  discoveryBarrierIndex: (reviews.filter((r) => r.reason_type === "trust" || r.reason_type === "price").length / N) * 100,
  trustGapScore: ((reasonCounts["trust"] || 0) / N) * 100,
  habitScore: ((reasonCounts["habit"] || 0) / N) * 100,
  explorationIntent: (Object.values(infoBucketCounts).reduce((a, b) => a + b, 0) / N) * 100,
  insightConfidence:
    (reviews.reduce((sum, r) => sum + (CONF_WEIGHT[r.confidence] ?? 0), 0) / N) * 100,
  reviewCoverage: (N / TOTAL_REVIEWS_SCANNED) * 100,
  themeSaturation: new Set(reviews.map((r) => r.category_mentioned).filter((c) => c !== "none")).size,
  discoveryReadiness: (() => {
    const heavy = reviews.filter((r) => r.user_segment === "heavy_user");
    if (heavy.length === 0) return 0;
    const blocked = heavy.filter((r) => r.reason_type === "trust" || r.reason_type === "price").length;
    return 100 - (blocked / heavy.length) * 100;
  })(),
  highConfidenceShare: (reviews.filter((r) => r.confidence === "high").length / N) * 100,
  flaggedDuplicates: reviews.filter((r) => r.duplicate_flag === "yes").length,
};

export const sourceBreakdown = [
  { source: "Google Play", count: 662 },
  { source: "Reddit", count: 360 },
  { source: "YouTube comments", count: 144 },
  { source: "App Store", count: 10 },
];

export const growthQuestions = [
  {
    q: "Why do customers repeatedly purchase from the same categories?",
    a: "Not habit-driven (only 3.7% of signal). Customers retreat to categories where they haven't been burned: repeat-buying is risk-avoidance, not routine.",
    confidence: "High" as const,
  },
  {
    q: "What prevents customers from exploring new categories?",
    a: "Trust/quality risk (55.6%): fake products, expired/damaged perishables, tampered electronics. Secondary: price uncertainty (21.2%), limited/unavailable SKUs (4.8%).",
    confidence: "High" as const,
  },
  {
    q: "How do customers discover products today?",
    a: "Weakly: evidence of broken search, unawareness of existing features, and customers leaving for competitors over unavailable specific variants or niche stock.",
    confidence: "Medium" as const,
  },
  {
    q: "What role do habits play in shopping behaviour?",
    a: "Minimal (3.7%, weakest signal). Price-driven multi-app switching (21.2%) shows active deal-seeking, not loyal habit.",
    confidence: "High" as const,
  },
  {
    q: "What information do customers need before trying a new category?",
    a: "45.5% of signals named something concrete: authenticity/seller verification, tamper-evident packaging, expiry visibility, working return/replace flow, real-time stock accuracy.",
    confidence: "High" as const,
  },
  {
    q: "What frustrations emerge repeatedly?",
    a: "Fake/counterfeit goods, expired perishables, broken refund/replacement promises, forced substitutions without consent, unhonored promo codes.",
    confidence: "High" as const,
  },
  {
    q: "Which customer segments are more likely to experiment?",
    a: "heavy_user: loyal, high-frequency customers most likely to try new categories once trust is addressed.",
    confidence: "Medium" as const,
  },
  {
    q: "What unmet needs emerge consistently?",
    a: "Authenticity guarantees, transparent real-time pricing, reliable return/replace flows, niche/regional stock visibility, simpler UI for accessibility.",
    confidence: "Medium" as const,
  },
];

export const opportunities = [
  {
    title: "Category Trust Badge",
    problem: "Trust/quality risk affecting new-category purchase decisions",
    evidence: "105 of 189 signals (55.6%)",
    segment: "quality_focused, heavy_user",
    impact: "High" as const,
    confidence: "High" as const,
    effort: "Medium" as const,
    recommendation: "Show authenticity/seller-verification signals on category pages with historically high risk mentions.",
    kpiImpact: "Increases new-category conversion in electronics/perishables by reducing perceived risk at decision point.",
  },
  {
    title: "First-New-Category Return Guarantee",
    problem: "Customers need explicit reassurance before trying an unfamiliar category",
    evidence: "45.5% of signals gave an actionable ask",
    segment: "heavy_user",
    impact: "High" as const,
    confidence: "High" as const,
    effort: "Low" as const,
    recommendation: "Lightweight 'first try in this category, free return if unsatisfied' prompt targeting the segment with highest readiness.",
    kpiImpact: "Directly lifts % of MAU purchasing a new category: targets the segment closest to converting.",
  },
  {
    title: "Transparent Real-Time Pricing",
    problem: "Cross-app price comparison drives switching, not category avoidance directly",
    evidence: "40 of 189 signals (21.2%)",
    segment: "price_sensitive",
    impact: "Medium" as const,
    confidence: "Medium" as const,
    effort: "Medium" as const,
    recommendation: "Show live price vs. MRP and recent-order price consistency at checkout.",
    kpiImpact: "Reduces churn to competitor apps; secondary effect on category trust.",
  },
  {
    title: "Niche & Regional Stock Visibility",
    problem: "Customers abandon category exploration silently when stock is inaccurate",
    evidence: "9 of 189 signals (4.8%)",
    segment: "unclear segment",
    impact: "Low" as const,
    confidence: "Medium" as const,
    effort: "Low" as const,
    recommendation: "Surface accurate regional/niche stock status before checkout.",
    kpiImpact: "Small volume but low-cost fix; prevents silent category abandonment.",
  },
];
