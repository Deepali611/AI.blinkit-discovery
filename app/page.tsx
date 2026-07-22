"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { 
  reviews, 
  ReviewRow, 
  TOTAL_REVIEWS_SCANNED, 
  REASON_COLORS, 
  SEGMENT_COLORS 
} from "@/lib/data";
import { 
  SlidersHorizontal, 
  Database,
  Search,
  ArrowRight,
  Check,
  ExternalLink,
  BookOpen,
  Info,
  Lock
} from "lucide-react";

// Count-up Stat Callout component using Framer Motion
function AnimatedStat({ value, label, colorClass }: { value: string; label: string; colorClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayVal, setDisplayVal] = useState(value);

  const numericMatch = value.match(/[\d.]+/);
  const targetNum = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const isPercent = value.includes("%");

  useEffect(() => {
    if (!isInView || targetNum === 0) return;
    const controls = animate(0, targetNum, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (isPercent) {
          setDisplayVal(latest.toFixed(1) + "%");
        } else {
          setDisplayVal(Math.round(latest).toString());
        }
      }
    });
    return () => controls.stop();
  }, [isInView, targetNum, isPercent]);

  return (
    <div ref={ref} className="flex flex-col items-start min-w-[130px] shrink-0 border-l md:border-l border-[#ECE8DE] pl-4 md:pl-6 my-auto pt-2 md:pt-0">
      <span className={`text-[46px] md:text-[54px] font-extrabold font-mono leading-none tracking-tight ${colorClass}`}>
        {displayVal}
      </span>
      <span className="text-[11.5px] font-medium text-[#737373] mt-1 max-w-[140px] leading-tight">
        {label}
      </span>
    </div>
  );
}

// Local helper to bucket info needed
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

const SOURCES = ["Google Play", "Reddit", "YouTube", "App Store"];
const SEGMENTS = [
  "heavy_user",
  "quality_focused",
  "price_sensitive",
  "light_new_user",
  "one_time_complainer",
  "senior_citizen",
  "unclear"
];
const REASONS = ["trust", "price", "convenience", "no_discovery", "habit", "other"];

const REASON_TO_QUESTION: Record<string, { qNum: number; headline: string; id: string }> = {
  habit: { qNum: 1, headline: "Customers aren't loyal. They're cautious.", id: "q1" },
  trust: { qNum: 2, headline: "Customers don't avoid new categories. They avoid risk.", id: "q2" },
  no_discovery: { qNum: 3, headline: "Discovery isn't failing on trust — it's failing on visibility.", id: "q3" },
  price: { qNum: 4, headline: "The customer isn't passive. They're constantly comparing.", id: "q4" },
  convenience: { qNum: 6, headline: "Five failures repeat across every category.", id: "q6" },
  other: { qNum: 8, headline: "Customers didn't just complain — they specified the fix.", id: "q8" }
};

function PlatformIcon({ source, size = 18 }: { source: string; size?: number }) {
  const s = (source || "").toLowerCase();
  
  if (s.includes("google") || s.includes("play")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L14.3 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#00E676" />
        <path d="M16.8 9.5L14.3 12L16.8 14.5L20.3 12.5C21.1 12.05 21.1 11.95 20.3 11.5L16.8 9.5Z" fill="#FFC107" />
        <path d="M3.84 21.85L14.3 12L16.8 14.5L4.4 21.6C4.05 21.8 3.92 21.82 3.84 21.85Z" fill="#FF3D00" />
        <path d="M3.84 2.15C3.92 2.18 4.05 2.2 4.4 2.4L16.8 9.5L14.3 12L3.84 2.15Z" fill="#00B0FF" />
      </svg>
    );
  }
  
  if (s.includes("reddit")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-[#FF4500] shrink-0">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.616a1.244 1.244 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.687-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-4.566 3.868a.333.333 0 0 0-.03.47c.435.506 1.15.82 1.846.82.696 0 1.411-.314 1.846-.82a.333.333 0 0 0-.499-.44c-.318.371-.871.602-1.347.602-.476 0-1.029-.231-1.347-.602a.333.333 0 0 0-.469-.03z" />
      </svg>
    );
  }
  
  if (s.includes("youtube")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-[#FF0000] shrink-0">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-[#171717] shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.64-.78 1.08-1.85.96-2.92-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.1-.53 2.74-1.31z"/>
    </svg>
  );
}

