"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { 
  reviews, 
  ReviewRow, 
  TOTAL_REVIEWS_SCANNED, 
  REASON_COLORS, 
  SEGMENT_COLORS,
  formatSegmentLabel
} from "@/lib/data";
import { 
  SlidersHorizontal, 
  Database,
  Search,
  ArrowRight,
  ArrowDown,
  Check,
  ExternalLink,
  BookOpen,
  Info,
  Lock,
  ChevronDown,
  ChevronUp,
  Play
} from "lucide-react";

// Repeating decorative palette for list dot bullets
const DOT_PALETTE = ["#F8CB45", "#54B226", "#1F1F1F", "#3B5BDB", "#D93025"];

// Count-up Stat Callout component using Framer Motion with two-segment visual progress bar
function AnimatedStat({ 
  value, 
  label, 
  colorClass, 
  barColorBg 
}: { 
  value: string; 
  label: string; 
  colorClass: string; 
  barColorBg?: string 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayVal, setDisplayVal] = useState(value);

  const numericMatch = value.match(/[\d.]+/);
  const targetNum = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const isPercent = value.includes("%");
  const pctFill = isPercent ? Math.min(Math.max(targetNum, 2), 100) : 100;

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
    <div ref={ref} className="flex flex-col items-start min-w-[150px] shrink-0 border-l border-gray-200 pl-4 md:pl-6 my-auto pt-2 md:pt-0">
      <span className={`text-[42px] md:text-[48px] font-extrabold font-mono leading-none tracking-tight ${colorClass}`}>
        {displayVal}
      </span>
      <span className="text-[11px] font-medium text-[#737373] mt-1 max-w-[150px] leading-tight">
        {label}
      </span>
      {/* Simple two-segment visual progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden mt-2.5">
        <div 
          className={`h-full ${barColorBg || "bg-black"} transition-all duration-1000 ease-out`} 
          style={{ width: `${pctFill}%` }}
        />
      </div>
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

const PRECOMPUTED_SAMPLES = [
  {
    id: "trust",
    label: "Trust: fake product complaint",
    badge: "Trust Barrier",
    row_number: 22,
    source: "Reddit",
    raw_text: "Ordered a ₹14,000 Camera on Blinkit. Received an Empty Box. Support Has Stepped Back.",
    result: {
      has_signal: true,
      category_mentioned: "electronics",
      barrier_to_new_category: "safety concerns / empty box risk",
      reason_type: "trust",
      user_segment_signal: "quality_focused",
      confidence: "high",
      quote: "Received an Empty Box. Support Has Stepped Back."
    }
  },
  {
    id: "price",
    label: "Price: cross-app comparison",
    badge: "Price Barrier",
    row_number: 73,
    source: "Reddit",
    raw_text: "Another Blinkit scam caught, they claim that they're giving 40% OFF while they are charging 2% more than MRP for the Haldiram Sev",
    result: {
      has_signal: true,
      category_mentioned: "snacks",
      barrier_to_new_category: "charging above MRP / false promotion",
      reason_type: "price",
      user_segment_signal: "price_sensitive",
      confidence: "high",
      quote: "charging 2% more than MRP for the Haldiram Sev"
    }
  },
  {
    id: "discovery",
    label: "Discovery: search visibility",
    badge: "Discovery Barrier",
    row_number: 190,
    source: "YouTube comments",
    raw_text: "Swiggy/Blinkit has a shopping list option but most of us don't know about it. Why don't they put in more efforts to make people use the feature? To create awareness?",
    result: {
      has_signal: true,
      category_mentioned: "none",
      barrier_to_new_category: "unaware features exist / discovery friction",
      reason_type: "no_discovery",
      user_segment_signal: "unclear",
      confidence: "medium",
      quote: "most of us don't know about it. Why don't they put in more efforts?"
    }
  }
];

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

  // Try It Live Analyzer & Instant Precomputed States
  const [selectedPrecomputedIndex, setSelectedPrecomputedIndex] = useState<number | null>(0);
  const [apiKey, setApiKey] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);
  const [analyzerError, setAnalyzerError] = useState("");
  const [analyzerStep, setAnalyzerStep] = useState(0);
  const [hasServerKey, setHasServerKey] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/analyze")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasServerKey === "boolean") {
          setHasServerKey(data.hasServerKey);
        } else {
          setHasServerKey(false);
        }
      })
      .catch(() => setHasServerKey(false));
  }, []);

  const SAMPLE_REVIEW = "Ordered a fresh milk packet but it was bloated and expired tomorrow. Very poor quality control, going back to buying from Mother Dairy store.";

  // Methodology list expanded states
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const [expandedFailures, setExpandedFailures] = useState<Record<number, boolean>>({});

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };
  const toggleStep = (stepNum: number) => {
    setExpandedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };
  const toggleFailure = (failureNum: number) => {
    setExpandedFailures((prev) => ({ ...prev, [failureNum]: !prev[failureNum] }));
  };

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
  const handleAnalyze = async (textOverride?: string) => {
    const textToAnalyze = typeof textOverride === "string" ? textOverride : reviewInput;
    setAnalyzerError("");
    setAnalyzerResult(null);

    if (!hasServerKey && !apiKey.trim()) {
      setAnalyzerError("Please input an API Key.");
      return;
    }
    if (!textToAnalyze.trim()) {
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
        body: JSON.stringify({ apiKey: apiKey.trim(), review: textToAnalyze.trim() }),
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

  const handleRunSample = () => {
    setReviewInput(SAMPLE_REVIEW);
    handleAnalyze(SAMPLE_REVIEW);
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
    <div className="space-y-8 font-sans antialiased text-[#1F1F1F]">
      {/* Navigation Header (Hidden on Landing) */}
      {currentView !== "landing" && (
        <header className="bg-[#FFFFFF] border-b border-[#E5E5E5] p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView("landing")}
              className="w-[44px] h-[44px] rounded-[10px] bg-[#F8CB45] text-[#1F1F1F] font-extrabold text-[20px] flex items-center justify-center border-none shadow-2xs shrink-0"
            >
              B
            </button>
            <div>
              <span className="font-display font-bold text-[14px] text-[#1F1F1F]">Blinkit Discovery Engine</span>
              <div className="text-[9px] text-[#5F6368] font-bold tracking-wide uppercase">Internal Tool</div>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setCurrentView("workspace")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all ${
                currentView === "workspace"
                  ? "bg-[#1F1F1F] text-[#FFFFFF] shadow-2xs"
                  : "text-[#1F1F1F] hover:bg-[#1F1F1F]/10"
              }`}
            >
              Discovery Workspace
            </button>
            <button
              onClick={() => setCurrentView("methodology")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all ${
                currentView === "methodology"
                  ? "bg-[#1F1F1F] text-[#FFFFFF] shadow-2xs"
                  : "text-[#1F1F1F] hover:bg-[#1F1F1F]/10"
              }`}
            >
              How the Engine Works
            </button>
            <button
              onClick={() => setCurrentView("explorer")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all ${
                currentView === "explorer"
                  ? "bg-[#1F1F1F] text-[#FFFFFF] shadow-2xs"
                  : "text-[#1F1F1F] hover:bg-[#1F1F1F]/10"
              }`}
            >
              Evidence Explorer
            </button>
            <button
              onClick={() => setCurrentView("docs")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all ${
                currentView === "docs"
                  ? "bg-[#1F1F1F] text-[#FFFFFF] shadow-2xs"
                  : "text-[#1F1F1F] hover:bg-[#1F1F1F]/10"
              }`}
            >
              Engine Documentation
            </button>
          </nav>
        </header>
      )}

      {/* Primary Business Objective Banner (Shown once on Discovery Workspace entry point) */}
      {currentView === "workspace" && (
        <div className="bg-[#FFFFFF] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4 rounded-lg text-[13px] text-[#1F1F1F] leading-relaxed max-w-4xl mx-auto">
          <strong>Primary Objective:</strong> Understand why customers who already trust Blinkit for one category hesitate to expand into additional categories, and identify evidence-backed opportunities to reduce that hesitation.
        </div>
      )}

      {/* ═══════════════════════════════════════════
          1. LANDING VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "landing" && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8 py-10">
          {/* Header Block */}
          <div className="text-center space-y-3">
            <div className="w-[44px] h-[44px] rounded-[10px] bg-[#F8CB45] text-[#1F1F1F] font-extrabold text-[20px] flex items-center justify-center mx-auto border-none shadow-2xs">
              B
            </div>
            {/* Shrunk Headline: max 2 lines, 32-36px, font-bold */}
            <h1 className="font-display font-bold text-[30px] md:text-[34px] leading-tight tracking-tight text-[#1F1F1F] max-w-xl mx-auto">
              Blinkit Discovery Engine
            </h1>
            {/* Single-line supporting subtitle */}
            <p className="text-[13.5px] text-[#5F6368] font-medium leading-relaxed max-w-md mx-auto">
              Structured customer feedback analysis for cross-category growth.
            </p>

            {/* BLOCK 1: CHIP ROW (4 pill-shaped tags floating freely in a single row) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="px-3.5 py-1 text-[11.5px] font-semibold text-[#1F1F1F] bg-white border border-gray-200 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Trust barriers
              </span>
              <span className="px-3.5 py-1 text-[11.5px] font-semibold text-[#1F1F1F] bg-white border border-gray-200 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Price switching
              </span>
              <span className="px-3.5 py-1 text-[11.5px] font-semibold text-[#1F1F1F] bg-white border border-gray-200 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Segment evidence
              </span>
              <span className="px-3.5 py-1 text-[11.5px] font-semibold text-[#1F1F1F] bg-white border border-gray-200 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Verbatim proof
              </span>
            </div>
          </div>

          {/* BLOCK 2: HIGHLIGHTED CALLOUT BOX */}
          <div className="w-full relative bg-[#FFFDF5] border-l-4 border-l-[#F8CB45] border-t border-r border-b border-gray-100 rounded-xl p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Soft decorative bleeding circle in top-right corner */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#F8CB45]/20 rounded-full pointer-events-none" />

            <div className="space-y-3 flex-1 relative z-10 text-left">
              <span className="text-[10px] font-mono font-bold text-[#8A6A0F] uppercase tracking-wider block">
                ENGINE STATUS
              </span>
              <p className="text-[15px] font-bold text-[#1F1F1F] leading-snug">
                189 behavioral signals extracted from 1,176 reviews across 4 sources — ready for structured discovery.
              </p>
              <p className="text-[12px] text-[#5F6368] leading-relaxed">
                Every signal traces back to a real customer sentence.
              </p>
              <div className="pt-2 flex items-center gap-3">
                {/* Blinkit Green CTA Button (#54B226) */}
                <button
                  onClick={() => setCurrentView("workspace")}
                  className="bg-[#54B226] hover:bg-[#479B1F] text-[#FFFFFF] font-bold text-[13px] px-5 py-2.5 rounded-[8px] border-none flex items-center gap-2 transition-all shadow-sm shrink-0"
                >
                  Open the engine <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Distinct WHITE card floating inside this colored box */}
            <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] rounded-xl p-5 text-center border border-gray-100 min-w-[140px] shrink-0 relative z-10">
              <div className="font-display font-[900] text-[40px] text-[#1F1F1F] leading-none">
                189
              </div>
              <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider mt-1.5 block">
                Verified Signals
              </span>
            </div>
          </div>

          {/* BLOCK 3: THREE LINK CARDS (In a row or stacked on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
            {/* Card 1 */}
            <div 
              onClick={() => setCurrentView("methodology")}
              className="bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all duration-200 flex flex-col justify-between space-y-3 group"
            >
              <div>
                <h4 className="font-bold text-[14px] text-[#1F1F1F] group-hover:text-[#54B226]">
                  How the engine works
                </h4>
                <p className="text-[12px] text-[#737373] mt-0.5">
                  Methodology and validation
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[11px] font-bold text-[#54B226] group-hover:underline flex items-center gap-1">
                  View →
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setCurrentView("explorer")}
              className="bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all duration-200 flex flex-col justify-between space-y-3 group"
            >
              <div>
                <h4 className="font-bold text-[14px] text-[#1F1F1F] group-hover:text-[#54B226]">
                  Evidence Explorer
                </h4>
                <p className="text-[12px] text-[#737373] mt-0.5">
                  Verify any finding against source data
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[11px] font-bold text-[#54B226] group-hover:underline flex items-center gap-1">
                  Browse →
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setCurrentView("docs")}
              className="bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all duration-200 flex flex-col justify-between space-y-3 group"
            >
              <div>
                <h4 className="font-bold text-[14px] text-[#1F1F1F] group-hover:text-[#54B226]">
                  Project repository
                </h4>
                <p className="text-[12px] text-[#737373] mt-0.5">
                  Source code and pipeline
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[11px] font-bold text-[#54B226] group-hover:underline flex items-center gap-1">
                  Docs →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          2. HOW THE ENGINE WORKS VIEW
          ═══════════════════════════════════════════ */}
      {currentView === "methodology" && (
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* How the Data Was Collected Section */}
          <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-6 shadow-2xs space-y-6">
            <div>
              <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Completed Data Ingestion</span>
              <h2 className="font-display font-extrabold text-[20px] text-[#1F1F1F] mt-0.5">Collection Method</h2>
              <p className="text-[13.5px] text-[#5F6368] mt-1 leading-relaxed">
                This engine analyzed a fixed set of 1,176 customer reviews, collected once across 4 sources. Below is exactly how.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">SCOPE</span>
                <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
                  Reviews collected reflect recent customer activity across all 4 sources as of this analysis.
                </p>
              </div>
            </div>

            {/* Source Data Table: Clean 1px Dividers, No 2px Black Wireframe Borders */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-bold text-[#1F1F1F]">Source Breakdown & Sample Distribution</h4>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse text-left text-[12px] bg-white">
                  <thead>
                    <tr className="bg-[#F8F9FA] border-b border-gray-200 text-[#5F6368]">
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Source</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-right font-mono">Reviews Collected</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-right font-mono">Share of Dataset</th>
                      <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Why This Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#1F1F1F]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#34A853] shrink-0" />
                          <span>Google Play</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#1F1F1F]">662</td>
                      <td className="p-3 text-right font-mono font-bold text-[#54B226]">56.3%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Largest volume; Android reviews on the core shopping app.</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#1F1F1F]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF4500] shrink-0" />
                          <span>Reddit</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#1F1F1F]">360</td>
                      <td className="p-3 text-right font-mono font-bold text-[#54B226]">30.6%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Candid discussion and comparison threads — richest reasoning, but mostly post titles rather than full bodies.</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#1F1F1F]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF0000] shrink-0" />
                          <span>YouTube comments</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#1F1F1F]">144</td>
                      <td className="p-3 text-right font-mono font-bold text-[#54B226]">12.2%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">Comment-level reactions on review/unboxing videos.</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-[#F8F9FA]">
                      <td className="p-3 font-bold text-[#1F1F1F]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#8E8E93] shrink-0" />
                          <span>App Store</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#1F1F1F]">10</td>
                      <td className="p-3 text-right font-mono font-bold text-[#54B226]">0.9%</td>
                      <td className="p-3 text-[#5F6368] leading-relaxed">iOS reviews — too small a sample for independent conclusions, included for completeness and treated as directional only.</td>
                    </tr>
                    <tr className="bg-[#F8F9FA] font-bold text-[#1F1F1F] border-t border-gray-200">
                      <td className="p-3">Total</td>
                      <td className="p-3 text-right font-mono font-bold">1,176</td>
                      <td className="p-3 text-right font-mono font-bold text-[#54B226]">100%</td>
                      <td className="p-3 text-[#8C8C8C] italic text-[11px] font-normal">All 4 sources combined</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signal Extraction Summary */}
            <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-5 shadow-2xs space-y-3">
              <h4 className="text-[13px] font-bold text-[#1F1F1F]">Signal Extraction Summary</h4>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Of 1,176 reviews collected, 189 (16.1%) contained real behavioral signal — a stated reason, barrier, or specific complaint the engine could extract and verify. The remaining 987 were excluded before analysis: generic ratings with no reasoning ('good app', '5 stars'), off-topic content (delivery-worker labor posts, industry-economics debate unrelated to shopping behavior), and statements too short to support a verifiable extraction.
              </p>
              <p className="text-[11.5px] text-[#737373] italic font-mono pt-2.5 border-t border-gray-200">
                Note: Per-source signal yield is not separately tracked in this dataset — the 16.1% extraction rate is measured across the full collected set, not broken down by source.
              </p>
            </div>
          </div>

          {/* Engineering docs block */}
          <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-4">
            <div>
              <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Methodology Reference</span>
              <h2 className="font-display font-bold text-[18px] text-[#1F1F1F] mt-0.5">What this engine does, in order:</h2>
            </div>
            
            <div className="space-y-2.5 text-[13.5px] text-[#5F6368] leading-relaxed">
              {/* Step 1 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(1)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">1</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Reads customer feedback</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Ingests 1,176 entries across 4 sources</span>
                  </div>
                  {expandedSteps[1] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[1] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    Ingests entries from Google Play (662), Reddit (360), YouTube comments (144), and App Store (10).
                  </motion.div>
                )}
              </div>

              {/* Step 2 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(2)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">2</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Rejects reviews with no behavioral content</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Discards generic ratings (987 rejected)</span>
                  </div>
                  {expandedSteps[2] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[2] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    A one-word rating or generic praise carries no signal and is discarded before the model sees it as analyzable evidence. 987 of 1,176 reviews were rejected at this step; that's not a flaw, it reflects how little of this kind of feedback actually contains reasoning.
                  </motion.div>
                )}
              </div>

              {/* Step 3 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(3)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">3</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Extracts structure</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Classifies repeat behavior, barrier, segment, & confidence</span>
                  </div>
                  {expandedSteps[3] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[3] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    Classifies from what is left whether the review shows repeat-buying behavior, what category is named, what is the stated barrier, what would fix it, what segment the language suggests, and how confident the model is in its own read.
                  </motion.div>
                )}
              </div>

              {/* Step 4 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(4)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">4</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Identifies themes from signal convergence</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Forms themes when signals converge</span>
                  </div>
                  {expandedSteps[4] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[4] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    A single tagged review is one data point. A theme forms when multiple independently-extracted signals converge on the same reason_type and category combination — e.g. 105 separate reviews, tagged individually with no knowledge of each other, all landing on 'trust' as the reason and 'electronics' or 'perishables' as the category. Themes with fewer than 10 supporting signals are labeled Medium or Low confidence.
                  </motion.div>
                )}
              </div>

              {/* Step 5 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(5)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">5</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Requires quote-grounding</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Verifies exact verbatim quote matches</span>
                  </div>
                  {expandedSteps[5] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[5] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    Requires every extracted claim to quote the exact source sentence. If the model's stated reasoning can't be found verbatim in the original review, that record is discarded, not corrected or reworded.
                  </motion.div>
                )}
              </div>

              {/* Step 6 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleStep(6)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">6</span>
                    <strong className="text-[13.5px] text-[#1F1F1F]">Deduplicates feed</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Flags viral copy-pastes (20% deduplicated)</span>
                  </div>
                  {expandedSteps[6] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedSteps[6] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] text-[#5F6368]">
                    Flags near-duplicate content (20% of extracted signals) so a single viral complaint copy-pasted across threads doesn't inflate a theme's apparent size.
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Dedicated Theme Identification Callout */}
          <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-5 space-y-2">
            <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block font-mono">
              Core Methodology: Theme Identification
            </span>
            <h3 className="font-display font-extrabold text-[15px] text-[#1F1F1F]">
              How individual signals become a theme
            </h3>
            <p className="text-[13px] text-[#1F1F1F] leading-relaxed font-medium">
              A single tagged review is one data point. A theme forms when multiple independently-extracted signals converge on the same <code className="bg-[#F8F9FA] border border-gray-200 px-1 py-0.5 rounded text-[12px] font-mono text-[#1F1F1F]">reason_type</code> and category combination — e.g. 105 separate reviews, tagged individually with no knowledge of each other, all landing on 'trust' as the reason and 'electronics' or 'perishables' as the category. That convergence, not any single review, is what promotes a pattern to a named theme in Discovery Workspace. Themes with fewer than 10 supporting signals are labeled Medium or Low confidence rather than High, regardless of how compelling any individual quote sounds.
            </p>
          </div>

          {/* AI vs Human block */}
          <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-3">
            <h3 className="font-display font-bold text-[15px] text-[#1F1F1F]">
              Why this needed AI, not a person reading 1,176 reviews
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              A person could read all 1,176 reviews. What they couldn't do reliably is apply the exact same extraction standard to review #4 and review #1,150 — attention degrades, categorization drifts, and two different afternoons produce two different judgment calls on the same review. This engine applies one fixed extraction standard to every review, and every output is traceable back to the sentence that produced it — which a manual read-through doesn't produce as a byproduct.
            </p>
          </div>

          {/* Expanded AI failure-mode analysis */}
          <div className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-4">
            <h3 className="font-display font-bold text-[15px] text-[#1F1F1F]">
              Concrete AI Failure Modes & Mitigation Analysis
            </h3>
            
            <div className="space-y-2.5 text-[13px] text-[#5F6368] leading-relaxed">
              {/* Failure 1 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleFailure(1)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-[13.5px] text-[#1F1F1F]">1. Incorrect Segment Inference</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Inferred from word choice, not transaction logs</span>
                  </div>
                  {expandedFailures[1] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedFailures[1] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] space-y-1.5">
                    <p><strong>Why it happens:</strong> Segments are inferred strictly from word choice and phrasing cues in the text rather than verified transaction records.</p>
                    <p><strong>Mitigation:</strong> The model is instructed to mark classifications as "unclear" if linguistic cues are insufficient.</p>
                    <p><strong>Risk remaining:</strong> Occasional mischaracterization where light users are inferred as heavy users due to dramatic vocabulary.</p>
                  </motion.div>
                )}
              </div>

              {/* Failure 2 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleFailure(2)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-[13.5px] text-[#1F1F1F]">2. Trust vs. Convenience Misclassification</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Delivery delay overlap with quality concerns</span>
                  </div>
                  {expandedFailures[2] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedFailures[2] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] space-y-1.5">
                    <p><strong>Why it happens:</strong> Language explaining delivery delays can overlap with quality and safety concerns.</p>
                    <p><strong>Mitigation:</strong> Restrictive coding requires clear descriptions of safety, counterfeit, or item damage risks to place under "trust".</p>
                    <p><strong>Risk remaining:</strong> Standard courier speed complaints may occasionally trigger a trust barrier tag.</p>
                  </motion.div>
                )}
              </div>

              {/* Failure 3 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleFailure(3)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-[13.5px] text-[#1F1F1F]">3. Hallucinated Extraction</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Inventing patterns or modifying source text</span>
                  </div>
                  {expandedFailures[3] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedFailures[3] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] space-y-1.5">
                    <p><strong>Why it happens:</strong> Standard model completions occasionally invent patterns or modify sentences to suit brief questions.</p>
                    <p><strong>Mitigation:</strong> Programmatic validation verifies that every word in the reported quote is present word-for-word in original text.</p>
                    <p><strong>Risk remaining:</strong> Discards valid signals if slight transcription or character anomalies exist in the review.</p>
                  </motion.div>
                )}
              </div>

              {/* Failure 4 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleFailure(4)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-[13.5px] text-[#1F1F1F]">4. Duplicate Complaints Inflating Patterns</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— Viral copy-pastes across threads</span>
                  </div>
                  {expandedFailures[4] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedFailures[4] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] space-y-1.5">
                    <p><strong>Why it happens:</strong> Viral user comments are frequently copy-pasted across threads, inflating specific catalog issue volumes.</p>
                    <p><strong>Mitigation:</strong> The pipeline tags near-duplicate reviews (20% duplicate rate detected) to prevent inflating counts.</p>
                    <p><strong>Risk remaining:</strong> Slightly rephrased copies may bypass deduplication and mildly skew pattern sizes.</p>
                  </motion.div>
                )}
              </div>

              {/* Failure 5 */}
              <div className="border border-gray-100 rounded-md p-3.5 bg-white">
                <button
                  onClick={() => toggleFailure(5)}
                  className="w-full flex items-center justify-between gap-3 text-left font-medium text-[#1F1F1F] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-[13.5px] text-[#1F1F1F]">5. Sparse Source Bias</strong>
                    <span className="text-[12px] text-[#737373] hidden sm:inline">— App Store represents 0.9% vs Google Play's 56.3%</span>
                  </div>
                  {expandedFailures[5] ? <ChevronUp size={16} className="text-[#54B226]" /> : <ChevronDown size={16} className="text-[#54B226]" />}
                </button>
                {expandedFailures[5] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2.5 border-t border-gray-100 text-[13px] space-y-1.5">
                    <p><strong>Why it happens:</strong> App Store reviews contribute only 10 entries (0.9%), while Google Play represents 56.3% of the dataset.</p>
                    <p><strong>Mitigation:</strong> Sources are clearly badged, and user exploration is supported via direct source filters.</p>
                    <p><strong>Risk remaining:</strong> High risk of false trends if PMs draw conclusions based on App Store sub-cohorts alone.</p>
                  </motion.div>
                )}
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
          <div className="border-b border-gray-200 pb-4">
            <h2 className="font-display font-bold text-[20px] text-[#171717]">Discovery Workspace</h2>
            <p className="text-[13px] text-[#5F6368] mt-1">
              Active structured evaluation of the 8 core customer discovery questions.
            </p>
          </div>

          {/* 8 Questions list */}
          <div className="space-y-8">
            
            {/* Q1 */}
            <div id="q1" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-[#1F1F1F] rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHY CUSTOMERS KEEP BUYING FROM THE SAME CATEGORIES
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: High — based on 105 signals (largest pattern in dataset), consistent across 3 of 4 sources, 100% quote-grounded, low interpretive distance between evidence and finding.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Customers aren't loyal. They're cautious."
                </h3>
                <AnimatedStat 
                  value="3.7%" 
                  label="of signals show habitual buying" 
                  colorClass="text-[#1F1F1F]" 
                  barColorBg="bg-[#1F1F1F]"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                {/* Left Column: 2 Evidence Quotes with Dot Bullets & Right-Aligned Monospace Number Column */}
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(1).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: TAKEAWAY SENTENCE CONTAINER */}
                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Whether to focus roadmap resources on generic personalization algorithms or on category-specific risk-reduction features.</p>
                  </div>

                  {/* LINK TRIGGER */}
                  <div>
                    <button
                      onClick={() => toggleQuestion(1)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[1] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[1] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      7 of 189 signals (3.7%) explicitly describe routine/automatic purchasing (e.g. "Only buy daily milk out of routine. I prefer Amazon or DMart for everything else."). By contrast, 105 signals (55.6%) describe a specific negative experience as the reason for staying within trusted categories.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Habit-language is rare; risk-avoidance language is dominant and specific to a named failure (fake item, expired product, damaged package)."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Repeat purchasing in categories with no prior negative experience may function as a loss-avoidance strategy rather than a default behavior — customers may be actively choosing familiar categories because the downside of a bad outcome (wasted money, unusable product) outweighs the upside of trying something new, not because switching requires effort they're unwilling to spend.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      The evidence suggests repeat purchasing is more strongly associated with perceived safety than with stated habitual behavior. One possible explanation is that "habit" is a post-hoc label customers apply to what is actually a risk-management pattern.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This raises a prioritization question: should Blinkit invest in reducing perceived category-entry risk before investing in generic engagement or personalization mechanics? The data suggests risk reduction addresses a larger share of the behavior (55.6%) than habit-breaking mechanics would (3.7%).
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Review mining cannot establish whether non-reviewing customers show the same pattern, or whether some customers who describe "habit" language are minimizing a risk-based decision for social reasons (e.g., not wanting to sound overly cautious).
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q2" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What's stopping customers from trying a new category? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q2 */}
            <div id="q2" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-red-600 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHAT'S STOPPING CUSTOMERS FROM TRYING A NEW CATEGORY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: High — based on 105 signals (55.6% of dataset), concrete failure modes named across Google Play, Reddit, and YouTube.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Customers don't avoid new categories. They avoid risk."
                </h3>
                <AnimatedStat 
                  value="55.6%" 
                  label="cite specific trust failures (105 of 189 signals)" 
                  colorClass="text-red-600" 
                  barColorBg="bg-red-600"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(2).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Prioritizing physical quality assurance workflows over UI navigation changes.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(2)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[2] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[2] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      105 of 189 signals (55.6%) cite a specific trust failure (counterfeit item, expired product, damaged goods). 40 signals (21.2%) cite price uncertainty. 9 signals (4.8%) cite inventory/visibility issues.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Trust-related language is concrete, not diffuse — customers name a specific failure mode rather than expressing general distrust of the platform."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      A single negative experience in an unfamiliar category may generalize into a durable heuristic ("categories I haven't tried are risky") because the customer has no counter-evidence to update that belief — unlike trusted categories, where repeated successful transactions have built a track record.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      The evidence suggests category-level trust is not evenly distributed — it appears to be built (or broken) per category based on direct or adjacent experience, rather than existing as a single platform-wide trust score. This is an interpretation, not a confirmed mechanism, since the dataset cannot observe whether trust actually transfers between similar categories (e.g., does a bad experience in electronics affect willingness to try appliances?).
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This informs a prioritization decision: should trust-repair investment be category-specific (targeting electronics and perishables, where failures concentrate) rather than platform-wide? The evidence does not yet support a platform-wide trust campaign as the most efficient response.
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether trust failures are concentrated in specific fulfillment centers, courier networks, or supplier relationships cannot be determined from review text alone.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q5" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What would make a customer trust a category? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q3 */}
            <div id="q3" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-purple-600 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  HOW DO CUSTOMERS FIND PRODUCTS TODAY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: Medium — based on 9 signals (smallest pattern), single interpretation required to connect language to behavior, cross-source consistency not independently verified.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Discovery isn't failing on trust — it's failing on visibility."
                </h3>
                <AnimatedStat 
                  value="4.8%" 
                  label="leave due to inventory visibility (9 signals)" 
                  colorClass="text-purple-600" 
                  barColorBg="bg-purple-600"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(3).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Investing in semantic search quality vs. generic banner advertisements.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(3)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[3] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[3] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      9 of 189 signals (4.8%) — the smallest reason category — describe leaving for a competitor because a specific product wasn't visible or in stock, not because of distrust.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Where discovery failures appear, they are inventory/visibility failures, not algorithmic or navigational complaints."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      A customer with a specific product in mind who cannot find it may not interpret this as "Blinkit doesn't have good discovery" — they may simply conclude the product isn't available and act on that belief immediately (switching apps) rather than exploring further within Blinkit.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      One possible explanation is that discovery friction in this dataset manifests as silent, immediate churn rather than visible complaint — which would mean this 4.8% likely understates the true scale of the problem, since most silent churn never becomes a written review.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This raises the question of whether "improve discovery" should be reframed as "improve inventory visibility and search accuracy for niche/regional items" — a narrower, more testable prioritization than a general discovery overhaul.
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Review mining structurally cannot measure silent churn — customers who leave without complaining are invisible to this method entirely. This is a known blind spot, not a finding.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q8" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What do customers consistently say is missing? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q4 */}
            <div id="q4" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-blue-600 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHAT ROLE DOES HABIT ACTUALLY PLAY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: High — based on 40 signals (21.2% price-shopping), consistent multi-app comparison phrasing.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "The customer isn't passive. They're constantly comparing."
                </h3>
                <AnimatedStat 
                  value="21.2%" 
                  label="price-shop across multiple apps (40 signals)" 
                  colorClass="text-blue-600" 
                  barColorBg="bg-blue-600"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(4).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Launching dynamic cross-category loyalty rewards versus flat membership plans.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(4)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[4] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[4] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      7 signals (3.7%) show habit language. 40 signals (21.2%) show customers actively comparing prices across Blinkit, Zepto, and Instamart within the same shopping session.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Price-comparison language outnumbers habit language by roughly 5-to-1."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Frequent app-switching behavior suggests customers may hold weak platform loyalty and treat quick-commerce apps as substitutable — evaluating each purchase independently rather than defaulting to one app out of routine.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      The evidence suggests repeat engagement with Blinkit specifically is more transactional than habitual — customers appear to re-evaluate the decision each time rather than defaulting automatically. This is an inference from language patterns, not a measured behavioral fact.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This informs whether engagement investment should target loyalty/retention mechanics (assuming habitual behavior) or competitive positioning mechanics (assuming active, ongoing evaluation) — the evidence leans toward the latter being the more accurate model of current behavior.
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether this price-comparison behavior is stable over time or specific to the review-writing population (who may be more price-conscious than average) cannot be determined here.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q2" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What's stopping customers from trying a new category? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q5 */}
            <div id="q5" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-amber-500 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHAT INFORMATION DO CUSTOMERS NEED BEFORE TRYING A NEW CATEGORY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: High — based on 86 signals (45.5% of dataset), customer-stated actionable fixes.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Customers already told us what would change their mind."
                </h3>
                <AnimatedStat 
                  value="45.5%" 
                  label="describe specific trust fixes (86 of 189 signals)" 
                  colorClass="text-amber-500" 
                  barColorBg="bg-amber-500"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(5).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Whether to build generalized customer support tools or specific checkout security badges.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(5)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[5] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[5] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      86 of 189 signals (45.5%) — the largest single pattern in the dataset — state a specific, concrete requirement: visible authenticity checks, tamper-evident packaging, expiry visibility, working returns, accurate stock.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Unlike most findings, this pattern consists of stated solutions from the customer's own language, not inferred barriers."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Customers who articulate a specific fix (rather than a vague complaint) may represent a segment closer to conversion — the specificity itself may indicate the barrier is well-understood and addressable, rather than a deep, diffuse trust problem.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      A plausible interpretation is that this 45.5% represents the most tractable segment of the trust problem — customers who can name their own solution are arguably easier to convert than customers expressing generalized distrust. This remains an interpretation; the dataset cannot confirm that meeting a stated requirement actually changes purchase behavior.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This raises a sequencing question: should product validation start with this segment specifically, since their stated need is both common and concrete, before addressing more diffuse trust concerns?
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether customers who state a specific fix would actually convert if that fix were implemented, or whether stated requirements are post-hoc rationalizations for a decision already made, cannot be resolved from review text.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q6" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What frustrates customers repeatedly? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q6 */}
            <div id="q6" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-red-600 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHAT FRUSTRATIONS EMERGE REPEATEDLY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: High — based on 5 recurring platform operational failure types across all sources.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Five failures repeat across every category."
                </h3>
                <AnimatedStat 
                  value="5" 
                  label="recurring platform failure modes" 
                  colorClass="text-red-600" 
                  barColorBg="bg-red-600"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(6).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Aligning roadmap goals with supply chain fulfillment accuracy metrics rather than top-funnel marketing.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(6)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[6] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[6] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      Five failure types recur across otherwise unrelated categories: counterfeit goods, expired perishables, unhonored refund promises, unconsented substitutions, non-functional promo codes.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "These failures span operational areas (fulfillment, customer service, catalog management, promotions) rather than clustering in one system."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Because these failures are operationally distinct but experientially similar (all represent "the platform didn't deliver what was promised"), customers may be forming a single unified trust judgment from multiple unrelated backend failures — meaning fixing one issue in isolation may not measurably shift trust if the others persist.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      The evidence suggests customer trust may function as an aggregate signal across operational domains rather than being domain-specific — though this contradicts, or at least complicates, the category-specific trust interpretation from Q2, and that tension itself is worth noting rather than resolving prematurely.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This informs whether trust-repair should be pursued as a single coordinated cross-functional initiative (fulfillment + support + catalog + promotions together) rather than addressed piecemeal by separate teams.
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether fixing all five simultaneously produces a larger trust improvement than the sum of fixing each individually cannot be tested with review data — this requires a controlled before/after comparison.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q7" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: Which customer segments are more likely to experiment? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Q7 */}
            <div id="q7" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-[#1F1F1F] rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHICH CUSTOMER SEGMENTS ARE MORE LIKELY TO EXPERIMENT?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: Medium — based on 19 signals (10.1%), language-inferred frequency cues.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Some customers are closer to trying something new than others."
                </h3>
                <AnimatedStat 
                  value="10.1%" 
                  label="show high-frequency usage language (19 signals)" 
                  colorClass="text-[#1F1F1F]" 
                  barColorBg="bg-[#1F1F1F]"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(7).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Targeting new feature pilots to the "language-inferred frequent user" segment rather than mass-market launches.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(7)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[7] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleQuestion(7)}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#54B226] hover:underline transition-colors py-1 focus:outline-none"
                >
                  <span>Full analysis & supporting matrix</span>
                  {expandedQuestions[7] ? <ChevronUp size={14} className="text-[#54B226]" /> : <ChevronDown size={14} className="text-[#54B226]" />}
                </button>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[7] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      19 of 189 signals (10.1%) use language suggesting frequent, ongoing platform use, and these signals describe specific fixable complaints rather than blanket rejection language.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Language-inferred frequent users describe narrower, more specific objections than language-inferred one-time complainers (56 signals, 29.6%), who more often use absolute language ('never again')."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Customers with an established relationship to the platform may have more invested in that relationship continuing, making them more likely to frame a bad experience as a specific, fixable problem rather than grounds for platform abandonment.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      One possible explanation is that relationship tenure moderates how customers interpret a negative experience — but this segment label is entirely language-inferred, not verified against actual purchase history, and should be treated as a hypothesis about segment behavior, not a confirmed customer list.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This informs a targeting decision: should early product validation prioritize language-inferred frequent users as the first test group, given their apparently narrower and more specific objections — while treating this as a testable assumption, not a settled fact?
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether language-inferred frequency correlates with actual transaction frequency is unverified and unverifiable from this dataset alone.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q8" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: What unmet needs emerge consistently? →
                    </a>
                  </div>

                  {/* Dynamic Intensity Heatmap Matrix */}
                  <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-3 mt-3">
                    <div>
                      <h4 className="text-[13px] font-bold text-[#1F1F1F]">Supporting Matrix: Segments × Reason-Types (Intensity Heatmap)</h4>
                      <p className="text-[11.5px] text-[#5F6368] mt-0.5 leading-relaxed">
                        Cells scale smoothly in background saturation based on real signal counts. Click any cell to inspect filtered rows in the Evidence Explorer.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-[11px] bg-white border border-gray-100 rounded">
                        <thead>
                          <tr className="border-b border-gray-200 bg-[#F8F9FA]">
                            <th className="p-2 font-bold text-[#5F6368] uppercase tracking-wider text-[9px]">Segment</th>
                            {REASONS.map(r => (
                              <th key={r} className="p-2 font-bold text-[#5F6368] uppercase tracking-wider text-[9px] text-center capitalize">{r}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {SEGMENTS.map(seg => (
                            <tr key={seg} className="border-b border-gray-100 hover:bg-[#F8F9FA]">
                              <td className="p-2 font-bold text-[#1F1F1F] capitalize">{formatSegmentLabel(seg)}</td>
                              {REASONS.map(reason => {
                                const count = reviews.filter(r => r.user_segment === seg && r.reason_type === reason).length;
                                const totalSegmentReviews = reviews.filter(r => r.user_segment === seg).length || 1;
                                const pctOfSegment = ((count / totalSegmentReviews) * 100).toFixed(0);
                                const avgConf = count > 0 
                                  ? reviews.filter(r => r.user_segment === seg && r.reason_type === reason)
                                      .reduce((sum, r) => sum + (r.confidence === "high" ? 1.0 : r.confidence === "med" ? 0.6 : 0.3), 0) / count
                                  : 0;

                                const ratio = count / maxMatrixCount;
                                const opacity = count > 0 ? (0.12 + ratio * 0.78).toFixed(2) : "0";

                                return (
                                  <td 
                                    key={reason}
                                    onClick={() => filterByMatrixCell(seg, reason)}
                                    className="p-1.5 text-center cursor-pointer transition-colors hover:bg-[#FFF6DD]"
                                    style={{
                                      backgroundColor: count > 0 
                                        ? `rgba(248, 203, 70, ${opacity})` 
                                        : "#FAF9F5"
                                    }}
                                  >
                                    {count > 0 ? (
                                      <div className="space-y-0.5">
                                        <div className="font-bold text-[11px] text-[#1F1F1F]">{count}</div>
                                        <div className="text-[8.5px] text-[#5F6368]">{pctOfSegment}%</div>
                                        <div className="text-[7.5px] text-[#8C8C8C] font-mono">c={avgConf.toFixed(1)}</div>
                                      </div>
                                    ) : (
                                      <span className="text-[#8C8C8C]/30 text-[9px]">-</span>
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
                </motion.div>
              )}
            </div>

            {/* Q8 */}
            <div id="q8" className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border-l-4 border-l-purple-600 rounded-lg p-5 md:p-6 space-y-4 scroll-mt-20">
              {/* Card Header: Eyebrow + Confidence badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-[#54B226] uppercase tracking-wider">
                  WHAT UNMET NEEDS EMERGE CONSISTENTLY?
                </span>
                <span className="text-[11px] font-medium text-[#1F1F1F] bg-[#F8F9FA] px-2.5 py-1 rounded border border-gray-200 shrink-0">
                  Confidence: Medium — based on 5 recurring needs, including n=1 qualitative accessibility cue.
                </span>
              </div>

              {/* Main Title Block + Stat Callout + Visual Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-[22px] md:text-[25px] text-[#1F1F1F] leading-tight tracking-tight flex-1">
                  "Customers didn't just complain — they specified the fix."
                </h3>
                <AnimatedStat 
                  value="5" 
                  label="core unfulfilled customer needs" 
                  colorClass="text-purple-600" 
                  barColorBg="bg-purple-600"
                />
              </div>

              {/* TWO-COLUMN CARD GRID: Evidence Quotes (Left) + Takeaway Sentence Container (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 items-stretch">
                <div className="space-y-2">
                  <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block">Evidence</span>
                  <div className="space-y-1.5">
                    {getEvidenceForQuestion(8).slice(0, 2).map((r, idx) => (
                      <div 
                        key={r.row_number} 
                        onClick={() => jumpToRow(r.row_number)}
                        className="bg-[#F8F9FA] hover:bg-[#F3F1EA] border border-gray-100 rounded-md p-2.5 text-[12px] text-[#1F1F1F] italic cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_PALETTE[idx % 5] }} />
                          <span className="truncate">"{r.quote}"</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8C8C8C] not-italic shrink-0 ml-auto w-16 text-right tabular-nums">Row #{r.row_number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F1EA] rounded-lg p-3.5 flex flex-col justify-between space-y-2 border-none">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-0.5">Product Implication</span>
                    <p className="text-[12.5px] text-[#1F1F1F] font-semibold leading-snug">Decision supported: Running dedicated qualitative validation studies for accessibility features.</p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleQuestion(8)}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#54B226] hover:underline focus:outline-none py-0.5"
                    >
                      <span className="font-mono text-[13px]">{expandedQuestions[8] ? "−" : "+"}</span>
                      <span>What this finding means & structured analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT — STRUCTURED INSIGHT */}
              {expandedQuestions[8] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-3 border-t border-gray-100 text-[13px] leading-relaxed bg-[#F8F9FA]/80 p-4 rounded-md"
                >
                  {/* Layer 1: Evidence */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Evidence</span>
                    <p className="text-[#5F6368] font-medium">
                      Five needs recur: authenticity proof, transparent pricing, working returns, accurate niche/regional stock information, and — from a single signal — a simpler interface for a non-technical user.
                    </p>
                  </div>

                  {/* Layer 2: Observed Pattern */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Observed Pattern</span>
                    <p className="text-[#1F1F1F] font-medium italic bg-white p-3 rounded border border-gray-100">
                      "Four of five needs are corroborated across double-digit signal counts; the accessibility need has n=1."
                    </p>
                  </div>

                  {/* Layer 3: Behavioral Mechanism */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Behavioral Mechanism</span>
                    <p className="text-[#5F6368]">
                      Low-frequency signals may still indicate a real need if the underlying population (e.g., elderly or non-technical users) is systematically underrepresented in review-writing — meaning n=1 here is not necessarily a weak signal, but potentially a rare glimpse into an otherwise invisible population.
                    </p>
                  </div>

                  {/* Layer 4: Interpretation */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Interpretation</span>
                    <p className="text-[#5F6368]">
                      A plausible interpretation is that this n=1 signal warrants direct investigation rather than dismissal, precisely because the review-mining method is structurally biased toward customers comfortable writing detailed English-language complaints — a population that likely excludes the accessibility-need segment being described.
                    </p>
                  </div>

                  {/* Layer 5: Business Meaning */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Business Meaning</span>
                    <p className="text-[#5F6368]">
                      This raises the question of whether a lightweight, low-cost qualitative study (not a product build) should be commissioned specifically to test whether this accessibility need represents a broader unserved population before any resourcing decision is made.
                    </p>
                  </div>

                  {/* Layer 6: Remaining Uncertainty */}
                  <div>
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">Remaining Uncertainty</span>
                    <p className="text-[#5F6368]">
                      Whether this is one vocal outlier or an indicator of a systematically unheard segment is precisely the kind of question review mining cannot answer alone.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a href="#q1" className="text-[12px] font-bold text-[#54B226] hover:underline flex items-center gap-1">
                      Related findings: Why do customers keep buying from the same categories? →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ═══════════════════════════════════════════
                CROSS-QUESTION CAUSAL CHAIN DIAGRAM
                ═══════════════════════════════════════════ */}
            <div className="bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-5 border-l-4 border-l-[#54B226]">
              <div>
                <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block font-mono">
                  BEHAVIORAL SYNTHESIS
                </span>
                <h3 className="font-display font-extrabold text-[20px] text-[#1F1F1F] mt-0.5">
                  Cross-Question Causal Chain Hypothesis
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {/* Node 1 */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <span className="text-[10.5px] font-bold text-[#54B226] uppercase tracking-wider block">Specific Trust Failures (Q2)</span>
                    <p className="text-[13px] text-[#1F1F1F] font-medium mt-0.5">
                      Trust failures in specific categories (Q2, 55.6%)
                    </p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex justify-center text-[#54B226]">
                  <ArrowDown size={18} />
                </div>

                {/* Node 2 */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <span className="text-[10.5px] font-bold text-[#54B226] uppercase tracking-wider block">Category-Level Risk Generalization (Q2 Mechanism)</span>
                    <p className="text-[13px] text-[#1F1F1F] font-medium mt-0.5">
                      Customers generalize a specific failure into category-level risk (Q2 mechanism)
                    </p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex justify-center text-[#54B226]">
                  <ArrowDown size={18} />
                </div>

                {/* Node 3 */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <span className="text-[10.5px] font-bold text-[#54B226] uppercase tracking-wider block">Risk-Avoidance Repetition (Q1)</span>
                    <p className="text-[13px] text-[#1F1F1F] font-medium mt-0.5">
                      Repeat purchasing concentrates in "proven safe" categories (Q1, habit only 3.7%)
                    </p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex justify-center text-[#54B226]">
                  <ArrowDown size={18} />
                </div>

                {/* Node 4 */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <span className="text-[10.5px] font-bold text-[#54B226] uppercase tracking-wider block">Active Transactional Re-evaluation (Q4)</span>
                    <p className="text-[13px] text-[#1F1F1F] font-medium mt-0.5">
                      Customers actively re-evaluate each purchase rather than defaulting by habit (Q4, 21.2% price-comparing)
                    </p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex justify-center text-[#54B226]">
                  <ArrowDown size={18} />
                </div>

                {/* Node 5 */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#54B226] text-white text-[12px] font-bold flex items-center justify-center shrink-0">5</div>
                  <div>
                    <span className="text-[10.5px] font-bold text-[#54B226] uppercase tracking-wider block">Persistent Cross-Category Hesitation (Q7)</span>
                    <p className="text-[13px] text-[#1F1F1F] font-medium mt-0.5">
                      Cross-category hesitation persists even among engaged, frequent users (Q7, 10.1%)
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11.5px] text-[#737373] italic border-t border-gray-100 pt-3">
                Caption: "This is an inferred causal chain connecting independently-measured findings — it is a hypothesis for qualitative validation, not a proven behavioral sequence."
              </p>
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
          <div className="border-b border-gray-200 pb-3">
            <h2 className="font-display font-bold text-[20px] text-[#171717]">Evidence Explorer</h2>
            <p className="text-[12px] text-[#5F6368] mt-1">
              Verify claims against the underlying customer feedback records. Apply filter parameters to recompute the list.
            </p>
          </div>

          {/* Explorer Filters Contained Panel */}
          <div className="bg-[#FFFFFF] border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#54B226] uppercase tracking-wider">
                FILTER PANEL
              </span>
              {(explorerSearch || explorerSource !== "all" || explorerSegment !== "all" || explorerReason !== "all" || explorerConfidence !== "all") && (
                <button
                  onClick={() => {
                    setExplorerSearch("");
                    setExplorerSource("all");
                    setExplorerSegment("all");
                    setExplorerReason("all");
                    setExplorerConfidence("all");
                  }}
                  className="text-[11px] font-bold text-[#D93025] hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
              {/* Search input */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono font-bold text-[#54B226] uppercase tracking-wider block">SEARCH QUOTE / ROW</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 22 or 'spoiled'"
                    value={explorerSearch}
                    onChange={(e) => setExplorerSearch(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-3 py-1.5 text-[12px] focus:outline-none text-[#1F1F1F] font-medium"
                  />
                  {explorerSearch && (
                    <button 
                      onClick={() => setExplorerSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#8C8C8C] hover:text-[#1F1F1F]"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Source dropdown */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono font-bold text-[#54B226] uppercase tracking-wider block">SOURCES</label>
                <select
                  value={explorerSource}
                  onChange={(e) => setExplorerSource(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-2.5 py-1.5 text-[12px] focus:outline-none text-[#1F1F1F] font-medium"
                >
                  <option value="all">All Sources</option>
                  {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Segment dropdown */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono font-bold text-[#54B226] uppercase tracking-wider block">SEGMENTS</label>
                <select
                  value={explorerSegment}
                  onChange={(e) => setExplorerSegment(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-2.5 py-1.5 text-[12px] focus:outline-none text-[#1F1F1F] font-medium capitalize"
                >
                  <option value="all">All Segments</option>
                  {SEGMENTS.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>

              {/* Reason dropdown */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono font-bold text-[#54B226] uppercase tracking-wider block">REASONS</label>
                <select
                  value={explorerReason}
                  onChange={(e) => setExplorerReason(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-2.5 py-1.5 text-[12px] focus:outline-none text-[#1F1F1F] font-medium capitalize"
                >
                  <option value="all">All Reasons</option>
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Confidence dropdown */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono font-bold text-[#54B226] uppercase tracking-wider block">CONFIDENCE</label>
                <select
                  value={explorerConfidence}
                  onChange={(e) => setExplorerConfidence(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-2.5 py-1.5 text-[12px] focus:outline-none text-[#1F1F1F] font-medium capitalize"
                >
                  <option value="all">All Confidence</option>
                  <option value="high">High</option>
                  <option value="med">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
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
                className="text-[11px] font-bold text-[#54B226] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Master-Detail Evidence Inspector */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* LEFT PANEL — compact evidence list */}
            <div className="w-full md:w-[360px] shrink-0 bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg overflow-hidden flex flex-col h-[560px]">
              <div className="p-3 bg-[#F8F9FA] border-b border-gray-100 flex justify-between items-center text-[10px] font-mono font-bold text-[#54B226] uppercase tracking-wider">
                <span>RECORDS ({filteredExplorerReviews.length})</span>
                <span>CONFIDENCE</span>
              </div>
              
              <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
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
                          isSelected ? "bg-[#54B226]/10 border-l-4 border-l-[#54B226]" : "hover:bg-[#54B226]/5"
                        }`}
                      >
                        <PlatformIcon source={r.source} size={18} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-mono text-[10.5px] font-bold text-[#1F1F1F]">Row #{r.row_number}</span>
                            <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} title={`Confidence: ${r.confidence}`} />
                          </div>
                          <p className="text-[12px] text-[#1F1F1F] font-medium truncate leading-tight">
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
              <div className="bg-[#FFFFFF] p-2.5 text-[10.5px] text-[#8C8C8C] border-t border-gray-100 text-right font-mono">
                Showing {filteredExplorerReviews.length} of 189 records
              </div>
            </div>

            {/* RIGHT PANEL — evidence inspection card */}
            <div className="w-full flex-1 min-h-[560px]">
              {!selectedRecord ? (
                <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-8 flex flex-col items-center justify-center text-center h-[560px]">
                  <div className="w-12 h-12 rounded-full bg-[#F8F9FA] text-[#54B226] flex items-center justify-center mb-3">
                    <Search size={20} />
                  </div>
                  <h3 className="font-display font-bold text-[16px] text-[#1F1F1F]">No Record Selected</h3>
                  <p className="text-[13px] text-[#737373] mt-1 max-w-xs leading-relaxed">
                    Select any record to inspect the full evidence and AI reasoning behind it.
                  </p>
                </div>
              ) : (
                <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-6 h-[560px] flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-6">
                    {/* Inspection Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3">
                        <PlatformIcon source={selectedRecord.source} size={24} />
                        <div>
                          <span className="font-display font-extrabold text-[16px] text-[#1F1F1F] block">
                            {selectedRecord.source}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#54B226]">
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
                      <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block">
                        AI-Verified Source Text
                      </span>
                      <div className="bg-[#F8F9FA] border border-gray-100 rounded-lg p-5">
                        <p className="text-[14.5px] font-medium leading-relaxed text-[#1F1F1F]">
                          <mark className="bg-[#F8CB45] text-[#1F1F1F] px-1.5 py-0.5 rounded font-semibold">
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
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block">
                        Extracted Structure
                      </span>
                      <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                        <span className="bg-[#F8F9FA] text-[#1F1F1F] border border-gray-200 px-2.5 py-1 rounded-md font-mono">
                          Reason: <strong className="capitalize">{selectedRecord.reason_type}</strong>
                        </span>
                        <span className="bg-[#F8F9FA] text-[#1F1F1F] border border-gray-200 px-2.5 py-1 rounded-md">
                          Category: <strong>{selectedRecord.category_mentioned === "none" ? "General Catalog" : selectedRecord.category_mentioned}</strong>
                        </span>
                        <span className="bg-[#F8F9FA] text-[#1F1F1F] border border-gray-200 px-2.5 py-1 rounded-md capitalize">
                          Segment: <strong>{selectedRecord.user_segment.replace(/_/g, " ")}</strong>
                        </span>
                        {selectedRecord.info_needed !== "none" && selectedRecord.info_needed !== "not stated" && (
                          <span className="bg-[#F8F9FA] text-[#5F6368] border border-gray-200 px-2.5 py-1 rounded-md">
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
                      <div className="pt-4 border-t border-gray-100">
                        <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">
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
                          className="text-[13px] font-bold text-[#54B226] hover:underline flex items-center gap-1 text-left"
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
          {/* Card 1: See it work instantly (Zero-Dependency Pre-Computed Option) */}
          <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 md:p-7 space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">
                  Zero-Dependency Demo
                </span>
                <h2 className="font-display font-bold text-[18px] text-[#1F1F1F]">
                  See it work instantly
                </h2>
                <p className="text-[13px] text-[#5F6368] mt-1">
                  Click any real review example below to instantly view its verified signal extraction from our dataset without an API key or network request.
                </p>
              </div>
              <span className="bg-[#FFF9E6] text-[#1F1F1F] text-[11px] font-bold px-3 py-1 rounded shrink-0 uppercase tracking-wider border border-[#F8CB45]">
                Instant Result
              </span>
            </div>

            {/* 3 Interactive Sample Buttons */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block">
                Try a real example:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PRECOMPUTED_SAMPLES.map((sample, idx) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => setSelectedPrecomputedIndex(idx)}
                    className={`p-3 rounded-lg text-left transition-all text-[12px] border ${
                      selectedPrecomputedIndex === idx
                        ? "bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-sm"
                        : "bg-[#F8F9FA] hover:bg-[#F3F1EA] text-[#1F1F1F] border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        selectedPrecomputedIndex === idx ? "bg-[#54B226] text-white" : "bg-gray-200 text-[#1F1F1F]"
                      }`}>
                        {sample.badge}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">Row #{sample.row_number}</span>
                    </div>
                    <span className="font-semibold block leading-snug">{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Display active precomputed result */}
            {selectedPrecomputedIndex !== null && (() => {
              const activeSample = PRECOMPUTED_SAMPLES[selectedPrecomputedIndex];
              const res = activeSample.result;
              return (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="bg-[#F8F9FA] border border-gray-200 p-3.5 rounded-md text-[12.5px] text-[#1F1F1F] leading-relaxed italic">
                    <span className="text-[9.5px] font-bold text-[#54B226] uppercase tracking-wider block not-italic mb-1">
                      Source Review Text (Row #{activeSample.row_number} • {activeSample.source})
                    </span>
                    "{activeSample.raw_text}"
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-[#1F1F1F] bg-[#F8CB45] px-2.5 py-0.5 rounded border border-gray-200 inline-block uppercase tracking-wider">
                      Pre-Computed Parameters (Verified Dataset Extraction)
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] bg-[#F8F9FA] p-4 rounded border border-gray-100 leading-relaxed text-[#1F1F1F]">
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Has Signal</span>
                        <span className="font-semibold">{String(res.has_signal)}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Category</span>
                        <span className="font-semibold capitalize">{res.category_mentioned}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Stated Barrier</span>
                        <span className="font-semibold">{res.barrier_to_new_category}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Reason Type</span>
                        <span className="font-semibold capitalize">{res.reason_type}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">User Segment</span>
                        <span className="font-semibold capitalize">{res.user_segment_signal.replace(/_/g, " ")}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Confidence</span>
                        <span className="font-semibold capitalize">{res.confidence}</span>
                      </div>
                      <div className="md:col-span-2 border-t border-gray-100 pt-2.5">
                        <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Verbatim Sentence Match</span>
                        <span className="font-semibold italic text-[#5F6368]">"{res.quote}"</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Card 2: Analyze your own review (Live Gemini Engine) */}
          <div className="bg-[#FFFFFF] border-none shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6 md:p-7 space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block mb-1">
                  Real-Time Engine
                </span>
                <h2 className="font-display font-bold text-[18px] text-[#1F1F1F]">
                  Analyze your own review
                </h2>
                <p className="text-[13px] text-[#5F6368] mt-1">
                  {hasServerKey
                    ? "Paste any custom customer review or run our sample review to test real-time extraction."
                    : "Enter your Gemini API key and paste a raw customer review to process it live through the extraction schema."}
                </p>
              </div>
              <span className="bg-[#E6F4EA] text-[#54B226] text-[11px] font-bold px-3 py-1 rounded shrink-0 uppercase tracking-wider border border-[#54B226]/30">
                Live Engine
              </span>
            </div>

            <div className="space-y-4">
              {/* API Key (only shown if no server key configured) */}
              {!hasServerKey && (
                <div>
                  <p className="text-[11px] text-[#737373] italic mb-1">
                    This key is used only for this request and is never stored.
                  </p>
                  <label className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block mb-1.5">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-3 py-2 text-[12px] focus:outline-none text-[#1F1F1F] font-medium"
                  />
                </div>
              )}

              {/* Text Area */}
              <div>
                <label className="text-[10px] font-bold text-[#54B226] uppercase tracking-wider block mb-1.5">
                  Raw Review Text
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Received a fake charging cable from the delivery person today. Quality control is highly disappointing, I will stick to buying electronics offline."
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-gray-200 rounded px-3 py-2 text-[12px] focus:outline-none text-[#1F1F1F] font-medium leading-relaxed"
                />
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => handleAnalyze()}
                  disabled={analyzerLoading}
                  className="bg-[#54B226] hover:bg-[#479B1F] text-[#FFFFFF] font-bold text-[12.5px] px-5 py-2.5 rounded-[8px] border-none transition-colors disabled:opacity-60 shadow-sm"
                >
                  {analyzerLoading ? "Processing signal..." : "Analyze review"}
                </button>

                <button
                  type="button"
                  onClick={handleRunSample}
                  disabled={analyzerLoading}
                  className="bg-[#F8F9FA] hover:bg-[#EFEFEF] text-[#1F1F1F] font-bold text-[12.5px] px-4 py-2.5 rounded-[8px] border border-gray-300 transition-colors disabled:opacity-60 shadow-sm flex items-center gap-1.5"
                >
                  <Play size={14} className="text-[#54B226]" />
                  Run Sample Review
                </button>
              </div>
            </div>

            {/* Loading step indicators */}
            {analyzerLoading && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-[#1F1F1F] uppercase tracking-wider animate-pulse">
                  <span>{ANALYZER_STEPS[analyzerStep]}</span>
                  <span>{Math.round(((analyzerStep + 1) / ANALYZER_STEPS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#54B226] transition-all duration-300 ease-out"
                    style={{ width: `${((analyzerStep + 1) / ANALYZER_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error output */}
            {analyzerError && (
              <div className="mt-4 p-3 bg-[#FFF5F5] border border-red-200 text-red-600 rounded text-[12px] font-semibold">
                Error: {analyzerError}
              </div>
            )}

            {/* Result output */}
            {analyzerResult && (
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
                <span className="text-[10px] font-bold text-[#1F1F1F] bg-[#F8CB45] px-2.5 py-0.5 rounded border border-gray-200 inline-block uppercase tracking-wider">
                  Resulting Parameters
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] bg-[#F8F9FA] p-4 rounded border border-gray-100 leading-relaxed text-[#1F1F1F]">
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Has Signal</span>
                    <span className="font-semibold">{String(analyzerResult.has_signal)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Category</span>
                    <span className="font-semibold capitalize">{analyzerResult.category_mentioned || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Stated Barrier</span>
                    <span className="font-semibold">{analyzerResult.barrier_to_new_category || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Reason Type</span>
                    <span className="font-semibold capitalize">{analyzerResult.reason_type || "none"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">User Segment</span>
                    <span className="font-semibold capitalize">{(analyzerResult.user_segment_signal || "unclear").replace(/_/g, " ")}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Confidence</span>
                    <span className="font-semibold capitalize">{analyzerResult.confidence || "low"}</span>
                  </div>
                  <div className="md:col-span-2 border-t border-gray-100 pt-2.5">
                    <span className="text-[9px] font-bold text-[#54B226] uppercase tracking-wider block">Verbatim Sentence Match</span>
                    <span className="font-semibold italic text-[#5F6368]">"{analyzerResult.quote || "none"}"</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Guide Doc Section */}
          <div className="bg-[#FFFFFF] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-lg p-6 space-y-4">
            <h2 className="font-display font-bold text-[18px] text-[#1F1F1F] flex items-center gap-2">
              <BookOpen size={16} className="text-[#54B226]" /> User Guide
            </h2>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Use the **Evidence Explorer** tab to search and verify findings. You can input a row number to view its details directly, or select a source, segment, or reason type from the dropdown selectors to recompute the list. The **Discovery Workspace** presents the 8 primary questions, each containing quote-grounded customer sentences. Click any quote block to jump directly to the Explorer and verify the sentence in the table.
            </p>
            <div className="text-[12.5px] text-[#5F6368] bg-[#F8F9FA] p-3.5 rounded border border-gray-100 space-y-2">
              <div>
                <strong>Confidence Levels:</strong> Sourced self-reported scores indicating model classification depth. Treats "high" as zero hedging, and "medium/low" as directional cues requiring follow-up inspection.
              </div>
              <div>
                <strong>Verbatim Quotes:</strong> Every record is grounded in character-match validation. Claims are only retained if the exact text resides word-for-word in the raw source feedback database.
              </div>
            </div>
          </div>

          {/* Links to engineering methodology */}
          <div className="bg-[#FFFFFF] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-lg p-5 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#1F1F1F]">Technical Pipeline Reference</h4>
              <p className="text-[12px] text-[#5F6368]">
                Read the details on review noise rejection steps, source biases, and extraction standards.
              </p>
            </div>
            <button
              onClick={() => setCurrentView("methodology")}
              className="bg-[#54B226] hover:bg-[#479B1F] text-[#FFFFFF] font-bold text-[11.5px] px-4 py-2 rounded-[8px] border-none shadow-2xs transition-colors"
            >
              Open Technical Docs
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          PROJECT REPOSITORY CARD (FOOTER)
          ═══════════════════════════════════════════ */}
      <footer className="max-w-4xl mx-auto border-t border-gray-200 pt-8">
        <div className="bg-[#FFFFFF] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">Source Code Repository</span>
            <h4 className="font-display font-bold text-[14.5px] text-[#1F1F1F]">Project Repository</h4>
            <p className="text-[12px] text-[#5F6368]">
              Access the codebase, data mapping pipeline, and static files on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Deepali611/AI.blinkit-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#54B226] hover:bg-[#479B1F] text-[#FFFFFF] text-[12px] font-bold px-4 py-2 rounded-[8px] border-none shadow-sm transition-all"
          >
            Open on GitHub <ExternalLink size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