export default function EngineDashboard() {
  // Navigation State: "landing", "methodology", "workspace", "explorer", "docs"
  const [currentView, setCurrentView] = useState<"landing" | "methodology" | "workspace" | "explorer" | "docs">("landing");

  // Evidence Explorer Filter States & Selection
  const [explorerSearch, setExplorerSearch] = useState("");
  const [explorerSource, setExplorerSource] = useState<string>("all");
  const [explorerSegment, setExplorerSegment] = useState<string>("all");
  const [explorerReason, setExplorerReason] = useState<string>("all");
  const [explorerConfidence, setExplorerConfidence] = useState<string>("all");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  // Try It Live Analyzer States
  const [apiKey, setApiKey] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);
  const [analyzerError, setAnalyzerError] = useState("");
  const [analyzerStep, setAnalyzerStep] = useState(0);

  // Methodology list expanded states
  const [methodologyStep1Expanded, setMethodologyStep1Expanded] = useState(false);
  const [methodologyStep2Expanded, setMethodologyStep2Expanded] = useState(false);

  const ANALYZER_STEPS = [
    "Reading customer text...",
    "Normalizing signals...",
    "Grouping patterns...",
    "Measuring confidence..."
  ];

  // Helper to jump to a specific row in the Explorer
  const jumpToRow = (rowNumber: number) => {
    setExplorerSearch(String(rowNumber));
    setExplorerSource("all");
    setExplorerSegment("all");
    setExplorerReason("all");
    setExplorerConfidence("all");
    setCurrentView("explorer");
  };

  // Helper to navigate to explorer with specific cell filter
  const filterByMatrixCell = (segment: string, reason: string) => {
    setExplorerSegment(segment);
    setExplorerReason(reason);
    setExplorerSearch("");
    setExplorerSource("all");
    setExplorerConfidence("all");
    setCurrentView("explorer");
  };

  // Run analyzer logic
  const handleAnalyze = async () => {
    setAnalyzerError("");
    setAnalyzerResult(null);
    if (!apiKey.trim()) {
      setAnalyzerError("Please input an API Key.");
      return;
    }
    if (!reviewInput.trim()) {
      setAnalyzerError("Please paste a review to check.");
      return;
    }
    setAnalyzerLoading(true);
    setAnalyzerStep(0);

    const interval = setInterval(() => {
      setAnalyzerStep((prev) => (prev + 1) % ANALYZER_STEPS.length);
    }, 1200);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, review: reviewInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Execution failed");
      setAnalyzerResult(data);
    } catch (e: any) {
      setAnalyzerError(e.message);
    } finally {
      clearInterval(interval);
      setAnalyzerLoading(false);
    }
  };

  // Discovery Questions Data & Sourcing
  const getEvidenceForQuestion = (qIndex: number): ReviewRow[] => {
    switch (qIndex) {
      case 1: {
        const set1 = reviews.filter(r => r.repeat_buying_signal === "yes");
        const set2 = reviews.filter(r => r.reason_type === "habit");
        return Array.from(new Set([...set1, ...set2])).slice(0, 2);
      }
      case 2:
        return reviews.filter(r => r.reason_type === "trust" && r.category_mentioned !== "none").slice(0, 2);
      case 3:
        return reviews.filter(r => r.reason_type === "no_discovery").slice(0, 2);
      case 4:
        return reviews.filter(r => r.reason_type === "price").slice(0, 2);
      case 5:
        return reviews.filter(r => r.info_needed !== "none" && r.info_needed !== "not stated" && r.confidence === "high").slice(0, 2);
      case 6:
        return reviews.filter(r => r.barrier_to_new_category !== "none" && r.reason_type === "trust").slice(0, 2);
      case 7:
        return reviews.filter(r => r.user_segment === "heavy_user").slice(0, 2);
      case 8:
        return reviews.filter(r => r.info_needed !== "none" && r.info_needed !== "not stated").slice(0, 2);
      default:
        return [];
    }
  };

  // Matrix calculation data
  const maxMatrixCount = (() => {
    let max = 0;
    SEGMENTS.forEach(seg => {
      REASONS.forEach(reason => {
        const count = reviews.filter(r => r.user_segment === seg && r.reason_type === reason).length;
        if (count > max) max = count;
      });
    });
    return max || 1;
  })();

  // Filtered reviews for Explorer
  const filteredExplorerReviews = reviews.filter((r) => {
    if (explorerSearch.trim()) {
      const s = explorerSearch.toLowerCase();
      // match row number exactly or search quote content
      if (r.row_number.toString() !== s && !r.quote.toLowerCase().includes(s)) {
        return false;
      }
    }
    if (explorerSource !== "all" && r.source !== explorerSource) return false;
    if (explorerSegment !== "all" && r.user_segment !== explorerSegment) return false;
    if (explorerReason !== "all" && r.reason_type !== explorerReason) return false;
    if (explorerConfidence !== "all" && r.confidence !== explorerConfidence) return false;
    return true;
  });

  const selectedRecord = reviews.find(r => r.row_number === selectedRowId);

  useEffect(() => {
    if (selectedRowId !== null) {
      const isStillFiltered = filteredExplorerReviews.some(r => r.row_number === selectedRowId);
      if (!isStillFiltered) {
        setSelectedRowId(null);
      }
    }
  }, [explorerSearch, explorerSource, explorerSegment, explorerReason, explorerConfidence]);

  return (
    <div className="space-y-8 font-sans antialiased text-[#171717]">
      {/* Navigation Header (Hidden on Landing) */}
      {currentView !== "landing" && (
        <header className="border-b border-[#ECE8DE] bg-[#F2F1EC] p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView("landing")}
              className="w-8 h-8 rounded-lg bg-[#F8CB46] flex items-center justify-center text-[#171717] text-[15px] font-black shadow-sm"
            >
              B
            </button>
            <div>
              <span className="font-display font-extrabold text-[14px]">Blinkit Discovery Engine</span>
              <div className="text-[9px] text-[#5F6368] font-bold tracking-wide uppercase">Internal Tool</div>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setCurrentView("workspace")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-all ${
                currentView === "workspace"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              Discovery Workspace
            </button>
            <button
              onClick={() => setCurrentView("methodology")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-all ${
                currentView === "methodology"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              How the Engine Works
            </button>
            <button
              onClick={() => setCurrentView("explorer")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-all ${
                currentView === "explorer"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              Evidence Explorer
            </button>
            <button
              onClick={() => setCurrentView("docs")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-all ${
                currentView === "docs"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              Engine Documentation
            </button>
          </nav>
        </header>
      )}

      {/* Primary Business Objective Banner (Shown once on Discovery Workspace entry point) */}
      {currentView === "workspace" && (
        <div className="bg-[#F3F5F1] border border-[#59624B]/20 p-4 rounded-lg text-[13px] text-[#59624B] leading-relaxed max-w-4xl mx-auto shadow-sm">
          <strong>Primary Objective:</strong> Understand why customers who already trust Blinkit for one category hesitate to expand into additional categories, and identify evidence-backed opportunities to reduce that hesitation.
        </div>
      )}

      {/* ═══════════════════════════════════════════
          1. LANDING VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "landing" && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8 py-10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F8CB46] text-[#171717] font-black text-[22px] flex items-center justify-center mx-auto shadow-sm">
              B
            </div>
            <h1 className="font-display font-extrabold text-[32px] leading-tight tracking-tight text-[#171717]">
              Blinkit Discovery Engine — reads customer feedback so Product doesn't have to guess why customers stay inside the categories they already trust.
            </h1>
            <p className="text-[14px] text-[#5F6368] font-medium leading-relaxed border-t border-[#ECE8DE] pt-4">
              189 behavioral signals extracted from 1,176 reviews across 4 sources. Every signal traces back to a real customer sentence.
            </p>
          </div>

          <button
            onClick={() => setCurrentView("workspace")}
            className="bg-[#59624B] hover:bg-[#59624B]/90 text-white font-bold text-[13px] px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-sm"
          >
            Open the engine <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          2. HOW THE ENGINE WORKS VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "methodology" && (
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* How the Data Was Collected Section */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[9.5px] font-bold text-[#737373] uppercase tracking-wider block">Completed Data Ingestion</span>
              <h2 className="font-display font-extrabold text-[20px] text-[#171717] mt-0.5">Collection Method</h2>
              <p className="text-[13.5px] text-[#5F6368] mt-1 leading-relaxed">
                This engine analyzed a fixed set of 1,176 customer reviews, collected once across 4 sources. Below is exactly how.
              </p>
              <p className="text-[12px] font-mono text-[#737373] mt-2.5 bg-[#F8F9FA] px-3 py-1.5 rounded border border-[#ECE8DE]/80 inline-block">
                Date Range / Scope: Reviews collected reflect recent customer activity across all 4 sources as of this analysis.
              </p>
            </div>

            {/* Source Data Table */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-bold text-[#171717]">Source Breakdown & Sample Distribution</h4>
              <div className="overflow-x-auto border border-[#ECE8DE] rounded">
                <table className="w-full border-collapse text-left text-[12px] bg-white">
                  <thead>
                    <tr className="bg-[#F2F1EC]/80 border-b border-[#ECE8DE] text-[#5F6368]">
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Source</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-right font-mono">Reviews Collected</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-right font-mono">Share of Dataset</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Why This Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#171717]">Google Play</td>
                      <td className="p-3 text-right font-mono font-bold text-[#171717]">662</td>
                      <td className="p-3 text-right font-mono text-[#5F6368]">56.3%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Largest volume; Android reviews on the core shopping app.</td>
                    </tr>
                    <tr className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#171717]">Reddit</td>
                      <td className="p-3 text-right font-mono font-bold text-[#171717]">360</td>
                      <td className="p-3 text-right font-mono text-[#5F6368]">30.6%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Candid discussion and comparison threads — richest reasoning, but mostly post titles rather than full bodies.</td>
                    </tr>
                    <tr className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#171717]">YouTube comments</td>
                      <td className="p-3 text-right font-mono font-bold text-[#171717]">144</td>
                      <td className="p-3 text-right font-mono text-[#5F6368]">12.2%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Comment-level reactions on review/unboxing videos.</td>
                    </tr>
                    <tr className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#171717]">App Store</td>
                      <td className="p-3 text-right font-mono font-bold text-[#171717]">10</td>
                      <td className="p-3 text-right font-mono text-[#5F6368]">0.9%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">iOS reviews — too small a sample for independent conclusions, included for completeness and treated as directional only.</td>
                    </tr>
                    <tr className="bg-[#F8F9FA] font-bold text-[#171717]">
                      <td className="p-3">Total</td>
                      <td className="p-3 text-right font-mono font-bold">1,176</td>
                      <td className="p-3 text-right font-mono">100%</td>
                      <td className="p-3 text-[#8C8C8C] italic text-[11px] font-normal">All 4 sources combined</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signal Extraction Summary */}
            <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-md p-4 space-y-3">
              <h4 className="text-[13px] font-bold text-[#171717]">Signal Extraction Summary</h4>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Of 1,176 reviews collected, 189 (16.1%) contained real behavioral signal — a stated reason, barrier, or specific complaint the engine could extract and verify. The remaining 987 were excluded before analysis: generic ratings with no reasoning ('good app', '5 stars'), off-topic content (delivery-worker labor posts, industry-economics debate unrelated to shopping behavior), and statements too short to support a verifiable extraction.
              </p>
              <p className="text-[11.5px] text-[#737373] italic font-mono pt-2 border-t border-[#ECE8DE]/60">
                Note: Per-source signal yield is not separately tracked in this dataset — the 16.1% extraction rate is measured across the full collected set, not broken down by source.
              </p>
            </div>
          </div>

          {/* Engineering docs block */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Methodology Reference</span>
              <h2 className="font-display font-bold text-[18px] text-[#171717] mt-0.5">What this engine does, in order:</h2>
            </div>
            
            <ol className="space-y-4 text-[13.5px] text-[#5F6368] leading-relaxed">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#59624B]">1.</span>
                <div>
                  <strong>Reads customer feedback:</strong> Ingests entries from Google Play (662), Reddit (360), YouTube comments (144), and App Store (10).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#59624B]">2.</span>
                <div>
                  <strong>Rejects reviews with no behavioral content:</strong> A one-word rating or generic praise carries no signal and is discarded before the model sees it as analyzable evidence. 987 of 1,176 reviews were rejected at this step; that's not a flaw, it reflects how little of this kind of feedback actually contains reasoning.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#59624B]">3.</span>
                <div>
                  <strong>Extracts structure:</strong> Classifies from what is left whether the review shows repeat-buying behavior, what category is named, what is the stated barrier, what would fix it, what segment the language suggests, and how confident the model is in its own read.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#59624B]">4.</span>
                <div>
                  <strong>Requires quote-grounding:</strong> Requires every extracted claim to quote the exact source sentence. If the model's stated reasoning can't be found verbatim in the original review, that record is discarded, not corrected or reworded.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#59624B]">5.</span>
                <div>
                  <strong>Deduplicates feed:</strong> Flags near-duplicate content (20% of extracted signals) so a single viral complaint copy-pasted across threads doesn't inflate a theme's apparent size.
                </div>
              </li>
            </ol>
          </div>

          {/* AI vs Human block */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-3">
            <h3 className="font-display font-bold text-[15px] text-[#171717]">
              Why this needed AI, not a person reading 1,176 reviews
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              A person could read all 1,176 reviews. What they couldn't do reliably is apply the exact same extraction standard to review #4 and review #1,150 — attention degrades, categorization drifts, and two different afternoons produce two different judgment calls on the same review. This engine applies one fixed extraction standard to every review, and every output is traceable back to the sentence that produced it — which a manual read-through doesn't produce as a byproduct.
            </p>
          </div>

          {/* Expanded AI failure-mode analysis */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-[15px] text-[#171717]">
              Concrete AI Failure Modes & Mitigation Analysis
            </h3>
            
            <div className="space-y-6 text-[13px] text-[#5F6368] leading-relaxed">
              <div className="border-b border-[#ECE8DE] pb-4 space-y-2">
                <h4 className="font-bold text-[#171717]">1. Incorrect Segment Inference</h4>
                <p>
                  <strong>Why it happens:</strong> Segments are inferred strictly from word choice and phrasing cues in the text (e.g., mention of family routines vs. coupon hunting) rather than verified transaction records.
                </p>
                <p>
                  <strong>Mitigation:</strong> The model is instructed to mark classifications as "unclear" if linguistic cues are insufficient.
                </p>
                <p>
                  <strong>Risk remaining:</strong> Occasional mischaracterization where light users are inferred as heavy users due to dramatic vocabulary. Treated strictly as a language-based supposition.
                </p>
              </div>

              <div className="border-b border-[#ECE8DE] pb-4 space-y-2">
                <h4 className="font-bold text-[#171717]">2. Trust vs. Convenience Misclassification</h4>
                <p>
                  <strong>Why it happens:</strong> Language explaining delivery delays can overlap with quality and safety concerns, leading to categorization drift between reasons.
                </p>
                <p>
                  <strong>Mitigation:</strong> Restrictive coding requires clear descriptions of safety, counterfeit, or item damage risks to place under "trust".
                </p>
                <p>
                  <strong>Risk remaining:</strong> Standard courier speed complaints may occasionally trigger a trust barrier tag.
                </p>
              </div>

              <div className="border-b border-[#ECE8DE] pb-4 space-y-2">
                <h4 className="font-bold text-[#171717]">3. Hallucinated Extraction</h4>
                <p>
                  <strong>Why it happens:</strong> Standard model completions occasionally invent patterns or modify sentences to suit the brief questions.
                </p>
                <p>
                  <strong>Mitigation:</strong> Programmatic validation verifies that every single word in the model's reported quote is present word-for-word in the original text, discarding non-matching entries.
                </p>
                <p>
                  <strong>Risk remaining:</strong> Discards valid signals if slight transcription or character anomalies exist in the review.
                </p>
              </div>

              <div className="border-b border-[#ECE8DE] pb-4 space-y-2">
                <h4 className="font-bold text-[#171717]">4. Duplicate Complaints Inflating Patterns</h4>
                <p>
                  <strong>Why it happens:</strong> Viral user comments are frequently copy-pasted across threads, inflating specific catalog issue volumes.
                </p>
                <p>
                  <strong>Mitigation:</strong> The pipeline tags near-duplicate reviews (20% duplicate rate detected) to prevent inflating core metric counts.
                </p>
                <p>
                  <strong>Risk remaining:</strong> Slightly rephrased copies may bypass the deduplication algorithm and mildly skew pattern sizes.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171717]">5. Sparse Source Bias</h4>
                <p>
                  <strong>Why it happens:</strong> App Store reviews contribute only 10 entries (0.9%), while Google Play represents 56.3% of the dataset.
                </p>
                <p>
                  <strong>Mitigation:</strong> Sources are clearly badged, and user exploration is supported via direct source filters.
                </p>
                <p>
                  <strong>Risk remaining:</strong> High risk of false trends if PMs draw conclusions based on App Store or App Store-linked sub-cohorts alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          3. DISCOVERY WORKSPACE VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "workspace" && (
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Header info */}
          <div className="border-b border-[#ECE8DE] pb-4">
            <h2 className="font-display font-bold text-[20px] text-[#171717]">Discovery Workspace</h2>
            <p className="text-[13px] text-[#5F6368] mt-1">
              Active structured evaluation of the 8 core customer discovery questions.
            </p>
          </div>

          {/* 8 Questions list */}
          <div className="space-y-8">
            
            {/* Q1 */}
            <div id="q1" className="bg-white border border-[#ECE8DE] border-l-4 border-l-[#59624B] rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHY CUSTOMERS KEEP BUYING FROM THE SAME CATEGORIES
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: High (Known from evidence)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-3 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Customers aren't loyal. They're cautious."
                  </h3>
                  
                  {/* Assumed vs Found Block */}
                  <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-md p-3 text-[12px] space-y-1">
                    <div className="text-[#8C8C8C] line-through font-mono">
                      <strong className="no-underline">ASSUMED:</strong> Customers buy the same things out of habit.
                    </div>
                    <div className="text-[#171717] font-bold font-mono">
                      <strong className="text-[#59624B]">FOUND:</strong> Only 3.7% show habitual buying — the rest is deliberate risk-avoidance.
                    </div>
                  </div>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="3.7%" 
                  label="of signals show habitual buying" 
                  colorClass="text-[#59624B]" 
                />
              </div>
              
              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "This isn't habit. Only 7 of 189 signals (3.7%) describe routine or automatic buying — the weakest pattern in the entire dataset. What actually repeats is caution: customers keep returning to categories where nothing has gone wrong for them yet, and they describe this as a deliberate choice, not a default."
                  </p>
                </div>
                
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(1).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Repeat purchasing in quick-commerce is driven by active risk avoidance. Once a customer has a negative experience in a category, they isolate themselves to safe, verified categories, preventing cross-category exploration.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Whether to focus roadmap resources on generic personalization algorithms or on category-specific risk-reduction features.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Introduce a "risk-free first trial" badge on new categories with a guaranteed refund if unsatisfied.</li>
                    <li>Display category-specific customer ratings emphasizing service reliability instead of raw sales volume.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether introducing category-specific trust guarantees would actually convert caution-based shoppers into new category trials, or if their avoidance is driven by other factors not observable from this dataset.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q2" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What's stopping customers from trying a new category? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div id="q2" className="bg-white border border-[#ECE8DE] border-l-4 border-l-red-600 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHAT'S STOPPING CUSTOMERS FROM TRYING A NEW CATEGORY?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: High (Known from evidence)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Customers don't avoid new categories. They avoid risk."
                  </h3>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="55.6%" 
                  label="cite specific trust failures (105 of 189 signals)" 
                  colorClass="text-red-600" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Trust is the blocker, and it's specific, not vague — customers aren't saying 'I don't trust Blinkit,' they're describing concrete failures: a fake product, an expired item, a tampered electronics box. 105 of 189 signals (55.6%) cite this. Price uncertainty is real but secondary (40 signals, 21.2%) — customers comparing prices across apps are a different behavior from customers avoiding a category altogether."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(2).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    The primary friction to category expansion is quality risk. Customers are comfortable ordering low-risk items (like snacks) but hesitate to buy high-ticket or fresh items due to visible platform failures.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Prioritizing physical quality assurance workflows over UI navigation changes.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Display expiration dates clearly on perishables listings.</li>
                    <li>Add tamper-evident seal options at checkout for high-value categories.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether the proportion of trust-related complaints differs by geographic location or warehouse-specific operations.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q5" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What would make a customer trust a category? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div id="q3" className="bg-white border border-[#ECE8DE] border-l-4 border-l-purple-600 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  HOW DO CUSTOMERS FIND PRODUCTS TODAY?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#5F6368] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: Medium (Inferred from language)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Discovery isn't failing on trust — it's failing on visibility."
                  </h3>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="4.8%" 
                  label="leave due to inventory visibility (9 signals)" 
                  colorClass="text-purple-600" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Weakly, and mostly by accident. The smallest but most telling pattern (9 signals, 4.8%) shows customers leaving for a competitor not because they distrust Blinkit, but because a specific product they wanted — a cat food variant, a collectible — wasn't visible or in stock. Discovery isn't failing on trust here, it's failing on basic inventory visibility."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(3).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Discovery fails when customers cannot easily locate niche or regional stock. Silent churn occurs when product search algorithms return irrelevant items or fail to show accurate stock levels.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Investing in semantic search quality vs. generic banner advertisements.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Implement regional stock-request notifications.</li>
                    <li>Optimize search to surface exact category variants rather than sponsored alternatives.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether these inventory discovery issues exist outside review writers who take the time to post complaints online.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q8" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What do customers consistently say is missing? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div id="q4" className="bg-white border border-[#ECE8DE] border-l-4 border-l-blue-600 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHAT ROLE DOES HABIT ACTUALLY PLAY?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: High (Known from evidence)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-3 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "The customer isn't passive. They're constantly comparing."
                  </h3>

                  {/* Assumed vs Found Block */}
                  <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-md p-3 text-[12px] space-y-1">
                    <div className="text-[#8C8C8C] line-through font-mono">
                      <strong className="no-underline">ASSUMED:</strong> Customers passively return out of app loyalty.
                    </div>
                    <div className="text-[#171717] font-bold font-mono">
                      <strong className="text-blue-600">FOUND:</strong> 21.2% actively price-shop across Blinkit, Zepto, and Instamart in the same session.
                    </div>
                  </div>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="21.2%" 
                  label="price-shop across multiple apps (40 signals)" 
                  colorClass="text-blue-600" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Less than assumed. 7 signals (3.7%) describe habitual buying, while 40 signals (21.2%) describe customers actively price-shopping across Blinkit, Zepto, and Instamart in the same shopping session. Customers are not passively loyal — they're evaluating, constantly, and that means engagement mechanics have room to work if the underlying trust problem is addressed first."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(4).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Loyalty is transactional, not habitual. Customers compare prices in real-time, meaning cross-category exploration is highly vulnerable to competitive pricing.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Launching dynamic cross-category loyalty rewards versus flat membership plans.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Show checkout price comparisons against local MRP.</li>
                    <li>Provide instant price-match credits on cross-category purchases.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether this price-sensitive app-switching behavior leads to long-term churn or simply short-term order fragmentation.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q2" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What's stopping customers from trying a new category? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div id="q5" className="bg-white border border-[#ECE8DE] border-l-4 border-l-amber-500 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHAT WOULD MAKE A CUSTOMER TRUST A CATEGORY ENOUGH TO TRY IT?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: High (Known from evidence)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Customers already told us what would change their mind."
                  </h3>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="45.5%" 
                  label="describe specific trust fixes (86 of 189 signals)" 
                  colorClass="text-amber-500" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Nearly half of all signal (86 of 189, 45.5%) answers this directly and specifically — not 'better service' but concrete asks: visible authenticity checks, tamper-evident packaging, expiry dates shown before checkout, a working return process, accurate stock counts. This is the most actionable finding in the dataset because customers described the fix, not just the problem."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(5).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Customers are willing to try new categories if the platform explicitly surfaces verification assurances.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Whether to build generalized customer support tools or specific checkout security badges.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Embed active "Freshness Guarantee" and "Authentic Seal" tags on listings.</li>
                    <li>Provide direct, single-tap return flows for untested categories.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether showing these trust tags increases category conversion rates or if users ignore them during high-speed checkouts.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q6" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What frustrates customers repeatedly? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div id="q6" className="bg-white border border-[#ECE8DE] border-l-4 border-l-red-600 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHAT FRUSTRATES CUSTOMERS REPEATEDLY?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: High (Known from evidence)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Five failures repeat across every category."
                  </h3>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="5" 
                  label="recurring platform failure modes" 
                  colorClass="text-red-600" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "The same five failures recur across unrelated categories: counterfeit goods, expired perishables, refund promises that don't get honored, substitutions made without asking, and promo codes that don't work at checkout. These aren't category-specific complaints — they're platform-trust failures that happen to surface most often in electronics and perishables because that's where the cost of being wrong is highest for the customer."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(6).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Core operational errors (expired stock, forced replacements) destroy trust globally, making category discovery initiatives useless if core fulfillment is broken.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Aligning roadmap goals with supply chain fulfillment accuracy metrics rather than top-funnel marketing.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Block pickers from making substitutions without real-time customer app consent.</li>
                    <li>Automate refunds for reported expired items within 5 minutes.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether these platform-trust failures are concentrated in specific courier networks or are evenly distributed across the entire catalog.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q7" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: Which customers are closest to trying something new? →
                  </a>
                </div>
              </div>
            </div>

            {/* Q7 */}
            <div id="q7" className="bg-white border border-[#ECE8DE] border-l-4 border-l-[#59624B] rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHICH CUSTOMERS ARE CLOSEST TO TRYING SOMETHING NEW?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#5F6368] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: Medium (Inferred from language)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-3 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Some customers are closer to trying something new than others."
                  </h3>

                  {/* Assumed vs Found Block */}
                  <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-md p-3 text-[12px] space-y-1">
                    <div className="text-[#8C8C8C] line-through font-mono">
                      <strong className="no-underline">ASSUMED:</strong> Non-buyers across categories have blanket distrust of the platform.
                    </div>
                    <div className="text-[#171717] font-bold font-mono">
                      <strong className="text-[#59624B]">FOUND:</strong> 10.1% of high-frequency users express fixable transactional barriers, ready for trial.
                    </div>
                  </div>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="10.1%" 
                  label="show high-frequency usage language (19 signals)" 
                  colorClass="text-[#59624B]" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Customers whose language suggests frequent, ongoing use (19 signals, 10.1%) describe specific, fixable complaints rather than blanket distrust — that distinction matters. A customer who says 'I won't buy electronics here because of X' is different from a customer who says 'I'll never use this app again.' The first is telling you what to fix. Treat this as a supposition about where to test first, not a confirmed customer list — segment inference here comes from language, not verified purchase history."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(7).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    High-frequency users represent the highest conversion potential because their barriers are transactional friction, not complete platform distrust.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Targeting new feature pilots to the "heavy_user" segment rather than mass-market launches.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Pilot a trust-verification layout with heavy users first.</li>
                    <li>Deliver tailored trial discounts on high-ticket categories to recurring daily shoppers.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether the language-inferred segments align with actual historical purchase frequencies and spending profiles.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q8" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: What do customers consistently say is missing? →
                  </a>
                </div>
              </div>

              {/* Segment x Reason Matrix */}
              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-lg p-5 space-y-4 mt-4">
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717]">Supporting Matrix: Segments × Reason-Types</h4>
                  <p className="text-[12px] text-[#5F6368] mt-1 leading-relaxed">
                    Matrix compares segments by reason type. It is read-only; use the filters in the explorer tab to narrow by one or more segments. Cells are clickable to filter and browse matching records in the Evidence Explorer.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-[11px] bg-white">
                    <thead>
                      <tr className="border-b border-[#ECE8DE] bg-[#F2F1EC]/60">
                        <th className="p-2.5 font-bold text-[#5F6368] uppercase tracking-wider text-[9px]">Segment</th>
                        {REASONS.map(r => (
                          <th key={r} className="p-2.5 font-bold text-[#5F6368] uppercase tracking-wider text-[9px] text-center capitalize">{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SEGMENTS.map(seg => (
                        <tr key={seg} className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                          <td className="p-2.5 font-bold text-[#171717] capitalize">{seg.replace(/_/g, " ")}</td>
                          {REASONS.map(reason => {
                            const count = reviews.filter(r => r.user_segment === seg && r.reason_type === reason).length;
                            const totalSegmentReviews = reviews.filter(r => r.user_segment === seg).length || 1;
                            const pctOfSegment = ((count / totalSegmentReviews) * 100).toFixed(0);
                            const avgConf = count > 0 
                              ? reviews.filter(r => r.user_segment === seg && r.reason_type === reason)
                                  .reduce((sum, r) => sum + (r.confidence === "high" ? 1.0 : r.confidence === "med" ? 0.6 : 0.3), 0) / count
                              : 0;

                            return (
                              <td 
                                key={reason}
                                onClick={() => filterByMatrixCell(seg, reason)}
                                className="p-2 text-center cursor-pointer transition-colors hover:bg-[#FFF6DD]"
                                style={{
                                  backgroundColor: count > 0 
                                    ? `rgba(89, 98, 75, ${0.05 + (count / maxMatrixCount) * 0.45})` 
                                    : "transparent"
                                }}
                              >
                                {count > 0 ? (
                                  <div className="space-y-0.5">
                                    <div className="font-bold text-[11.5px] text-[#171717]">{count}</div>
                                    <div className="text-[9px] text-[#5F6368]">{pctOfSegment}%</div>
                                    <div className="text-[8px] text-[#8C8C8C] font-mono">c={avgConf.toFixed(1)}</div>
                                  </div>
                                ) : (
                                  <span className="text-[#8C8C8C]/30 text-[10px]">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Q8 */}
            <div id="q8" className="bg-white border border-[#ECE8DE] border-l-4 border-l-purple-600 rounded-lg p-6 md:p-7 shadow-sm space-y-6 scroll-mt-20">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DE]/60 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  WHAT DO CUSTOMERS CONSISTENTLY SAY IS MISSING?
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] font-bold text-[#5F6368] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 shrink-0"
                >
                  Confidence: Medium (Inferred from language)
                </motion.span>
              </div>

              {/* Main Title Block + Stat Callout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[#171717] leading-tight tracking-tight">
                    "Customers didn't just complain — they specified the fix."
                  </h3>
                </div>

                {/* Stat Callout */}
                <AnimatedStat 
                  value="5" 
                  label="core unfulfilled customer needs" 
                  colorClass="text-purple-600" 
                />
              </div>

              {/* Structured Body Sections */}
              <div className="space-y-4 pt-3 border-t border-[#ECE8DE]/60 text-[13px] font-normal leading-relaxed">
                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Observed Pattern</span>
                  <p className="text-[#171717] font-medium italic bg-[#F8F9FA] p-3 rounded border border-[#ECE8DE]/50">
                    "Five needs repeat across otherwise unrelated complaints: proof a product is genuine, clear pricing without surprise fees, a return process that actually works, accurate stock information for less-common items, and — mentioned by only one customer but worth flagging rather than discarding — a simpler interface for a non-technical user. Small signal isn't nothing; it's a prompt for direct research, not a proven segment need."
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Evidence</span>
                  <div className="space-y-2 mt-1.5">
                    {getEvidenceForQuestion(8).map((r) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F4F3EE] border border-[#E2DFD2] rounded-md p-3.5 text-[12px] text-[#171717] italic cursor-pointer hover:bg-[#EDEBE3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        "{r.quote}" <span className="font-mono text-[10px] text-[#8C8C8C] not-italic block mt-1">Row #{r.row_number} · Click to verify</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Interpretation</span>
                  <p className="text-[#5F6368]">
                    Customer needs concentrate around catalog integrity and transparency, with occasional accessibility signals (e.g., senior citizen segment usability) representing critical qualitative cues.
                  </p>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Product Implication</span>
                  <p className="text-[#171717] font-semibold">Decision supported: Running dedicated qualitative validation studies for accessibility features.</p>
                  <p className="text-[#5F6368] mt-1">Unvalidated product bets (suppositions generated from customer feedback):</p>
                  <ul className="list-disc pl-4 text-[#5F6368] space-y-1 mt-1">
                    <li>Introduce an "easy-read/simple-checkout" toggle for elderly cohorts.</li>
                    <li>Provide 100% transparent fee breakdowns at checkout.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                  <p className="text-[#5F6368]">
                    Whether the accessibility need represents a broad, unserved cohort or is isolated to a few vocal outliers.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8DE]/40">
                  <a href="#q1" className="text-[12px] font-bold text-[#59624B] hover:underline flex items-center gap-1">
                    Related findings: Why do customers keep buying from the same categories? →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          4. EVIDENCE EXPLORER VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "explorer" && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="border-b border-[#ECE8DE] pb-3">
            <h2 className="font-display font-bold text-[20px] text-[#171717]">Evidence Explorer</h2>
            <p className="text-[12px] text-[#5F6368] mt-1">
              Verify claims against the underlying customer feedback records. Apply filter parameters to recompute the list.
            </p>
          </div>

          {/* Explorer Filters Header Card */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
            {/* Search input */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Search Quote/Row</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 22 or 'spoiled'"
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium"
                />
                {explorerSearch && (
                  <button 
                    onClick={() => setExplorerSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#8C8C8C] hover:text-[#171717]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Source dropdown */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Source</label>
              <select
                value={explorerSource}
                onChange={(e) => setExplorerSource(e.target.value)}
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium"
              >
                <option value="all">All Sources</option>
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Segment dropdown */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Segment</label>
              <select
                value={explorerSegment}
                onChange={(e) => setExplorerSegment(e.target.value)}
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium capitalize"
              >
                <option value="all">All Segments</option>
                {SEGMENTS.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
            </div>

            {/* Reason dropdown */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Reason Type</label>
              <select
                value={explorerReason}
                onChange={(e) => setExplorerReason(e.target.value)}
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium capitalize"
              >
                <option value="all">All Reasons</option>
                {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Confidence dropdown */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Confidence</label>
              <select
                value={explorerConfidence}
                onChange={(e) => setExplorerConfidence(e.target.value)}
                className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium capitalize"
              >
                <option value="all">All Confidence</option>
                <option value="high">High</option>
                <option value="med">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Reset Filters button */}
          {(explorerSearch || explorerSource !== "all" || explorerSegment !== "all" || explorerReason !== "all" || explorerConfidence !== "all") && (
            <div className="flex justify-start">
              <button
                onClick={() => {
                  setExplorerSearch("");
                  setExplorerSource("all");
                  setExplorerSegment("all");
                  setExplorerReason("all");
                  setExplorerConfidence("all");
                }}
                className="text-[11px] font-bold text-[#59624B] hover:text-[#171717] underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Master-Detail Evidence Inspector */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* LEFT PANEL — compact evidence list */}
            <div className="w-full md:w-[360px] shrink-0 bg-white border border-[#ECE8DE] rounded-lg shadow-sm overflow-hidden flex flex-col h-[560px]">
              <div className="p-3 bg-[#F2F1EC]/80 border-b border-[#ECE8DE] flex justify-between items-center text-[10px] font-mono font-bold text-[#737373] uppercase tracking-wider">
                <span>RECORDS ({filteredExplorerReviews.length})</span>
                <span>CONFIDENCE</span>
              </div>
              
              <div className="overflow-y-auto flex-1 divide-y divide-[#ECE8DE]/60">
                {filteredExplorerReviews.length === 0 ? (
                  <div className="p-8 text-center text-[#8C8C8C] italic text-[12px]">
                    No records match the current filter selection.
                  </div>
                ) : (
                  filteredExplorerReviews.map((r) => {
                    const isSelected = selectedRowId === r.row_number;
                    const dotColor = r.confidence === "high" ? "bg-emerald-500" : r.confidence === "med" ? "bg-amber-500" : "bg-gray-400";
                    return (
                      <div
                        key={r.row_number}
                        onClick={() => setSelectedRowId(r.row_number)}
                        className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 text-left ${
                          isSelected ? "bg-[#F3F5F1] border-l-4 border-l-[#59624B]" : "hover:bg-[#F8F9FA]"
                        }`}
                      >
                        <PlatformIcon source={r.source} size={18} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-mono text-[10.5px] font-bold text-[#59624B]">Row #{r.row_number}</span>
                            <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} title={`Confidence: ${r.confidence}`} />
                          </div>
                          <p className="text-[12px] text-[#171717] font-medium truncate leading-tight">
                            "{r.quote}"
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-[#737373]">
                            <span>{r.source}</span>
                            <span>•</span>
                            <span className="capitalize">{r.reason_type}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="bg-[#F8F9FA] p-2.5 text-[10.5px] text-[#8C8C8C] border-t border-[#ECE8DE] text-right font-mono">
                Showing {filteredExplorerReviews.length} of 189 records
              </div>
            </div>

            {/* RIGHT PANEL — evidence inspection card */}
            <div className="w-full flex-1 min-h-[560px]">
              {!selectedRecord ? (
                <div className="bg-white border border-[#ECE8DE] rounded-lg p-8 shadow-sm flex flex-col items-center justify-center text-center h-[560px]">
                  <div className="w-12 h-12 rounded-full bg-[#F3F5F1] text-[#59624B] flex items-center justify-center mb-3">
                    <Search size={20} />
                  </div>
                  <h3 className="font-display font-bold text-[16px] text-[#171717]">No Record Selected</h3>
                  <p className="text-[13px] text-[#737373] mt-1 max-w-xs leading-relaxed">
                    Select any record to inspect the full evidence and AI reasoning behind it.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-6 h-[560px] flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-6">
                    {/* Inspection Header */}
                    <div className="flex items-center justify-between border-b border-[#ECE8DE] pb-4">
                      <div className="flex items-center gap-3">
                        <PlatformIcon source={selectedRecord.source} size={24} />
                        <div>
                          <span className="font-display font-extrabold text-[16px] text-[#171717] block">
                            {selectedRecord.source}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#59624B]">
                            Row #{selectedRecord.row_number}
                          </span>
                        </div>
                      </div>

                      {/* Confidence Meter */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                          Confidence ({selectedRecord.confidence})
                        </span>
                        <div className="flex items-center gap-1">
                          <div className={`w-5 h-2 rounded-sm ${selectedRecord.confidence === "high" || selectedRecord.confidence === "med" || selectedRecord.confidence === "low" ? (selectedRecord.confidence === "high" ? "bg-emerald-500" : selectedRecord.confidence === "med" ? "bg-amber-500" : "bg-gray-400") : "bg-gray-200"}`} />
                          <div className={`w-5 h-2 rounded-sm ${selectedRecord.confidence === "high" || selectedRecord.confidence === "med" ? (selectedRecord.confidence === "high" ? "bg-emerald-500" : "bg-amber-500") : "bg-gray-200"}`} />
                          <div className={`w-5 h-2 rounded-sm ${selectedRecord.confidence === "high" ? "bg-emerald-500" : "bg-gray-200"}`} />
                        </div>
                      </div>
                    </div>

                    {/* AI-Verified Source Text with Yellow Marker Highlight */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                        AI-Verified Source Text
                      </span>
                      <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-lg p-5">
                        <p className="text-[14.5px] font-medium leading-relaxed text-[#171717]">
                          <mark className="bg-[#FFF3C4] text-[#171717] px-1.5 py-0.5 rounded border-b-2 border-[#F59E0B] font-semibold">
                            "{selectedRecord.quote}"
                          </mark>
                        </p>
                      </div>
                      <p className="text-[11.5px] text-[#737373] italic">
                        {selectedRecord.confidence === "high"
                          ? "High confidence: the model found a clear, unambiguous statement directly in the source text."
                          : selectedRecord.confidence === "med"
                          ? "Medium confidence: language required contextual interpretation, treat as directional cue."
                          : "Low confidence: weak signal inferred from partial phrase, treat as exploratory cue."}
                      </p>
                    </div>

                    {/* Extracted Structure Pill Tags */}
                    <div className="space-y-2 pt-2 border-t border-[#ECE8DE]/60">
                      <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                        Extracted Structure
                      </span>
                      <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                        <span className="bg-[#F3F5F1] text-[#59624B] border border-[#59624B]/20 px-2.5 py-1 rounded-md font-mono">
                          Reason: <strong className="capitalize">{selectedRecord.reason_type}</strong>
                        </span>
                        <span className="bg-[#F8F9FA] text-[#171717] border border-[#ECE8DE] px-2.5 py-1 rounded-md">
                          Category: <strong>{selectedRecord.category_mentioned === "none" ? "General Catalog" : selectedRecord.category_mentioned}</strong>
                        </span>
                        <span className="bg-[#F8F9FA] text-[#171717] border border-[#ECE8DE] px-2.5 py-1 rounded-md capitalize">
                          Segment: <strong>{selectedRecord.user_segment.replace(/_/g, " ")}</strong>
                        </span>
                        {selectedRecord.info_needed !== "none" && selectedRecord.info_needed !== "not stated" && (
                          <span className="bg-[#F8F9FA] text-[#5F6368] border border-[#ECE8DE] px-2.5 py-1 rounded-md">
                            Info Needed: <strong>{selectedRecord.info_needed}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Link back to Discovery Workspace */}
                  {(() => {
                    const mappedQ = REASON_TO_QUESTION[selectedRecord.reason_type] || REASON_TO_QUESTION.trust;
                    return (
                      <div className="pt-4 border-t border-[#ECE8DE]">
                        <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">
                          Supported Finding
                        </span>
                        <button
                          onClick={() => {
                            setCurrentView("workspace");
                            setTimeout(() => {
                              const el = document.getElementById(mappedQ.id);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className="text-[13px] font-bold text-[#59624B] hover:underline flex items-center gap-1 text-left"
                        >
                          This supports Question 0{mappedQ.qNum}: "{mappedQ.headline}" →
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          5. ENGINE DOCUMENTATION VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "docs" && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* User Guide Doc Section */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-[18px] text-[#171717] flex items-center gap-2">
              <BookOpen size={16} className="text-[#59624B]" /> User Guide
            </h2>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Use the **Evidence Explorer** tab to search and verify findings. You can input a row number to view its details directly, or select a source, segment, or reason type from the dropdown selectors to recompute the list. The **Discovery Workspace** presents the 8 primary questions, each containing quote-grounded customer sentences. Click any quote block to jump directly to the Explorer and verify the sentence in the table.
            </p>
            <div className="text-[12.5px] text-[#5F6368] bg-[#F8F9FA] p-3.5 rounded border border-[#ECE8DE] space-y-2">
              <div>
                <strong>Confidence Levels:</strong> Sourced self-reported scores indicating model classification depth. Treats "high" as zero hedging, and "medium/low" as directional cues requiring follow-up inspection.
              </div>
              <div>
                <strong>Verbatim Quotes:</strong> Every record is grounded in character-match validation. Claims are only retained if the exact text resides word-for-word in the raw source feedback database.
              </div>
            </div>
          </div>

          {/* Links to engineering methodology */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#171717]">Technical Pipeline Reference</h4>
              <p className="text-[12px] text-[#5F6368]">
                Read the details on review noise rejection steps, source biases, and extraction standards.
              </p>
            </div>
            <button
              onClick={() => setCurrentView("methodology")}
              className="bg-[#F2F1EC] hover:bg-[#ECE8DE] text-[#171717] font-bold text-[11.5px] px-4 py-2 rounded transition-colors"
            >
              Open Technical Docs
            </button>
          </div>

          {/* Try It: Live Review Analyzer */}
          <div className="bg-white border border-[#ECE8DE] rounded-lg p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#171717] flex items-center gap-2">
                <Lock size={15} className="text-[#59624B]" /> Try It: Live Review Analyzer
              </h3>
              <p className="text-[12.5px] text-[#5F6368] mt-1">
                Enter your Gemini API key and paste a raw customer review to process it through the extraction schema.
              </p>
            </div>

            <div className="space-y-4">
              {/* API Key */}
              <div>
                <label className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1.5">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-3 py-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium"
                />
              </div>

              {/* Text Area */}
              <div>
                <label className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1.5">
                  Raw Review Text
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Received a fake charging cable from the delivery person today. Quality control is highly disappointing, I will stick to buying electronics offline."
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  className="w-full bg-[#F2F1EC] border border-[#ECE8DE] rounded px-3 py-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#59624B] text-[#171717] font-medium leading-relaxed"
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleAnalyze}
                disabled={analyzerLoading}
                className="bg-[#59624B] hover:bg-[#59624B]/90 text-white font-bold text-[12.5px] px-5 py-2.5 rounded transition-colors disabled:opacity-60 shadow-sm"
              >
                {analyzerLoading ? "Processing signal..." : "Analyze review"}
              </button>
            </div>

            {/* Loading step indicators */}
            {analyzerLoading && (
              <div className="mt-4 pt-4 border-t border-[#ECE8DE] space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-[#59624B] uppercase tracking-wider animate-pulse">
                  <span>{ANALYZER_STEPS[analyzerStep]}</span>
                  <span>{Math.round(((analyzerStep + 1) / ANALYZER_STEPS.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-[#F2F1EC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#59624B] transition-all duration-300 ease-out"
                    style={{ width: `${((analyzerStep + 1) / ANALYZER_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error output */}
            {analyzerError && (
              <div className="mt-4 p-3 bg-[#FFF5F5] border border-[#D64545]/20 text-[#D64545] rounded text-[12px] font-semibold">
                Error: {analyzerError}
              </div>
            )}

            {/* Result output */}
            {analyzerResult && (
              <div className="mt-6 pt-5 border-t border-[#ECE8DE] space-y-4">
                <span className="text-[10px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded border border-[#59624B]/20 inline-block uppercase tracking-wider">
                  Resulting Parameters
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] bg-[#F8F9FA] p-4 rounded border border-[#ECE8DE]/60 leading-relaxed text-[#171717]">
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Has Signal</span>
                    <span className="font-semibold">{String(analyzerResult.has_signal)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Category</span>
                    <span className="font-semibold capitalize">{analyzerResult.category_mentioned || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Stated Barrier</span>
                    <span className="font-semibold">{analyzerResult.barrier_to_new_category || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Reason Type</span>
                    <span className="font-semibold capitalize">{analyzerResult.reason_type || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">User Segment</span>
                    <span className="font-semibold capitalize">{(analyzerResult.user_segment_signal || "unclear").replace(/_/g, " ")}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Confidence</span>
                    <span className="font-semibold capitalize">{analyzerResult.confidence || "low"}</span>
                  </div>
                  <div className="md:col-span-2 border-t border-[#ECE8DE]/60 pt-2.5">
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Verbatim Sentence Match</span>
                    <span className="font-semibold italic text-[#5F6368]">"{analyzerResult.quote || "none"}"</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          PROJECT REPOSITORY CARD (FOOTER)
          ═══════════════════════════════════════════ */}
      <footer className="max-w-4xl mx-auto border-t border-[#ECE8DE] pt-8">
        <div className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Source Code Repository</span>
            <h4 className="font-display font-bold text-[14.5px] text-[#171717]">Project Repository</h4>
            <p className="text-[12px] text-[#5F6368]">
              Access the codebase, data mapping pipeline, and static files on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Deepali611/AI.blinkit-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-white border border-[#ECE8DE] text-[#171717] hover:bg-[#F2F1EC]/40 text-[12px] font-bold px-4 py-2 rounded shadow-sm transition-all"
          >
            Open on GitHub <ExternalLink size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
